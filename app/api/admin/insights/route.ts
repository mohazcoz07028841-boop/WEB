import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminToken } from "@/lib/admin";

export async function POST(request: Request) {
  const admin = await requireAdminToken();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  const body = await request.json();

  if (action === "delete") {
    const id = Number(body.id);
    if (!id) return NextResponse.json({ error: "Invalid insight ID." }, { status: 400 });
    await db.insight.delete({ where: { id } });
    return NextResponse.json({ success: true });
  }

  if (action === "create") {
    const insight = await db.insight.create({
      data: {
        title: String(body.title),
        slug: String(body.slug),
        category: String(body.category),
        excerpt: String(body.excerpt),
        content: String(body.content),
        author: String(body.author),
        readTime: String(body.readTime),
        published: true,
        publishedAt: new Date(),
      },
    });
    return NextResponse.json(insight);
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
