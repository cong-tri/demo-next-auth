import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Title from 'antd/es/typography/Title'

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    console.log("Please Sign In before Entered The Home Page");
    redirect('/signin');
  };
  return (
    <>
      <Title level={2}>Next Js Authentication</Title>
      {session ? <Title>{session.user?.name} - {session.user?.email} </Title> : null}
    </>
  )
}
