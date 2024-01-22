/** @format */
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { MY_SECRET_TOKEN, MY_SESSION_TOKEN_KEY } from "@/constant";
import { getSession } from "../lib/session";
import { redirect } from "next/navigation";
// get cookies
export const getCookie = (cname: string): number => {
  return Number(cookies().get(cname)?.value);
};
// create cookies
export const setCookie = (token: string): any | undefined => {
  return cookies().set(MY_SESSION_TOKEN_KEY, token, {
    expires: 5,
    path: "/",
    maxAge: 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};
// create token
export const createToken = (
  sessionData: any,
  sessionID: number
): any | undefined => {
  return jwt.sign({ sessionData, sessionID }, MY_SECRET_TOKEN, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
};
// decode token
export const decodeToken = (token: string): any | undefined => {
  return jwt.decode(token) as jwt.JwtPayload;
};
// verify token
export const verifyToken = (token: any) => {
  try {
    return jwt.verify(token, MY_SECRET_TOKEN);
  } catch (error) {
    return null;
  }
};
// getServerSideProps
// export async function get_Server_Side_Props() {
//   const session: number = await getCookie(MY_SESSION_TOKEN_KEY);
//   const infoUser: jwt.JwtPayload = await decodeToken(session);
//   return {
//     session,
//     infoUser,
//   };
// }

// place to store session information
export async function getServerSide(): Promise<any> {
  const request: any = Request;
  const response: any = Response;
  const session = await getSession(request, response);
  return {
    myData: session.myData,
  };
}

// handle check authentication
export async function checkAuthen(): Promise<any>{
  const { myData } = await getServerSide();
  const { sessionID, user } = myData;
  const cookieClient = getCookie("Session%20ID");
  if (sessionID === cookieClient) {
    return {
      status: 200,
      message: "Successfully logged in",
      data: user,
      httpPath: "/",
    }
  } else {
    delete myData.user;
    return {
      status: 400,
      message: "Please Sign In before Entered The Home Page",
      data: null,
      httpPath: "/signin",
    }
  }
}
