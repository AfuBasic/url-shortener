import type { Response } from "express";
export const subscribers = new Map<string, Set<Response>>();
