import type z from "zod";
import type { signInFormSchema, signUpFormSchema, userSchema } from "./schema";

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export type SignInSchema = Pick<SignInFormSchema, "email" | "password">;
export type SignUpSchema = Pick<
  SignUpFormSchema,
  "fullName" | "email" | "password"
>;
export type User = z.infer<typeof userSchema>;
