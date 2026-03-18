import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const publicRoutes = ["/login"];

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isPublic = publicRoutes.includes(pathname);

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.SECRET_TOKEN);

      await jwtVerify(token, secret);

      // if user already logged in and goes to login
      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      // invalid token
      console.log(error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  if (!token && !isPublic) {
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
