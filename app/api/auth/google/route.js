import connectDB from "@/db/database";
import generateToken, { accessCookieOptions } from "@/lib/generateToken";
import { sendEmail, signInWithGoogleEmail } from "@/lib/sendEmail";
import { userModel } from "@/schemas/user.model.schema";
import { NextResponse as res } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();
    const body = await req.json();
    const { username, email, image, googleId } = body;

    let user = await userModel.findOne({
      email: email,
    });

    if (!user) {
      user = await userModel.create({
        username,
        email,
        image,
        googleId,
        provider: "google",
      });
    }

    const accessToken = generateToken(user._id);

    const response = res.json(
      {
        message: "User Logged in successfully",
        success: true,
        user,
      },
      { status: 201 },
    );

    await signInWithGoogleEmail(user.email, user?.username);

    response.cookies.set("accessToken", accessToken, accessCookieOptions);

    return response;
  } catch (err) {
    console.log(err?.message);
  }
};
