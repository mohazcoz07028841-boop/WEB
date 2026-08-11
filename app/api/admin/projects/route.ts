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
    if (!id) return NextResponse.json({ error: "Invalid project ID." }, { status: 400 });
    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  }

  if (action === "create") {
    const project = await db.project.create({
      data: {
        title: String(body.title),
        slug: String(body.slug),
        industry: String(body.industry),
        location: String(body.location),
        clientType: String(body.clientType),
        challenge: String(body.challenge),
        solution: String(body.solution),
        outcome: String(body.outcome),
        services: String(body.services),
        date: String(body.date),
        published: true,
      },
    });
    return NextResponse.json(project);
  }

  return NextResponse.json({ error: "Invalid action." }, { status: 400 });
}
