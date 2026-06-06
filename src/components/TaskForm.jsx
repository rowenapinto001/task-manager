import { useState } from "react";
import { PRIORITY_OPTIONS, STATUS_OPTIONS, validateTask } from "../hooks/useTasks";
import Message from "./Message";
import SelectField from "./SelectField";

const blankTask = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
};

export default function TaskForm({ onCreate }) {
  const [task, setTask] = useState(blankTask);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  function updateField(event) {
    setTask((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validation = validateTask(task);
    if (validation) return setMessage({ type: "error", text: validation });

    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      await onCreate(task);
      setTask(blankTask);
      setMessage({ type: "success", text: "Task created." });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-md border bg-white p-4">
      <Message type={message.type} text={message.text} />
      <input name="title" value={task.title} onChange={updateField} placeholder="Title" maxLength={120} />
      <textarea
        name="description"
        value={task.description}
        onChange={updateField}
        placeholder="Description"
        rows="4"
        maxLength={1000}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <SelectField label="Priority" name="priority" value={task.priority} options={PRIORITY_OPTIONS} onChange={updateField} />
        <SelectField label="Status" name="status" value={task.status} options={STATUS_OPTIONS} onChange={updateField} />
      </div>
      <button disabled={saving} className="bg-sky-600 px-4 py-2 text-white hover:bg-sky-700">
        {saving ? "Creating..." : "Create task"}
      </button>
    </form>
  );
}
