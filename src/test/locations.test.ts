import { describe, expect, it } from "vitest";
import { LOCATIONS, locationHead } from "@/lib/locations";
import { waLink, waMessage } from "@/lib/site";

describe("Confirmed local service coverage", () => {
  it("limits local pages to Birmingham, West Midlands and London", () => {
    expect(LOCATIONS.map(area => area.name)).toEqual(["Birmingham", "West Midlands", "London"]);
    expect(LOCATIONS.map(area => area.slug)).toEqual(["birmingham", "west-midlands", "london"]);
  });
  it.each(LOCATIONS)("describes $name as coverage without inventing a premises address", location => {
    const script = locationHead(location).scripts[0];
    if (!script) throw new Error("Missing local service data");
    const schema = JSON.parse(script.children);
    expect(schema.areaServed.name).toBe(location.name);
    expect(schema.provider.telephone).toBe("+447863192306");
    expect(schema.provider).not.toHaveProperty("address");
    expect(schema).not.toHaveProperty("geo");
  });
  it.each(LOCATIONS)("includes $name in the WhatsApp enquiry", location => {
    const url = new URL(waLink(waMessage({ service: "Property & Building Maintenance", extra: `Property location: ${location.name}` })));
    expect(url.pathname).toBe("/447863192306");
    expect(url.searchParams.get("text")).toContain(`Property location: ${location.name}`);
  });
});