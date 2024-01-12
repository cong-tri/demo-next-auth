// "use client";
import React from "react";
import { redirect } from "next/navigation";
import { getCookie } from "../services";
import Title from "antd/es/typography/Title";
// import { getCookies, removeCookie } from "typescript-cookie";
// import { MY_SESSION_TOKEN_KEY } from "@/constant";
// import { cookies } from "next/headers";

export default async function TestPage() {
    const session: string = getCookie();
    if (!session) {
        console.error("Please Sign In before Entered The Home Page");
        redirect("/signin");
    }
    // const res = fetch('http://localhost:3000/api');
    // console.log((await res).bodyUsed);

    // const data = await res.json();
    // console.log(data);
    // data ? console.log("Successfully") : console.log("Unsuccessfully");

    // window.addEventListener('beforeunload', function (e) {
    //     e.preventDefault();
    //     e.returnValue = '';
    //     removeCookie(MY_SESSION_TOKEN_KEY)
    // });
    // const tokenSesion = getCookies();

    return (
        <>
            <Title level={2}>Test Page</Title>
        </>
    );
}
