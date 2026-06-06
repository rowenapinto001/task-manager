import { useState } from "react";
import { PRIORITY_OPTIONS, STATUS_OPTIONS, validateTask } from "../hooks/useTasks";
import Message from "./Message";
import SelectField from "./SelectField";

function taskFrom(item) {
  return {
    title: item.title,
    description: item.description ?? "",
    status: item.status,
    priority: item.priority,
  };
}

export default function TaskCard({ task, onUpdate, onDelete }) {
  const [draft, setDraft] = useState(taskFrom(task));
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  function updateField(event) {
    setDraft((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function save() {
    const validation = validateTask(draft);
    if (validation) return setMessage({ type: "error", text: validation });
    setBusy(true);
    try {
      await onUpdate(task.id, draft);
      setEditing(false);
      setMessage({ type: "success", text: "Task updated." });
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm("Delete this task?")) return;
    setBusy(true);
    try {
      await onDelete(task.id);
    } catch (error) {
      setMessage({ type: "error", text: error.message });
      setBusy(false);
    }
  }

  return (
    <article className="min-w-0 space-y-3 rounded-md border bg-white p-3 sm:p-4">
      <Message type={message.type} text={message.text} />
      {editing ? (
        <>
          <input name="title" value={draft.title} onChange={updateField} maxLength={120} />
          <textarea name="description" value={draft.description} onChange={updateField} rows="3" maxLength={1000} />
        </>
      ) : (
        <>
          <h3 className="break-words text-lg font-semibold">{task.title}</h3>
          {task.description && <p className="whitespace-pre-wrap break-words text-sm text-slate-600">{task.description}</p>}
        </>
      )}
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <SelectField label="Priority" name="priority" value={draft.priority} options={PRIORITY_OPTIONS} onChange={updateField} disabled={!editing} />
        <SelectField label="Status" name="status" value={draft.status} options={STATUS_OPTIONS} onChange={updateField} disabled={!editing} />
      </div>
      <div className="flex flex-wrap gap-2">
        {editing ? (
          <>
            <button disabled={busy} onClick={save} className="bg-sky-600 px-3 py-2 text-white">Save</button>
            <button onClick={() => setEditing(false)} className="border px-3 py-2">Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditing(true)} className="border px-3 py-2">Edit</button>
        )}
        <button disabled={busy} onClick={remove} className="bg-red-600 px-3 py-2 text-white">Delete</button>
      </div>
    </article>
  );
}
