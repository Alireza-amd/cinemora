import type z from "zod";
import type { signInSchema, signUpSchema } from "./schema";

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
