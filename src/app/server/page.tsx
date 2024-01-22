import { redirect } from "next/navigation";
import { checkAuthen } from "../services";
import Title from "antd/es/typography/Title"
export default async function Server() {
    const statusAuthen = await checkAuthen();
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
