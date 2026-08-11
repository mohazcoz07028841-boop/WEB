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

export function getAdminCookieToken() {
  return cookies().get(cookieName)?.value;
}

export function getCurrentAdmin() {
  const token = getAdminCookieToken();
  if (!token) return null;

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
