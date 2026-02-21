# Express Server (PERN)

This is a TypeScript-based Express server that renders React on the server, with shared modules used by both the client and server. It includes API routing, SSR entry points, linting, testing, and error handling.

## Overview

This project combines a TypeScript + Express backend with a Vite-powered React frontend and SSR. Shared code (types, API clients, Redux, routing helpers, and schema validation) lives in `app/shared` and is used by both sides.

## Features

- TypeScript for type safety across server and client
- Server-rendered React (Vite + Express SSR entry points)
- Shared modules for API clients, routing helpers, Redux, types, and schemas
- Environment variable configuration with `dotenv`
- Structured logging with Winston, error handling, and graceful shutdown
- Linting with ESLint + Prettier, testing with Vitest + Supertest
- Drizzle ORM with PostgreSQL for schema management and migrations

## Project Structure

```
express-server/
├── app/
│   ├── client/             # Vite React app + SSR entry points
│   │   ├── dist/
│   │   ├── public/
│   │   ├── src/
│   │   ├── entry-client.tsx
│   │   ├── entry-server.tsx
│   │   ├── index.css
│   │   ├── index.html
│   │   └── tsconfig.json
│   ├── server/             # Express server source + build output
│   │   ├── dist/
│   │   ├── src/
│   │   │   ├── bin/         # Server startup entry
│   │   │   ├── controllers/
│   │   │   ├── database/    # Drizzle setup (schema, migrations, seeds)
│   │   │   ├── lib/         # Utilities (logger, server helpers)
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   └── app.ts
│   ├── shared/             # Shared client/server modules
│   │   ├── axios/
│   │   ├── reactRouter/
│   │   ├── redux/
│   │   ├── types/
│   │   ├── websockets/
│   │   └── zod/
│   └── tsconfig.json        # Shared TS config references
├── logs/                   # Log output directory
├── tests/                  # Vitest test files
├── .env                    # Local environment variables (not committed)
├── example.env             # Example `.env` file
├── eslint.config.mjs       # ESLint configuration (ES module format)
├── openapi.json            # OpenAPI spec
├── package.json            # Project metadata, scripts, dependencies
├── README.md               # Project documentation
└── vite.config.ts          # Vite configuration
```

## Getting Started

### Prerequisites

- Node.js (v22.13.1 or higher)
- npm (11.1.0 or higher)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/BradleyParkerDev/express-server.git
    cd express-server
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Copy the example env file, then add AWS and port variables:**

    ```sh
    cp example.env .env
    ```

    ```env
    APP_NAME="express-server"
    APP_ENV="production"
    PORT=3001
    STREAM_HTML=true
    USE_NEON=false
    NEON_DATABASE_URL=postgresql://username:password@neonhost:5432/neon_db
    LOCAL_DATABASE_URL=postgresql://username:password@localhost:5432/local_db
    USE_AWS=true
    AWS_REGION=us-east-1
    AWS_ACCESS_KEY_ID=REPLACE_ACCESS_KEY
    AWS_SECRET_ACCESS_KEY=REPLACE_SECRET_KEY
    AWS_S3_BUCKET=REPLACE_BUCKET
    AWS_CLOUDFRONT_DOMAIN=https://REPLACE_CLOUDFRONT_DOMAIN
    VITE_PORT=4001
    API_URL=http://localhost:3001/api
    ```

4. **Build the project (client + server):**

    ```sh
    npm run build
    ```

5. **Run in dev mode:**

    ```sh
    npm run dev
    ```

6. **Run in production mode:**

    ```sh
    npm start
    ```

## Database (Drizzle + PostgreSQL)

Database code lives in `app/server/src/database` and includes:

- Drizzle schemas in `schemas/`
- Migration files in `migrations/`
- Unified DB setup in `db.ts`
- Migration and seed scripts in `migrate.ts` and `seed.ts`

### Common Database Tasks

1. **Generate migrations from schema changes:**

    ```sh
    npm run db:generate
    ```

2. **Run migrations:**

    ```sh
    npm run db:migrate
    ```

3. **Seed the database:**

    ```sh
    npm run db:seed
    ```

4. **Push schema changes (no migration files):**

    ```sh
    npm run db:push
    ```

5. **Open Drizzle Studio (optional UI):**

    ```sh
    npm run db:studio
    ```

## Available Scripts

| Script                 | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `npm run clean`        | Removes client/server build output and logs.                    |
| `npm run build`        | Builds client (Vite) and server (TypeScript) for production.    |
| `npm run start`        | Builds then starts the production server.                       |
| `npm run dev`          | Runs server + client dev processes concurrently.                |
| `npm run build:client` | Builds the Vite client bundle.                                  |
| `npm run dev:client`   | Runs the Vite dev server.                                       |
| `npm run build:server` | Builds the Express server (tsc + aliases).                      |
| `npm run dev:server`   | Watches server TypeScript and restarts via nodemon.             |
| `npm run lint`         | Lints all `.ts` and `.tsx` files with ESLint.                   |
| `npm run lint:fix`     | Runs the linter and auto-fixes issues.                          |
| `npm run test`         | Runs all unit tests once using Vitest.                          |
| `npm run test:watch`   | Runs Vitest in watch mode.                                      |
| `npm run format`       | Formats the codebase using Prettier.                            |
| `npm run db:generate`  | Generates a migration file from Drizzle schemas.                |
| `npm run db:migrate`   | Runs database migrations.                                       |
| `npm run db:seed`      | Seeds the database.                                             |
| `npm run db:push`      | Pushes schema changes directly to the database (no migrations). |
| `npm run db:studio`    | Opens Drizzle Studio for DB visualization.                      |

## Dependencies

- **@aws-sdk/client-s3**: AWS SDK client for S3 operations
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **@radix-ui/react-avatar**: Accessible avatar primitive
- **@radix-ui/react-label**: Accessible label primitive
- **@radix-ui/react-separator**: Separator primitive for layouts
- **@radix-ui/react-slot**: Slot component for composition
- **@radix-ui/react-switch**: Accessible switch/toggle primitive
- **@reduxjs/toolkit**: Batteries-included Redux utilities
- **@types/react-router**: TypeScript types for React Router
- **axios**: HTTP client for browser and Node
- **canvas-confetti**: Confetti animation effects
- **chalk**: Terminal string styling
- **class-variance-authority**: Variant-based className utility
- **clsx**: Conditional className helper
- **concurrently**: Run multiple commands in parallel
- **cookie-parser**: Parse cookies for Express
- **cors**: CORS middleware for Express
- **debug**: Small debugging utility
- **dotenv**: Load environment variables from `.env`
- **express**: Web framework for Node.js
- **http-errors**: HTTP error helpers for Express
- **lucide-react**: React icon library
- **multer**: Multipart/form-data handling for uploads
- **node-cron**: Cron scheduling for Node
- **nodemon**: Auto-restart server on file changes
- **openapi-typescript**: Generate TypeScript types from OpenAPI
- **react**: React library
- **react-dom**: React DOM renderer
- **react-hook-form**: Form state and validation
- **react-redux**: React bindings for Redux
- **react-router**: Routing core
- **react-router-dom**: DOM bindings for React Router
- **swagger-ui-express**: Serve Swagger UI in Express
- **tailwind-merge**: Merge Tailwind class names safely
- **tailwindcss-animate**: Tailwind animation utilities
- **tw-animate-css**: Utility for animation classes
- **winston**: Structured logging
- **zod**: Schema validation

## Dev Dependencies

- **@tailwindcss/vite**: Tailwind integration for Vite
- **@types/canvas-confetti**: Types for canvas-confetti
- **@types/cookie-parser**: Types for cookie-parser
- **@types/cors**: Types for CORS
- **@types/debug**: Types for debug
- **@types/express**: Types for Express
- **@types/multer**: Types for multer
- **@types/node**: Node.js type definitions
- **@types/react**: React type definitions
- **@types/react-dom**: React DOM type definitions
- **@types/react-router-dom**: Types for React Router DOM
- **@types/supertest**: Types for Supertest
- **@types/swagger-ui-express**: Types for swagger-ui-express
- **@typescript-eslint/eslint-plugin**: ESLint rules for TypeScript
- **@typescript-eslint/parser**: TypeScript parser for ESLint
- **@vitejs/plugin-react**: React plugin for Vite
- **cross-env**: Cross-platform env var setting
- **eslint**: Linting for JS/TS
- **eslint-config-prettier**: Disable conflicting ESLint rules
- **eslint-import-resolver-typescript**: Resolve TS paths in ESLint
- **eslint-plugin-import**: Linting for ES module imports
- **eslint-plugin-prettier**: Run Prettier as an ESLint rule
- **prettier**: Code formatter
- **prettier-plugin-tailwindcss**: Sort Tailwind classes
- **rimraf**: Cross-platform `rm -rf`
- **supertest**: HTTP testing helpers
- **tailwindcss**: Utility-first CSS framework
- **tsc-alias**: Rewrite TS path aliases in output
- **tsconfig-paths**: TS path resolution at runtime
- **typedoc**: API documentation generator
- **typescript**: TypeScript compiler
- **vite**: Frontend build tool (rolldown-based)
- **vitest**: Test runner

## Tooling

- TypeScript, ESLint, Prettier
- Vitest + Supertest
- Vite (client build + SSR)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or new features you would like to add.

## License

This project is open for personal and educational use. No specific license applies.
