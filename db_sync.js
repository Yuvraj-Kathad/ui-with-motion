require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY);

async function createComponent() {
  const reactCode = fs.readFileSync('src/components/motion-components/buttons/FourItemTabs.tsx', 'utf8');

  // Check if it already exists
  const { data: existing } = await supabase.from('components').select('id').eq('registry_id', 'four-item-tabs').maybeSingle();

  const payload = {
    registry_id: 'four-item-tabs',
    title: 'Four Item Tabs',
    description: 'A four-item tab navigation component with a smooth sliding active indicator',
    status: 'published',
    type: 'component',
    tags: ['Navigation', 'Tabs'],
    source_type: 'react',
    snippets: {
      react: reactCode,
      html: '',
      css: ''
    }
  };

  if (existing) {
    console.log('Component exists, updating...');
    const { error } = await supabase.from('components').update(payload).eq('id', existing.id);
    if (error) console.error('Error updating:', error);
    else console.log('Successfully updated Four Item Tabs in DB!');
  } else {
    console.log('Component does not exist, creating...');
    const { error } = await supabase.from('components').insert([payload]);
    if (error) console.error('Error creating:', error);
    else console.log('Successfully created Four Item Tabs in DB!');
  }
}

createComponent();

