/** @format */

import { redirect } from "next/navigation";
import { checkAuthen } from "./services";
import Title from "antd/es/typography/Title";
export default async function Home() {
  const statusAuthen = await checkAuthen();
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
