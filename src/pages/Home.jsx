import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div className="space-y-6">
        <p className="text-sm font-medium uppercase tracking-wide text-sky-700">
          Supabase protected notes and tasks
        </p>
        <h1 className="text-4xl font-bold text-slate-950 md:text-5xl">
          A secure task manager for your private work.
        </h1>
        <p className="max-w-2xl text-slate-600">
          Create, search, update, and delete tasks. Supabase Row Level
          Security keeps each user locked to their own rows.
        </p>
        <Link
          to={user ? "/dashboard" : "/signup"}
          className="inline-flex rounded-md bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700"
        >
          {user ? "Open dashboard" : "Create account"}
        </Link>
      </div>
    </main>
  );
}
