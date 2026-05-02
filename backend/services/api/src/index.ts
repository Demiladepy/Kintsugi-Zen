import "dotenv/config";
import express from "express";
import sbtRoutes from "./routes/sbt";
import adaptRoutes from "./routes/adapt";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const port = parseInt(process.env.PORT ?? "3000", 10);

app.use(express.json({ limit: "16kb" }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use("/", sbtRoutes);
app.use("/", adaptRoutes);

// ── Health check ────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// ── Error handler (must be last) ────────────────────────────────────────────
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[api] listening on port ${port}`);
});
