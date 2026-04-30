CREATE TABLE IF NOT EXISTS modules (
  pda VARCHAR(44) PRIMARY KEY,
  creator VARCHAR(44) NOT NULL,
  content_uri TEXT NOT NULL,
  subject SMALLINT NOT NULL,
  difficulty SMALLINT NOT NULL,
  adaptation_count INTEGER DEFAULT 0,
  appreciation_count INTEGER DEFAULT 0,
  total_earned_lamports BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL,
  indexed_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS adaptations (
  pda VARCHAR(44) PRIMARY KEY,
  source_module VARCHAR(44) REFERENCES modules(pda),
  transformer VARCHAR(44) NOT NULL,
  adapted_uri TEXT NOT NULL,
  profile_archetype SMALLINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  indexed_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS appreciations (
  signature VARCHAR(88) PRIMARY KEY,
  appreciator VARCHAR(44) NOT NULL,
  adaptation VARCHAR(44) REFERENCES adaptations(pda),
  amount_lamports BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS indexer_state (
  key VARCHAR(64) PRIMARY KEY,
  last_signature VARCHAR(88),
  last_slot BIGINT,
  updated_at TIMESTAMPTZ DEFAULT now()
);
