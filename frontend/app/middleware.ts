import { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
