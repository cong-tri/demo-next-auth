// import cookie from "cookie"
// import jwt from "jsonwebtoken"
// const secret = "my-secret-key-token"
// export function getSession(req:any) {
//   const cookies = cookie.parse(req.headers.cookie || "");
//   const token = cookies.session;
//   if (!token) return null;
//   try {
//     return jwt.verify(token, secret);
//   } catch (err) {
//     return null;
//   }
// }