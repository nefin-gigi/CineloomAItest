-- CineLoom v7.7 marker migration: billion-dollar homepage visual match.
create table if not exists cineloom_ui_release_markers (
  id text primary key,
  release_version text not null,
  release_name text not null,
  created_at timestamptz default now()
);
insert into cineloom_ui_release_markers (id, release_version, release_name)
values ('v7_7_billion_homepage_match', '7.7.0', 'Billion-dollar homepage match with low-token AI Harness and endpoint router')
on conflict (id) do update set release_version = excluded.release_version, release_name = excluded.release_name;
