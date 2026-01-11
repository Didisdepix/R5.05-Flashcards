# API

General notes:
- Protected routes require a Bearer token in the `Authorization: Bearer <token>` header (middleware `authenticateToken`).
- Validation schemas live in `src/models` and are enforced by `validateBody` / `validateParams`.

Auth
----

- **POST /auth/register**
  - Purpose: Create a new user (register).
  - Auth: Public.
  - Body (JSON): `email` (email), `name` (string), `surname` (string), `password` (string, ≥8), `isAdmin` (integer, optional).

- **POST /auth/login**
  - Purpose: Authenticate a user (returns JWT).
  - Auth: Public.
  - Body (JSON): `email`, `password`.

- **GET /auth/**
  - Purpose: Get current authenticated user's basic profile.
  - Auth: Authenticated (Bearer JWT).
  - Inputs: none (token in `Authorization` header).

Users
-----

- **GET /users/**
  - Purpose: List all users.
  - Auth: Authenticated — admin required (checked server-side).
  - Inputs: none.

- **GET /users/:id**
  - Purpose: Get a user by id.
  - Auth: Authenticated — admin required.
  - Route params: `id` (UUID).

- **DELETE /users/:id**
  - Purpose: Delete a user by id.
  - Auth: Authenticated — admin required.
  - Route params: `id` (UUID).

Collections
-----------

- **GET /collections/**
  - Purpose: Retrieve collections owned by the current user.
  - Auth: Authenticated.
  - Inputs: none.

- **POST /collections/**
  - Purpose: Create a collection.
  - Auth: Authenticated.
  - Body (JSON): `title` (string), `description` (string, optional), `isPublic` (integer, 0/1).

- **GET /collections/research**
  - Purpose: Search public collections by title (implemented as GET but expects JSON body).
  - Auth: Authenticated.
  - Body (JSON): `title` (string).

- **GET /collections/:id**
  - Purpose: Get a collection by id.
  - Auth: Authenticated — allowed if collection is public or if requester is owner/admin.
  - Route params: `id` (UUID).

- **PATCH /collections/:id**
  - Purpose: Modify a collection (title, description, visibility).
  - Auth: Authenticated — owner required (checked server-side).
  - Route params: `id` (UUID).
  - Body (JSON): `title` (string, optional), `description` (string, optional), `isPublic` (integer, optional).

- **DELETE /collections/:id**
  - Purpose: Delete a collection.
  - Auth: Authenticated — owner required (checked server-side).
  - Route params: `id` (UUID).

Flashcards (nested under collections)
-----------------------------------

All flashcard routes are mounted under `/collections/:collectionId` and use `mergeParams`.

- **GET /collections/:collectionId/flashcards**
  - Purpose: Retrieve all flashcards for a collection.
  - Auth: Authenticated — allowed if collection is public or if requester is owner/admin.
  - Route params: `collectionId` (UUID).

- **GET /collections/:collectionId/revision**
  - Purpose: Retrieve flashcards due for revision for the authenticated user within the collection.
  - Auth: Authenticated — owner or admin required for private collections.
  - Route params: `collectionId` (UUID).


