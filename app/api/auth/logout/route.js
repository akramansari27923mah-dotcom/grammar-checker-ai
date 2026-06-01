import { NextResponse as res } from "next/server";
export const POST = async (req) => {
  const token = await req?.cookies?.get("accessToken");

  if (!token) {
    return res.redirect(new URL("/login", req.url));
  }

  const response = res.json({
    message: "User logout successfully",
    success: true,
  });

  response?.cookies?.set("accessToken", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response
};
