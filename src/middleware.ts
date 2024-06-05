/** @format */

import { type NextRequest, NextResponse } from "next/server";
import { storeSession } from "./app/lib/actions";

export async function middleware(request: NextRequest) {
  const session: any = await storeSession();

  const { token } = session ? session : null;
  const tokenClient = request.cookies.get("Authenticate")?.value;

  const valid = checkValidToken(token as string, tokenClient as string);

  if (config.matcher.includes(request.nextUrl.pathname) && valid == false)
    return NextResponse.redirect(new URL("/signin", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard"],
};

const checkValidToken = (tokenA: string, tokenB: string) => {
  if (tokenA === undefined && tokenB === undefined) return false;
  else if (tokenA !== tokenB) return false;
  else return true;
};
