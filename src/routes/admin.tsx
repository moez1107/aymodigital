import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/lib/admin/use-admin";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — AYMO Digital" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminGate,
});

function AdminGate() {
  const auth = useAdminAuth();
  if (auth.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!auth.userId) return <Navigate to="/auth" />;
  if (!auth.isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-center">
        <div className="max-w-md">
          <h1 className="text-xl font-bold">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You're signed in as <strong>{auth.email}</strong> but this account doesn't have admin
            privileges. Sign in as <code>admin@aymo.digital</code> to manage the site.
          </p>
        </div>
      </div>
    );
  }
  return <AdminLayout email={auth.email} />;
}
