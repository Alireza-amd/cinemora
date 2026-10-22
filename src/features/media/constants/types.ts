import z from "zod";
import type {
  genreSchema,
  castSchema,
  crewSchema,
  mediaCreditSchema,
  productionCompanySchema,
  productionCountrySchema,
} from "./commonSchema";
import type { mediaFilterSchema, mediaSchema } from "./schema";

export type MediaSchema = z.infer<typeof mediaSchema>;
export type Genre = z.infer<typeof genreSchema>;
export type MediaFilterSchema = z.infer<typeof mediaFilterSchema>;
export type CastSchema = z.infer<typeof castSchema>;
export type CrewSchema = z.infer<typeof crewSchema>;
export type MovieCreditSchema = z.infer<typeof mediaCreditSchema>;
export type ProductionCompanySchema = z.infer<typeof productionCompanySchema>;
export type ProductionCountrySchema = z.infer<typeof productionCountrySchema>;
