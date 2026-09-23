import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendInquiryEmail } from "@/lib/email";

export async function POST(request: Request) {
  const body = await request.json();

  const requiredFields = [
    "fullName",
    "email",
    "phone",
    "serviceRequired",
    "projectDescription",
    "contactMethod",
    "preferredDate",
  ] as const;

  const missing = requiredFields.filter((field) => {
    const value = body?.[field];
    return value === undefined || value === null || String(value).trim() === "";
  });

  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Please complete all required fields before submitting." },
      { status: 400 }
    );
  }

  const inquiry = await db.inquiry.create({
    data: {
      fullName: String(body.fullName || "").trim(),
      company: body.company ? String(body.company).trim() : null,
      email: String(body.email || "").trim(),
      phone: String(body.phone || "").trim(),
      serviceRequired: String(body.serviceRequired).trim(),
      projectDescription: String(body.projectDescription).trim(),
      contactMethod: String(body.contactMethod).trim(),
      preferredDate: String(body.preferredDate).trim(),
      additionalInfo: body.additionalInfo ? String(body.additionalInfo).trim() : null,
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
