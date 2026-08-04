-- CineLoom v8.0 Cinematic Hero Upgrade marker
create table if not exists cineloom_release_markers (
  id text primary key,
  release_name text not null,
  created_at timestamptz not null default now()
);
insert into cineloom_release_markers (id, release_name)
values ('v8_0_cinematic_hero_upgrade', 'CineLoom v8.0 Cinematic Hero Upgrade')
on conflict (id) do update set release_name = excluded.release_name;
