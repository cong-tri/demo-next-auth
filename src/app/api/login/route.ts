import { setCookie, setToken } from "@/app/services";
import { ListUser } from "@/constant";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (!username || !password) {
    return Response.json({
      message: "Missing Credentials",
      status: 400,
    });
  }

  const user = ListUser.find(
    ({ name, password }: { name: string; password: string }) =>
      name === username && password === password
  );

  if (user) {
    const clientID = Math.floor(Math.random() * 100 + 1);
    const tokenUser = setToken(user, clientID);
    setCookie(tokenUser);
    return Response.json({
      status: 200,
      data: user,
      message: "Login successfully",
      httpPath: "/",
      statusLogin: true,
    });
  } else {
    return Response.json({
      status: 400,
      data: null,
      message: "Login failed",
      statusLogin: false,
    });
  }
}
