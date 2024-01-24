import { redirect } from "next/navigation";
import { get_Server_Side_Props } from "../services";
import Title from "antd/es/typography/Title"
export default async function Server() {
    const statusAuthen = await get_Server_Side_Props();
    if (statusAuthen.status === 400) {
        console.error(statusAuthen.message);
        redirect(statusAuthen.httpPath);
    }
    return (
        <>
            <Title level={2}>Server</Title>
        </>
    );
}
