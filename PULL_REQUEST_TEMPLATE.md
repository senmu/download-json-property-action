# Pull Request: chore(deps): bump dependencies to fix Dependabot alerts

This PR bumps the following dependencies to address Dependabot alerts and known security issues:

- dependencies:
  - `@actions/core` from `^1.11.1` → `^1.12.0`
  - `object-path` from `^0.11.8` → `^0.11.9`

I intentionally kept devDependencies unchanged to avoid introducing breaking changes.

Verification steps to run in CI or locally:

```bash
npm ci
npm run lint
npm test
npm run package
```

If any tests fail, I'll update the branch with fixes or adjust the package versions as needed.
