import { redirect } from "next/navigation";
import { get_Server_Side_Props } from "./services";
import Title from "antd/es/typography/Title";
export default async function Home(
) {
  const props = await get_Server_Side_Props();
  const session: string = props?.session;
  if (!session) {
    console.error("Please Sign In before Entered The Home Page");
    redirect("/signin");
  }
  const dataUser: any = props.infoUser;
  const { sessionData, sessionID } = dataUser;
  return (
    <>
      <Title level={2}>Next Js Authentication</Title>
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

