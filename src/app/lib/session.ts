/** @format */

import nextSession from "next-session";
import { expressSession, promisifyStore } from "next-session/lib/compat";
const SQLiteStore = require("connect-sqlite3")(expressSession);

export const getSession = nextSession({
  //   name: "WIB_SESSION",
  cookie: {
    path: "/",
    httpOnly: true,
    secure: true,
    domain: "localhost",
    sameSite: true,
    maxAge: 60 * 10,
  },
  store: promisifyStore(
    new SQLiteStore({ dir: "./tmp/", table: "wiberSessions" })
  ),
  autoCommit: true,
});
