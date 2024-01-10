// import { authOptions } from './api/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { decodeToken, getCookie } from "./services";
import Title from "antd/es/typography/Title";
export default async function Home() {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   console.log("Please Sign In before Entered The Home Page");
  //   redirect('/signin');
  // };
  const session: string = getCookie();
  if (!session) {
    console.error("Please Sign In before Entered The Home Page");
    redirect("/signin");
  }
  const infoUser: jwt.JwtPayload = decodeToken(session);
  const { userInfo, userID } = infoUser;

  return (
    <>
      <Title level={2}>Next Js Authentication</Title>
      {/* {session ? <Title>{session.user?.name} - {session.user?.email} </Title> : null} */}
      {infoUser ? (
        <>
          <Title level={3}>
            Thông Tin User: {userInfo?.name} - {userInfo?.email}
          </Title>
          <Title level={3}>ClientID: {userID}</Title>
        </>
      ) : null}
    </>
  );
}
