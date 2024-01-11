'use client';
import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link';

const items: MenuProps['items'] = [
    {
        label: <Link href={"/"}>Home Page</Link>,
        key: 'home',
    },
    {
        label: <Link href={"/signin"}>SignIn Page</Link>,
        key: 'signin',
    },
    {
        label: <Link href={"/server"}>Server Page</Link>,
        key: 'server',
    },
    {
        label: <Link href={"/test"}>Test Page</Link>,
        key: 'test',
    },
];

const Header: React.FC = () => {
    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;