// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { headers } from "next/headers";
import { getCookie } from "../services";
import { redirect } from "next/navigation";
import Title from "antd/es/typography/Title";
import { MY_SESSION_TOKEN_KEY } from "@/constant";

export default async function Server() {
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //     console.log("Please Sign In before Entered The Server Page");
    //     redirect("/signin");
    // }
    // const headersList = headers();
    // const web = headersList.get("sec-ch-ua");
    // const mozilla =
    //     headersList.get("user-agent") ==
    //         "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0"
    //         ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0"
    //         : null;
    const session: string = getCookie(MY_SESSION_TOKEN_KEY);
    if (!session) {
        console.error("Please Sign In before Entered The Home Page");
        redirect("/signin");
    }
    return (
        <>
            <Title level={2}>Server</Title>
            {/* <Title level={2}>Browers:</Title>
            {web ? <Title level={2}>Browers(Chrome or Edge): {web}</Title> : ""}
            {mozilla != null ? (
                <Title level={2}>Browers Mozilla: {mozilla}</Title>
            ) : (
                ""
            )} */}
        </>
    );
}

