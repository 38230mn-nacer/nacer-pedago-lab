import { Comfy } from "@comfyorg/sdk";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { GeneratedAsset, VisualPedagoRequestType } from "./contracts.js";
import { buildVisualPedagoPrompt } from "./pedagogy.js";

type Manifest = {
  service: string;
  serviceVersion: string;
  workflow: string;
  workflowVersion: string;
  inputs: {
    prompt: { nodeId: string; field: string };
  };
  output: { nodeId: string };
};

function resolveConfiguredPath(value: string | undefined, fallback: string): string {
  return path.resolve(process.cwd(), value || fallback);
}

async function loadManifest(): Promise<Manifest> {
  const manifestPath = resolveConfiguredPath(
    process.env.NACER_VISUAL_MANIFEST_PATH,
    "../../workflows/nacer_visual_pedago_v1/manifest.json"
  );
  return JSON.parse(await readFile(manifestPath, "utf8")) as Manifest;
}

function assertManifestReady(manifest: Manifest): void {
  const placeholders = [
    manifest.inputs.prompt.nodeId,
    manifest.output.nodeId
  ].filter((x) => !x || x.startsWith("__"));

  if (placeholders.length) {
    throw new Error(
      "WORKFLOW_NOT_CONFIGURED: export NACER_VISUAL_PEDAGO_V1 in API format, then replace manifest node placeholders."
    );
  }
}

export async function runVisualPedago(
  requestId: string,
  input: VisualPedagoRequestType
): Promise<{
  workflowVersion: string;
  comfyJobId?: string;
  assets: GeneratedAsset[];
  mode: "mock" | "live";
}> {
  const mode = process.env.NACER_COMFY_MODE === "live" ? "live" : "mock";
  const manifest = await loadManifest();

  if (mode === "mock") {
    return {
      workflowVersion: manifest.workflowVersion,
      mode,
      assets: [{
        type: "image",
        contentType: "image/png",
        url: `mock://visual-pedago/${requestId}.png`,
        expiresAt: null
      }]
    };
  }

  assertManifestReady(manifest);

  const apiKey = process.env.COMFY_API_KEY;
  if (!apiKey) {
    throw new Error("COMFY_API_KEY_MISSING");
  }

  const workflowPath = resolveConfiguredPath(
    process.env.NACER_VISUAL_WORKFLOW_PATH,
    "../../workflows/nacer_visual_pedago_v1/workflow_api.json"
  );

  const client = new Comfy({
    apiKey,
    clientInfo: "nacer-pedago-lab/visual-pedago-v1"
  });

  const workflow = await client.workflows.fromFile(workflowPath);
  workflow.setInput(
    manifest.inputs.prompt.nodeId,
    manifest.inputs.prompt.field,
    buildVisualPedagoPrompt(input)
  );

  // Ne pas réutiliser requestId comme Idempotency-Key Comfy.
  // Le contrat Comfy v2 rejette la réutilisation d'une clé déjà consommée.
  const job = await client.run(workflow, {
    apiKey,
    timeoutMs: 180_000
  });

  const outputs = job.getOutputs(manifest.output.nodeId);
  if (!outputs.length) {
    throw new Error("COMFY_NO_OUTPUT");
  }

  const assets: GeneratedAsset[] = [];
  for (const output of outputs.slice(0, input.variants)) {
    const { url, expiresAt } = await output.getDownloadUrl();
    assets.push({
      type: output.type,
      contentType: output.contentType,
      url,
      expiresAt: expiresAt ? String(expiresAt) : null
    });
  }

  return {
    workflowVersion: manifest.workflowVersion,
    comfyJobId: job.id,
    assets,
    mode
  };
}
