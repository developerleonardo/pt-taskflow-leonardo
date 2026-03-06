# TaskFlow

TaskFlow is a modern To-Do manager built with Next.js, TypeScript, Zustand, Tailwind CSS v4, and shadcn/ui components.

It focuses on a smooth UX with:

- Fast task toggling via optimistic updates
- Server-backed CRUD using `dummyjson` API
- Clear separation between pending and completed tasks
- Search and pagination support

## Preview

- App name: `TaskFlow`
- Main page: two task lists (`To Do` and `Completed`)
- Includes: search, add task dialog, delete confirmation, loading skeletons, and toast feedback

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: Tailwind CSS v4 + shadcn/ui + Lucide icons
- State management: Zustand
- Notifications: Sonner
- API: `https://dummyjson.com`

## Getting Started

### 1. Prerequisites

- Node.js 20+
- pnpm (recommended)

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

This project reads the API base URL from `NEXT_PUBLIC_API_URL`.

`.env.example` already includes a default value:

```env
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

Create `.env.local` (if you do not already have one) and copy that value.

### 4. Start development server

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

- `pnpm dev`: start local dev server
- `pnpm build`: production build
- `pnpm start`: run production server
- `pnpm lint`: run ESLint

## Project Structure

```text
src/
	app/
		layout.tsx            # Root layout + toaster
		page.tsx              # Main page composition
	components/
		TodoInitializer.tsx   # Initial data fetch on mount
		CheckboxInTable.tsx   # Main list rendering and states
		AddToDoDialog.tsx     # Create todo UI
		ToDoItem.tsx          # Single todo row + delete action
		PaginationBar.tsx     # Pagination controls
		Searchbar.tsx         # Search query input + result count
	hooks/
		useTodos.ts           # Data orchestration + optimistic logic
	stores/
		todo.store.ts         # Global Zustand store
	lib/api/
		todos.api.ts          # API client functions
	types/
		index.ts              # Shared types
```

## How The App Works

### High-level flow

1. `TodoInitializer` triggers `fetchTodos(0)` on first render.
2. `useTodos` calls `getTodos(limit, skip)` from `todos.api.ts`.
3. Response is stored in Zustand (`todos`, `total`, `currentPage`, flags).
4. `CheckboxInTable` filters by search term and splits tasks into pending/completed.
5. `PaginationBar` requests a new page through `goToPage`.

### CRUD behavior

- Create:
  - `AddToDoDialog` calls `addTodo(todoText)`.
  - Success prepends the new todo in the local list.
  - New IDs are tracked in `localIds` so local-only todos can be handled safely.

- Toggle complete (optimistic):
  - UI updates immediately via `updateTodoLocal`.
  - If API call fails, state is reverted and error is shown.
  - For local-only todos, no remote PATCH is attempted.

- Delete:
  - If todo is local-only, delete happens instantly in local store.
  - Otherwise, API DELETE runs first, then local state is updated.

## Why Zustand (instead of `useState` or `useContext`)

### Why not only `useState`

`useState` works well for local component state, but this app has state shared across many components:

- task list data
- pagination metadata
- loading/error/fetch flags
- search query
- dialog state

Using only `useState` would force prop drilling or duplicated logic across `Header`, `CheckboxInTable`, `PaginationBar`, dialogs, and list items.

### Why not `useContext` alone

`useContext` can centralize state, but large context objects often cause broad re-renders when any value changes. With a frequently updated todo list, this can impact responsiveness.

### Why Zustand is a good fit here

Zustand provides:

- A simple global store with minimal boilerplate
- Fine-grained state selection per component
- Clear action-style updates (`addTodoLocal`, `updateTodoLocal`, `deleteTodoLocal`)
- Easy access to current state in async logic (`useToDoStore.getState()`)

In short, Zustand keeps shared state predictable and scalable without the reducer/provider overhead of a full context architecture.

## Why Optimistic Updates

Optimistic updates are used on task toggle to improve perceived performance.

### Benefits

- Immediate UI feedback when checking/unchecking tasks
- Less "waiting" feel during network calls
- Better interaction flow for high-frequency actions

### Safety in this implementation

- Original state is known (`currentCompleted`)
- On API failure, the UI is rolled back to previous value
- Error state is set so the user is informed

This gives the speed of local interactions while keeping data integrity when the backend fails.

## API Contract

Base URL from `NEXT_PUBLIC_API_URL`:

- `GET /todos?limit={limit}&skip={skip}`
- `POST /todos/add`
- `PATCH /todos/{id}`
- `DELETE /todos/{id}`

## UX States Covered

- Loading skeleton while fetching
- Empty state when no matching tasks exist
- Error with retry button on fetch failure
- Toast notifications for create/delete feedback

## Repository

- GitHub: `https://github.com/developerleonardo/pt-taskflow-leonardo`
