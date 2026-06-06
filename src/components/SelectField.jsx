import { useEffect, useRef, useState } from "react";

export default function SelectField({ label, name, value, options, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function close(event) {
      if (!wrapperRef.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function choose(nextValue) {
    onChange({ target: { name, value: nextValue } });
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative min-w-0">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-left text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
      >
        <span className="truncate">{value}</span>
        <span className="ml-2 text-slate-500">v</span>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg"
        >
          {options.map((option) => (
            <button
              type="button"
              role="option"
              aria-selected={option === value}
              key={option}
              onClick={() => choose(option)}
              className={`block w-full rounded-none px-3 py-2 text-left text-sm hover:bg-sky-50 ${
                option === value ? "bg-sky-600 text-white hover:bg-sky-600" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
