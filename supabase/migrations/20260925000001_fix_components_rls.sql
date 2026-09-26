-- Drop the original overly broad policies
drop policy if exists "Anyone can view published components" on public.components;
drop policy if exists "Admins can manage components" on public.components;

-- Recreate public read policy explicitly scoped to anon and authenticated
create policy "Anyone can view published components"
    on public.components
    for select
    to anon, authenticated
    using (status = 'published');

-- Recreate admin management policy explicitly scoped to authenticated
create policy "Admins can manage components"
    on public.components
    for all
    to authenticated
    using (private.has_role('admin'));
