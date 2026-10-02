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
  UserIcon,
} from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import type { SignUpSchema } from "../constants/types";
import { signUpSchema } from "../constants/schema";
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

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerm: false,
    },
  });
  const isTermsAgreed = form.watch("agreeTerm");
  function onSubmit(formValues: SignUpSchema) {
    console.log(formValues);
    form.reset();
  }

  return (
    <div className="w-sm sm:w-md md:w-lg max-w-xl py-2">
      <Card className="border-2 border-mauve-700">
        <CardHeader className="flex flex-col justify-center items-center">
          <ClapperboardIcon className="w-12 h-12 mb-4 text-rose-700 md:h-20 md:w-20" />
          <CardTitle className="text-2xl md:text-4xl font-bold">
            Create Your Account
          </CardTitle>
          <CardDescription className="w-[50%] text-center">
            Join CINEMORA and keep track of the movies and shows you love.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                  <InputGroup className="rounded-sm border-2 border-slate-800">
                    <InputGroupInput
                      {...field}
                      id="fullName"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your full name..."
                    />
                    <InputGroupAddon>
                      <UserIcon />
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirm Password
                  </FieldLabel>
                  <InputGroup className="rounded-sm border-2 border-slate-800">
                    <InputGroupInput
                      {...field}
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm Password..."
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
                        onClick={() => setShowConfirmPassword((c) => !c)}
                      >
                        {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="agreeTerm"
              control={form.control}
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer data-[state=checked]:bg-rose-700! data-[state=checked]:border-rose-700! data-[state=checked]:text-white!"
                  />
                  <FieldLabel htmlFor={field.name} className="">
                    <div className="flex items-center justify-start gap-2 text-nowrap flex-wrap">
                      I agree to
                      <Link to="/" className="text-rose-700 text-nowrap">
                        Terms & Conditions
                      </Link>
                      and
                      <Link to="/" className="text-rose-700 text-nowrap">
                        Privacy Policy
                      </Link>
                    </div>
                  </FieldLabel>
                </Field>
              )}
            />

            <Button
              type="submit"
              disabled={!isTermsAgreed}
              className="relative p-6 cursor-pointer text-white bg-rose-700 rounded-sm"
            >
              <span>Create Account</span>
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
            Already have an account?
            <Link className="text-rose-700 ml-2" to="/sign-in">
              Sign In
            </Link>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
