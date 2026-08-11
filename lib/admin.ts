import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export function requireAdminToken() {
  const token = cookies().get("admin_token")?.value;
  if (!token) {
    return null;
  }

  try {
    return verifyToken(token);
  } catch {
    return null;
  }
}
