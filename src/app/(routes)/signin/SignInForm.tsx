/** @format */

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Form, Input, message } from "antd";
import SubmitBtn from "./SubmitBtn";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export default function SignInForm({ handleFunction }: any) {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    const { username, password } = values;

    const result = await handleFunction(username, password);
    console.log(result);

    if (result.status == 200) {
      message.success(result.message);

      setTimeout(() => {
        router.push(result.path);
      }, 2000);
    } else {
      message.error(result.message);
      return;
    }
  };
  return (
    <Form
      form={form}
      name='basic'
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      autoComplete='off'>
      <Form.Item<FieldType>
        label='Username'
        name='username'
        rules={[{ required: true, message: "Please input your username!" }]}>
        <Input placeholder='congtri' />
      </Form.Item>

      <Form.Item<FieldType>
        label='Password'
        name='password'
        rules={[{ required: true, message: "Please input your password!" }]}>
        <Input.Password placeholder='12345' />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <SubmitBtn />
      </Form.Item>
    </Form>
  );
}
