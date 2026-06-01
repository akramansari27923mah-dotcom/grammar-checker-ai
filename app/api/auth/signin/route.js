import { userModel } from "@/schemas/user.model.schema";
import { NextResponse as res } from "next/server";
import bcrypt from "bcrypt";
import generateToken, { accessCookieOptions } from "@/lib/generateToken";
import connectDB from "@/db/database";
import { sendEmail } from "@/lib/sendEmail";

export const POST = async (req) => {
  await connectDB();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return res.json({
        message: "All fields are required",
        success: false,
      });
    }

    const isUser = await userModel.findOne({ email: email });

    if (!isUser) {
      return res.json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const isPassword = await bcrypt.compare(password, isUser.password);

    if (!isPassword) {
      return res.json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const accessToken = generateToken(isUser._id);

    const response = res.json({
      message: "User login successfully",
      user: {
        username: isUser.username,
        email: isUser.email,
        password: isUser.password,
      },
      status: 200,
    });

    await sendEmail(
      isUser.email,
      "Login Alert",
      `
      Hello, ${isUser.username}

You have successfully logged into your account.

If this was you, no action is needed.

If you did not log in, please change your password immediately.

Thank you.
      `,
    );

    response.cookies.set("accessToken", accessToken, accessCookieOptions);

    return response;
  } catch (err) {
    console.log(err.message);
    return res.json({
      message: "Internal server error",
      success: false,
    });
  }
};
