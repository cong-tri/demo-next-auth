'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'typescript-cookie';
import { Button, Form, Input, message } from 'antd';
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
const SignInForm: React.FC = () => {
    const router = useRouter()
    const onFinish = async (values: any) => {
        try {
            const responseSession = await fetch('/api/signin',
                {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                }
            )
            const response = await responseSession.json()
            if (response.status === 200) {
                message.success(response.message)
                setCookie("sessionId", response.data.sessionID, { expires: 7 })
                router.push(response.httpPath);
            } else {
                message.error(response.message);
                return
            }
        } catch (error) {
            console.error(error);
        }
    }
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