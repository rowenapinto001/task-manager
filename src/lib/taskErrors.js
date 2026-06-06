const SAFE_ERROR = "Something went wrong. Please try again.";

export function taskErrorMessage(error) {
  if (!error) return "";

  console.error("Supabase task error:", error);

  if (error.code === "PGRST205" || error.code === "42P01") {
    return "Tasks table was not found. Run supabase/tasks.sql in Supabase.";
  }

  if (error.code === "42501") {
    return "You do not have permission to access these tasks. Check RLS policies.";
  }

  return SAFE_ERROR;
}
