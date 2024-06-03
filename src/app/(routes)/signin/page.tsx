/** @format */

import Title from "antd/es/typography/Title";
import SignInForm from "./SignInForm";
import { authenticate } from "@/app/actions";

export default function SignIn() {
  return (
    <>
      <div className='container'>
        <Title level={3}>Sign In Page</Title>
        <SignInForm handleFunction={authenticate} />
      </div>
    </>
  );
}
