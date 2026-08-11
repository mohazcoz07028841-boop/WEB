import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminToken } from "@/lib/admin";

export async function POST(request: Request) {
  const admin = requireAdminToken();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  const body = await request.json();

  if (action === "delete") {
    const id = Number(body.id);
    if (!id) return NextResponse.json({ error: "Invalid service ID." }, { status: 400 });
    await db.service.delete({ where: { id } });
    return NextResponse.json({ success: true });
  }

  if (action === "create") {
    const service = await db.service.create({
      data: {
        title: String(body.title),
        slug: String(body.slug),
        category: String(body.category),
        summary: String(body.summary),
        details: String(body.details),
        published: true,
      },
    });
    return NextResponse.json(service);
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
