import { useMemo, useState } from "react";
import Message from "../components/Message";
import TaskCard from "../components/TaskCard";
import TaskFilters from "../components/TaskFilters";
import TaskForm from "../components/TaskForm";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";

const initialFilters = {
  search: "",
  status: "all",
  priority: "all",
};

function matchesFilters(task, filters) {
  const query = filters.search.trim().toLowerCase();
  const text = `${task.title} ${task.description ?? ""}`.toLowerCase();
  const matchesSearch = !query || text.includes(query);
  const matchesStatus = filters.status === "all" || task.status === filters.status;
  const matchesPriority = filters.priority === "all" || task.priority === filters.priority;

  return matchesSearch && matchesStatus && matchesPriority;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks(user);
  const [filters, setFilters] = useState(initialFilters);

  const visibleTasks = useMemo(
    () => tasks.filter((task) => matchesFilters(task, filters)),
    [tasks, filters]
  );

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-3 py-6 sm:px-4 sm:py-8 lg:grid-cols-[360px_minmax(0,1fr)]">
      <section className="min-w-0 space-y-4">
        <div className="min-w-0">
          <p className="truncate text-sm text-slate-500">{user?.email}</p>
          <h1 className="text-2xl font-bold sm:text-3xl">Task Dashboard</h1>
        </div>
        <TaskForm onCreate={createTask} />
      </section>
      <section className="min-w-0 space-y-4">
        <TaskFilters
          filters={filters}
          setFilters={setFilters}
          onClear={() => setFilters(initialFilters)}
        />
        {loading && <Message type="info" text="Loading your tasks..." />}
        {error && <Message type="error" text={error} />}
        {!loading && !error && tasks.length === 0 && (
          <div className="rounded-md border bg-white p-8 text-center text-slate-600">
            No tasks yet. Create your first task to get started.
          </div>
        )}
        {!loading && !error && tasks.length > 0 && visibleTasks.length === 0 && (
          <div className="rounded-md border bg-white p-8 text-center text-slate-600">
            No tasks match your search or filters.
          </div>
        )}
        <div className="grid gap-4">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
