import { get_Server_Side_Props } from "../services";
import { redirect } from "next/navigation";
import Title from "antd/es/typography/Title";

export default async function TestPage() {
    const statusAuthen = await get_Server_Side_Props();
    if (statusAuthen.status === 400) {
        console.error(statusAuthen.message);
        redirect(statusAuthen.httpPath);
    }
    return (
        <>
            <Title level={2}>Test Page</Title>
        </>
    );
}
