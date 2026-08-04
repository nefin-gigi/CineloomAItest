-- CineLoom v7.1 SaaS Template UI upgrade evidence marker
-- This migration documents the UX operating layer release. It is safe to run as a no-op marker.
create table if not exists cineloom_ui_release_history (
  id text primary key,
  release_name text not null,
  release_version text not null,
  summary text not null,
  created_at timestamptz default now()
);

insert into cineloom_ui_release_history (id, release_name, release_version, summary)
values (
  'v7_1_saas_template_ui',
  'Premium SaaS Template UI',
  '7.1.0',
  'Original Salient/Catalyst-inspired SaaS template implementation for CineLoom public website and staging readiness.'
)
on conflict (id) do update set
  release_name = excluded.release_name,
  release_version = excluded.release_version,
  summary = excluded.summary;
