/** @format */

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { kv } from "@vercel/kv";

export async function authenticate(username: string, password: string) {
  if (!username || !password) return;

  if (username !== "congtri" && password !== "12345") {
    return {
      status: 400,
      message: "Username or password is not valid",
    };
  } else {
    const sessionID = Math.round(Math.random() * (20 - 10) + 10);

    const token = "Authorize Successfully";

    await kv.set("Session", {sessionID, token});

    return {
      status: 200,
      message: "Successful",
      path: "/dashboard",
      token,
    };
  }
}

export async function storeSession() {
  const session:any = await kv.get("Session");
  return session;
}

export async function logout() {
  await kv.set("Session", {});
  cookies().delete("Authenticate");
  redirect("/dashboard");
}
