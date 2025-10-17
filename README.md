# vaultcms

Relevant documents, provided upront:
- [HighLevelChecklist](https://drive.google.com/file/d/1lTqhNTgOhpvyIV5HtxBWF-LEuCOzoxVo/view?usp=sharing)
- [ImplementationSequencing](https://drive.google.com/file/d/1zSzeMPfHPpznXheakUHY0xR-L1WhCMck/view?usp=sharing)
- [VisualAndDatabaseGrokking](https://drive.google.com/file/d/1FT3mCQjZpKxfkw1gZG0IQXOOKrMT-Mc-/view?usp=sharing)
- [ComponentArchitecture](https://drive.google.com/file/d/10-DH7UDjq8f9-lZNtvCJI6AwMwbnIxw4/view?usp=sharing)

Thanks you for your time and consideration! I would _love_ to chat through all of the work that was done here, the work that wasn't done, and provide some motivations on the decisions I made during this exercise. I have set up this repo as a typical Typescript monorepo using the typical frontend dev tooling:

- [NPM Workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces): Monorepo package orchestration
- [Vite](https://vite.dev/): Dev servers and bundling
- [Eslint](https://eslint.org/): Linting
- [Prettier](https://prettier.io/): Opinionated formatting
- [Express](https://expressjs.com/): Backend dev services
- [Jest](https://jestjs.io/): Testing framework

Using a monorepo structure, I included several nice-to-haves for the dev workflow, front, + backend:

### Dev Workflow
- Package orchestration via NPM workspaces (linting, building, running, etc)
- @vault/core package to share code between frontend + backend. Note that only typedefs are currently shared
  - Also note that the @vault/core dependency is a zero-build dependency to maximize dev velocity

### Frontend
- Application-level fetch caching via [RTK Query](https://redux-toolkit.js.org/tutorials/rtk-query)
- [Jest](https://jestjs.io/) unit testing scaffolding (no time to implement a usecase, but provided a template util function w/tests)
- Scalable global state management via [Redux Toolkit](https://redux-toolkit.js.org/)

### Backend
- Data validation at the API layer
- In-memory object store (minimal for the sake of this exercise)

## Install and Run
Given 30 more minutes, I'd love to dockerize these services. For the time being, make sure you have node@18+. To install and run:

```
git clone https://github.com/aolsenjazz/vaultcms
cd vaultcms
npm ci
npm run start
```
This will start up both front and backend dev services via [concurrently](https://www.npmjs.com/package/concurrently)

# Checkpoints
- [Backend working](https://github.com/aolsenjazz/vaultcms/commit/6058b6384a97592a0376c4d6e0b3bbaed400689a)
- [Backend tested w/validation](https://github.com/aolsenjazz/vaultcms/commit/ad6a790c1c01f6c7d6e335940b6d1f2563594687) (though a couple small changes are made later)
- [Running Frontend w/ Core systems](https://github.com/aolsenjazz/vaultcms/commit/878c996513718d580a1fb52c5983716ba1ca75ce)
- [Final commit](https://github.com/aolsenjazz/vaultcms/commit/ebab2fabe3053ae153f61acc9618b8211294465e) (being over time, I was _not_ considerate with commits at this point)

# Explanation
I wanted to achieve two things with this exercise:
- Complete the requirements as laid out
- Demonstrate intimate knowledge of frontend/js systems

### Implementation - Core
For the sake of demonstrating fluency with monorepo architecture, I wanted to include a core package. Bullet points:
- Zero-build. Updates to the core package are immediately relected in parent packages
- Only types. Sharing types between front and backend were justified, no time for anything else
- Normally I would share services, util functions, etc
  - While carefully avoiding turning it into a "god package!"

### Implementation - Frontend
I used a typical React@18/Redux stack. Redux _definitely_ was not required given that this was a trivial example project, but I wanted to demonstrate fluency with Redux.
- State Management
  - API Responses are cached in the global RTKQ cache, allowing for reuse for fetch hooks
  - User data is managed "globally" (not really, strictly semantically speaking) via `useState` in `App.tsx`
  - Child components consume state from the global state manager (`App.tsx`) in this case
- Network
  - I used RTKQ to handle network requests. Use of Redux generally is overkill for this, but I wanted to demonstrate my experience with scalable systems.
- UI
  - This is a typical React application in just about every way
  - This is truly some of the worst React I have ever written in my professional life because of time constraints
    - Though necessary to meet an aggressive timeline!

### Implementation - Backend
Absolute minimum required to implement a backend with in-memory store
- Data store
  - Uses an in-memory store. If extra time, I would consider firing up a mysql/postgres DB
- Express API layer
  - I chose not to use graphql because I can write a standard REST API pretty quickly
  - Includes mostly-complete validation - ran out of time w.r.t. validation for POST /users/:userId/auths

# Tools Used
- Chatgpt
  - I need to add a comment here - when starting this exercise, I didn't see a realistic path to achieving everything + documentation + deliverables etc in a _earnest_ two hours. Case in point - I'm about an hour into writing this readme. As such, I relied _much more_ on LLMs writing code than I _ever_ would in practice. Having now completed it - I truly don't see a way to meet the goals presented, demonstrate intimate knowledge, and generate meaningful documentation/reporting in the alotted timeframe without.
- [draw.io](https://app.diagrams.net/)
- Google drive
- Template React project that I maintain for quick bootstrapping
- Ikigai monorepo - I just migrated our polyrepo to a monorepo structure
- Pen and paper :)
  
# Technologies/Frameworks Used
There are lots of smaller/related deps in use - but these are the important ones:
- React@18
- Redux Toolkit
- RTK Query
- Express
- Vite
- Eslint
- NPM Workspaces
- Prettier
- Jest

# Architecture Diagram
See ComponentArchitecture image at the top of this README.

# Alternatives
If I was starting a greenfield project, here's what I would reconsider:
- For a small application, Redux is overkill. Realistically, I would use either [react-query](https://www.npmjs.com/package/@tanstack/react-query) or potentially just write a plain [axios](https://axios-http.com/docs/intro) service layer.
- If we needed server side rendering, I would use [NextJS](https://nextjs.org/)
- The most modern, flashy tooling nowadays tends to be [Tanstack](https://tanstack.com/). I would consider it if it better met our needs (related to react-query).

# 8 More Hours

### Fixes for baseline deliverables
- Fix the terrifying React I wrote
- Fix the input width
- Add better state handling for the adding-auths input
- Add data validation to the `/users/:userId/auths` endpoint
- Update styling, being much more deliberate

### Clean/set up core systems
- Relax eslint rules
- Dockerize these services
- Set up test and build github actions
- Remove unneeded endpoints in the API
- General (and truly extensive) frontend code cleanup
