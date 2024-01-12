// import cookie from 'cookie'
// import { IncomingMessage, ServerResponse } from 'http'
import { setCookie, setToken } from "@/app/services";
import { ListUser } from "@/constant";
// method POST
export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (!username || !password) {
    return Response.json({
      message: "Missing Credentials",
      status: 400,
    });
  }
  // // create random sessionID when client send request to server
  // // server session id
  const session = await authenticateUser(username, password);
  console.log(session);
  // const { user, sessionID } = session;
  if (session) {
    const tokenUser = setToken(session?.user, session?.sessionID);
    // setCookie(tokenUser);
    return Response.json({
      name: "Session Response",
      status: 200,
      data: {sessionID: session?.sessionID},
      message: "Login Successfully",
      httpPath: "/",
      statusLogin: true,
    });
  } else {
    return Response.json({
      name: "Session Response",
      status: 400,
      data: null,
      message: "Login Failed",
      httpPath: "/login",
      statusLogin: false,
    });
  }
}

export async function authenticateUser(username: string, password: string) {
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

// method GET
// export async function GET(req: Request) {
//   // const res = await
//   // console.log(req.headers);
//   // const cookies = cookie.parse(req.headers.cookie || '')
//   // const sessionID = cookies.sessionID

//   // if (sessionID) {
//   //   // Gửi yêu cầu đến server để lấy dữ liệu tạm thời được lưu trữ trên server
//   //   const data = await fetch(`/api/login/${sessionID}`)
//   //   res = await data.json();
//   //   console.log(res);
//   //   return res
//   // } else {
//   //   // ...
//   //   return null
//   // }
//   console.log(req.headers);
//   return 123;
// }
