import { redirect } from "next/navigation";
import { getServerSide, get_Server_Side_Props } from "../services";
import Title from "antd/es/typography/Title";

export default async function TestPage() {
    // const props = await get_Server_Side_Props();
    // const session: string = props?.session;
    // if (!session) {
    //     console.error("Please Sign In before Entered The Home Page");
    //     redirect("/signin");
    // }
    const data = await getServerSide();
    console.log(data);

    return (
        <>
            <Title level={2}>Test Page</Title>
        </>
    );
}
