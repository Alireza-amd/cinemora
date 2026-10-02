import z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean(),
});

export const signUpSchema = z
  .object({
    fullName: z.string().min(1),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must at least contain 8 letter.")
      .superRefine((value, ctx) => {
        if (!value.match(/[a-z]/g)) {
          ctx.addIssue("Password must contain lowercase letter.");
        }
        if (!value.match(/[A-Z]/g)) {
          ctx.addIssue("Password must contain uppercase letter.");
        }
        if (!value.match(/[0-9]/g)) {
          ctx.addIssue("Password must container number.");
        }
      }),
    confirmPassword: z.string(),
    agreeTerm: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords do not match.",
  });
