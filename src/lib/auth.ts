import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "mukeshsingh";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Mukesh#Annapurna$9931!824231";
const AUTH_SECRET = process.env.ADMIN_AUTH_SECRET || "maa-annapurna-hotel-mukeshsingh-sec-key-824231";
export const COOKIE_NAME = "admin_session";

interface SessionPayload {
  u: string;
  exp: number;
  iat: number;
}

export function createSessionToken(username: string): string {
  const payload: SessionPayload = {
    u: username,
    iat: Date.now(),
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${signature}`;
}

export function verifySessionToken(token?: string | null): { valid: boolean; username?: string } {
  if (!token || typeof token !== "string") {
    return { valid: false };
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { valid: false };
  }

  const [payloadB64, signature] = parts;
  const expectedSig = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payloadB64)
    .digest("base64url");

  // Constant-time comparison to prevent timing attacks
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSig);
  if (sigBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(sigBuffer, expectedBuffer)) {
    return { valid: false };
  }

  try {
    const payload: SessionPayload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8"));
    if (Date.now() > payload.exp) {
      return { valid: false };
    }
    const validUsers = [ADMIN_USERNAME.toLowerCase(), "admin"];
    if (!validUsers.includes(payload.u.toLowerCase())) {
      return { valid: false };
    }
    return { valid: true, username: payload.u };
  } catch {
    return { valid: false };
  }
}

export async function isRequestAuthenticated(request?: Request): Promise<boolean> {
  // Check Authorization header first
  if (request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7).trim();
      const verified = verifySessionToken(token);
      if (verified.valid) return true;
    }
  }

  // Check HTTP-only cookie via next/headers
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);
    if (sessionCookie?.value) {
      const verified = verifySessionToken(sessionCookie.value);
      return verified.valid;
    }
  } catch {
    // If called in a context where cookies() fails, fallback to request Cookie header
    if (request) {
      const cookieHeader = request.headers.get("cookie") || "";
      const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
      if (match && match[1]) {
        const verified = verifySessionToken(decodeURIComponent(match[1]));
        return verified.valid;
      }
    }
  }

  return false;
}
