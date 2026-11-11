import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SERVICES } from "./site";

const inputSchema = z.object({
  audience: z.enum(["domestic", "commercial"]),
  issue: z.string().trim().min(10).max(1500),
  location: z.string().trim().max(100).optional(),
});

const slugs = SERVICES.map((s) => s.slug) as [string, ...string[]];

const recommendationSchema = {
  type: "object",
  additionalProperties: false,
  required: ["primary_service", "secondary_services", "reasoning", "urgency", "questions_to_expect", "whatsapp_message"],
  properties: {
    primary_service: { type: "string", enum: slugs },
    secondary_services: { type: "array", items: { type: "string", enum: slugs } },
    reasoning: { type: "string" },
    urgency: { type: "string", enum: ["urgent", "soon", "planned"] },
    questions_to_expect: { type: "array", items: { type: "string" } },
    whatsapp_message: { type: "string" },
  },
} as const;

const resultSchema = z.object({
  primary_service: z.enum(slugs),
  secondary_services: z.array(z.enum(slugs)).transform((a) => a.slice(0, 2)),
  reasoning: z.string(),
  urgency: z.enum(["urgent", "soon", "planned"]),
  questions_to_expect: z.array(z.string()).transform((a) => a.slice(0, 4)),
  whatsapp_message: z.string(),
});

export type AdvisorResult = z.infer<typeof resultSchema>;
export type AdvisorResponse = { ok: true; result: AdvisorResult } | { ok: false; error: string };

const unavailable = "Something went wrong. Please try again or message us on WhatsApp directly.";

function serverEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export const recommendService = createServerFn({ method: "POST" })
  .validator((d: unknown) => inputSchema.parse(d))
  .handler(async ({ data }): Promise<AdvisorResponse> => {
    const apiKey = serverEnv("OPENAI_API_KEY");
    if (!apiKey) {
      console.error("Advisor is not configured: OPENAI_API_KEY is missing.");
      return { ok: false, error: unavailable };
    }

    const catalogue = SERVICES.map((s) => `- ${s.slug}: ${s.title} — ${s.short} Includes: ${s.includes.join(", ")}`).join("\n");
    const who = data.audience === "commercial" ? "a commercial / facilities client" : "a homeowner or landlord";
    const instructions = `You are the enquiry assistant for Charos Services Limited, a UK property services company. Recommend the most relevant service(s) ONLY from this catalogue:\n${catalogue}\n\nRules: Use British English. Never quote prices, timescales, guarantees, accreditations or availability. "reasoning" is 1-2 friendly sentences addressed to the client. "questions_to_expect" are short details Charos may ask for (e.g. photos, access). "whatsapp_message" is a concise first-person enquiry from the client to Charos (max ~90 words), starting "Hello Charos Services," naming the recommended service, summarising the issue${data.location ? " and location" : ""}, and asking for a quote. Tone: ${data.audience === "commercial" ? "professional and concise" : "warm and plain-spoken"}. If the issue is not property-related, pick the closest service and say so politely in reasoning.`;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: serverEnv("OPENAI_MODEL") ?? "gpt-4.1-mini",
          messages: [
            { role: "system", content: instructions },
            { role: "user", content: `Client type: ${who}\n${data.location ? `Location: ${data.location}\n` : ""}Issue: ${data.issue}` },
          ],
          response_format: {
            type: "json_schema",
            json_schema: { name: "service_recommendation", strict: true, schema: recommendationSchema },
          },
        }),
      });

      const payload = (await response.json()) as {
        choices?: { message?: { content?: string | null } }[];
        error?: { message?: string; code?: string };
      };

      if (!response.ok) {
        console.error("Advisor OpenAI error", response.status, payload.error?.code);
        if (response.status === 429) return { ok: false, error: "The assistant is busy right now. Please try again in a minute." };
        if (response.status === 402) return { ok: false, error: "The assistant is temporarily unavailable. Please message us on WhatsApp directly." };
        return { ok: false, error: unavailable };
      }

      const text = payload.choices?.[0]?.message?.content;
      if (!text) {
        console.error("Advisor OpenAI response had no content");
        return { ok: false, error: unavailable };
      }

      const parsed = resultSchema.safeParse(JSON.parse(text));
      if (!parsed.success) {
        console.error("Advisor parse failed", parsed.error.issues);
        return { ok: false, error: "We couldn't read the suggestion. Please try again or message us directly." };
      }
      const result = parsed.data;
      result.secondary_services = result.secondary_services.filter((s) => s !== result.primary_service);
      return { ok: true, result };
    } catch (error) {
      console.error("Advisor error", error);
      return { ok: false, error: unavailable };
    }
  });
