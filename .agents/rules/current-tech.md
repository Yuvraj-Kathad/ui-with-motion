---
trigger: always_on
---

# Current Technology Verification

For any version-sensitive technical decision, do not rely solely on model memory or older tutorials.

Before implementing or planning changes involving:
- Next.js
- React
- Tailwind CSS
- Supabase
- Google OAuth
- authentication
- SDKs
- APIs
- deployment platforms
- package-specific behavior

follow this process:

1. Inspect the versions actually installed in the repository.
2. Prefer current official documentation over memory or third-party tutorials.
3. When behavior may have changed between versions, verify the current official documentation before making an architectural decision.
4. Prefer first-party sources:
   - Next.js → nextjs.org/docs
   - Supabase → supabase.com/docs
   - Google → developers.google.com / cloud.google.com
   - Figma → official Figma documentation
5. Use connected MCP servers when they provide authoritative project-specific information.
6. Use web search when current information needs verification or official docs/MCPs do not resolve the question.
7. For Supabase tasks, use the connected Supabase MCP/search documentation when relevant.
8. For Figma tasks, use the connected Figma MCP for the design/source-of-truth information.
9. Do not silently use deprecated patterns when a current version-specific pattern exists.
10. For important architectural decisions, state which installed version/current documentation the decision is based on.
11. If current documentation cannot be verified, say so rather than presenting an old pattern as current.