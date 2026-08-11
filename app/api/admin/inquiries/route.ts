import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminToken } from "@/lib/admin";

export async function POST(request: Request) {
  const admin = await requireAdminToken();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  const body = await request.json();

  if (action === "updateStatus") {
    const id = Number(body.id);
    const status = String(body.status || "NEW");
    if (!id) return NextResponse.json({ error: "Invalid inquiry ID." }, { status: 400 });
    const inquiry = await db.inquiry.update({ where: { id }, data: { status } });
    return NextResponse.json(inquiry);
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
