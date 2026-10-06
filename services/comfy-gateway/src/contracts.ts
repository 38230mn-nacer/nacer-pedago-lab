import { z } from "zod";

export const CognitiveStage = z.enum([
  "probleme-concret",
  "image-representation",
  "intuition",
  "formalisation",
  "automatisme",
  "transfert"
]);

export const OutputFormat = z.enum([
  "visio-16-9",
  "fiche-a4",
  "square-1-1",
  "vertical-9-16"
]);

export const CreerVisuelPedagogiqueRequest = z.object({
  topic: z.string().min(2).max(160),
  level: z.string().min(1).max(80),
  objective: z.string().min(5).max(500),
  keyIdea: z.string().min(3).max(500),
  cognitiveStage: CognitiveStage,
  format: OutputFormat.default("visio-16-9"),
  mustShow: z.array(z.string().min(1).max(240)).max(10).default([]),
  mustAvoid: z.array(z.string().min(1).max(240)).max(10).default([]),
  variants: z.number().int().min(1).max(4).default(1)
}).strict();

export type CreerVisuelPedagogiqueRequestType = z.infer<typeof CreerVisuelPedagogiqueRequest>;

export type ServiceStatus =
  | "mocked"
  | "generated"
  | "verification-required"
  | "approved"
  | "stored";

export type GeneratedAsset = {
  type: string;
  contentType?: string;
  url: string;
  expiresAt: string | null;
};

export type CreerVisuelPedagogiqueResponse = {
  requestId: string;
  service: "creer-visuel-pedagogique-v1";
  serviceVersion: "1.0.0";
  workflow: "NACER_CREER_VISUEL_PEDAGOGIQUE_V1";
  workflowVersion: string;
  mode: "mock" | "live";
  status: ServiceStatus;
  trace: {
    comfyJobId?: string;
  };
  assets: GeneratedAsset[];
  verification: {
    required: true;
    checks: string[];
  };
};
