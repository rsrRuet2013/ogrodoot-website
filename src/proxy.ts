import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, readSessionToken } from "@/lib/auth";

/** Fast route gate only; API routes also check the role because proxy is not authorization. */
export async function proxy(request: NextRequest) {
  const session = await readSessionToken(request.cookies.get(COOKIE_NAME)?.value);
  const { pathname } = request.nextUrl;
  if (!session) return NextResponse.redirect(new URL("/login", request.url));
  if (pathname.startsWith("/admin") && session.role !== "admin") return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/dashboard/:path*"] };
