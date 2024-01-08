import { api_url } from "@/constant";
import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Your Username", value:"Eric" },
        password: { label: "Password", type: "password", placeholder: "Your Password", value:"12345"  },
      },
      async authorize(credentials: {
        username: string;
        password: string;
      }): Promise<any | undefined> {
        if (!credentials?.username && credentials?.password) {
          return;
        }
        const res = await fetch(api_url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        const user = data.find(
          ({ name, password }: { name: string; password: string }) =>
            name === credentials?.username && password === credentials?.password
        );
        if (user) return user;
        else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: any;
      user: any;
    }): Promise<any | undefined> {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({
      token,
      user,
      session,
    }: {
      token: any;
      user: any;
      session: any;
      }) {
      if (user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
