/** @format */

import { redirect } from "next/navigation";
import Title from "antd/es/typography/Title";
import { getCookie } from "./services";
export default async function Home(): Promise<any> {
  async function checkAuthen(): Promise<any | undefined> {
    'use server'
    let dataResponse = {
      status: 400,
      data: {},
      message: "",
      path: ''
    };
    try {
      const cookieClient = getCookie('sessionId');
      if (isNaN(cookieClient)) {
        dataResponse = {
          status: 401,
          data: {},
          message: "Cookie is not valid",
          path: '/signin'
        };;
      }
      const response = await fetch(`http://localhost:3000/api/checkAuthen`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cookieClient),
      })
      const data = await response?.json()
      if (data.status === 200) {
        dataResponse = {
          status: 200,
          data: data.data,
          message: "Successfully",
          path: '/'
        }
      } else {
        dataResponse = {
          status: 400,
          data: {},
          message: "Unsuccessfully",
          path: '/signin'
        };
      }
      return Response.json(dataResponse);
    } catch (error) {
      console.error(error);
    }
  }
  let authen = await checkAuthen();
  authen = await authen?.json()
  if (authen?.status === 400) {
    redirect(authen.path);
  }
  return (
    <>
      <Title level={2}>Next Js Authentication</Title>
    </>
  )
}
