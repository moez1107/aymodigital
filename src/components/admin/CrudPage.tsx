import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Loader2, X, Search } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { ModuleConfig, FieldConfig } from "@/lib/admin/modules";
import { ImageUpload } from "./ImageUpload";

type Row = Record<string, any>;

export function CrudPage({ module }: { module: ModuleConfig }) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin", module.table],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from(module.table)
        .select("*")
        .order(module.orderBy.column, { ascending: module.orderBy.ascending });
      if (error) throw error;
      return (data ?? []) as Row[];
    },
  });

  const filtered = useMemo(() => {
    if (!search.trim()) return data ?? [];
    const s = search.toLowerCase();
    return (data ?? []).filter((r) =>
      Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(s)),
    );
  }, [data, search]);

  const deleteMut = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from(module.table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Deleted");
      qc.invalidateQueries({ queryKey: ["admin", module.table] });
      qc.invalidateQueries({ queryKey: ["public", module.table] });
    },
    onError: (e: any) => toast.error(e?.message ?? "Delete failed"),
  });

  const idKey = module.table === "site_settings" ? "key" : "id";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight">{module.label}</h1>
          <p className="text-sm text-muted-foreground">{module.description}</p>
        </div>
        {!module.readonly && (
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
          >
            <Plus size={14} /> New {module.label.replace(/s$/, "")}
          </button>
        )}
      </div>

      <div className="relative w-full max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search…"
          className="w-full rounded-md border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary/60"
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              {module.listColumns.map((c) => (
                <th key={c} className="px-3 py-2 text-left font-medium">
                  {c.replace(/_/g, " ")}
                </th>
              ))}
              <th className="px-3 py-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={module.listColumns.length + 1} className="p-6 text-center text-muted-foreground">
                  <Loader2 className="mx-auto animate-spin" size={18} />
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={module.listColumns.length + 1} className="p-6 text-center text-muted-foreground">
                  No records yet.
                </td>
              </tr>
            ) : (
              filtered.map((row) => (
                <tr key={row[idKey]} className="border-t border-border hover:bg-secondary/40">
                  {module.listColumns.map((c) => (
                    <td key={c} className="px-3 py-2 align-top">
                      <Cell value={row[c]} />
                    </td>
                  ))}
                  <td className="px-3 py-2 text-right">
                    <div className="inline-flex gap-1">
                      <button
                        onClick={() => setEditing(row)}
                        className="rounded-md p-1.5 hover:bg-secondary"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete this record?")) deleteMut.mutate(row[idKey]);
                        }}
                        className="rounded-md p-1.5 text-destructive hover:bg-destructive/10"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {(creating || editing) && (
        <EditDialog
          module={module}
          initial={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={() => {
            qc.invalidateQueries({ queryKey: ["admin", module.table] });
            qc.invalidateQueries({ queryKey: ["public", module.table] });
            setCreating(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function Cell({ value }: { value: any }) {
  if (value === null || value === undefined || value === "")
    return <span className="text-muted-foreground">—</span>;
  if (typeof value === "boolean")
    return <span className={value ? "text-emerald-600" : "text-muted-foreground"}>{value ? "✓" : "—"}</span>;
  if (typeof value === "string" && /^https?:\/\//.test(value) && /\.(jpe?g|png|gif|webp|avif)/i.test(value))
    return <img src={value} alt="" className="h-8 w-8 rounded object-cover" />;
  const s = String(value);
  return <span title={s}>{s.length > 60 ? s.slice(0, 60) + "…" : s}</span>;
}

function EditDialog({
  module,
  initial,
  onClose,
  onSaved,
}: {
  module: ModuleConfig;
  initial: Row | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<Row>(() => initial ?? {});
  const [saving, setSaving] = useState(false);
  const idKey = module.table === "site_settings" ? "key" : "id";

  useEffect(() => {
    setForm(initial ?? {});
  }, [initial]);

  function setField(name: string, value: any) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function save() {
    setSaving(true);
    try {
      const payload: Row = {};
      for (const f of module.fields) {
        let v = form[f.name];
        if (f.type === "tags" && typeof v === "string") {
          v = v.split(",").map((s) => s.trim()).filter(Boolean);
        }
        if (f.type === "number" && v !== "" && v !== null && v !== undefined) v = Number(v);
        if (f.type === "boolean") v = !!v;
        if (f.name === "value" && module.table === "site_settings" && typeof v === "string") {
          try {
            v = JSON.parse(v);
          } catch {
            throw new Error("Value must be valid JSON");
          }
        }
        if (v !== undefined) payload[f.name] = v;
      }

      if (initial && initial[idKey]) {
        const { error } = await (supabase as any)
          .from(module.table)
          .update(payload)
          .eq(idKey, initial[idKey]);
        if (error) throw error;
        toast.success("Updated");
      } else {
        const { error } = await (supabase as any).from(module.table).insert(payload);
        if (error) throw error;
        toast.success("Created");
      }
      onSaved();
    } catch (e: any) {
      toast.error(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-background p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {initial ? "Edit" : "New"} {module.label}
          </h2>
          <button onClick={onClose} className="rounded p-1 hover:bg-secondary" aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {module.fields.map((f) => (
            <FieldInput
              key={f.name}
              field={f}
              value={form[f.name]}
              onChange={(v) => setField(f.name, v)}
              moduleTable={module.table}
            />
          ))}
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose} className="rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 disabled:opacity-60"
          >
            {saving && <Loader2 className="animate-spin" size={14} />}
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  moduleTable,
}: {
  field: FieldConfig;
  value: any;
  onChange: (v: any) => void;
  moduleTable: string;
}) {
  const label = (
    <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {field.label}
      {field.required && <span className="text-destructive"> *</span>}
    </label>
  );

  const helper = field.helperText && (
    <p className="mt-1 text-[11px] text-muted-foreground">{field.helperText}</p>
  );

  if (field.type === "image") {
    return (
      <div>
        {label}
        <ImageUpload value={value} onChange={onChange} />
        {helper}
      </div>
    );
  }

  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-border"
        />
        {field.label}
      </label>
    );
  }

  if (field.type === "textarea") {
    const display =
      moduleTable === "site_settings" && field.name === "value" && typeof value === "object"
        ? JSON.stringify(value, null, 2)
        : value ?? "";
    return (
      <div>
        {label}
        <textarea
          value={display}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/60"
        />
        {helper}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        {label}
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        >
          <option value="">—</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {helper}
      </div>
    );
  }

  if (field.type === "tags") {
    const display = Array.isArray(value) ? value.join(", ") : value ?? "";
    return (
      <div>
        {label}
        <input
          type="text"
          value={display}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        {helper}
      </div>
    );
  }

  const inputType =
    field.type === "email" ? "email" : field.type === "url" ? "url" : field.type === "number" ? "number" : "text";

  return (
    <div>
      {label}
      <input
        type={inputType}
        value={value ?? ""}
        placeholder={field.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary/60"
      />
      {helper}
    </div>
  );
}
