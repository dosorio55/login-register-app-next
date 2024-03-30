import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isPulic = path === "/login" || path === "/signup";

  const token = req.cookies.get("token")?.value ?? "";

  if (path === "/profile" && !token) {
    return NextResponse.redirect("/login");
  }

  if (!isPulic && !token) {
    return NextResponse.redirect("/login");
  }

  if (isPulic && token) {
    return NextResponse.redirect("/profile");
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
