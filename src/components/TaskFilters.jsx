import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../hooks/useTasks";
import SelectField from "./SelectField";

export default function TaskFilters({ filters, setFilters, onClear }) {
  function updateFilter(event) {
    setFilters((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <section className="grid min-w-0 gap-3 rounded-md border bg-white p-3 sm:p-4 md:grid-cols-4">
      <input
        className="min-w-0"
        name="search"
        value={filters.search}
        onChange={updateFilter}
        placeholder="Search title or description"
      />
      <SelectField label="Status filter" name="status" value={filters.status} options={["all", ...STATUS_OPTIONS]} onChange={updateFilter} />
      <SelectField label="Priority filter" name="priority" value={filters.priority} options={["all", ...PRIORITY_OPTIONS]} onChange={updateFilter} />
      <button
        onClick={onClear}
        className="w-full border border-slate-300 bg-white px-4 py-2 hover:bg-slate-50"
      >
        Clear filters
      </button>
    </section>
  );
}
