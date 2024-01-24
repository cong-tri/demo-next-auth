/** @format */

import { redirect } from "next/navigation";
import { get_Server_Side_Props } from "./services";
import Title from "antd/es/typography/Title";
export default async function Home(): Promise<any> {
  const statusAuthen = await get_Server_Side_Props();
  if (statusAuthen.status === 400) {
    console.error(statusAuthen.message);
    redirect(statusAuthen.httpPath);
  }
  const { data } = statusAuthen;
  return (
    <>
      <Title level={2}>Next Js Authentication</Title>
      {data !== null ? (
        <>
          <Title level={3}>
            Thông Tin User: {data?.name} - {data?.email}
          </Title>
        </>
      ) : null}
    </>
  );
}
