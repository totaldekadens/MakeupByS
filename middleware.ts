import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware

export default withAuth(
  function middleware(req) {
    // If you are logged in but not have the role "admin" when you visit an URL including "admin", you will be redirected to /mypage.
    if (!req.nextauth.token?.admin && req.nextUrl.pathname.includes("/admin")) {
      return NextResponse.redirect(new URL("/mypage", req.url));
    }
  },
  {
    // If someone is logged in no matter role, you get permission to be on the URL and you jump to the middleware with new checks
    callbacks: {
      authorized({ req, token }) {
        return Boolean(token);
      },
    },
  }
);

// If no one is logged in and tries to enter URLS below, you will be redirected to /signin
export const config = {
  matcher: ["/admin/:path*", "/mypage"],
};
