/** @format */
import { ListUser } from "@/constant";
import { getSession } from "../../lib/session";
// import { getCookie, getServerSide } from "../../services";
import { NextRequest, NextResponse } from "next/server";
import { getCookie, getServerSide } from "@/app/services";

export default async function handler(
  req: NextRequest,
  res: NextResponse
): Promise<any | void | undefined> {
  if (req.method === "POST") {
    // method POST
    // console.log(await req.cookies.getAll);
    // console.log(await req.headers);
    try {
      const { username, password } = await req.json();
      if (!username || !password) {
        res = NextResponse.json({ status: 404 }, { statusText: "Invalid" });
      }
      const authenUser = await authenticateUser(username, password);
      const { user, sessionID } = authenUser;
      if (authenUser) {
        res = NextResponse.json(
          {
            status: 200,
            name: "Session Response",
            data: { sessionID },
            httpPath: "/",
            statusLogin: true,
          },
          { statusText: "Login Successfully" }
        );
        res.cookies.set({
          name: "My Session ID",
          value: sessionID,
          httpOnly: true,
          expires: 7,
          path: "/",
          secure: true,
          maxAge: 60 * 60 * 24 * 7,
          sameSite: "none",
        });
      } else {
        res = NextResponse.json(
          {
            status: 402,
            name: "Session Response",
            data: null,
            httpPath: "/login",
            statusLogin: false,
          },
          { statusText: "Login Unsuccessfully" }
        );
      }
      const request: any = Request;
      const response: any = Response;
      const session = await getSession(request, response);
      if (session.myData) delete session.myData;
      session.myData = {
        sessionID,
        user,
      };
      return res;
    } catch (error) {
      console.error(error);
    }
  } else {
    // method GET
  }
}

export { handler as POST, handler as GET };

// function authenticateUser
async function authenticateUser(
  username: string,
  password: string
): Promise<any | undefined> {
  if (!username || !password) {
    return;
  }
  const user: any | undefined = ListUser.find(
    ({ name, password }: { name: string; password: string }) =>
      name === username && password === password
  );
  // check authorize user if successfully create an sessionID for server in order to send session to client
  const sessionID: number = Math.floor(Math.random() * 100 + 1);
  return {
    user,
    sessionID,
  };
}

// method POST
// export async function POST(request: Request): Promise<any | undefined> {
//   const { username, password } = await request.json();
//   if (!username || !password) {
//     return Response.json({
//       message: "Missing Credentials",
//       status: 401,
//     });
//   }
//   var res: any = {};
//   // create random sessionID when client send request to server
//   // server session id
//   const authenUser = await authenticateUser(username, password);
//   const { user, sessionID } = authenUser;
//   if (authenUser) {
//     // const tokenUser = createToken(user, sessionID);
//     // setCookie(tokenUser);
//     res = Response.json({
//       name: "Session Response",
//       status: 200,
//       data: { sessionID },
//       message: "Login Successfully",
//       httpPath: "/",
//       statusLogin: true,
//     });
//   } else {
//     res = Response.json({
//       name: "Session Response",
//       status: 402,
//       data: null,
//       message: "Login Failed",
//       httpPath: "/login",
//       statusLogin: false,
//     });
//   }
//   const req: any = Request;
//   const response: any = Response;
//   const session = await getSession(req, response);
//   if (session.myData) delete session.myData
//   session.myData = {
//     sessionID, user
//   }
//   return res;
// }
