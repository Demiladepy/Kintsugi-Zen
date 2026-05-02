import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("[api] unhandled error:", err);
  const status = (err as { status?: number }).status ?? 500;
  const message =
    process.env.NODE_ENV === "production" ? "Internal server error" : String(err.message);
  res.status(status).json({ success: false, error: message });
};
