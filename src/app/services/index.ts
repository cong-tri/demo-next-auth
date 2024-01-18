/** @format */
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { MY_SECRET_TOKEN, MY_SESSION_TOKEN_KEY } from "@/constant";
import { getSession } from "../lib/session";
// get cookies
export const getCookie = (): string => {
  return cookies().get(MY_SESSION_TOKEN_KEY)?.value as string;
};
// create cookies
export const setCookie = (token: string): any | undefined => {
  return cookies().set(MY_SESSION_TOKEN_KEY, token, {
    expires: 5,
    path: "/",
    maxAge: 60 * 10,
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
    expiresIn: "10minutes",
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
export async function get_Server_Side_Props() {
  const session: string = await getCookie();
  const infoUser: jwt.JwtPayload = await decodeToken(session);
  return {
    session,
    infoUser,
  };
}

export default async function handler(req: any, res: any): Promise<any>{
  const session = await getSession(req, res);
  const data = { hello: "hello im a data in session" };
  session.myData = data;
  // return Response.json({
  //   status: 200,
  //   res: session.myData
  // })
}
export const config = {
  api: {
    externalResolver: true,
  },
};

export async function getServerSide(): Promise<any>{
  // const session = await getSession(req, res);
  const request: any = Request;
  const response: any = Response;
  const session = await getSession(request, response);
  console.log(session);
  
  return {
    props: {
      dataInSession: session.myData,
    },
  };
}
