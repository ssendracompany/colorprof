# AGENTS.md

This file provides guidance to AI Agents when working with code in this repository.

> 📖 **IMPORTANT**: Before starting any work, read `PROJECT_CONTEXT.md` for a complete overview of the project structure, architecture, migration strategy, and current state. This will save tokens and provide essential context.

## Project Overview

LeanTrack is a time tracking application built with Next.js 13 (App Router), TypeScript, and React. The application follows **Hexagonal Architecture** principles with strict enforcement via ESLint rules.

## Architecture

### Directory Structure

- **`src/back-end/`**: Backend business logic organized by domain modules (auth, employee, time-tracking, absences)
  - Each module follows hexagonal architecture: `domain/`, `application/`, `infrastructure/`
  - Domain layer contains entities and business rules
  - Application layer contains ports (repository interfaces)
  - Infrastructure layer contains adapters (repository implementations)
- **`src/front-end/`**: React components organized by feature (employee-absences, employee-time-tracking, etc.)
- **`src/app/`**: Next.js 13 App Router structure
  - `api/`: API route handlers
  - `[locale]/`: Internationalized pages
  - `i18n/`: Internationalization configuration
- **`test-extensions/`**: Testing setup and utilities

### Hexagonal Architecture Enforcement

The codebase uses `eslint-plugin-hexagonal-architecture` to enforce architecture rules in the `src/back-end/` directory. The plugin prevents:

- Infrastructure code from being imported into domain layer
- Violation of dependency rules between layers

### Repository Pattern

All data access uses the Repository pattern with adapter factories:

- Repository interfaces defined in `application/` layer (e.g., `time-tracks.repository.ts`)
- Factory classes create instances based on environment variables (e.g., `TimeTracksRepositoryFactory`)
- Supported adapters: `memory` (in-memory), `mongodb`, `notion` (for projects), `google-sheets`
- Factories use global singleton pattern to maintain single instances

### Configuration via Environment Variables

Adapters are selected via environment variables:

- `AUTH_ADAPTER_TYPE`: Authentication repository type
- `EMPLOYEE_ADAPTER_TYPE`: Employee repository type
- `TIME_TRACKS_ADAPTER_TYPE`: Time tracking repository type
- `PROJECTS_ADAPTER_TYPE`: Projects repository type

Supported values: `memory`, `mongodb`, `notion`, `google-sheets` (depending on adapter)

### Internationalization

The app uses i18next with locale-based routing:

- Middleware handles locale detection and URL rewriting
- Default locale (`en`) URLs are rewritten (e.g., `/en/about` → `/about`)
- Supported locales configured in `src/app/i18n/settings.ts`

## Development Commands

### Running the Application

```bash
npm run dev              # Start development server (port 3000)
npm run build            # Build for production
npm start                # Start production server (uses $PORT env var)
```

### Testing

```bash
npm test                        # Run unit tests (vitest, memory adapters only)
npm run test:watch              # Run tests in watch mode
npm run test:with-integration   # Run tests including integration tests (requires MongoDB)
npm run test:coverage           # Run tests with coverage report
```

**Important**: Integration tests require the local MongoDB database to be running.

### Database

```bash
npm run database:up      # Start local MongoDB via docker-compose
npm run database:down    # Stop local MongoDB
```

Local database is configured by `docker-compose.yml` and `docker/mongo-database/mongo-init.js`.

### Linting

```bash
npm run lint             # Run ESLint (includes hexagonal architecture rules)
```

### Mock Server

```bash
npm run start:json-server    # Start json-server on port 4000 (uses db.json)
```

## Testing Philosophy

- Unit tests use in-memory repositories (`IS_INTEGRATION=false`)
- Integration tests use real MongoDB (`IS_INTEGRATION=true`)
- Test configuration: `vitest.config.ts` (unit), `vitest.config.integration.ts` (integration)

## Path Aliases

TypeScript and Vitest use these aliases:

- `@/*` → `src/*`
- `@backend/*` → `src/back-end/*`
- `@frontend/*` → `src/front-end/*`
- `@lib/*` → `src/lib/*` (defined in tsconfig but lib directory doesn't exist)

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

## Contribution Workflow

From `docs/DEVELOPMENT.md`:

- Check Example Mapping scenarios before starting work
- Create tasks on GitHub Board linked to scenarios
- Branch naming: `feature/<task-id>-<task-name>`
- PR title format: `#<task-id> <description>`
- New functionality requires unit tests
- New libraries/concepts require documentation in `docs/SELF.md`
- Pair validation recommended for design decisions

## Requirements

- Node.js >=18.0.0
- npm >=9.5.1
- MongoDB (for integration tests and production)

## 💻 Development Principles & Conventions

### Test-Driven Development (TDD)

**MANDATORY:** When implementing new flows or features, follow the TDD cycle:

1. ✍️ Write a failing test first (Red)
2. ✅ Write minimal code to make it pass (Green)
3. ♻️ Refactor while keeping tests green (Refactor)

### Code Quality Standards

Follow these guidelines in order of priority:

1. **Carlos Blé's Sustainable Code** principles
2. **Clean Code** by Robert C. Martin

**Key Principles:**

- Human-friendly code: clear names, easy to understand
- Prefer functional programming for object mappings when it improves clarity
- Small, focused functions with single responsibility
- Explicit over implicit
- Domain language in code (ubiquitous language)

#### Code Comments Philosophy

**IMPORTANT**: Avoid redundant comments. Write semantic, self-documenting code with clear names instead.

**❌ Avoid:**
```typescript
// Loop through all users
users.forEach(user => {
  // Check if user is active
  if (user.active) {
    // Send notification
    sendNotification(user);
  }
});
```

**✅ Prefer:**
```typescript
const activeUsers = users.filter(user => user.isActive);
activeUsers.forEach(sendNotificationTo);

// Or if context is truly needed, explain WHY:
// Using legacy API until migration to v2 is complete (ticket #123)
const response = await legacyApi.fetch(userId);
```

**Guidelines:**
- Descriptive names over comments: `userAuthenticationToken` not `token // for auth`
- Descriptive functions: `calculateTotalWithTax()` not `calc() // total + tax`
- Descriptive tests: `should return empty array when no events match date` not `test1`
- Only comment **WHY**, not **WHAT**
- Remove dead code (trust git history)
- Business rules and complex algorithms may justify comments

### Testing Strategy

**Test Pyramid:**

- 🔹 **Many unit tests**: Fast, isolated, testing business logic
- 🔸 **Integration tests**: Testing component integration (DB, external services)
- 🔷 **Acceptance tests**: Testing complete use cases

### Code Language

- **All code, tests, comments, and documentation**: English
- **Communication with team members**: Spanish

### Documentation & Commits

- **Documentation**: When creating new processes or fixing bugs, create appropriate documentation in `docs/` folder when convenient
- **README Updates**: Link new documentation to the main `README.md` when necessary
- **Commit Messages**: After each major change, provide:
  - Commit title with GitMoji prefix (in English)
  - Detailed description of changes (in English)
  - NO Claude mentions
  - NO mentions Co-Authored-By

---

**Remember:**

- Always follow TDD when implementing new features
- Keep architecture boundaries clear (hexagonal architecture)
- Write human-friendly, sustainable code
- Test thoroughly at multiple levels

## RULES

- NEVER write code without concrete functionality
- NEVER implement without failing tests, never skip test
- NEVER mention Claude in commits
- ALWAYS apply ESLint + Prettier
