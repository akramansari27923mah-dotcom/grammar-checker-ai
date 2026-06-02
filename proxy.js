import { NextResponse as res } from "next/server";

export const config = {
  matcher: ["/grammar-checker", "/dashboard/:path*"],
};

export async function proxy(req) {
  try {
    const accessToken = await req.cookies.get("accessToken");
    console.log(accessToken);

    if (!accessToken) {
      return res.redirect(new URL("/login", req.url));
    }

    return res.next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}
