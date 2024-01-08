import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Title from "antd/es/typography/Title";
import { headers } from "next/headers";
import { jwtDecode } from "jwt-decode";
async function Server() {
    const session = await getServerSession(authOptions);
    if (!session) {
        console.log("Please Sign In before Entered The Server Page");
        redirect("/signin");
    }
    const headersList = headers();
    const web = headersList.get("sec-ch-ua");
    const mozilla =
        headersList.get("user-agent") ==
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0"
            ? "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0"
            : null;
    // const userAgent = headersList.get('user-agent');
    console.log(headersList);
    // console.log(userAgent);
    console.log(mozilla);
    const token: string =
        "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..cOesnVj9iogXHQnM.jkkNdPbeEcREideHarFAnc-UEx0gvOMtPp6JnpI5lAhKbjkgOc-rjZhk4q65fUgZITN5arFTuABH4kS-Tt5OJvNGV4CszWI_lLDN2Vb2STR8uWSCyrl9KGLL9qaKgpj5Y9OKKCxJ2fBHOa8ODr4VsKoMRASaJIvMOJ4khxQvjc8WFKK2iA3e9g.tBS7HeiTbxyG7UkwHujHBw";
    const decodedHeader = jwtDecode(token, { header: true });
    console.log(decodedHeader);

    return (
        <>
            <Title level={2}>Server</Title>
            <Title level={2}>Browers:</Title>
            {web ? <Title level={2}>Browers(Chrome or Edge): {web}</Title> : ""}
            {mozilla != null ? (
                <Title level={2}>Browers Mozilla: {mozilla}</Title>
            ) : (
                ""
            )}
        </>
    );
}

export default Server;
