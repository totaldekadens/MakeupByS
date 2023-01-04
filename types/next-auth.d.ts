import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      stripeId: string;
      name: string;
      email: string;
      id: string;
      admin: boolean;
      address: {
        city: string;
        country: string;
        line1: string;
        line2: string;
        postal_code: string;
      };
      phone?: string;
    } & DefaultSession["user"];
  }
}
