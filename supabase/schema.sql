-- Specter Prime database schema
-- Run in Supabase SQL Editor

-- Projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null default '',
  location text not null default '',
  description text not null default '',
  cover_image text,
  gallery jsonb not null default '[]'::jsonb,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Posts
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  content text not null default '',
  cover_image text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Leads (contact form submissions)
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null default '',
  project_type text not null default '',
  message text not null default '',
  created_at timestamptz not null default now()
);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

create trigger posts_updated_at
  before update on posts
  for each row execute function update_updated_at();

-- Row Level Security
alter table projects enable row level security;
alter table posts enable row level security;
alter table leads enable row level security;

-- Public read for published content
create policy "Public can read published projects"
  on projects for select
  using (published = true);

create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- Anyone can submit a lead
create policy "Anyone can insert leads"
  on leads for insert
  with check (true);

-- Authenticated users (admin) have full access
create policy "Authenticated full access to projects"
  on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated full access to posts"
  on posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated can read leads"
  on leads for select
  using (auth.role() = 'authenticated');

-- Storage bucket for media uploads
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public read media"
  on storage.objects for select
  using (bucket_id = 'media');

create policy "Authenticated upload media"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Authenticated update media"
  on storage.objects for update
  using (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "Authenticated delete media"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');
