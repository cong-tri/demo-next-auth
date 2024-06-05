/** @format */

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu } from "antd";
import type { MenuProps } from "antd";
const Header: React.FC = () => {
  const [current, setCurrent] = useState("home");
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  const items: MenuProps["items"] = [
    {
      label: <Link href={"/dashboard"}>Dashboard Page</Link>,
      key: "dashboard",
    },
    {
      label: <Link href={"/signin"}>SignIn Page</Link>,
      key: "signin",
    },
  ];
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode='horizontal'
      items={items}
    />
  );
};
export default Header;
