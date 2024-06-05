/** @format */

import React from "react";
import { logout } from "@/app/lib/actions";

const DashBoardPage = async () => {
  return (
    <>
      <div>DashBoardPage</div>
      <form action={logout}>
        <button
          type='submit'
          className='p-3 rounded-xl text-white bg-blue-500 hover:bg-blue-400'>
          Logout
        </button>
      </form>
    </>
  );
};

export default DashBoardPage;
