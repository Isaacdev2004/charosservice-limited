import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, seoHead } from "@/components/site/PageIntro";
import { WaButton } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/industries")({
  head: () => seoHead("Industries We Serve | Charos Services Limited", "Property services for commercial offices, landlords, residential blocks, education, retail, contractors and homeowners.", "/industries"),
  component: Industries,
});

const sectors = [
  ["Commercial offices", "Planned maintenance and reactive support that keeps workplaces productive."],
  ["Landlords & lettings", "Repairs, safety-focused upkeep and fast tenancy turnarounds."],
  ["Residential blocks & estates", "Communal area care, grounds maintenance and building fabric repairs."],
  ["Education & public buildings", "Out-of-hours works scheduled around timetables and occupants."],
  ["Retail & hospitality", "Discreet repairs and refresh works that protect trading hours."],
  ["Construction contractors", "Labour supply and site support to keep programmes on track."],
  ["Homeowners", "Trusted trades for repairs, joinery and gardens — booked in a message."],
];

function Industries() {
  return (
    <>
      <PageIntro eyebrow="Industries" title="Built for the places people live, work and learn." text="We adapt how we work to the needs of each sector — access, timings, reporting and communication." />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="divide-y divide-border border-y border-border">
          {sectors.map(([t, d], i) => (
            <div key={t} className="grid items-center gap-4 py-8 md:grid-cols-12">
              <span className="font-display text-sm text-muted-foreground md:col-span-1">0{i + 1}</span>
              <h2 className="text-2xl font-bold md:col-span-4">{t}</h2>
              <p className="text-muted-foreground md:col-span-5">{d}</p>
              <div className="md:col-span-2 md:text-right">
                <WaButton audience={t === "Homeowners" || t === "Landlords & lettings" ? "domestic" : "commercial"} extra={`Sector: ${t}`} label="Enquire" className="px-4 py-2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
