import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 },
      );
    }
    console.log("abchi");
    const response = NextResponse.json({ message: "Cookie set" });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (err) {
    return NextResponse.json({ message: `Internal error ${err}` }, { status: 500 });
  }
}
