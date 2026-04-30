use anchor_lang::prelude::*;

declare_id!("PassDir111111111111111111111111111111111111");

#[program]
pub mod passport_directory {
    use super::*;

    pub fn register_passport(
        ctx: Context<RegisterPassport>,
        sbt_mint: Pubkey,
        metadata_uri: String,
        metadata_hash: [u8; 32],
    ) -> Result<()> {
        let record = &mut ctx.accounts.record;
        record.owner = ctx.accounts.owner.key();
        record.sbt_mint = sbt_mint;
        record.metadata_uri = metadata_uri;
        record.metadata_hash = metadata_hash;
        record.version = 1;
        record.minted_at = Clock::get()?.unix_timestamp;
        record.updated_at = record.minted_at;
        record.bump = *ctx.bumps.get("record").unwrap();
        Ok(())
    }

    pub fn update_passport_metadata(
        ctx: Context<UpdatePassportMetadata>,
        new_metadata_uri: String,
        new_metadata_hash: [u8; 32],
    ) -> Result<()> {
        let record = &mut ctx.accounts.record;
        require_keys_eq!(record.owner, ctx.accounts.owner.key(), PassportError::Unauthorized);
        record.metadata_uri = new_metadata_uri;
        record.metadata_hash = new_metadata_hash;
        record.version = record.version.saturating_add(1);
        record.updated_at = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct RegisterPassport<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        payer = owner,
        space = 8 + 220,
        seeds = [b"passport", owner.key().as_ref()],
        bump
    )]
    pub record: Account<'info, PassportRecord>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePassportMetadata<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        seeds = [b"passport", owner.key().as_ref()],
        bump = record.bump
    )]
    pub record: Account<'info, PassportRecord>,
}

#[account]
pub struct PassportRecord {
    pub owner: Pubkey,
    pub sbt_mint: Pubkey,
    pub metadata_uri: String,
    pub metadata_hash: [u8; 32],
    pub version: u32,
    pub minted_at: i64,
    pub updated_at: i64,
    pub bump: u8,
}

#[error_code]
pub enum PassportError {
    #[msg("Only owner can update passport")]
    Unauthorized,
}
