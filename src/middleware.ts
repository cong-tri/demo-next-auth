/** @format */

import { type NextRequest, NextResponse } from "next/server";
import { storeSession } from "./app/lib/actions";

export async function middleware(request: NextRequest) {
  const session: any = await storeSession();

  const { token } = session ? session : null;
  const tokenClient = request.cookies.get("Authenticate")?.value as string;
  // const tokenClient = convertCookie(request.headers.get("cookie") as string);
  
  const valid = checkValidToken(token as string, tokenClient);

  if (config.matcher.includes(request.nextUrl.pathname) && valid == false) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard"],
};

// for compare 2 cookie
const checkValidToken = (tokenA: string, tokenB: string) => {
  if (tokenA === undefined && tokenB === undefined) return false;
  else if (tokenA !== tokenB) return false;
  else return true;
};

// for convert a string cookie to get value
const convertCookie = (token: string) => {
  if (token !== null) {
    const parts = token.split("=");
    const result = decodeURIComponent(parts[1]);
    return result;
  }
  else return
};
