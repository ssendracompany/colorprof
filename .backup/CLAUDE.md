# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LeanTrack is a time tracking and absence management application built with Next.js 15 (App Router), following Hexagonal Architecture principles. The backend uses Prisma with PostgreSQL for data persistence, with a centralized Dependency Injection container for repository management.

**Tech Stack**:
- **Frontend**: Next.js 15.4.7, React 19.2.0, React DOM 19.2.0
- **Authentication**: NextAuth.js 4.22.1
- **Database**: PostgreSQL 17.2 (Docker), Prisma 6.17.1
- **Language**: TypeScript 5.9.3
- **Testing**: Vitest 4.0.4, Testing Library 16.3.0, Testcontainers 11.7.1
- **i18n**: i18next 23.16.8, react-i18next 13.5.0
- **Runtime**: Node.js 22.12.0

**Production**: https://track.leanmind.es (Digital Ocean Droplet)

## Development Commands

```bash
# Setup (first time)
npm install
cp .env.local.example .env.local  # Edit and set NEXTAUTH_SECRET, NEXTAUTH_URL, DATABASE_URL
npm run database:up                # Start PostgreSQL via Docker
npx prisma migrate dev             # Apply database migrations
npm run dev                        # Start dev server (http://localhost:3000)

# Testing
npm test                           # Unit tests (fast, no external dependencies needed)
npm run test:watch                 # Watch mode
npm run test:with-integration      # Integration tests (requires PostgreSQL running)
npm run test:e2e                   # Playwright E2E tests
npm run test:e2e:debug             # Playwright UI mode
npm run test:coverage              # Coverage report

# Linting and Formatting
npm run lint                       # ESLint with hexagonal architecture rules
npm run format                     # Format all files with Prettier
npm run format:check               # Check formatting without modifying files

# Building
npm run build                      # Production build
npm start                          # Start production server

# Database (PostgreSQL via Prisma)
npm run database:up                # Start PostgreSQL via Docker
npm run database:down              # Stop PostgreSQL
npx prisma migrate dev             # Create and apply migrations
npx prisma studio                  # Open Prisma Studio GUI
```

## Testing a Single Test

```bash
# Run a specific test file
npx vitest run path/to/test-file.test.ts

# Watch a specific test file
npx vitest path/to/test-file.test.ts

# Run tests matching a pattern
npx vitest run -t "test description pattern"

# Integration test for a specific file
npx vitest run path/to/test-file.test.ts --config=vitest.config.integration.ts
```

## Architecture

### Hexagonal Architecture (Enforced by ESLint)

The codebase uses strict hexagonal architecture with dependency rules enforced by `eslint-plugin-hexagonal-architecture`:

```
src/back-end/<module>/
├── domain/              # Entities, value objects, domain logic
│                        # ⚠️ ZERO dependencies on other layers
├── application/         # Use cases, repository interfaces (ports)
│                        # ✅ Can import: domain only
├── infrastructure/      # Repository implementations, external services
│                        # ✅ Can import: application, domain
└── presentation/        # Controllers (used by API routes)
                         # ✅ Can import: application, infrastructure, domain
```

**Modules**: `absences`, `auth`, `employee`, `time-tracking`, `common`

**Violation Example**: If domain imports from infrastructure → ESLint error `hexagonal-architecture/enforce`

### Dependency Injection with DIContainer

All modules now use Prisma with PostgreSQL exclusively. Repositories are managed through a centralized Dependency Injection container (`DIContainer`) that ensures single instances of PrismaClient and repositories.

```typescript
// src/back-end/common/infrastructure/di-container.ts
export class DIContainer {
  static getPrismaClient(): PrismaClient { /* singleton */ }
  static getAbsencesRepository(): AbsencesRepository { /* singleton */ }
  static getAuthRepository(): AuthRepository { /* singleton */ }
  static getEmployeeRepository(): EmployeeRepository { /* singleton */ }
  static getTimeTracksRepository(): TimeTracksRepository { /* singleton */ }
  static getProjectsRepository(): ProjectsRepository { /* singleton */ }
}
```

**Key Environment Variables** (set in `.env.local`):

- `DATABASE_URL` - PostgreSQL connection string (REQUIRED)
- `NEXTAUTH_SECRET` - NextAuth secret key (REQUIRED)
- `NEXTAUTH_URL` - Base URL for NextAuth (REQUIRED)

**Note**: Google Sheets and Notion integrations are kept for future import/export functionality but are not used as primary data sources.

### Next.js App Router Structure

```
src/
├── app/
│   ├── api/                    # API Routes (Next.js 13 route handlers)
│   │   └── absences/route.ts   # GET/POST handlers
│   ├── [locale]/               # i18n pages (en/es)
│   └── i18n/                   # i18next configuration
├── back-end/                   # Backend business logic (Hexagonal)
└── front-end/                  # React components by feature
    ├── employee-absences/
    ├── employee-time-tracking/
    └── common/
```

### API Routes Pattern

API routes use the DIContainer to get repository instances:

```typescript
// src/app/api/absences/route.ts
import { DIContainer } from '@/back-end/common/infrastructure/di-container';

async function POST(request: Request) {
  return await withProtectedBySession(async (employeeEmail: string) => {
    const controller = new PostAbsenceController(
      new CreateAbsence(DIContainer.getAbsencesRepository())
    );
    return await controller.execute(request);
  });
}
```

### Path Aliases

TypeScript and Vitest support these aliases (configured in `tsconfig.json` and `vitest.config.ts`):

```typescript
import { ... } from '@/...'           // src/
import { ... } from '@backend/...'    // src/back-end/ (Vitest only)
import { ... } from '@frontend/...'   // src/front-end/ (Vitest only)
```

## Testing Strategy

### Test File Naming Convention

The project uses a strict naming convention to separate unit and integration tests:

- **Unit tests**: `*.test.ts` - Fast tests with no external dependencies (use mocks when needed)
- **Integration tests**: `*.integration.test.ts` - Tests that connect to real external services (PostgreSQL, Google Sheets, Notion)

**Important**:

- Unit tests (`npm test`) explicitly exclude `*.integration.test.ts` files
- Integration tests (`npm run test:with-integration`) run ONLY `*.integration.test.ts` files
- When creating tests that connect to external services (PostgreSQL, Google Sheets, Notion), always use `.integration.test.ts` extension

### Test Isolation

Integration tests use Testcontainers to spin up PostgreSQL in Docker. Configuration is in `vitest.config.integration.ts`.

**Examples**:

- ✅ `*.prisma.repository.integration.test.ts` - Connects to PostgreSQL via Prisma
- ✅ `google-sheet.integration.test.ts` - Connects to Google Sheets API
- ✅ `notion.integration.test.ts` - Connects to Notion API

### Authentication in Tests

**Development Login** (for local development and E2E tests):

- Email: `dacil@leanmind.es`, `claudia@leanmind.es`, `susan@leanmind.es`
- Password: any value (credentials provider validates against Prisma in development mode)

### E2E Tests

Located in `e2e/`. Use Playwright with the following commands:

- `npm run test:e2e` - Headless execution
- `npm run test:e2e:debug` - UI mode (recommended for development)
- `npm run test:e2e:trace` - With trace files

## Git Hooks

The project uses Husky to manage Git hooks and ensure code quality before commits.

### Pre-commit Hook

Automatically runs before each commit:
- Formats staged files using Prettier via `lint-staged`
- Only processes code files (`.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.css`, `.scss`)
- Markdown files (`.md`) and other documentation are excluded

**Bypassing hooks** (use sparingly):
```bash
git commit --no-verify -m "commit message"
```

**Configuration**:
- Hook script: `.husky/pre-commit`
- lint-staged config: `package.json` → `lint-staged` section
- Prettier ignore rules: `.prettierignore`

### Pre-push Hook

Automatically runs before each push:
- Executes `npm run build` to ensure the project builds successfully
- Aborts push if build fails
- Prevents pushing broken code to remote repository

**Bypassing hooks** (use sparingly):
```bash
git push --no-verify
```

**Configuration**:
- Hook script: `.husky/pre-push`

## Automatic Versioning and Changelog

The project uses automatic semantic versioning with changelog generation based on conventional commits.

### How It Works

When code is pushed to `main`, the GitHub Actions CI/CD workflow automatically:
1. Analyzes commit messages since last version tag
2. Determines version bump type (major/minor/patch)
3. Updates `package.json` version
4. Generates `CHANGELOG.md` entry from commit messages
5. Creates git tag for the new version
6. Commits and pushes changes back to repository (with `[skip ci]` to avoid loops)
7. Includes the generated files in the Docker build

**Note**:
- Version bumping happens in CI/CD during deployment, not locally
- The workflow commits version changes back to the repository automatically
- Commits are marked with `[skip ci]` to prevent infinite CI loops
- The repository always reflects the current deployed version

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]
```

**Types that trigger version bumps:**
- `feat:` → Minor version bump (new features)
- `fix:` → Patch version bump (bug fixes)
- `feat!:` or `fix!:` → Major version bump (breaking changes)

**Other types** (no version bump):
- `docs:` → Documentation changes
- `style:` → Code style changes
- `refactor:` → Code refactoring
- `perf:` → Performance improvements
- `test:` → Test changes
- `chore:` → Build/tooling changes

**Examples:**
```bash
feat: add changelog system
feat(auth): implement OAuth login
fix: correct version display in header
fix(api)!: change response format  # Breaking change
```

### Changelog Generation

The changelog is automatically generated from commit messages:
- **Added** section: `feat:` commits
- **Fixed** section: `fix:` commits
- **Changed** section: `refactor:`, `chore:`, `style:` commits
- **Performance** section: `perf:` commits
- **Documentation** section: `docs:` commits

Commit messages are automatically:
- Capitalized
- Grouped by type
- Formatted with scope in bold if provided

**Example output:**
```markdown
## [1.2.0] - 2025-11-10

### Added

- Add changelog system
- **auth**: Implement OAuth login

### Fixed

- Correct version display in header
```

### Manual Changelog Editing

You can manually edit `CHANGELOG.md` to add more context or reorganize entries. The automatic system will insert new versions at line 7 (after the header).

### Viewing the Changelog

Users can view the changelog:
- From the Changelog card on the home page (click to open modal)
- Via the `/api/changelog` endpoint
- Directly in `CHANGELOG.md` file

## Contribution Workflow

Before contributing, read `docs/DEVELOPMENT.md`. Key requirements:

1. **Scenario First**: Create scenarios in [Example Mapping (Notion)](https://www.notion.so/Example-Mapping-3cc53fa048b24af8802d682e92757401) before coding
2. **GitHub Task**: Create task on [GitHub Board](https://github.com/orgs/lean-mind/projects/3/views/1)
3. **Branch**: `feature/<task-id>-<task-name>` from `main`
4. **E2E Tests Mandatory**: PRs without E2E tests for new features will be rejected
5. **TDD**: **IS VERY IMPORTANT** Write tests first
6. **Documentation**: Add new technical concepts to `docs/SELF.md`
7. **Pair Validation**: Consult team before design decisions

**PR Requirements**:

- Title: `#<task-id> <task-name>`
- E2E tests for scenarios
- Unit tests for new functionality
- No hexagonal architecture violations (ESLint will catch)

**Commit Message Requirements**:

- **IMPORTANT**: DO NOT add any Claude Code attribution, co-author tags, or "Generated with Claude Code" messages to commits
- Use [Conventional Commits](https://www.conventionalcommits.org/) format for automatic versioning
- For all other commit message requirements, see `.claude/commands/git-commit.md`

### GitHub Issue Creation Guidelines

When creating new GitHub issues, consider the impact on automatic versioning:

**For features that should bump versions:**
- Use labels that align with commit types: `enhancement` (feat), `bug` (fix)
- In the issue description, specify the expected version impact:
    - **PATCH** (e.g., 1.2.3 → 1.2.4): Bug fixes only
    - **MINOR** (e.g., 1.2.3 → 1.3.0): New features, backwards compatible
    - **MAJOR** (e.g., 1.2.3 → 2.0.0): Breaking changes

**Commit message planning in issues:**
- Include example commit messages in acceptance criteria
- Example: "When implementing, use commit format: `feat(auth): add OAuth login`"
- Remind to use `!` suffix for breaking changes: `feat!:` or `fix!:`

**Issue templates should include:**
```markdown
## Version Impact
- [ ] PATCH - Bug fix only
- [ ] MINOR - New feature (backwards compatible)
- [ ] MAJOR - Breaking change

## Expected Commit Format
feat(scope): description
```

This ensures the automatic versioning system generates accurate changelogs when the PR is merged.

## Key Documentation Files

- `docs/SELF.md` - Technical references (NextAuth, Prisma, Testing)
- `docs/DOMAIN.md` - Business domain concepts
- `docs/DEVELOPMENT.md` - Contribution workflow
- `docs/E2E.md` - Playwright testing guide
- `.env.local.example` - Required environment variables template

## Common Pitfalls

1. **Hexagonal Architecture Violations**: Domain importing from infrastructure/application → ESLint error. Review layer boundaries.
2. **Missing Environment Variables**: Ensure `.env.local` has `NEXTAUTH_SECRET` (min 32 chars), `NEXTAUTH_URL`, and `DATABASE_URL`.
3. **Integration Test Failures**: PostgreSQL must be running (`npm run database:up`) before `npm run test:with-integration`.
4. **Database Migrations**: Remember to run `npx prisma migrate dev` after pulling changes that modify the database schema.
5. **DIContainer Usage**: All repositories should be obtained through `DIContainer` to ensure singleton PrismaClient instances.

## File Naming Conventions

The project follows these TypeScript/React naming conventions for files:

### PascalCase (ComponentName.tsx, ClassName.ts)
Used for files that export classes or React components:
- **React Components**: `TimeTrackingContainer.tsx`, `AbsenceRequestForm.tsx`
- **Use Cases (classes)**: `CreateAbsence.ts`, `FindAllEmployees.ts`
- **Domain Entities (classes)**: `TimeTrack.ts`, `ProjectOption.ts`, `EmployeeWorkingHours.ts`
- **Value Objects (classes)**: `MonthYear.ts`, `PeriodOfTracking.ts`

### kebab-case or dot notation (file-name.ts, file.name.ts)
Used for infrastructure, utilities, and configuration files:
- **Repositories**: `absences.repository.ts`, `absences.rest-api.repository.ts`, `time-tracks.prisma.repository.ts` (dot notation allowed)
- **Clients**: `time-tracks.client.ts`, `employee.client.ts` (dot notation allowed)
- **Utilities**: `format-date.ts`, `http-client.ts`
- **Configuration**: `di-container.ts`, `api-config.ts`
- **Simple domain types**: `request-for-absence.ts`, `absence.ts`

### camelCase (fileName.ts)
Used for React hooks:
- **Custom Hooks**: `useWorkingHours.ts`, `useData.ts`, `useIsMounted.ts`

### Test Files
- **Unit tests**: Match the source file with `.test.ts` suffix: `TimeTrack.test.ts`, `time-tracks-client.test.ts`
- **Integration tests**: Match the source file with `.integration.test.ts` suffix: `time-tracks-prisma-repository.integration.test.ts`

**Rationale**: This convention provides clear visual distinction between different types of files and aligns with TypeScript/React ecosystem standards.

## Internationalization

Uses i18next with Next.js 13 App Router. Translations in `src/app/i18n/locales/[locale]/*.json`. Supported locales: `en`, `es`.

## Custom Agents

The project includes specialized Claude Code agents in `.claude/agents/`:

- **architecture-guardian** - Validates hexagonal architecture compliance and dependency rules
- **clean-code-reviewer** - Reviews code quality, naming conventions, and clean code principles
- **documentation-keeper** - Ensures documentation stays updated with code changes
- **e2e-scenario-mapper** - Assists with creating E2E test scenarios from Example Mapping
- **tdd-companion** - Guides TDD workflow (red-green-refactor cycle)

## Workflow

The backlog project URL is https://github.com/orgs/lean-mind/projects/3

### 1. Task Clarification

Once I tell you the task I want you to do:

1. If you have **any kind of doubts**, ask me **before starting** so you can do it correctly.
2. If the task involves **multiple-choice questions**, present them in an **interactive way**, allowing me to select the correct option.
3. The **last response** in the flow should allow me to **write freely** any comment or answer.

### 2. Confirmation and Kickoff

Once everything is clear, you say **"Vamos niño!!!"** and start working.

### 3. Branch Setup

The first thing you need to do:

- Update your local branch with `main`
- Create a new branch with the task number and name
- Format: `feature/12-task-name`
- Make all changes there

### 4. Assignment on GitHub

You must **assign the task to me** on GitHub, so there’s a record that I’m the one who gave it to you.

### 5. Move to "In Progress"

Once assigned, move the task to **"In Progress"** on the GitHub Projects board before starting it.

### 6. Progress File (WIP.md)

When you start the task:

- Create a temporary file called `WIP.md`
- Write down what you plan to do and your current progress
- **REMEMBER** Each time you complete a step, update the file WIP.md and mark it as done
- **Purpose**: If you lose your token or connection, you won’t lose your progress
- Once everything is finished and committed, **delete that temporary file**

### 7. Research and Questions

- If you have any doubts during development, **feel free to search online**
- There’s plenty of information on the web
- If you can’t find an answer, ask me

### 8. Testing

- For new functionalities, **you must write tests**
- If possible, follow the **TDD (Test-Driven Development)** cycle
- That way, you ensure everything works properly

### 9. Best Practices

Remember to follow software development best practices:

- ✅ TDD (Test-Driven Development)
- ✅ Complete test coverage
- ✅ Hexagonal architecture
- ✅ Use Value Objects
- ✅ Domain-agnostic logic
- ✅ Everything that comes with good software design

**Documentation**: Everything is documented in the project's `.md` files — **always review them**.

#### Code Comments Philosophy

**IMPORTANT**: Avoid redundant comments in code. Instead, write semantic, self-documenting code with clear names.

**❌ Don't do this:**
```typescript
// Create a new date with the year, month and day
const date = new Date(year, month - 1, day);

// Check if the date is today
function isToday(date: Date): boolean {
  // Return true if it's today
  return date.getDate() === today.getDate();
}
```

**✅ Do this instead:**
```typescript
const date = new Date(year, month - 1, day);

function isToday(date: Date): boolean {
  return date.getDate() === today.getDate();
}

// Or if truly needed, explain WHY, not WHAT:
function getDaysInMonth(month: number, year: number): Date[] {
  // Month is 0-indexed in JavaScript Date API
  const firstDay = new Date(year, month - 1, 1);
  return days;
}
```

**Guidelines:**
- Use descriptive variable names: `userAuthenticationToken` instead of `token // for user auth`
- Use descriptive function names: `calculateTotalPriceWithTax()` instead of `calculate() // gets total with tax`
- Use descriptive test names: `should display events in year view` instead of `test1 // checks year events`
- Use descriptive class names: `UserAuthenticationService` instead of `Service // handles user auth`
- Only add comments to explain **WHY** something is done, not **WHAT** is being done
- Remove commented-out code (use git history instead)
- Comments explaining business rules or complex algorithms are acceptable

### 10. Pre-Commit Review

When you finish the task, **before making any commit**:

1. **Run the build** to ensure the project compiles correctly:
   ```bash
   npm run build
   ```
    - The build must complete successfully without errors

2. **Run all tests** to ensure everything passes:
   ```bash
   npm test                      # Unit tests must pass
   npm run test:with-integration # Integration tests must pass (if applicable)
   ```
    - All tests must be green ✅
    - No failing tests allowed ❌

3. **Once build and tests are passing**, notify me so I can review what you're about to commit.

### 11. Commit and Pull Request

Once I give you the OK:

- Make the commit and push to your branch
- Create a pull request
- **Do everything as if you were me**
- **NEVER mention yourself as co-author** or anything similar. That is not done.