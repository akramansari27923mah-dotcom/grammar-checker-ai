import connectDB from "@/db/database";
import generateToken, { accessCookieOptions } from "@/lib/generateToken";
import { sendEmail } from "@/lib/sendEmail";
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

    await sendEmail(
      user.email,
      "Welcome to Our Platform",
      `
          Hello ${user?.username},
    
    Your account has been created successfully By Google.
    
    We are excited to have you with us.
    
    You can now log in and start using our platform.
    
    If you have any questions, feel free to contact us.
    
    Thank you.
          `,
    );

    response.cookies.set("accessToken", accessToken, accessCookieOptions);

    return response;
  } catch (err) {
    console.log(err?.message);
  }
};
