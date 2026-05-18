# Incremental Refactoring Prompt

Refactor pricing incrementally after characterization tests exist.

Preferred order:
1. isolate calculation inputs
2. isolate validation rules
3. isolate pricing policies
4. isolate insurance logic
5. preserve compatibility through `legacy.ts`

Do not change API contracts unless explicitly requested.
