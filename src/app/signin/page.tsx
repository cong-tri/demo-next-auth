import Title from "antd/es/typography/Title";
import SignInForm from "../../pages/SignInForm";

export default async function SignIn() {
    return (
        <>
            <Title level={3}>
                Sign In Page
            </Title>
            <SignInForm />
        </>
    )
}