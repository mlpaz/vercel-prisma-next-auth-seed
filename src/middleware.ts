import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const session = await getToken({ req, secret });
  if (!session && path !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (session && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|_next/static|favicon.ico).*)",
  ],
};
