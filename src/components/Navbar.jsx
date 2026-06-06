import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link to="/" className="min-w-0 font-semibold text-slate-950">
          Secure Tasks
        </Link>
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <NavLink to="/dashboard" className="text-sm text-slate-600">
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-slate-900 px-3 py-2 text-white hover:bg-slate-700 sm:px-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="text-sm text-slate-600">
                Login
              </NavLink>
              <Link
                to="/signup"
                className="bg-sky-600 px-3 py-2 text-sm text-white hover:bg-sky-700 sm:px-4"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
