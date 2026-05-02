

import { Router, Request, Response, NextFunction } from "express";
import { adaptContent } from "../services/adapt";
import { isValidPublicKey } from "../utils/validate";

const router = Router();

router.post(
  "/adapt-content",
  async (req: Request, res: Response, next: NextFunction) => {
    const { wallet, raw_content } = req.body as {
      wallet?: string;
      raw_content?: string;
    };

    // ── Validate 

    if (!wallet || typeof wallet !== "string") {
      res.status(400).json({ success: false, error: "wallet is required" });
      return;
    }

    if (!isValidPublicKey(wallet)) {
      res.status(400).json({ success: false, error: "Invalid Solana public key" });
      return;
    }

    if (!raw_content || typeof raw_content !== "string" || raw_content.trim().length < 10) {
      res.status(400).json({ success: false, error: "raw_content is required (min 10 chars)" });
      return;
    }

    if (raw_content.length > 8000) {
      res.status(400).json({ success: false, error: "raw_content too long (max 8000 chars)" });
      return;
    }

    // ── Adapt ──

    try {
      const result = await adaptContent(wallet, raw_content);
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
