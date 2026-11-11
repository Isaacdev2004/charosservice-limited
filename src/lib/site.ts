import facilities from "@/assets/facilities-inspection.jpg";
import propertyRepairs from "@/assets/property-repairs.jpg";
import labourWorkforce from "@/assets/labour-workforce.jpg";
import joinery from "@/assets/joinery.jpg";
import grounds from "@/assets/grounds.jpg";
import construction from "@/assets/construction.jpg";

// Confirmed company details; unavailable contact channels remain hidden.
export const SITE_ORIGIN = "https://charosservice-limited.vercel.app";

export const COMPANY = {
  name: "Charos Services Limited",
  whatsapp: "447863192306", // digits only, international format, no +
  phoneDisplay: "+44 7863 192306",
  phoneHref: "tel:+447863192306",
  email: "",
  area: "Birmingham, all of the West Midlands and London",
  serviceAreas: ["Birmingham", "West Midlands", "London"],
};

export function waLink(message: string) {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Audience = "domestic" | "commercial";

export function waMessage(opts: { service?: string | undefined; audience?: Audience | undefined; extra?: string | undefined }) {
  const who = opts.audience === "commercial" ? "a commercial / facilities contract" : opts.audience === "domestic" ? "my home / rental property" : "my property";
  return `Hello Charos Services, I'd like a quote${opts.service ? ` for ${opts.service}` : ""} for ${who}.${opts.extra ? `\n\n${opts.extra}` : ""}`;
}

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  image: string;
  imageAlt: string;
  includes: string[];
  domestic: string;
  commercial: string;
};

export const SERVICES: Service[] = [
  {
    slug: "facilities-management",
    title: "Facilities Management",
    short: "Planned and reactive support that keeps buildings safe, compliant and running.",
    intro: "A single point of contact for the day-to-day care of your premises — from planned preventative maintenance to reactive call-outs and site support.",
    image: facilities,
    imageAlt: "Illustrative facilities professional inspecting equipment in a commercial plant room",
    includes: ["Planned preventative maintenance", "Reactive repairs and call-outs", "Site inspections and condition reporting", "Contractor coordination", "Void and turnover support", "Multi-site service scheduling"],
    domestic: "Ongoing upkeep plans for landlords and multi-unit residential blocks.",
    commercial: "Scheduled maintenance programmes for offices, retail, education and managed estates.",
  },
  {
    slug: "property-maintenance",
    title: "Property & Building Maintenance",
    short: "Repairs, refurbishment and upkeep for homes, rentals and commercial buildings.",
    intro: "Practical, well-finished repairs and improvements carried out by skilled operatives who respect your property and your time.",
    image: propertyRepairs,
    imageAlt: "Illustrative decorator repairing plaster on a residential interior wall",
    includes: ["General repairs and fixes", "Painting and decorating", "Plastering and patch repairs", "Minor refurbishment works", "Tenancy changeover works", "Fixtures, fittings and installations"],
    domestic: "Home repairs, redecoration and pre-let preparation for landlords.",
    commercial: "Building fabric repairs and refresh works with minimal disruption to operations.",
  },
  {
    slug: "joinery-carpentry",
    title: "Joinery & Carpentry",
    short: "First and second fix, bespoke joinery and fitted installations.",
    intro: "Accurate, durable carpentry — from structural first fix through to fine finishing and bespoke fitted pieces.",
    image: joinery,
    imageAlt: "Illustrative carpentry work on a timber staircase",
    includes: ["First and second fix carpentry", "Doors, frames and ironmongery", "Staircases and balustrades", "Skirting, architrave and trims", "Fitted storage and shelving", "Partitioning and boxing-in"],
    domestic: "Doors, staircases, fitted wardrobes and finishing work for your home.",
    commercial: "Fit-out carpentry, partitioning and door packages for commercial sites.",
  },
  {
    slug: "gardening-grounds",
    title: "Gardening & Grounds Maintenance",
    short: "Tidy, well-kept outdoor spaces for homes, estates and business premises.",
    intro: "Regular or one-off grounds care that keeps external areas presentable, safe and well-managed through every season.",
    image: grounds,
    imageAlt: "Illustrative gardening and grounds maintenance",
    includes: ["Lawn mowing and edging", "Hedge trimming and shrub pruning", "Seasonal clearance", "Planting and bed maintenance", "Hard landscaping upkeep", "Communal and estate grounds"],
    domestic: "Garden tidy-ups and regular maintenance visits for homeowners and lets.",
    commercial: "Scheduled grounds contracts for business parks, schools and residential estates.",
  },
  {
    slug: "labour-supply",
    title: "Skilled & General Labour Supply",
    short: "Reliable skilled tradespeople and general operatives when you need them.",
    intro: "Flexible workforce support to help contractors and property managers meet programme demands without compromising standards.",
    image: labourWorkforce,
    imageAlt: "Illustrative site operatives working together to move timber onto a workbench",
    includes: ["Skilled trades operatives", "General labourers", "Short and long-term placements", "Project-based crews", "Site clearance teams", "Cover for peak demand"],
    domestic: "Extra hands for larger home projects or clearances.",
    commercial: "Labour supply to contractors, developers and facilities teams across sites.",
  },
  {
    slug: "construction-support",
    title: "Construction Support Services",
    short: "On-site support that keeps building projects moving to programme.",
    intro: "Dependable support across the construction lifecycle — site preparation, logistics, clean-up and trade assistance.",
    image: construction,
    imageAlt: "Illustrative construction professionals reviewing plans beside a building under renovation",
    includes: ["Site preparation and setup", "Material handling and logistics", "Trade assistance", "Builders' cleans", "Waste management support", "Snagging and handover works"],
    domestic: "Support for extensions and renovation projects.",
    commercial: "Site support packages for main contractors and developers.",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
