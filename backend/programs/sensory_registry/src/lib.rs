use anchor_lang::prelude::*;

declare_id!("SensReg111111111111111111111111111111111111");

#[program]
pub mod sensory_registry {
    use super::*;

    pub fn publish_module(
        ctx: Context<PublishModule>,
        content_uri: String,
        content_hash: [u8; 32],
        title_hash: [u8; 32],
        subject: u8,
        difficulty: u8,
        license: u8,
        creator_royalty_bps: u16,
        allow_ai_adaptation: bool,
    ) -> Result<()> {
        let module = &mut ctx.accounts.module;
        module.creator = ctx.accounts.creator.key();
        module.content_uri = content_uri.clone();
        module.content_hash = content_hash;
        module.title_hash = title_hash;
        module.subject = subject;
        module.difficulty = difficulty;
        module.license = license;
        module.creator_royalty_bps = creator_royalty_bps;
        module.allow_ai_adaptation = allow_ai_adaptation;
        module.adaptation_count = 0;
        module.appreciation_count = 0;
        module.total_earned = 0;
        module.created_at = Clock::get()?.unix_timestamp;
        module.bump = *ctx.bumps.get("module").unwrap();

        emit!(ModulePublished {
            module: module.key(),
            creator: module.creator,
            content_uri,
            subject,
            timestamp: module.created_at,
        });
        Ok(())
    }

    pub fn record_adaptation(
        ctx: Context<RecordAdaptation>,
        adapted_uri: String,
        adapted_hash: [u8; 32],
        profile_archetype: u8,
    ) -> Result<()> {
        require!(ctx.accounts.module.allow_ai_adaptation, RegistryError::AdaptationDisabled);
        let adaptation = &mut ctx.accounts.adaptation;
        adaptation.source_module = ctx.accounts.module.key();
        adaptation.transformer = ctx.accounts.transformer.key();
        adaptation.adapted_uri = adapted_uri;
        adaptation.adapted_hash = adapted_hash;
        adaptation.profile_archetype = profile_archetype;
        adaptation.appreciation_count = 0;
        adaptation.total_earned = 0;
        adaptation.created_at = Clock::get()?.unix_timestamp;
        adaptation.bump = *ctx.bumps.get("adaptation").unwrap();

        ctx.accounts.module.adaptation_count = ctx.accounts.module.adaptation_count.saturating_add(1);

        emit!(AdaptationCreated {
            adaptation: adaptation.key(),
            source_module: adaptation.source_module,
            transformer: adaptation.transformer,
            profile_archetype,
            timestamp: adaptation.created_at,
        });
        Ok(())
    }

    pub fn appreciate(ctx: Context<Appreciate>, amount: u64) -> Result<()> {
        let module = &mut ctx.accounts.module;
        let adaptation = &mut ctx.accounts.adaptation;
        let royalty = module.creator_royalty_bps as u64;
        let creator_share = amount.saturating_mul(royalty).saturating_div(10_000);
        let transformer_share = amount.saturating_sub(creator_share);

        // Transfer logic omitted in scaffold; integrate system_program CPI in production.
        module.appreciation_count = module.appreciation_count.saturating_add(1);
        module.total_earned = module.total_earned.saturating_add(creator_share);
        adaptation.appreciation_count = adaptation.appreciation_count.saturating_add(1);
        adaptation.total_earned = adaptation.total_earned.saturating_add(transformer_share);

        let appreciation = &mut ctx.accounts.appreciation;
        appreciation.appreciator = ctx.accounts.appreciator.key();
        appreciation.adaptation = adaptation.key();
        appreciation.amount = amount;
        appreciation.timestamp = Clock::get()?.unix_timestamp;
        appreciation.bump = *ctx.bumps.get("appreciation").unwrap();

        emit!(AppreciationPaid {
            appreciator: appreciation.appreciator,
            adaptation: appreciation.adaptation,
            amount,
            creator_share,
            transformer_share,
            timestamp: appreciation.timestamp,
        });
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(content_uri: String, content_hash: [u8; 32])]
pub struct PublishModule<'info> {
    #[account(mut)]
    pub creator: Signer<'info>,
    #[account(
        init,
        payer = creator,
        space = 8 + 400,
        seeds = [b"module", creator.key().as_ref(), &content_hash],
        bump
    )]
    pub module: Account<'info, ContentModule>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RecordAdaptation<'info> {
    #[account(mut)]
    pub transformer: Signer<'info>,
    #[account(mut)]
    pub module: Account<'info, ContentModule>,
    #[account(
        init,
        payer = transformer,
        space = 8 + 300,
        seeds = [b"adaptation", module.key().as_ref(), transformer.key().as_ref(), b"hash"],
        bump
    )]
    pub adaptation: Account<'info, Adaptation>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Appreciate<'info> {
    #[account(mut)]
    pub appreciator: Signer<'info>,
    #[account(mut)]
    pub module: Account<'info, ContentModule>,
    #[account(mut)]
    pub adaptation: Account<'info, Adaptation>,
    #[account(
        init,
        payer = appreciator,
        space = 8 + 120,
        seeds = [b"appreciation", adaptation.key().as_ref(), appreciator.key().as_ref()],
        bump
    )]
    pub appreciation: Account<'info, Appreciation>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct ContentModule {
    pub creator: Pubkey,
    pub content_uri: String,
    pub content_hash: [u8; 32],
    pub title_hash: [u8; 32],
    pub subject: u8,
    pub difficulty: u8,
    pub license: u8,
    pub creator_royalty_bps: u16,
    pub allow_ai_adaptation: bool,
    pub adaptation_count: u32,
    pub appreciation_count: u32,
    pub total_earned: u64,
    pub created_at: i64,
    pub bump: u8,
}

#[account]
pub struct Adaptation {
    pub source_module: Pubkey,
    pub transformer: Pubkey,
    pub adapted_uri: String,
    pub adapted_hash: [u8; 32],
    pub profile_archetype: u8,
    pub appreciation_count: u32,
    pub total_earned: u64,
    pub created_at: i64,
    pub bump: u8,
}

#[account]
pub struct Appreciation {
    pub appreciator: Pubkey,
    pub adaptation: Pubkey,
    pub amount: u64,
    pub timestamp: i64,
    pub bump: u8,
}

#[event]
pub struct ModulePublished {
    pub module: Pubkey,
    pub creator: Pubkey,
    pub content_uri: String,
    pub subject: u8,
    pub timestamp: i64,
}

#[event]
pub struct AdaptationCreated {
    pub adaptation: Pubkey,
    pub source_module: Pubkey,
    pub transformer: Pubkey,
    pub profile_archetype: u8,
    pub timestamp: i64,
}

#[event]
pub struct AppreciationPaid {
    pub appreciator: Pubkey,
    pub adaptation: Pubkey,
    pub amount: u64,
    pub creator_share: u64,
    pub transformer_share: u64,
    pub timestamp: i64,
}

#[error_code]
pub enum RegistryError {
    #[msg("AI adaptation is disabled for this module")]
    AdaptationDisabled,
}
