import type { VisualPedagoRequestType } from "./contracts.js";

const formatHints: Record<VisualPedagoRequestType["format"], string> = {
  "visio-16-9": "Landscape 16:9 composition for screen sharing and live annotation.",
  "fiche-a4": "Portrait A4 composition with generous margins and printable visual hierarchy.",
  "square-1-1": "Square composition for reusable social or LMS cards.",
  "vertical-9-16": "Vertical 9:16 composition for short educational video."
};

export function buildVisualPedagoPrompt(input: VisualPedagoRequestType): string {
  const mustShow = input.mustShow.length
    ? input.mustShow.map((x) => `- ${x}`).join("\n")
    : "- Only elements strictly necessary to reveal the concept.";

  const mustAvoid = [
    "generic AI iconography or decorative clichés",
    "visual clutter",
    "unnecessary characters or objects",
    "invented mathematical formulas, symbols, labels or numerical values",
    "long text inside the generated image",
    ...input.mustAvoid
  ].map((x) => `- ${x}`).join("\n");

  return `Create one pedagogical visual layer for Nacer OS.

AUDIENCE
Level: ${input.level}
Topic: ${input.topic}

LEARNING INTENTION
Objective: ${input.objective}
Key idea the learner must perceive in under five seconds: ${input.keyIdea}
Cognitive stage: ${input.cognitiveStage}

COMPOSITION
${formatHints[input.format]}
Build a visual narrative with an obvious entry point, progression and conclusion.
Use aggressive hierarchy: one dominant idea, only useful secondary elements, generous negative space.
Reserve clean areas for deterministic labels, formulas and teacher annotations to be added later.
The image must clarify a relation that prose explains poorly; never merely decorate the topic.

MUST SHOW
${mustShow}

MUST AVOID
${mustAvoid}

ACCURACY RULE
Do not rasterize equations or exact mathematical text. Mathematical notation, labels and exact values are added by a deterministic overlay after generation. Geometry, arrows, trajectories, spatial relations and conceptual metaphors must remain visually unambiguous.

STYLE
Original, professional educational design. No stock-template look. No rocket, puzzle, lightbulb or generic success metaphors unless they are literally part of the lesson content.
`;
}
