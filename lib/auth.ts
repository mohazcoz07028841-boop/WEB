import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.AUTH_SECRET ?? "change-this-secret";
const cookieName = "admin_token";

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: Record<string, unknown>) {
  return jwt.sign(payload, secret, { expiresIn: "8h" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret) as { id: number; email: string; name: string };
}

export async function getAdminCookieToken() {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value;
}

export async function getCurrentAdmin() {
  const token = await getAdminCookieToken();
  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
