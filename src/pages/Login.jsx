import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import { hasSupabaseConfig, supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (loginError) return setError("Login failed. Check your email and password.");
    navigate("/dashboard");
  }

  if (!hasSupabaseConfig) {
    return <Message type="error" text="Missing Supabase environment variables." />;
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-md border bg-white p-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <Message type="error" text={error} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button disabled={loading} className="w-full bg-sky-600 px-4 py-2 text-white hover:bg-sky-700">
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm text-slate-600">
          No account? <Link className="text-sky-700" to="/signup">Sign up</Link>
        </p>
      </form>
    </main>
  );
}
