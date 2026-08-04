-- CineLoom v8.1 standardized site footer marker.
-- Documents the standard footer navigation groups for production governance.

create table if not exists cineloom_footer_standardization (
  id text primary key,
  footer_version text not null,
  section_name text not null,
  link_count integer not null,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

insert into cineloom_footer_standardization (id, footer_version, section_name, link_count)
values
  ('v8_1_product_footer', '8.1', 'Product', 4),
  ('v8_1_studio_footer', '8.1', 'Studio', 4),
  ('v8_1_trust_footer', '8.1', 'Trust', 4),
  ('v8_1_legal_footer', '8.1', 'Legal', 4)
on conflict (id) do update set footer_version = excluded.footer_version, link_count = excluded.link_count;
