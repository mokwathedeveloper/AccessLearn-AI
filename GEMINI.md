
5. Open a **Pull Request**  
6. Merge into the target branch  
7. Push merged changes  
8. Document the branch **inside `/docs`**:
   - Create a Markdown file named after the branch, e.g., `/docs/feat-auth.md`  
   - Include:
     - Branch purpose
     - Files modified
     - Components/services added
     - Testing notes
     - Any architectural decisions  

9. Only then proceed to the next task  

---

## Implementation Guidelines

### Frontend
- **Use shadcn/ui components only**  
- Accessibility-first: keyboard navigation, proper labels, ARIA compliance  
- **All components must be reusable**  
- Avoid inline styles unless necessary  
- Avoid code duplication; reuse existing utilities or components  

### Backend
- Modular controller-service-repository structure  
- Input validation using DTOs  
- Proper error handling  
- **All modules must be reusable and maintainable**  
- Secure API access using Supabase auth  
- Avoid business logic in controllers  

### AI Integration
- Text-to-Speech for audio generation  
- Text summarization & simplification APIs  
- Voice navigation  
- Ensure AI output is accurate, reliable, and testable  

---

## Build & Verification Rules

- Build must pass **TypeScript and linting checks** before committing  
- Run **unit tests** for both frontend and backend wherever applicable  
- Ensure no breaking changes or hardcoded demo data  

---

## Task Execution Plan

1. **Project Setup** – initialize Next.js, NestJS, shadcn, Supabase  
   - Branch: `chore/project-init`  
   - Document: `/docs/chore-project-init.md`
2. **Database & RBAC** – Users, Materials, RLS policies  
   - Branch: `feat/db-setup`  
   - Document: `/docs/feat-db-setup.md`
3. **Authentication** – Sign-up, Sign-in, role assignment, page protection  
   - Branch: `feat/auth`  
   - Document: `/docs/feat-auth.md`
4. **Core Features** – Upload, list, and manage lecture materials  
   - Branch: `feat/core-features`  
   - Document: `/docs/feat-core-features.md`
5. **AI Features** – Text-to-Speech, summarization, voice navigation  
   - Branch: `feat/ai`  
   - Document: `/docs/feat-ai.md`
6. **UI/UX Enhancements** – Layout, accessible components, dynamic pages  
   - Branch: `feat/ui-ux`  
   - Document: `/docs/feat-ui-ux.md`
7. **Testing & Quality** – Unit tests, SonarQube analysis  
   - Branch: `test/quality`  
   - Document: `/docs/test-quality.md`
8. **Demo & Deployment** – Live demo, screenshots, video, final merge  
   - Branch: `chore/deploy`  
   - Document: `/docs/chore-deploy.md`

---

## Final Notes

- Always **index the codebase before implementing**  
- Always **check GEMINI.md and `/docs` before coding**  
- Ask Gemini to **pause if any requirement is unclear**  
- Follow branch, commit, and PR discipline strictly  
- Focus on **modular, reusable, accessible, and production-ready code**  

---

This **GEMINI.md** ensures Gemini AI has a **single source of truth** for everything: project goals, architecture, stack, standards, workflow, reusability, RBAC, dynamic requirements, and detailed branch-level documentation.
