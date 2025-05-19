// Simplified PayPal implementation that doesn't require API keys
// since we're using a direct PayPal.me link
import { Request, Response } from "express";

export async function getClientToken() {
  return "dummy-token";
}

export async function createPaypalOrder(req: Request, res: Response) {
  res.status(200).json({ id: "dummy-order-id" });
}

export async function capturePaypalOrder(req: Request, res: Response) {
  res.status(200).json({ status: "COMPLETED" });
}

export async function loadPaypalDefault(req: Request, res: Response) {
  res.json({ clientToken: "dummy-token" });
}