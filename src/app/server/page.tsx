import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/page';
import { redirect } from 'next/navigation';
import Title from 'antd/es/typography/Title'
import { headers } from "next/headers"
async function Server() {
    const session = await getServerSession(authOptions);
    if (!session) {
        console.log("Please Sign In before Entered The Server Page");
        redirect('/signin');
    };
    const headersList = headers();
    const userAgent = headersList.get('sec-ch-ua');
    // const userAgent = headersList.get('user-agent');
    console.log(headersList);
    console.log(userAgent);

    return (
        <>
            <Title level={2}>Server</Title>
            <Title level={2}>User: {userAgent}</Title>
        </>

    )
}

export default Server