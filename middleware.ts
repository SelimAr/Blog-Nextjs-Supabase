import { NextResponse, type NextRequest } from "next/server";
import { loginSession } from "@/app/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await loginSession(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
