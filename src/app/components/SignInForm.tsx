'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';
import { Button, Form, Input, message } from 'antd';
import { MY_SESSION_TOKEN_KEY } from '@/constant';
import { setCookie } from 'typescript-cookie';

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const SignInForm: React.FC = () => {
    const router = useRouter();
    const onFinish = async (values: any) => {
        // signIn("credentials", {
        //     ...values,
        //     redirect: false
        // });
        try {
            const responseSession = await fetch('/api/login',
                {
                    method: "POST",
                    body: JSON.stringify(values),
                }
            );
            const response = await responseSession.json();
            console.log(response);

            if (responseSession.ok && responseSession.status === 200) {
                message.success(response.message);
                if (typeof (Storage) !== 'undefined') {
                    // sessionStorage.setItem(MY_SESSION_TOKEN_KEY, response.data.tokenUser)
                    setCookie('SessionID', response.data.sessionID, { expires: 1 });
                    // sessionStorage.setItem("SessionID", response.data.sessionID)
                }
                setTimeout(() => {
                    router.push(response.httpPath);
                }, 1000);
            } else {
                console.error(response.message);
                return;
            }
        } catch (error) {
            message.error('Login failed');
        }
    };
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
                initialValue={"Eric"}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                initialValue={"12345"}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default SignInForm;