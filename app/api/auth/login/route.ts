import { NextResponse } from "next/server";
import { comparePassword, signToken } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const data = await request.json();
  const email = String(data.email || "").trim().toLowerCase();
  const password = String(data.password || "");

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = await db.adminUser.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const valid = await comparePassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = signToken({ id: user.id, email: user.email, name: user.name });
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: "admin_token",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 8 * 60 * 60,
  });

  return response;
}
