/**
 * sbt.ts  (routes)
 *
 * POST /mint-sbt          — for mint a Sensory Passport SBT
 * GET  /mint-sbt/:wallet  — tocheck whether a wallet already has one
 */

import { Router, Request, Response, NextFunction } from "express";
import { mintSBT, getSBT, SBTAlreadyExistsError } from "../services/sbt";
import {
  isValidPublicKey,
  isValidAccessibilityType,
  ALLOWED_ACCESSIBILITY_TYPES,
} from "../utils/validate";

const router = Router();

// POST /mint-sbt
router.post("/mint-sbt", async (req: Request, res: Response, next: NextFunction) => {
  const { wallet, accessibility_type } = req.body as {
    wallet?: string;
    accessibility_type?: string;
  };

  if (!wallet || typeof wallet !== "string") {
    res.status(400).json({ success: false, error: "wallet is required" });
    return;
  }

  if (!isValidPublicKey(wallet)) {
    res.status(400).json({ success: false, error: "Invalid Solana public key" });
    return;
  }

  const accessibilityType = accessibility_type ?? "general";

  if (!isValidAccessibilityType(accessibilityType)) {
    res.status(400).json({
      success: false,
      error: `Invalid accessibility_type. Must be one of: ${ALLOWED_ACCESSIBILITY_TYPES.join(", ")}`,
    });
    return;
  }

  try {
    const result = await mintSBT(wallet, accessibilityType);
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    if (err instanceof SBTAlreadyExistsError) {
      res.status(409).json({ success: false, error: err.message });
      return;
    }
    next(err);
  }
});

// GET /mint-sbt/:wallet
router.get("/mint-sbt/:wallet", (req: Request, res: Response) => {
  const { wallet } = req.params;

  if (!isValidPublicKey(wallet)) {
    res.status(400).json({ success: false, error: "Invalid Solana public key" });
    return;
  }

  const record = getSBT(wallet);

  if (!record) {
    res.status(404).json({ success: false, exists: false });
    return;
  }

  res.json({ success: true, exists: true, ...record });
});

export default router;
