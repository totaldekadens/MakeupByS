import NextAuth, { Awaitable, RequestInternal } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";
import { boolean } from "yup";

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        inputValue: {
          label: "email",
          type: "text",
          placeholder: "Email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { inputValue, password } = credentials;

        await dbConnect();

        const user = await User.findOne({ email: inputValue }).then((res) => {
          if (!res) {
            throw Error("invalid user");
          }
          if (res) {
            if (res.validPassword(String(password))) {
              return res;
            }
            throw Error("incorrect password");
          }
          throw Error("invalid user");
        });
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 6 * 60 * 60, // 6 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      await dbConnect();
      if (user) {
        token.id = user.id;
        token.admin = user.admin;
        token.address = user.address;
        token.phone = user.phone;
        token.stripeId = user.stripeId;
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.admin = token.admin;
      session.user.id = token.id;
      session.id = token.id;
      session.user.address = token.address;
      session.user.phone = token.phone;
      session.user.stripeId = token.stripeId;

      return session;
    },
  },
};
export default NextAuth(authOptions);
