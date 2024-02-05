/** @format */
import { ListUser } from "@/constant";
import { getSession } from "../../lib/session";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(
  req: NextRequest,
  res: NextResponse
): Promise<any | void | undefined> {
  if (req.method === "POST") {
    // method POST
    let dataResponse = {
      status: 200,
      name: "",
      data: {},
      httpPath: "",
      message: "",
      statusLogin: true,
    };
    try {
      const { username, password } = await req.json();
      const authenUser = await authenticateUser(username, password);
      const { user, sessionID } = authenUser.props;
      if (authenUser.status === 200) {
        dataResponse = {
          status: 200,
          name: "Session Response",
          data: { sessionID },
          httpPath: "/",
          message: authenUser.message,
          statusLogin: true,
        };
      } else {
        dataResponse = {
          status: 401,
          name: "Session Response",
          data: {},
          httpPath: "/signin",
          message: authenUser.message,
          statusLogin: false,
        };
      }
      const request: any = Request;
      const response: any = Response;
      const session = await getSession(request, response);
      if (session.myData !== null) {
        delete session.myData;
      }
      session.myData = {
        sessionID,
        user,
      };
      session.commit();
      return NextResponse.json(dataResponse);
    } catch (error) {
      console.error(error);
    }
  } else {
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
  if (user === undefined) {
    return {
      status: 401,
      props: {},
      message: "Invalid username or password",
    };
  }
  // check authorize user if successfully create an sessionID for server in order to send session to client
  const sessionID: number = Math.floor(Math.random() * 100 + 1);
  return {
    status: 200,
    props: {
      user,
      sessionID,
    },
    message: "Login Successfully",
  };
}
