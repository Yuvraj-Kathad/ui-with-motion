-- Create user_roles table
create table public.user_roles (
    user_id uuid references auth.users(id) on delete cascade not null primary key,
    role text not null check (role in ('admin', 'user'))
);

-- Enable RLS on user_roles
alter table public.user_roles enable row level security;

-- Users can read their own role
create policy "Users can read their own role"
    on public.user_roles
    for select
    using (auth.uid() = user_id);

-- Create a private schema for security helper functions
create schema if not exists private;

-- Safe role-checking helper function for RLS (Security Definer)
-- Placed in private schema and using set search_path = ''
create or replace function private.has_role(required_role text)
returns boolean as $$
begin
  return exists (
    select 1
    from public.user_roles
    where user_id = auth.uid() and role = required_role
  );
end;
$$ language plpgsql security definer set search_path = '';

-- Revoke execute from public/anon
revoke execute on function private.has_role(text) from public;
revoke execute on function private.has_role(text) from anon;

-- Grant execute to authenticated users (so it can be used in RLS policies)
grant usage on schema private to authenticated;
grant execute on function private.has_role(text) to authenticated;

-- Create components table
create type component_status as enum ('draft', 'published', 'archived');

create table public.components (
    id uuid primary key default gen_random_uuid(),
    registry_id text not null unique,
    title text not null,
    description text,
    status component_status not null default 'draft',
    tags text[] default '{}',
    type text,
    "order" integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on components
alter table public.components enable row level security;

-- Public read access for published components
create policy "Anyone can view published components"
    on public.components
    for select
    using (status = 'published');

-- Admin full access to components
create policy "Admins can manage components"
    on public.components
    for all
    using (private.has_role('admin'));

-- Add a trigger for updated_at on components
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger handle_updated_at
    before update on public.components
    for each row
    execute procedure public.handle_updated_at();
