-- CineLoom v5.0 Simple RGB UI/UX Redesign
-- Tracks release-level UI decisions and acceptance criteria.

CREATE TABLE IF NOT EXISTS ui_ux_release_notes (
  id TEXT PRIMARY KEY,
  release_version TEXT NOT NULL,
  area TEXT NOT NULL,
  decision TEXT NOT NULL,
  acceptance_criteria TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ui_ux_release_notes (id, release_version, area, decision, acceptance_criteria) VALUES
('v50-simple-rgb-theme', '5.0.0', 'visual system', 'Use simple red, green, and blue accents on a light neutral interface.', 'Primary actions are blue, success/trust is green, warning/destructive states are red, and contrast remains legible.'),
('v50-homepage-simplified', '5.0.0', 'homepage', 'Reduce homepage clutter and keep a clear script-to-storyboard flow.', 'A new visitor can understand the product and start the free storyboard flow without visual confusion.'),
('v50-studio-readable-shell', '5.0.0', 'studio', 'Make studio navigation and command center pages lighter and easier to scan.', 'Sidebar, cards, tables, and forms use clean backgrounds, readable text, and clear hover/focus states.'),
('v50-mobile-first', '5.0.0', 'responsive ux', 'Improve mobile stacking, menu behavior, and card layouts.', 'Public pages and studio pages remain usable on mobile with one-column content and accessible navigation.');
