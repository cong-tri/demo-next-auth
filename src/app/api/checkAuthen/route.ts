/** @format */

import { getServerSide } from "@/app/services";
import { NextRequest, NextResponse } from "next/server";
export default async function handler(
  req: NextRequest,
  res: NextResponse
): Promise<any | void | undefined> {
  if (req.method === "POST") {
    try {
      const cookieClient = await req.json();
      const { myData } = await getServerSide();
      if (myData === undefined) return;
      const { sessionID } = myData;
      if (sessionID === cookieClient) {
        return NextResponse.json({ status: 200 }, { statusText: "OK" });
      } else {
        return NextResponse.json({ status: 401 }, { statusText: "Not OK" });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
      console.log(req.headers);
  }
}
export { handler as POST, handler as GET };
