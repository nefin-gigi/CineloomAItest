-- CineLoom v7.9 responsive layout lock marker.
-- Documents the UI fix release for public page alignment and responsive safety.
create table if not exists cineloom_ui_release_markers (
  id text primary key,
  release_name text not null,
  created_at timestamptz default now()
);
insert into cineloom_ui_release_markers (id, release_name)
values ('v7_9_responsive_layout_lock', 'Responsive layout lock for public pages')
on conflict (id) do nothing;
