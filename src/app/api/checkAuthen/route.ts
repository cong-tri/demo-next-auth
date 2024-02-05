/** @format */

import { getServerSide } from "@/app/services";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(
  req: NextRequest,
  res: NextResponse
): Promise<any | void | undefined> {
  if (req.method === "POST") {
    let dataResponse = {
      status: 200,
      data: {},
      message: "",
      path: "",
    };
    try {
      const cookieClient = await req.json();
      const { myData } = await getServerSide();
      if (myData === undefined) return;
      const { sessionID } = myData;
      if (sessionID === cookieClient) {
        dataResponse = {
          status: 200,
          data: myData.user,
          message: "Successfully",
          path: "/",
        };
      } else {
        dataResponse = {
          status: 401,
          data: {},
          message: "Unsuccessfully",
          path: "/signin",
        };
      }
      return NextResponse.json(dataResponse);
    } catch (error) {
      console.error(error);
    }
  } else {
  }
}
export { handler as POST, handler as GET };
