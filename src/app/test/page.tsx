import { checkAuthen } from "../services";
import { redirect } from "next/navigation";
import Title from "antd/es/typography/Title";

export default async function TestPage() {
    const statusAuthen = await checkAuthen();
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
