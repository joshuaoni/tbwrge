import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRole = request.cookies.get("userRole")?.value;

  // Protect dashboard and admin routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    // If no user role, redirect to login
    if (!userRole) {
      const url = new URL("/sign-in", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // If job seeker trying to access job postings
    if (
      pathname.startsWith("/dashboard/job-postings") &&
      userRole === "job_seeker"
    ) {
      const url = new URL("/sign-in", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // If job seeker trying to access create route
    if (pathname.startsWith("/dashboard/create") && userRole === "job_seeker") {
      const url = new URL("/sign-in", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    // If not admin trying to access admin routes
    if (pathname.startsWith("/admin") && userRole !== "admin") {
      const url = new URL("/sign-in", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Match dashboard and admin routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
