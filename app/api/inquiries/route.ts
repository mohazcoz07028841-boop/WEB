import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendInquiryEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();
  const inquiry = await db.inquiry.create({
    data: {
      fullName: String(body.fullName || "").trim(),
      company: body.company ? String(body.company) : null,
      email: String(body.email || "").trim(),
      phone: String(body.phone || "").trim(),
      serviceRequired: body.serviceRequired ? String(body.serviceRequired) : null,
      projectDescription: body.projectDescription ? String(body.projectDescription) : null,
      contactMethod: body.contactMethod ? String(body.contactMethod) : null,
      preferredDate: body.preferredDate ? String(body.preferredDate) : null,
      additionalInfo: body.additionalInfo ? String(body.additionalInfo) : null,
    },
  });

  try {
    await sendInquiryEmail({
      id: inquiry.id,
      fullName: inquiry.fullName,
      company: inquiry.company,
      email: inquiry.email,
      phone: inquiry.phone,
      serviceRequired: inquiry.serviceRequired,
      projectDescription: inquiry.projectDescription,
      contactMethod: inquiry.contactMethod,
      preferredDate: inquiry.preferredDate,
      additionalInfo: inquiry.additionalInfo,
      createdAt: inquiry.createdAt,
    });
  } catch (error) {
    console.error("Failed to send inquiry email:", error);
  }

  return NextResponse.json({ success: true, inquiryId: inquiry.id });
}
