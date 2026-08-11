import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

async function main() {
  const seedPassword = process.env.ADMIN_PASSWORD ?? "StrongPass!2026";
  const password = await bcrypt.hash(seedPassword, 10);

  await db.adminUser.upsert({
    where: { email: "admin@horizonalliance.co.ke" },
    update: { password },
    create: {
      email: "admin@horizonalliance.co.ke",
      name: "Administrator",
      password,
    },
  });

  await db.setting.upsert({
    where: { id: 1 },
    update: {
      companyName: "Horizon Alliance",
      tagline: "Building better businesses, properties and digital solutions.",
      phone: "+254 700 000 000",
      email: "info@horizonalliance.co.ke",
      address: "Nairobi, Kenya",
      businessHours: "Mon–Fri, 8:00–17:00",
      facebookUrl: "#",
      linkedinUrl: "#",
      instagramUrl: "#",
      twitterUrl: "#",
      heroHeading: "Building Better Businesses, Properties & Digital Solutions.",
      heroSubheading:
        "Professional solutions across real estate, technology, financial management, advisory and marketing — helping organizations plan better, operate smarter and grow with confidence.",
      heroCta: "Talk to Our Team",
      heroSecondaryCta: "Explore Our Services",
      aboutIntro:
        "We combine real estate, technology, finance and business advisory expertise to help East African organizations operate with clarity and confidence.",
    },
    create: {
      companyName: "Horizon Alliance",
      tagline: "Building better businesses, properties and digital solutions.",
      phone: "+254 700 000 000",
      email: "info@horizonalliance.co.ke",
      address: "Nairobi, Kenya",
      businessHours: "Mon–Fri, 8:00–17:00",
      facebookUrl: "#",
      linkedinUrl: "#",
      instagramUrl: "#",
      twitterUrl: "#",
      heroHeading: "Building Better Businesses, Properties & Digital Solutions.",
      heroSubheading:
        "Professional solutions across real estate, technology, financial management, advisory and marketing — helping organizations plan better, operate smarter and grow with confidence.",
      heroCta: "Talk to Our Team",
      heroSecondaryCta: "Explore Our Services",
      aboutIntro:
        "We combine real estate, technology, finance and business advisory expertise to help East African organizations operate with clarity and confidence.",
    },
  });

  const services = [
    {
      title: "Real Estate Advisory",
      slug: "real-estate",
      category: "Real Estate",
      summary: "Property advisory, development support and investment guidance for Kenyan and East African markets.",
      details:
        "We help investors, developers and property owners make better real estate decisions with market insight, project planning and asset management support.",
    },
    {
      title: "IT Planning & Development",
      slug: "it-development",
      category: "Technology",
      summary: "Strategy, software and systems that help businesses automate operations and improve decision-making.",
      details:
        "Our technology team delivers practical digital solutions, from business systems and web applications to digital transformation planning.",
    },
    {
      title: "Financial Management",
      slug: "financial-management",
      category: "Finance",
      summary: "Cash flow planning, reporting and financial management support for SMEs and corporates.",
      details:
        "We work with organisations to improve financial visibility, budgeting discipline and management reporting without making banking or audit claims.",
    },
    {
      title: "Financial Advisory",
      slug: "financial-advisory",
      category: "Finance",
      summary: "Business performance advisory to support financial decisions and sustainable growth.",
      details:
        "We provide financial guidance on planning, cash flow, budgeting and decision support so leaders can act with clarity and confidence.",
    },
    {
      title: "Bookkeeping",
      slug: "bookkeeping",
      category: "Finance",
      summary: "Organised transaction recording, reconciliation and monthly reporting for better control.",
      details:
        "Our bookkeeping services help businesses track revenue, manage expenses and maintain organised records for easy reporting.",
    },
    {
      title: "Marketing Services",
      slug: "marketing",
      category: "Marketing",
      summary: "Digital marketing and brand positioning that attracts customers and drives growth.",
      details:
        "We help organisations build campaigns, generate leads and retain customers with tailored digital marketing and positioning support.",
    },
    {
      title: "Business Development & Training",
      slug: "business-development",
      category: "Business Advisory",
      summary: "Corporate training, mentorship and business strategy for stronger organizations.",
      details:
        "Our business development services focus on capability building, corporate training and strategy to help leaders and teams grow sustainably.",
    },
    {
      title: "Warehousing Solutions",
      slug: "warehousing",
      category: "Operations",
      summary: "Professional warehousing planning and logistics support for supply chain efficiency.",
      details:
        "We support businesses that require warehousing guidance while keeping the primary identity focused on services rather than product trading.",
    },
  ];

  for (const service of services) {
    await db.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: { ...service },
    });
  }

  const projects = [
    {
      title: "Commercial Property Portfolio Strategy",
      slug: "commercial-property-portfolio-strategy",
      industry: "Real Estate",
      location: "Nairobi",
      clientType: "Property Owner",
      challenge: "A property owner needed support to evaluate new tenant mixes and asset positioning.",
      solution:
        "We conducted market analysis, advised on tenant profiling and delivered a practical leasing strategy for improved asset performance.",
      outcome: "A focused portfolio plan ready for execution by the ownership team.",
      services: "Real estate advisory, property management planning",
      date: "2026",
      featuredImage: null,
    },
    {
      title: "Financial Management Framework",
      slug: "financial-management-framework",
      industry: "Finance",
      location: "Mombasa",
      clientType: "SME",
      challenge: "A growth business needed stronger cash-flow planning and financial reporting practices.",
      solution:
        "We designed budgeting structures, cash flow templates and a reporting cadence suited to the company’s operations.",
      outcome: "Clearer financial visibility and decision support for leadership.",
      services: "Financial management, bookkeeping",
      date: "2026",
      featuredImage: null,
    },
    {
      title: "Digital Operations Upgrade",
      slug: "digital-operations-upgrade",
      industry: "Technology",
      location: "Nairobi",
      clientType: "Corporate",
      challenge: "A mid-size business required a more reliable digital system for customer data and process flow.",
      solution:
        "We developed a business management workflow and delivered a responsive web portal for core operations.",
      outcome: "Faster employee access to data and reduced manual coordination.",
      services: "IT planning, software development",
      date: "2026",
      featuredImage: null,
    },
  ];

  for (const project of projects) {
    await db.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: { ...project },
    });
  }

  const insights = [
    {
      title: "How Professional Services Build Trust with East African Businesses",
      slug: "professional-services-build-trust",
      category: "Business",
      excerpt:
        "Professional services firms win responsibility by delivering transparent advice, consistent execution and measurable value across every engagement.",
      content:
        "Quality service delivery begins with listening to client priorities, aligning senior professionals to the work and providing clear progress updates throughout the engagement.",
      author: "Horizon Alliance Team",
      readTime: "4 min",
      published: true,
      publishedAt: new Date(),
    },
    {
      title: "Practical IT Planning for Growing SMEs",
      slug: "practical-it-planning-smes",
      category: "Technology",
      excerpt:
        "A practical IT plan helps SMEs reduce costs, automate workflows, and improve reporting without unnecessary complexity.",
      content:
        "The most effective technology plans start with a clear understanding of current operations, prioritized automation and a strong delivery roadmap tied to business outcomes.",
      author: "Horizon Alliance Team",
      readTime: "3 min",
      published: true,
      publishedAt: new Date(),
    },
    {
      title: "Financial Visibility: Why Bookkeeping Matters for Business Growth",
      slug: "financial-visibility-bookkeeping",
      category: "Finance",
      excerpt:
        "Organised financial records are the foundation for budgeting, performance insight and confident decision-making.",
      content:
        "Bookkeeping is more than compliance; it is the first step toward building a financial management culture that supports growth and resilience.",
      author: "Horizon Alliance Team",
      readTime: "3 min",
      published: true,
      publishedAt: new Date(),
    },
  ];

  for (const insight of insights) {
    await db.insight.upsert({
      where: { slug: insight.slug },
      update: insight,
      create: { ...insight },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
