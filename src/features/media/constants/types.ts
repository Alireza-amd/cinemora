import z from "zod";
import type { mediaSchema, movieSchema, tvShowSchema } from "./schema";

export type MovieSchema = z.infer<typeof movieSchema>;
export type TVSchema = z.infer<typeof tvShowSchema>;
export type MediaSchema = z.infer<typeof mediaSchema>;
