import { movieSchema } from "@/features/movie/constants/schema";
import { tvShowSchema } from "@/features/tv/constants/schema";
import { z } from "zod";

export {
  genreSchema,
  productionCompanySchema,
  productionCountrySchema,
  castSchema,
  crewSchema,
  mediaCreditSchema,
} from "./commonSchema";

export const mediaFilterSchema = z.object({
  genres: z.array(z.string()),
  releaseYear: z.string(),
  rating: z.string(),
  language: z.string(),
  sortBy: z.string(),
});

export const mediaSchema = z.discriminatedUnion("media_type", [
  movieSchema.extend({ media_type: z.literal("movie") }),
  tvShowSchema.extend({ media_type: z.literal("tv") }),
]);
