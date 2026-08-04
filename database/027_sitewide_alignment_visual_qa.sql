-- CineLoom v7.8 marker: sitewide alignment and visual QA fix.
create table if not exists sitewide_visual_qa_releases (
  id uuid primary key default gen_random_uuid(),
  release_version text not null,
  page_group text not null,
  alignment_status text not null,
  notes text,
  created_at timestamptz not null default now()
);
insert into sitewide_visual_qa_releases (release_version, page_group, alignment_status, notes)
values ('7.8.0', 'public_marketing_pages', 'fixed', 'Final CSS layer fixes homepage feature band, public page title spacing, examples/pricing/security/support grids, mobile breakpoints, and horizontal overflow.');
