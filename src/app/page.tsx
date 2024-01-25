/** @format */

import { redirect } from "next/navigation";
import Title from "antd/es/typography/Title";
import { getCookie } from "./services";
export default async function Home(): Promise<any> {
  async function checkAuthen() {
    'use server'
    try {
      const cookieClient = getCookie('My Session ID')
      const response = await fetch(`http://localhost:3000/api/checkAuthen`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cookieClient),
      })
      const data = await response?.json()
      if (data.status !== 200 && response.statusText != "OK") return false
      return true;
    } catch (error) {
      console.error(error);
    }
  }
  const isValid = await checkAuthen();
  if (isValid == false) {
    redirect('/signin')
  }
  async function getAuth() {
    // 'use server'
    try {
      const response = await fetch(`http://localhost:3000/api/login`, {
        method: 'GET',
      })
      const data = await response;
      console.log(data);

    } catch (err) {
      console.log(err);

    }
  }
  const bool = await getAuth()
  // console.log(bool);
  return (
    <>
      <Title level={2}>Next Js Authentication</Title>
    </>
  )
}
