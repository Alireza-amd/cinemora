import type { SignInSchema, SignUpSchema } from "../constants/types";
import { userSchema } from "../constants/schema";

// don not need local_storage_key after connecting code below to api
const LOCAL_STORAGE_KEY = "USER";

export function signIn(data: SignInSchema) {
  // replace code below by posting data to your signIn api
  return new Promise((res) => setTimeout(res, 500)).then(() => {
    const user = { id: crypto.randomUUID(), email: data.email };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    return userSchema.parse(user);
  });
}
export function signUp(data: SignUpSchema) {
  // replace code below by posting data to your sign up api
  return new Promise((res) => setTimeout(res, 500)).then(() => {
    const user = { id: crypto.randomUUID(), email: data.email };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    return userSchema.parse(user);
  });
}
export function logout() {
  // replace code below by calling your logout api

  return new Promise((res) => setTimeout(res, 500)).then(() =>
    localStorage.removeItem(LOCAL_STORAGE_KEY),
  );
}
export function getUser() {
  // replace code below by calling to your getUser api

  return new Promise((res) => setTimeout(res, 500)).then(() => {
    const user = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (user == null) return user;

    return userSchema.parse(JSON.parse(user));
  });
}
