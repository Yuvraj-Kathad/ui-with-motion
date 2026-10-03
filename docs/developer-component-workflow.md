# New Component Workflow

Adding a new component to the UX With Motion public catalog requires zero database migrations and zero manual Supabase inserts for V1. You simply add the component to the codebase and ensure it is registered in the Next.js application.

## 1. Create the React Component
Create your new component under `src/components/motion-components/` (or appropriate subfolder).
- **Default to Server Components**: Next.js App Router defaults to Server Components.
- **Use `"use client"` when necessary**: If you need `framer-motion`, hooks like `useState`, or browser APIs, add `"use client"` at the top of your file.

If your component should support user customization (e.g. changing colors), expose those properties via **CSS variables**. 
- Read from standard `--var-name` with a sensible fallback.
- Example: 
  ```tsx
  style={{
    "--btn-bg": "var(--button-bg, #16A34A)",
    "--btn-text": "var(--button-text, #ffffff)",
  } as React.CSSProperties}
  ```

## 2. Register the Component
Open `src/lib/registry/components.tsx`. Add a new entry to the `componentRegistry` object.

A standard registry entry looks like this:
```tsx
  "my-new-button": {
    registryId: "my-new-button",
    name: "My New Button",
    category: "Buttons",
    component: MyNewButtonComponent, // The trusted React renderer
    schema_definition: [
      { id: "bg", label: "Background", type: "Color Picker", defaultValue: "#16A34A", variable: "--button-bg" },
      { id: "text", label: "Text", type: "Color Picker", defaultValue: "#ffffff", variable: "--button-text" }
    ],
    snippets: {
      html: `<button class="my-btn">Hello</button>`,
      css: `.my-btn { /* styles */ }`,
      nextjs: `"use client";\n\nimport React from "react";\n\nexport function MyNewButtonComponent() { ... }` // Properly escaped JSON string
    }
  }
```

### Registration Properties
- **`registryId`**: Must exactly match the key you use in the `componentRegistry` dictionary.
- **`component`**: The actual imported React component that acts as the trusted renderer for previews.
- **`schema_definition` (Optional)**: If you implemented CSS variables, define the controls here. The UI will automatically generate Customisation controls mapped to your `variable` string.
- **`snippets`**: The source code strings that will be provided to the user when they click the "Code" tab. Next.js code should be provided exactly as it is in your source file, with `"use client"` if needed.

## 3. Database Sync (Optional/Automatic)
For components solely developed in code, they will function correctly in the public UI. 
If they need to appear in the component catalog natively (if not automatically discovered), ensure a corresponding row exists in the `components` Supabase table matching the `registry_id`. The application will merge the Database row (for metadata like views/likes/access_tier) with your Trusted Registry renderer and snippets.
