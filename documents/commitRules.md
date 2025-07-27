# Project Development Specification Documentation

## 1. Overview
This document aims to standardize the team's development process, ensure code quality, maintain clear and traceable commit records, and implement automated verification through toolchains. It applies to the development and collaboration of all microservice modules in the project.


## 2. Code Commit Specifications
### 2.1 Commit Message Format
Adopt the **Conventional Commits specification** with the following format:
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 2.2 Commit Types
| Type     | Description                                  | Example                                  |
|----------|----------------------------------------------|------------------------------------------|
| feat     | New feature addition                         | `feat(fund): support fund pagination`    |
| fix      | Bug fixing                                   | `fix(stock): fix code format error`      |
| docs     | Documentation or comment modifications       | `docs: update API parameter description` |
| style    | Code format adjustments (no logic changes)   | `style: unify indentation standards`     |
| refactor | Code refactoring (no functional changes)     | `refactor: split overlong functions`     |
| test     | Add or modify test cases                     | `test: supplement fund interface tests`  |
| chore    | Dependency management or build config changes| `chore: upgrade axios to 1.4.0`          |

### 2.3 Commit Message Example

```
fix(stock): fix code format error
```

### 2.4 Eslint check


| Operation                   | Command                       | Description                                |
|-----------------------------|-------------------------------|-------------------------------------------|
| First-time project pull     | npm run init                  | Install dependencies + initialize Husky hooks |
| Daily code development check| npm run lint                  | Full code style check                     |
| Fix code format issues      | npm run lint:fix              | Automatically fix fixable format errors   |
| Commit code                 | git add . && npm run commit   | (Optional) Generate compliant commit message through interactive tool |
| Validate commit message compliance | npm run commitlint | Check if the latest commit complies with the standards |


## 3. Code Specifications
### 3.1 General Rules
- Follow ESLint configuration (based on `.eslintrc.js` in the project root directory);
- Variable naming: Use camelCase (e.g., `fundCode`), constants use UPPER_CASE (e.g., `MAX_LIMIT`);
- Function length: A single function should not exceed 50 lines of code; split if necessary;
- Comments: Add comments for complex logic; functions should describe parameters, return values, and purposes.

### 3.2 Microservice-Specific Specifications
- Each service independently maintains `package.json` and dependencies to avoid cross-service dependencies;
- Unified interface return format:
  ```json
  {
    "status": "yes|no",
    "data": "...",
    "message": "description"
  }
  ```


## 4. Branch Management Specifications
### 4.1 Branch Types
| Branch Type | Naming Convention        | Purpose                                   |
|-------------|--------------------------|-------------------------------------------|
| main        | Main branch              | Production code, direct commits prohibited|
| develop     | Development branch       | Integrate feature branches for testing    |
| feature     | feature/feature-name     | Develop new features (e.g., `feature/fund-history`) |
| bugfix      | bugfix/issue-description | Fix development environment bugs (e.g., `bugfix/stock-validator`) |


### 4.2 Branch Workflow
1. Create `feature`/`bugfix` branches from `develop` for development;
2. Submit a PR to `develop` after completion, merge after review;
3. Merge from `develop` to `main` before release, and tag (e.g., `v1.0.0`).


## 5.GitHub Actions Cloud Verification
- Trigger timing: Automatically executed when pushing code or creating PRs;
- Verification content:
  - Commit message specifications (based on `.commitlintrc.js`);
  - Code format and syntax (ESLint);
  - Branch protection: The `main` branch must be merged via PR, and all verifications must pass before merging.


## 7. Appendix
- Toolchain dependencies: Node.js (see respective `.nvmrc` for each service), npm, Git, Docker;
- Reference documents:
  - [Conventional Commits Specification](https://www.conventionalcommits.org/)
  - [GitHub Actions Official Documentation](https://docs.github.com/en/actions)
  - [ESLint Rules Documentation](https://eslint.org/docs/rules/)

This document takes effect from the release date; updates will be notified to team members.