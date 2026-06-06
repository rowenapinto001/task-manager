const colors = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
};

export default function Message({ type = "info", text }) {
  if (!text) return null;

  return (
    <div className={`rounded-md border p-3 text-sm ${colors[type]}`}>
      {text}
    </div>
  );
}
