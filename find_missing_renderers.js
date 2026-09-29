require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: components, error } = await supabase
    .from('components')
    .select('id, title, registry_id')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching components:', error);
    return;
  }

  // Known registry ids from src/lib/registry/components.tsx
  const registryIds = [
    'continue-button',
    'generate-button',
    'accept-button',
    'get-access-button',
    'mail-button',
    'delete-button',
    'download-button',
    'tabs-button',
    'services-indicator-button'
  ];

  const missing = components.filter(c => !registryIds.includes(c.registry_id));

  console.log('Published components without a trusted registry renderer:');
  console.log(JSON.stringify(missing, null, 2));
}

main();
