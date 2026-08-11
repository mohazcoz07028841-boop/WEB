import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminToken } from "@/lib/admin";

export async function POST(request: Request) {
  const admin = await requireAdminToken();
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();

  const settings = await db.setting.upsert({
    where: { id: 1 },
    update: {
      companyName: String(body.companyName || ""),
      phone: String(body.phone || ""),
      email: String(body.email || ""),
      address: String(body.address || ""),
      businessHours: String(body.businessHours || ""),
      linkedinUrl: body.linkedinUrl ? String(body.linkedinUrl) : null,
      facebookUrl: body.facebookUrl ? String(body.facebookUrl) : null,
      instagramUrl: body.instagramUrl ? String(body.instagramUrl) : null,
      twitterUrl: body.twitterUrl ? String(body.twitterUrl) : null,
    },
    create: {
      companyName: String(body.companyName || ""),
      tagline: "",
      phone: String(body.phone || ""),
      email: String(body.email || ""),
      address: String(body.address || ""),
      businessHours: String(body.businessHours || ""),
      linkedinUrl: body.linkedinUrl ? String(body.linkedinUrl) : null,
      facebookUrl: body.facebookUrl ? String(body.facebookUrl) : null,
      instagramUrl: body.instagramUrl ? String(body.instagramUrl) : null,
      twitterUrl: body.twitterUrl ? String(body.twitterUrl) : null,
    },
  });

  return NextResponse.json(settings);
}
