import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { MY_SECRET_TOKEN, MY_SESSION_TOKEN_KEY } from "@/constant";
// get cookie
export const getCookie = (): string => {
  return cookies().get(MY_SESSION_TOKEN_KEY)?.value as string;
};
// set cookie
export const setCookie = (token: string): any | undefined => {
  return cookies().set(MY_SESSION_TOKEN_KEY, token);
};
//
export function getSessionIdAndCreateIfMissing() {
  const sessionId = getCookie();
  if (!sessionId) {
    const newSessionId = crypto.randomUUID();
    setCookie(newSessionId);
    return newSessionId;
  }
  return sessionId;
}
//
// set token
export const setToken = (
  sessionData: any,
  sessionID: number,
): any | undefined => {
  return jwt.sign({ sessionData, sessionID }, MY_SECRET_TOKEN, {
    algorithm: "HS256",
    expiresIn: "5d",
  });
};
// decode token
export const decodeToken = (token: string): any | undefined => {
  return jwt.decode(token) as jwt.JwtPayload;
};


// getServerSideProps
export async function get_Server_Side_Props() {
  const session: string = await getCookie();
  // const infoUser: jwt.JwtPayload = await decodeToken(session);
  return {
    session,
    // infoUser,
  };
}
