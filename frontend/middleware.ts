import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/utils/session";
import { TokenManager } from "./lib/utils/token-manager";

// Middleware
export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token_access")?.value;

  const protectRoutesResult = handlerRouterProtection(token, req);
  if (protectRoutesResult) return protectRoutesResult;

  const refreshResult = handleTokenRefresh(token, req);
  if (refreshResult) return refreshResult;

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

/**
 * Lógica para o controle de rotas públicas e privadas com base no status de autenticação.
 */
const protectedRoutes = ["/area-do-criador"];
const publicRoutes = ["/login", "/register"];
export async function handlerRouterProtection(
  token: string | undefined,
  req: NextRequest
) {
  try {
    const session = await verifyToken(token);

    const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

    if (isProtectedRoute && !session?.payload.user_id) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isPublicRoute && session?.payload.user_id) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } catch {
    TokenManager.clearTokens();
  }
}

/**
 * Lógicas para atualização do token de autenticação.
 */
export async function handleTokenRefresh(
  session: string | undefined,
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
