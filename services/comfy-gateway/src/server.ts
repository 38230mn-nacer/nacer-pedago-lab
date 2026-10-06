import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";
import { VisualPedagoRequest, type VisualPedagoResponse } from "./contracts.js";
import { runVisualPedago } from "./comfy.js";

const port = Number(process.env.PORT || 8787);

function json(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(JSON.stringify(body, null, 2));
}

async function readJson(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  let size = 0;

  for await (const chunk of req) {
    const buffer = Buffer.from(chunk);
    size += buffer.length;
    if (size > 1_000_000) throw new Error("PAYLOAD_TOO_LARGE");
    chunks.push(buffer);
  }

  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

const server = createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/health") {
      return json(res, 200, {
        ok: true,
        service: "nacer-comfy-gateway",
        mode: process.env.NACER_COMFY_MODE === "live" ? "live" : "mock"
      });
    }

    if (req.method === "GET" && req.url === "/api/v1/services") {
      return json(res, 200, {
        services: [
          {
            id: "visual-pedago-v1",
            status: "implemented",
            workflow: "NACER_VISUAL_PEDAGO_V1"
          },
          { id: "capsule-v1", status: "planned" },
          { id: "professeur-nacer-v1", status: "planned" },
          { id: "content-variants-v1", status: "planned" }
        ]
      });
    }

    if (req.method === "POST" && req.url === "/api/v1/visuals/generate") {
      const parsed = VisualPedagoRequest.safeParse(await readJson(req));
      if (!parsed.success) {
        return json(res, 400, {
          error: "INVALID_REQUEST",
          details: parsed.error.flatten()
        });
      }

      const requestId = req.headers["idempotency-key"]?.toString() || randomUUID();
      const run = await runVisualPedago(requestId, parsed.data);

      const response: VisualPedagoResponse = {
        requestId,
        service: "visual-pedago-v1",
        serviceVersion: "1.0.0",
        workflow: "NACER_VISUAL_PEDAGO_V1",
        workflowVersion: run.workflowVersion,
        mode: run.mode,
        status: run.mode === "mock" ? "mocked" : "verification-required",
        trace: {
          comfyJobId: run.comfyJobId
        },
        assets: run.assets,
        verification: {
          required: true,
          checks: [
            "intention pédagogique visible en moins de 5 secondes",
            "exactitude conceptuelle",
            "absence de texte ou formule inventés",
            "composition lisible et non surchargée",
            "plus-value réelle par rapport au texte"
          ]
        }
      };

      return json(res, 200, response);
    }

    return json(res, 404, { error: "NOT_FOUND" });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const status =
      message === "PAYLOAD_TOO_LARGE" ? 413 :
      message.includes("WORKFLOW_NOT_CONFIGURED") ? 503 :
      message === "COMFY_API_KEY_MISSING" ? 503 :
      500;

    return json(res, status, {
      error: "SERVICE_ERROR",
      message
    });
  }
});

server.listen(port, () => {
  console.log(`Nacer Comfy Gateway listening on http://localhost:${port}`);
});
