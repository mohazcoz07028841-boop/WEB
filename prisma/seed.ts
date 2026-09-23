import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const db = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "sudmocompany@gmail.com";
  const seedPassword = process.env.ADMIN_PASSWORD ?? "StrongPass!2026";
  const password = await bcrypt.hash(seedPassword, 10);

  await db.adminUser.upsert({
    where: { email: adminEmail },
    update: { password },
    create: {
      email: adminEmail,
      name: "Administrator",
      password,
    },
  });

  await db.setting.upsert({
    where: { id: 1 },
    update: {
      companyName: "SUDMO Company Limited",
      tagline: "Unlock Possibilities, Ignite Solutions",
      phone: "0713768539 / 0797087852",
      email: adminEmail,
      address: "P.O. Box 30031 - 00100, JAMIA – Nairobi, Kenya",
      businessHours: "Mon–Fri, 8:00–17:00",
      facebookUrl: "#",
      linkedinUrl: "#",
      instagramUrl: "#",
      twitterUrl: "#",
      heroHeading: "Unlock Possibilities, Ignite Solutions.",
      heroSubheading:
        "SUDMO Company Limited started in August 2024 to provide quality services in real estate, business consultancy, information technology, and quality electronics and computer equipment.",
      heroCta: "Talk to Our Team",
      heroSecondaryCta: "Explore Our Services",
      aboutIntro:
        "To provide clients with an 'I am assured experience' when executing their services, through professionalism, quality delivery and customer satisfaction across every engagement.",
    },
    create: {
      companyName: "SUDMO Company Limited",
      tagline: "Unlock Possibilities, Ignite Solutions",
      phone: "0713768539 / 0797087852",
      email: adminEmail,
      address: "P.O. Box 30031 - 00100, JAMIA – Nairobi, Kenya",
      businessHours: "Mon–Fri, 8:00–17:00",
      facebookUrl: "#",
      linkedinUrl: "#",
      instagramUrl: "#",
      twitterUrl: "#",
      heroHeading: "Unlock Possibilities, Ignite Solutions.",
      heroSubheading:
        "SUDMO Company Limited started in August 2024 to provide quality services in real estate, business consultancy, information technology, and quality electronics and computer equipment.",
      heroCta: "Talk to Our Team",
      heroSecondaryCta: "Explore Our Services",
      aboutIntro:
        "To provide clients with an 'I am assured experience' when executing their services, through professionalism, quality delivery and customer satisfaction across every engagement.",
    },
  });

  const services = [
    {
      title: "Business Development & Training Services",
      slug: "business-development-and-training-services",
      category: "Business Advisory",
      summary: "Corporate training, mentorship and business strategy support for stronger organizations and sustainable growth.",
      details:
        "We support businesses and entrepreneurs with practical business development and training solutions, helping them strengthen capabilities, improve operations and pursue new opportunities with confidence.",
    },
    {
      title: "IT Planning & Development Services",
      slug: "it-planning-and-development-services",
      category: "Technology",
      summary: "Strategy, software and digital systems that help businesses automate operations and improve decision-making.",
      details:
        "Our IT planning and development services focus on practical technology solutions including management information systems, website development and digital transformation support for organizations seeking sustainable efficiency.",
    },
    {
      title: "Real Estate Services",
      slug: "real-estate-services",
      category: "Real Estate",
      summary: "Property advisory, market insight and delivery support for investors, developers and institutions across the region.",
      details:
        "We provide real estate services designed to help clients make better property decisions, manage assets effectively and execute projects with strong operational oversight and market awareness.",
    },
    {
      title: "Warehousing Services",
      slug: "warehousing-services",
      category: "Operations",
      summary: "Professional warehousing planning and logistics support for supply chain efficiency and improved operations.",
      details:
        "Our warehousing services help organizations improve storage, handling and operational coordination while supporting better supply chain reliability and service quality.",
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
      author: "Sudmo Company Limited",
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
      author: "Sudmo Company Limited",
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
      author: "Sudmo Company Limited",
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
