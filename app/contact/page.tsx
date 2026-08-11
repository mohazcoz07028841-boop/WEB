import { getSettings } from "@/lib/queries";
import { SectionHeader } from "@/components/SectionHeader";
import { InquiryForm } from "@/components/InquiryForm";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <main className="bg-warm">
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Contact"
            title="Get in touch with our team."
            description="Reach out for a consultation, service enquiry or to discuss how we can support your organization."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.55fr_0.45fr] lg:items-start">
            <div className="space-y-8 rounded-[32px] border border-slate-200 bg-slate-50 p-10 shadow-soft">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Contact details</p>
                <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700">
                  <p><strong>Phone:</strong> <a href={`tel:${settings?.phone ?? "+254700000000"}`} className="text-midnight">{settings?.phone ?? "+254 700 000 000"}</a></p>
                  <p><strong>Email:</strong> <a href={`mailto:${settings?.email ?? "info@horizonalliance.co.ke"}`} className="text-midnight">{settings?.email ?? "info@horizonalliance.co.ke"}</a></p>
                  <p><strong>Location:</strong> {settings?.address ?? "Nairobi, Kenya"}</p>
                  <p><strong>Business hours:</strong> {settings?.businessHours ?? "Mon–Fri, 8:00–17:00"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Office</p>
                <p className="mt-4 text-base leading-7 text-slate-700">
                  Our office is available for scheduled meetings. Please book a consultation so we can prepare and meet your expectations.
                </p>
              </div>
            </div>
            <InquiryForm
              heading="Request a contact"
              intro="Send a message and our team will respond within one business day."
              submitLabel="Send enquiry"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
