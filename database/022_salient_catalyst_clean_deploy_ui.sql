-- CineLoom v7.2 marker migration: Salient/Catalyst clean deploy UI
CREATE TABLE IF NOT EXISTS cineloom_ui_release_markers (
  id TEXT PRIMARY KEY,
  release_name TEXT NOT NULL,
  release_version TEXT NOT NULL,
  notes TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO cineloom_ui_release_markers (id, release_name, release_version, notes)
VALUES (
  'v7_2_salient_catalyst_clean_deploy_ui',
  'Salient/Catalyst Clean Deploy UI',
  '7.2.0',
  'Clean SaaS marketing homepage, Catalyst/shadcn-style studio dashboard, and custom simple storyboard hero visual.'
)
ON CONFLICT (id) DO NOTHING;
