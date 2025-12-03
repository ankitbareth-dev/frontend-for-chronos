import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  // Redirect logged-out users trying to access dashboard pages
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Redirect logged-in users trying to access auth pages
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // allow everything else
  return NextResponse.next();
}

// Only apply middleware to these paths
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
