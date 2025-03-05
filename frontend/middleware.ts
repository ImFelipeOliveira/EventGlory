import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/utils/session";

const protectedRoutes = ["/eventos"];
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
