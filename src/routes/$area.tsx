import { createFileRoute, notFound } from "@tanstack/react-router";
import { LOCATIONS, locationHead } from "@/lib/locations";
import { LocationPage } from "@/components/site/LocationPage";

export const Route = createFileRoute("/$area")({
  loader: ({ params }) => {
    const location = LOCATIONS.find(area => area.slug === params.area);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData }) => loaderData ? locationHead(loaderData) : { meta: [{ title: "Service area not found | Charos Services Limited" }, { name: "robots", content: "noindex" }] },
  component: AreaPage,
});

function AreaPage() {
  return <LocationPage location={Route.useLoaderData()} />;
}