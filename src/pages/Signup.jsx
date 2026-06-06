import { useState } from "react";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { hasSupabaseConfig, supabase } from "../lib/supabase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      return setMessage({ type: "error", text: "Signup failed. Try again." });
    }
    setMessage({ type: "success", text: "Check your email to confirm your account." });
  }

  if (!hasSupabaseConfig) {
    return <Message type="error" text="Missing Supabase environment variables." />;
  }

  return (
    <main className="mx-auto max-w-md px-4 py-12">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-md border bg-white p-6">
        <h1 className="text-2xl font-bold">Create account</h1>
        <Message type={message.type} text={message.text} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          minLength={6}
          required
        />
        <button disabled={loading} className="w-full bg-sky-600 px-4 py-2 text-white hover:bg-sky-700">
          {loading ? "Creating..." : "Sign up"}
        </button>
        <p className="text-sm text-slate-600">
          Already have an account? <Link className="text-sky-700" to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
