import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { taskErrorMessage } from "../lib/taskErrors";

export const STATUS_OPTIONS = ["pending", "completed"];
export const PRIORITY_OPTIONS = ["low", "medium", "high"];

function cleanTask(task) {
  return {
    title: task.title.trim(),
    description: task.description.trim(),
    status: task.status,
    priority: task.priority,
  };
}

export function validateTask(task) {
  const title = task.title?.trim() ?? "";
  const description = task.description?.trim() ?? "";

  if (!title) return "Title is required.";
  if (title.length > 120) return "Title must be 120 characters or less.";
  if (description.length > 1000) {
    return "Description must be 1000 characters or less.";
  }
  if (!STATUS_OPTIONS.includes(task.status)) return "Invalid status selected.";
  if (!PRIORITY_OPTIONS.includes(task.priority)) {
    return "Invalid priority selected.";
  }
  return "";
}

export function useTasks(user) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    if (!user || !supabase) return;
    setLoading(true);
    setError("");

    const { data, error: fetchError } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) setError(taskErrorMessage(fetchError));
    setTasks(data ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }
    fetchTasks();
  }, [user, fetchTasks]);

  const actions = useMemo(
    () => ({
      async createTask(task) {
        const validation = validateTask(task);
        if (validation) throw new Error(validation);
        const payload = { ...cleanTask(task), user_id: user.id };
        const { error: insertError } = await supabase.from("tasks").insert(payload);
        if (insertError) throw new Error(taskErrorMessage(insertError));
        await fetchTasks();
      },
      async updateTask(id, task) {
        const validation = validateTask(task);
        if (validation) throw new Error(validation);
        const { error: updateError } = await supabase
          .from("tasks")
          .update(cleanTask(task))
          .eq("id", id);
        if (updateError) throw new Error(taskErrorMessage(updateError));
        await fetchTasks();
      },
      async deleteTask(id) {
        const { error: deleteError } = await supabase.from("tasks").delete().eq("id", id);
        if (deleteError) throw new Error(taskErrorMessage(deleteError));
        await fetchTasks();
      },
    }),
    [fetchTasks, user]
  );

  return { tasks, loading, error, refetch: fetchTasks, ...actions };
}
