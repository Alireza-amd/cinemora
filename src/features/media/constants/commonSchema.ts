import { z } from "zod";

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const productionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
});

export const productionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

export const castSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string(),
  profile_path: z.string().nullable(),
});

export const crewSchema = z.object({
  id: z.number(),
  name: z.string(),
  job: z.string(),
  department: z.string(),
  profile_path: z.string().nullable(),
});

export const mediaCreditSchema = z.object({
  cast: z.array(castSchema),
  crew: z.array(crewSchema),
});
