# Secure Tasks

A beginner-friendly authenticated notes/task manager built with React, Vite,
Supabase Auth, Supabase Postgres, React Router, and Tailwind CSS.

Each signed-in user can create, read, update, delete, search, and filter only
their own tasks. Supabase Row Level Security is the database-level protection.

## Features

- Email/password signup and login with Supabase Auth
- Protected dashboard route
- Create, edit, complete, reopen, and delete tasks
- Search by title or description
- Filter by status and priority
- Loading, empty, error, and no-results states
- Mobile-friendly layout with custom in-app dropdowns
- Vercel-ready SPA routing

## Project Structure

```text
src/lib/supabase.js            Supabase browser client
src/lib/taskErrors.js          Safe task error messages
src/context/AuthContext.jsx    Session and auth state
src/components/                Shared UI components
src/hooks/useTasks.js          Task CRUD and validation
src/pages/                     Route pages
supabase/tasks.sql             Table, constraints, trigger, and RLS policies
vercel.json                    Vercel rewrite for React Router
```

## Local Setup

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Add your Supabase project values to `.env`:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Start the app:

```bash
npm run dev
```

## Supabase Setup

Open your Supabase project SQL editor and run:

```text
supabase/tasks.sql
```

That script creates the `public.tasks` table, validation checks, an
`updated_at` trigger, indexes, enables RLS, and adds strict owner-only
policies for select, insert, update, and delete.

## Security Notes

- Never put the Supabase service role key in the frontend.
- Only use the public anon key in `VITE_SUPABASE_ANON_KEY`.
- Keep real secrets in `.env`; `.env` is ignored by Git.
- Frontend validation improves UX, but RLS is the real protection.
- The app does not use `dangerouslySetInnerHTML`.
- User content is rendered as normal React text.
- Task queries rely on the authenticated session and RLS.

## Vercel Deployment

Use these settings:

```text
Framework preset: Vite
Build command: npm run build
Output directory: dist
```

Add these Vercel environment variables:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

`vercel.json` rewrites all routes to `/`, so refreshing `/dashboard` works.

## Testing Checklist

- Sign up and log in.
- Run `supabase/tasks.sql` in the matching Supabase project.
- Create a task.
- Try an empty title and very long text.
- Edit title, description, status, and priority.
- Delete a task and confirm the prompt.
- Search and filter tasks.
- Clear filters.
- Refresh `/dashboard` while logged in.
- Log out and manually open `/dashboard`.
- Confirm two users cannot see each other's tasks.

## Troubleshooting

If the dashboard says the tasks table was not found, run
`supabase/tasks.sql` in the same Supabase project used by `.env`.

If login works but tasks fail, check that RLS is enabled and the policies exist
on `public.tasks`.

If deployment works but direct routes 404, confirm `vercel.json` is included in
the deployed repository.

If the app says Supabase variables are missing, check `.env` locally or Vercel
environment variables in production.
