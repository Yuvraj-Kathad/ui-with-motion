---
trigger: always_on
---

# Current Technology Verification

For any version-sensitive technical decision, do not rely solely on model memory, previous conversations, older tutorials, or prior agent reports.

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
- Figma integration
- MCP integrations

follow this process:

1. Inspect the versions actually installed in the repository.

2. Inspect the current implementation before proposing changes. Treat the repository as the primary source of truth for existing project behavior.

3. Prefer current official documentation over model memory, old tutorials, or unofficial examples.

4. When behavior may have changed between versions, verify the current official documentation before making an architectural decision.

5. Prefer first-party sources:
   - Next.js → nextjs.org/docs
   - Supabase → supabase.com/docs
   - Google → developers.google.com / cloud.google.com
   - Figma → official Figma documentation
   - Vercel → vercel.com/docs

6. Use connected MCP servers when they provide authoritative project-specific information.

7. For Supabase tasks, use the connected Supabase MCP/search documentation when relevant.

8. For Figma tasks, use the connected Figma MCP for design/source-of-truth information.

9. Use web search when current information needs verification and official documentation/MCPs do not resolve the question.

10. Do not silently use deprecated patterns when a current version-specific pattern exists.

11. For important architectural decisions, state which installed version and current documentation the decision is based on.

12. If current documentation cannot be verified, say so rather than presenting an old pattern as current.

13. Do not blindly trust previous agent reports. Verify important claims against the actual repository, installed dependencies, command output, and relevant official documentation.

14. Distinguish clearly between:
    - verified facts from the repository,
    - official documentation,
    - inferred behavior,
    - and assumptions.

15. Prefer the smallest change that solves the demonstrated problem. Do not replace a working architecture merely because a newer or different approach exists.

16. When validation commands fail, determine whether the failure is caused by:
    - the current code,
    - pre-existing code,
    - dependency/version behavior,
    - or the local environment/toolchain.
    Do not incorrectly attribute environment failures to application logic.

17. Do not make database migrations, dependency upgrades, infrastructure changes, or authentication changes unless the current task actually requires them.

18. For design implementation, Figma is the visual source of truth by default. The Admin Component Builder Create/Edit workflow is an explicit exception: its Figma designs may be improved or adapted when implementation evidence shows a better UX is required.