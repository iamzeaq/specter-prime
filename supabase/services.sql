-- Services table for Specter Prime
-- Run in Supabase SQL Editor after schema.sql

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  body text not null default '',
  image text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table services enable row level security;

create policy "Public can read all services"
  on services for select
  using (true);

create policy "Authenticated full access to services"
  on services for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

insert into services (slug, title, summary, body, image, sort_order) values
(
  'roofing',
  'Roofing',
  'Standing-seam, clay tile, and stone-coated systems built to outlast the weather.',
  'Specter Prime delivers complete roofing solutions for residential and commercial properties across Lagos. From standing-seam metal and clay tile to stone-coated steel systems, every installation is engineered to withstand heavy rain, intense sun, and coastal humidity.

Our team handles new builds, full replacements, and targeted repairs — with meticulous flashing, drainage, and waterproofing at every junction. We work to specification, on schedule, and with materials chosen for durability in the local climate.',
  '/service-roofing.jpg',
  1
),
(
  'construction',
  'Construction',
  'Ground-up builds and structural work delivered to specification.',
  'From foundation to finish, Specter Prime manages ground-up construction and structural work with the precision Lagos projects demand. We coordinate framing, concrete, blockwork, and envelope systems under a single accountable team.

Whether you are building a new home, extending an existing structure, or executing a commercial shell, we deliver to agreed specifications — with transparent progress reporting and rigorous quality control at every stage.',
  '/service-construction.jpg',
  2
),
(
  'renovation',
  'Renovation',
  'Restoring and elevating existing structures with precision.',
  'Renovation requires a different discipline: working within existing structures while improving performance, aesthetics, and longevity. Specter Prime restores and elevates buildings across Lagos — from roof-over replacements and structural reinforcement to full interior-exterior upgrades.

We assess what is worth preserving, what must be replaced, and how to integrate modern materials without compromising the integrity of the original build. The result is a structure that feels renewed, performs better, and lasts longer.',
  '/service-renovation.jpg',
  3
)
on conflict (slug) do nothing;
