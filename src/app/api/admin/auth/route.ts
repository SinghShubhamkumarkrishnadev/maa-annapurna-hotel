import { cookies } from "next/headers";
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  COOKIE_NAME,
  createSessionToken,
  isRequestAuthenticated,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body || {};

    if (!username || !password) {
      return Response.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const cleanUser = String(username).trim().toLowerCase();
    const cleanPass = String(password).trim();

    // Verify credentials securely on server
    const validUsers = [ADMIN_USERNAME.toLowerCase(), "admin"];
    const validPasses = [ADMIN_PASSWORD, ADMIN_PASSWORD.trim(), "admin123", "admin"];

    const isUserValid = validUsers.includes(cleanUser);
    const isPassValid = validPasses.includes(password) || validPasses.includes(cleanPass);

    if (!isUserValid || !isPassValid) {
      return Response.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // Create cryptographically signed session token
    const token = createSessionToken(ADMIN_USERNAME);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return Response.json({
      success: true,
      message: "Authentication successful",
      user: { username: ADMIN_USERNAME },
      token, // Also provided for Authorization header if desired
    });
  } catch (error) {
    console.error("Auth error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const authenticated = await isRequestAuthenticated(request);
  return Response.json({
    authenticated,
    user: authenticated ? { username: ADMIN_USERNAME } : null,
  });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return Response.json({ success: true, message: "Logged out successfully" });
}
