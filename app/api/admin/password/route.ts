import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { requireAdminToken } from "@/lib/admin";
import { db } from "@/lib/db";
import { comparePassword, hashPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const admin = await requireAdminToken();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const currentPassword = String(body.currentPassword || "");
  const newPassword = String(body.newPassword || "");
  const confirmPassword = String(body.confirmPassword || "");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return NextResponse.json({ error: "All password fields are required." }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: "New password must be at least 8 characters long." }, { status: 400 });
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json({ error: "New password and confirmation do not match." }, { status: 400 });
  }

  const user = await db.adminUser.findUnique({ where: { id: admin.id } });
  if (!user) {
    return NextResponse.json({ error: "Admin account not found." }, { status: 404 });
  }

  const valid = await comparePassword(currentPassword, user.password);
  if (!valid) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
  }

  const hashedPassword = await hashPassword(newPassword);
  await db.adminUser.update({
    where: { id: admin.id },
    data: { password: hashedPassword },
  });

  return NextResponse.json({ success: true });
}
