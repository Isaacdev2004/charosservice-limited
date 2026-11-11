import { COMPANY, SERVICES } from "@/lib/site";
import { seoHead } from "@/components/site/PageIntro";

export const LOCATIONS = [
  {
    slug: "birmingham",
    name: COMPANY.serviceAreas[0],
    intro: "Property repairs, rental upkeep and commercial facilities support in Birmingham, with joinery, grounds care and workforce services through one point of contact.",
    domestic: "For Birmingham homeowners and landlords, we handle property repairs, decorating, carpentry and garden maintenance. Tell us whether the property is occupied or between tenancies so we can discuss access and the scope of work.",
    commercial: "For Birmingham offices, retail premises and managed properties, discuss planned upkeep, building repairs and grounds maintenance. Contractors can also enquire about skilled labour and construction site support.",
    planning: "Include your Birmingham postcode, the type of property and whether you need a single repair or a programme of maintenance. For rental work, mention tenancy dates and access arrangements.",
  },
  {
    slug: "west-midlands",
    name: COMPANY.serviceAreas[1],
    intro: "Property and building maintenance across all of the West Midlands, from household repairs and landlord upkeep to facilities management and construction support.",
    domestic: "Homeowners and landlords across the West Midlands can enquire about repairs, refurbishment, joinery and garden upkeep. Share the town and postcode of each property when discussing work at more than one address.",
    commercial: "Facilities teams, estate managers and contractors can discuss maintenance, grounds contracts and workforce support across West Midlands sites. List the locations and required work so we can review the scope together.",
    planning: "For work across the West Midlands, include the town and postcode rather than the county alone. For multiple properties, provide a short list of sites, access requirements and priorities.",
  },
  {
    slug: "london",
    name: COMPANY.serviceAreas[2],
    intro: "Property maintenance and facilities services in London for homeowners, landlords, businesses and contractors, including carpentry, grounds care and site support.",
    domestic: "For London homes and rental properties, enquire about repairs, decorating, fitted joinery and garden maintenance. Mention the property type, floor level and any shared-building access arrangements relevant to the work.",
    commercial: "London businesses and property managers can discuss planned maintenance, commercial repairs, grounds care and fit-out carpentry. Construction teams can enquire about labour supply and on-site support.",
    planning: "Include the London postcode, building access arrangements and any parking or delivery restrictions. For commercial sites, mention permitted working hours and whether the premises will remain occupied.",
  },
];

export type Location = (typeof LOCATIONS)[number];

export function locationHead(location: Location) {
  return {
    ...seoHead(`Property Maintenance & Facilities Management ${location.name} | ${COMPANY.name}`, location.intro, `/${location.slug}`),
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Property maintenance and facilities services in ${location.name}`,
        description: location.intro,
        provider: { "@type": "Organization", name: COMPANY.name, telephone: COMPANY.phoneHref.replace("tel:", "") },
        areaServed: { "@type": "Place", name: location.name },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Property, facilities and workforce services",
          itemListElement: SERVICES.map((service) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.title } })),
        },
      }),
    }],
  };
}