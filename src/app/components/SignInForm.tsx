'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';
import { Button, Form, Input } from 'antd';

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
            const res = await fetch('/api/login',
                {
                    method: "POST",
                    body: JSON.stringify(values),
                }
            );
            const data = await res.json();
            console.log(data);

            if (res.status === 200) {
                console.log(data.message);
                setTimeout(() => {
                    router.push(data.httpPath);
                }, 1000);
            } else {
                console.error(data.message);
                return;
            }
        } catch (error) {
            console.error('Login failed');
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