# monorepo-starter

TypeScript monorepo starter with a React frontend and Express backend.

## Stack

- [pnpm workspaces](https://pnpm.io/workspaces) — monorepo package orchestration
- [Vite](https://vite.dev/) — dev server and bundling
- [Redux Toolkit](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/tutorials/rtk-query) — state management and data fetching
- [Express](https://expressjs.com/) — backend
- [Jest](https://jestjs.io/) — testing
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — linting and formatting

## Packages

| Package | Description |
|---|---|
| `web` | React 18 frontend (Vite, Redux Toolkit, RTK Query) |
| `backend` | Express API server |
| `core` | Shared TypeScript types (zero-build) |

## Getting Started

```bash
pnpm install
pnpm start
```

This starts both the frontend (port 3000) and backend (port 3001) via [concurrently](https://www.npmjs.com/package/concurrently).

## Scripts

| Command | Description |
|---|---|
| `pnpm start` | Start frontend and backend dev servers |
| `pnpm build` | Build the frontend for production |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint all packages |
| `pnpm tsc` | Type-check all packages |
