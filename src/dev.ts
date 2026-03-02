import { createServer as createHttpServer } from "node:http";
import { createServer as createViteServer } from "vite";
import { app } from "./server";

const port = parseInt(process.env.PORT || "3000", 10);

const vite = await createViteServer({
  server: {
    middlewareMode: true,
    hmr: { port: port + 1 },
  },
  appType: "custom",
});

const server = createHttpServer(async (nodeReq, nodeRes) => {
  // Let Vite handle its own requests first
  vite.middlewares(nodeReq, nodeRes, async () => {
    try {
      // Build a Web Request from the Node request
      const protocol = "http";
      const host = nodeReq.headers.host || `localhost:${port}`;
      const url = new URL(nodeReq.url || "/", `${protocol}://${host}`);

      const headers = new Headers();
      for (const [key, val] of Object.entries(nodeReq.headers)) {
        if (val) headers.set(key, Array.isArray(val) ? val[0] : val);
      }

      const webReq = new Request(url.toString(), {
        method: nodeReq.method,
        headers,
      });

      const webRes = await app.fetch(webReq);

      // Write the Hono response back to Node
      nodeRes.statusCode = webRes.status;
      for (const [key, val] of webRes.headers.entries()) {
        nodeRes.setHeader(key, val);
      }
      const body = await webRes.arrayBuffer();
      nodeRes.end(Buffer.from(body));
    } catch (err) {
      console.error("Server error:", err);
      nodeRes.statusCode = 500;
      nodeRes.end("Internal Server Error");
    }
  });
});

server.listen(port, () => {
  console.log(`Dev server running on http://localhost:${port}`);
});
