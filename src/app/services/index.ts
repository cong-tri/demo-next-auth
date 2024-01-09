import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
// get cookie
export const getCookie = (cname: string) => { 
    return cookies().get(cname)?.value as string; 
}
// set cookie
export const setCookie = (cname: string, token: string, pathUrl: string) => { 
    return cookies().set({
      name: cname,
      value: token,
      httpOnly: true,
      path: pathUrl,
    }); 
}
// set token
export const setToken = (userInfo:any, userID: number, cname: string) => { 
  return jwt.sign({ userInfo, userID }, cname, {
      algorithm: "HS256",
      expiresIn: "5y",
    });
}
// decode token
export const decodeToken = (token: string) => { 
  return jwt.decode(token) as jwt.JwtPayload; 
}