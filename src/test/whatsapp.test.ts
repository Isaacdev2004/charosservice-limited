import { describe, expect, it } from "vitest";
import { waLink, waMessage, COMPANY } from "@/lib/site";

describe("WhatsApp enquiry links", () => {
  it("uses the confirmed WhatsApp number", () => {
    expect(new URL(waLink("Hello")).pathname).toBe("/447863192306");
  });

  it("uses the same confirmed number for calls", () => {
    expect(COMPANY.phoneHref).toBe("tel:+447863192306");
  });

  it("does not publish an email before the domain is created", () => {
    expect(COMPANY.email).toBe("");
  });

  it("covers Birmingham, the West Midlands and London", () => {
    expect(COMPANY.serviceAreas).toEqual(["Birmingham", "West Midlands", "London"]);
    expect(COMPANY.area).toBe("Birmingham, all of the West Midlands and London");
  });
  it("pre-fills service and commercial audience", () => {
    const url = waLink(waMessage({ service: "Joinery & Carpentry", audience: "commercial" }));
    expect(url.startsWith(`https://wa.me/${COMPANY.whatsapp}?text=`)).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1] ?? "")).toContain("for Joinery & Carpentry for a commercial / facilities contract");
  });
});
