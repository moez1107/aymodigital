import { createFileRoute, notFound } from "@tanstack/react-router";
import { CrudPage } from "@/components/admin/CrudPage";
import { getModule } from "@/lib/admin/modules";

export const Route = createFileRoute("/admin/$module")({
  component: ModuleRoute,
});

function ModuleRoute() {
  const { module: slug } = Route.useParams();
  const mod = getModule(slug);
  if (!mod) throw notFound();
  return <CrudPage module={mod} />;
}
