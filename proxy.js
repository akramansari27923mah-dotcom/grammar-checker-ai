import { NextResponse } from "next/server";

export function proxy(req) {
  const accessToken = req.cookies.get("accessToken");

  if (!accessToken?.value) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/grammar-checker", "/dashboard/:path*"],
};
