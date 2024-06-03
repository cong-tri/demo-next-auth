/** @format */

import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  if (currentPath === "/")
    return NextResponse.redirect(new URL("/dashboard", request.url));

  const authorByCookie = request.cookies.get("Authenticate")?.value;

  // if (currentPath === "/dashboard" && !authorByCookie) {
  //   console.log("signin");
  //   return NextResponse.redirect(new URL("/signin", request.url));
  // }

  const requestHeaders = new Headers(request.headers);

  if (requestHeaders.has("Authorization") == false)
    requestHeaders.set("Authorization", authorByCookie ? `Bearer ${authorByCookie}` : "");

  const authenByHeader = requestHeaders.get("Authorization");

  if (currentPath === "/dashboard") 
    if (!authenByHeader && authenByHeader !== `Bearer ${authorByCookie}`) 
      return NextResponse.redirect(new URL("/signin", request.url));

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  return response;
}
export const config = {
  matcher: ["/", "/dashboard"],
};
