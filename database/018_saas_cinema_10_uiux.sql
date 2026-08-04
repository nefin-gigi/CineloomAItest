-- CineLoom v5.1 SaaS + Cinema 10/10 UI/UX operating layer
-- Tracks homepage product-proof surfaces, audience routing, and conversion UX readiness.

create table if not exists public.uiux_saas_cinema_surfaces (
  id uuid primary key default gen_random_uuid(),
  surface_key text not null unique,
  surface_name text not null,
  audience text not null,
  conversion_goal text not null,
  proof_required boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.uiux_saas_cinema_surfaces (surface_key, surface_name, audience, conversion_goal, proof_required)
values
  ('homepage_saas_cinema_hero', 'SaaS cinema homepage hero', 'creators_filmmakers_producers', 'free_storyboard_started', true),
  ('homepage_product_browser_preview', 'Product browser preview', 'all_public_visitors', 'product_value_understood', true),
  ('homepage_cinema_audience_routes', 'Cinema audience routing cards', 'creators_filmmakers_producers_studios', 'right_workflow_selected', false),
  ('homepage_proof_studio', 'Output proof studio', 'buyers_and_producers', 'sample_package_viewed', true),
  ('homepage_trust_stack', 'Trust and privacy stack', 'teams_and_enterprise', 'trust_objection_reduced', true)
on conflict (surface_key) do update set
  surface_name = excluded.surface_name,
  audience = excluded.audience,
  conversion_goal = excluded.conversion_goal,
  proof_required = excluded.proof_required,
  updated_at = now();
