import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  ClapperboardIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import type { SignInFormSchema } from "../constants/types";
import { signInFormSchema } from "../constants/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "../hooks/useAuth";

export function SignInPage() {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  function onSubmit(formValues: SignInFormSchema) {
    signIn(formValues).catch((error) => {
      form.setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    });
  }

  return (
    <div className="w-sm sm:w-md md:w-lg max-w-xl py-2">
      <Card className="border-2 border-mauve-700 dark:backdrop-blur-xl dark:bg-white/10">
        <CardHeader className="flex flex-col justify-center items-center">
          {form.formState.errors.root && (
            <FieldError
              className="text-lg"
              errors={[form.formState.errors.root]}
            />
          )}
          <ClapperboardIcon className="w-12 h-12 mb-4 text-rose-700 md:h-20 md:w-20" />
          <CardTitle className="text-2xl md:text-4xl font-bold">
            Welcome back
          </CardTitle>
          <CardDescription className="w-[50%] text-center">
            Sign in to continue discovering great movies and TV shows.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <InputGroup className="rounded-sm border-2 border-slate-800">
                    <InputGroupInput
                      {...field}
                      id="email"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email..."
                    />
                    <InputGroupAddon>
                      <MailIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <InputGroup className="rounded-sm border-2 border-slate-800">
                    <InputGroupInput
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Password..."
                    />
                    <InputGroupAddon>
                      <LockIcon />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="cursor-pointer"
                        onClick={() => setShowPassword((c) => !c)}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex justify-between items-center gap-2">
              <Controller
                name="rememberMe"
                control={form.control}
                render={({ field }) => (
                  <Field orientation="horizontal">
                    <Checkbox
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="cursor-pointer data-[state=checked]:bg-rose-700! data-[state=checked]:border-rose-700! data-[state=checked]:text-white!"
                    />
                    <FieldLabel htmlFor={field.name}>Remember me</FieldLabel>
                  </Field>
                )}
              />
              <Link className="text-rose-700 text-nowrap" to="/">
                Forget password?
              </Link>
            </div>

            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="relative p-6 cursor-pointer text-white bg-rose-700 rounded-sm"
            >
              <span>Sign In</span>
              <ChevronRight className="w-8 h-8 absolute right-4" />
            </Button>
          </form>

          <div className="flex items-center justify-center relative after:w-full after:h-px after:bg-mauve-700 after:absolute">
            <span className="px-2 relative rounded-lg dark:bg-mauve-700 bg-rose-700 text-white z-10">
              or
            </span>
          </div>

          <Button variant="outline" className="p-6 rounded-sm" asChild>
            <Link to="/">Continue with Google</Link>
          </Button>

          <CardDescription className="self-center">
            Don't have an account?{" "}
            <Link className="text-rose-700" to="/sign-up">
              Create an account
            </Link>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
