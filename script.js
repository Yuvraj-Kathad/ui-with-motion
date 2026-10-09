const fs = require('fs');
let code = fs.readFileSync('src/lib/registry/components.tsx', 'utf8');

const newEntry = `
  "four-item-tabs": {
    registryId: "four-item-tabs",
    name: "Four Item Tabs",
    category: "Buttons",
    component: FourItemTabs,
    snippets: {
      html: \`<div class="four-tabs"></div>\`,
      css: \`.four-tabs { /* styles */ }\`,
      react: \`// React code for FourItemTabs\`
    }
  },`;

if (!code.includes('"four-item-tabs"')) {
  code = code.replace(
    'export const componentRegistry: Record<string, ComponentRegistryEntry> = {',
    'export const componentRegistry: Record<string, ComponentRegistryEntry> = {' + newEntry
  );
  fs.writeFileSync('src/lib/registry/components.tsx', code);
  console.log("Successfully injected four-item-tabs");
} else {
  console.log("Already exists");
}
