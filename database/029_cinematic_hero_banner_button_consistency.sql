-- CineLoom v8.2 marker migration: cinematic hero banner and sitewide button consistency.
create table if not exists cineloom_ui_release_markers (
  id bigserial primary key,
  release_name text not null,
  release_version text not null,
  notes text,
  created_at timestamptz not null default now()
);
insert into cineloom_ui_release_markers (release_name, release_version, notes)
values ('cinematic_hero_banner_button_consistency', '8.2.0', 'Adds cinematic hero banner image and standardizes button contrast, sizing, and alignment.')
on conflict do nothing;
