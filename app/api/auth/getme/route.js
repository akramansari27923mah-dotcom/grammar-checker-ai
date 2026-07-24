import connectDB from "@/db/database";
import { userModel } from "@/schemas/user.model.schema";
import jwt from "jsonwebtoken";
import { NextResponse as res } from "next/server";
export const GET = async (req) => {
  await connectDB()
  try {
    const token = await req.cookies.get("accessToken");

    if (!token) {
      return res.json({
        message: "User unauthorized",
        success: false,
      });
    }

    const decoded = jwt.verify(token.value, process.env.JWT_ACCESS_SECRET);

    const user = await userModel.findById(decoded.id);

    return res.json({
      message: "User fetched successfully",
      success: true,
      user: {
        username: user.username,
        email: user.email,
        id: user._id,
        image: user.image ? user.image : null
      },
      status: 200,
    });
  } catch (err) {
    console.log(err.message);

    return res.json(
      { message: "Invalid token", success: false },
      { status: 401 },
    );
  }
};
