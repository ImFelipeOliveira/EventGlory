import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/utils/session";
import { TokenManager } from "./lib/utils/token-manager";
import { JWTPayload } from "jose";

const protectedRoutes = ["/area-do-criador"];
const publicRoutes = ["/login", "/register"];
export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token_access")?.value;
  const session = await decrypt(token);

  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  if (isProtectedRoute && !session?.user_id) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isPublicRoute && session?.user_id) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const refreshResult = handleTokenRefresh(session, req);
  if (refreshResult) return refreshResult;

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export async function handleTokenRefresh(
  session: JWTPayload | null,
  req: NextRequest
) {
  if (session && (await TokenManager.shouldRefreshToken(session))) {
    const newToken = await TokenManager.refreshToken();
    if (!newToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return null;
}
