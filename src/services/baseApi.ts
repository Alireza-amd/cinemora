import { env } from "@/constants/config";
import axios from "axios";

export const baseApi = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${env.VITE_TMDB_ACCESS_TOKENS}`,
    Accept: "application/json",
  },
});
