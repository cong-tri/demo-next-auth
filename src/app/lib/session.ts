/** @format */

import { nanoid } from "nanoid";
import nextSession from "next-session";
import { expressSession, promisifyStore } from "next-session/lib/compat";
const SQLiteStore = require("connect-sqlite3")(expressSession);

type Cookie = {
    httpOnly: boolean;
    path: string;
    domain?: string | undefined;
    secure: boolean;
    sameSite?: boolean | "lax" | "strict" | "none";
} & ({
    maxAge?: undefined;
    expires?: undefined;
} | {
    maxAge: number;
    expires: Date;
  });
export const getSession = nextSession({
  name: "WIB_SESSION",
  cookie:<Cookie> {
    path: "/lib/session",
    httpOnly: true,
    secure: true,
    domain: "localhost:3000",
    sameSite: true,
    maxAge: 60 * 1000,
    expires : new Date(Date.now()),
  },
  store: promisifyStore(
    new SQLiteStore({ dir: "./tmp/", table: "wiberSessions" })
  ),
  autoCommit: true,
  genid() {
    const nanoID: string = nanoid();
    return nanoID;
  },
});
