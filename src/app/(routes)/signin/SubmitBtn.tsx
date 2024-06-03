/** @format */
"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "antd";
const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button type='primary' htmlType='submit' aria-disabled={pending}>
      {pending ? "Submiting" : "Submit"}
    </Button>
  );
};

export default SubmitBtn;
