// import { authOptions } from './api/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { get_Server_Side_Props } from "./services";
import Title from "antd/es/typography/Title";
export default async function Home(
) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   console.log("Please Sign In before Entered The Home Page");
  //   redirect('/signin');
  // };
  // const session: string = getCookie();
  const props = await get_Server_Side_Props();
  const session: string = props?.session;
  if (!session) {
    console.error("Please Sign In before Entered The Home Page");
    redirect("/signin");
  }
  const dataUser: jwt.JwtPayload = props.infoUser;
  const { sessionData, sessionID } = dataUser;
  return (
    <>
      <Title level={2}>Next Js Authentication</Title>
      {/* {session ? <Title>{session.user?.name} - {session.user?.email} </Title> : null} */}
      {dataUser ? (
        <>
          <Title level={3}>
            Thông Tin User: {sessionData?.name} - {sessionData?.email}
          </Title>
          <Title level={3}>ClientID: {sessionID}</Title>
        </>
      ) : null}
    </>
  );
}

