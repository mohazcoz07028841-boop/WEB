import { db } from "@/lib/db";

export function getSettings() {
  return db.setting.findUnique({ where: { id: 1 } });
}

export function getPublishedServices() {
  return db.service.findMany({ where: { published: true }, orderBy: { createdAt: "asc" } });
}

export function getPublishedProjects() {
  return db.project.findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 4 });
}

export function getPublishedInsights() {
  return db.insight.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" }, take: 3 });
}

export function getServiceBySlug(slug: string) {
  return db.service.findUnique({ where: { slug } });
}

export function getProjectBySlug(slug: string) {
  return db.project.findUnique({ where: { slug } });
}

export function getInsightBySlug(slug: string) {
  return db.insight.findUnique({ where: { slug } });
}

export function getAllServiceSlugs() {
  return db.service.findMany({ select: { slug: true } });
}
export function getAllInsightSlugs() {
  return db.insight.findMany({ select: { slug: true } });
}
export function getAllProjectSlugs() {
  return db.project.findMany({ select: { slug: true } });
}

export function getAdminStats() {
  return Promise.all([
    db.service.count(),
    db.project.count(),
    db.insight.count(),
    db.inquiry.count(),
  ]).then(([services, projects, insights, inquiries]) => ({ services, projects, insights, inquiries }));
}
