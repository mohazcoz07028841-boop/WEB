import nodemailer from "nodemailer";

export type InquiryEmailPayload = {
  id: number;
  fullName: string;
  company?: string | null;
  email: string;
  phone: string;
  serviceRequired?: string | null;
  projectDescription?: string | null;
  contactMethod?: string | null;
  preferredDate?: string | null;
  additionalInfo?: string | null;
  createdAt?: Date;
};

export async function sendInquiryEmail(inquiry: InquiryEmailPayload) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT ?? "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const fromAddress = process.env.EMAIL_FROM ?? smtpUser;
  const adminEmail = process.env.ADMIN_EMAIL ?? smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !adminEmail || !fromAddress) {
    console.warn("Inquiry email not sent: SMTP configuration is missing.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const createdAt = inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : "Not provided";
  const subject = `New inquiry from ${inquiry.fullName}`;
  const text = [
    `New inquiry received on ${createdAt}`,
    "",
    `Name: ${inquiry.fullName}`,
    `Company: ${inquiry.company || "Not provided"}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Service required: ${inquiry.serviceRequired || "Not provided"}`,
    `Preferred contact method: ${inquiry.contactMethod || "Not provided"}`,
    `Preferred date: ${inquiry.preferredDate || "Not provided"}`,
    `Project description: ${inquiry.projectDescription || "Not provided"}`,
    `Additional info: ${inquiry.additionalInfo || "Not provided"}`,
  ].join("\n");

  const html = `
    <h2>New inquiry received</h2>
    <p><strong>Received:</strong> ${createdAt}</p>
    <p><strong>Name:</strong> ${inquiry.fullName}</p>
    <p><strong>Company:</strong> ${inquiry.company || "Not provided"}</p>
    <p><strong>Email:</strong> ${inquiry.email}</p>
    <p><strong>Phone:</strong> ${inquiry.phone}</p>
    <p><strong>Service required:</strong> ${inquiry.serviceRequired || "Not provided"}</p>
    <p><strong>Preferred contact method:</strong> ${inquiry.contactMethod || "Not provided"}</p>
    <p><strong>Preferred date:</strong> ${inquiry.preferredDate || "Not provided"}</p>
    <p><strong>Project description:</strong> ${inquiry.projectDescription || "Not provided"}</p>
    <p><strong>Additional info:</strong> ${inquiry.additionalInfo || "Not provided"}</p>
  `;

  await transporter.sendMail({
    from: fromAddress,
    to: adminEmail,
    replyTo: inquiry.email,
    subject,
    text,
    html,
  });

  return true;
}
