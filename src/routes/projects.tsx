import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, seoHead } from "@/components/site/PageIntro";
import { WaButton } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/projects")({
  head: () => seoHead("Projects | Charos Services Limited", "Charos Services Limited project case studies and work photos will be added when available. Contact us to discuss your property work.", "/projects"),
  component: Projects,
});

function Projects() {
  return (
    <>
      <PageIntro eyebrow="Projects" title="Our project portfolio" text="Real case studies and work photos will be added here when available." />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-2xl font-bold">Have a project in mind?</h2>
        <WaButton label="Discuss your project" className="mt-6" />
      </section>
    </>
  );
}
