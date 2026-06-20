import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_MODULES } from "@/lib/admin/modules";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function useCount(table: string) {
  return useQuery({
    queryKey: ["admin-count", table],
    queryFn: async () => {
      const { count, error } = await (supabase as any)
        .from(table)
        .select("*", { count: "exact", head: true });
      if (error) return 0;
      return count ?? 0;
    },
  });
}

function Dashboard() {
  const recentLeads = useQuery({
    queryKey: ["admin-recent-leads"],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });
  const recentMessages = useQuery({
    queryKey: ["admin-recent-messages"],
    queryFn: async () => {
      const { data } = await (supabase as any)
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      return data ?? [];
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Overview of your site content and inbox.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {ADMIN_MODULES.map((m) => (
          <ModuleCount key={m.slug} slug={m.slug} table={m.table} label={m.label} Icon={m.icon} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Latest leads" link="/admin/leads">
          {recentLeads.data?.length ? (
            <ul className="divide-y divide-border">
              {recentLeads.data.map((l: any) => (
                <li key={l.id} className="py-2 text-sm">
                  <div className="font-medium">{l.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {l.email || l.phone} · {l.service_interest || "—"} · {new Date(l.created_at).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No leads yet.</p>
          )}
        </Panel>
        <Panel title="Latest messages" link="/admin/messages">
          {recentMessages.data?.length ? (
            <ul className="divide-y divide-border">
              {recentMessages.data.map((m: any) => (
                <li key={m.id} className="py-2 text-sm">
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {m.phone || m.email || "—"} · {new Date(m.created_at).toLocaleString()}
                  </div>
                  <div className="mt-1 line-clamp-2 text-xs">{m.message}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No messages yet.</p>
          )}
        </Panel>
      </div>
    </div>
  );
}

function ModuleCount({
  slug,
  table,
  label,
  Icon,
}: {
  slug: string;
  table: string;
  label: string;
  Icon: any;
}) {
  const { data } = useCount(table);
  return (
    <Link
      to={`/admin/${slug}`}
      className="rounded-lg border border-border bg-background p-4 transition hover:border-primary/50 hover:shadow-sm"
    >
      <div className="flex items-center justify-between">
        <Icon size={16} className="text-muted-foreground" />
        <span className="text-2xl font-bold">{data ?? "—"}</span>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </Link>
  );
}

function Panel({ title, link, children }: { title: string; link: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold">{title}</h2>
        <Link to={link} className="text-xs text-primary hover:underline">
          View all →
        </Link>
      </div>
      {children}
    </div>
  );
}
