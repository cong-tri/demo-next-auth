// import { setCookie, createToken } from "@/app/services";
import { ListUser } from "@/constant";
import { getSession } from "../lib/session";
// method POST
export async function POST(request: Request): Promise<any | undefined> {
  const { username, password } = await request.json();
  if (!username || !password) {
    return Response.json({
      message: "Missing Credentials",
      status: 400,
    });
  }
  var res: any = {};
  // create random sessionID when client send request to server
  // server session id
  const authenUser = await authenticateUser(username, password);
  const { user, sessionID } = authenUser;
  if (authenUser) {
    // const tokenUser = createToken(user, sessionID);
    // setCookie(tokenUser);
    res = Response.json({
      name: "Session Response",
      status: 200,
      data: { sessionID },
      message: "Login Successfully",
      httpPath: "/",
      statusLogin: true,
    });
  } else {
    res = Response.json({
      name: "Session Response",
      status: 400,
      data: null,
      message: "Login Failed",
      httpPath: "/login",
      statusLogin: false,
    });
  }
  const req: any = Request;
  const response: any = Response;
  const session = await getSession(req, response);
  if (session.myData) delete session.myData
  session.myData = {
    sessionID, user
  }
  console.log(session);
  return res;
}
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