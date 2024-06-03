/** @format */

"use server";
import { cookies } from "next/headers";
import { ListUser } from "./_constant";
import { redirect } from "next/navigation";
export async function authenticate(username: string, password: string) {

  if (!username || !password) return;
  const user: any = ListUser.find(
    ({ user, pass }: { user: string; pass: string }) =>
      username === user && password === pass
  );

  if (user === undefined) {
    return {
      status: 400,
      message: "Username or password is not valid",
    };
  } else {
    createSession("Authorize Successful");
    return {
      status: 200,
      message: "Successful",
      key: "Authorize Successful",
      path: "/dashboard",
    };
  }
}

export async function createSession(tokens: string) {
  cookies().set("Authenticate", tokens, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function logout() {
  cookies().delete("Authenticate");
  redirect("/dashboard")
}