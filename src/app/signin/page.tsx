import Title from "antd/es/typography/Title";
import SignInForm from "../../components/SignInForm";

export default async function SignIn() {
    async function storeKey() {
        'use server';
        // const req: any = Request;
        // const response: any = Response;
        // const session = await getSession(req, response);
        // const cookieClient = getCookie("Session%20ID");
        // session.myData = {
        //     cookieClient
        // }
    }
    return (
        <>
            <Title level={3}>
                Sign In Page
            </Title>
            <SignInForm />
        </>
    )
}