alter table public.components 
add column if not exists source_type text not null default 'react' check (source_type in ('react', 'html_css', 'both')),
add column if not exists snippets jsonb not null default '{}'::jsonb,
add column if not exists schema_definition jsonb not null default '[]'::jsonb;

update public.components
set 
  source_type = 'react',
  snippets = '{}'::jsonb,
  schema_definition = '[]'::jsonb
where registry_id in (
  'continue-button',
  'generate-button',
  'accept-button',
  'get-access-button',
  'mail-button',
  'delete-button',
  'download-button',
  'tabs-button',
  'services-indicator-button'
);
