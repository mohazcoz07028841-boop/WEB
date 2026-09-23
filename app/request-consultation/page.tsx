import type { Metadata } from "next";
import { SectionHeader } from "@/components/SectionHeader";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Request a Consultation | SUDMO Company Limited",
  description:
    "Request a consultation with SUDMO Company Limited in Kenya for business, real estate, technology, warehousing and supply enquiries.",
  alternates: {
    canonical: "https://web-mfik-eight.vercel.app/request-consultation",
  },
  openGraph: {
    title: "Request a Consultation | SUDMO Company Limited",
    description:
      "Request a consultation with SUDMO Company Limited in Kenya for business, real estate, technology, warehousing and supply enquiries.",
    url: "https://web-mfik-eight.vercel.app/request-consultation",
    type: "website",
  },
};

export default function RequestConsultationPage() {
  return (
    <main className="bg-warm">
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Consultation"
            title="Request a consultation for your next project."
            description="Complete the form and our team will review your inquiry and contact you with next steps."
          />
          <div className="mt-12">
            <InquiryForm
              heading="Request consultation"
              intro="Tell us about your project so we can suggest the right service and next steps."
              submitLabel="Submit request"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
