import connectDB from "@/db/database";
import { NextResponse as res } from "next/server";
import { userModel } from "@/schemas/user.model.schema";
import generateHash from "@/lib/generateHash";
import { sendEmail } from "@/lib/sendEmail";
export const POST = async (req) => {
  await connectDB();
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return res.json({
        message: "All fields are required",
        success: false,
      });
    }

    const isUser = await userModel.findOne({ email: email });

    if (isUser) {
      return res.json({
        message: "User already exist!",
        success: false,
      });
    }

    const hasedPassword = await generateHash(password);

    const user = await userModel.create({
      username,
      email,
      password: hasedPassword,
    });

    const response = res.json({
      message: "User created successfully",
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });

    await sendEmail(
    user.email,
      "Welcome to Our Platform",
      `
      Hello ${user?.username},

Your account has been created successfully.

We are excited to have you with us.

You can now log in and start using our platform.

If you have any questions, feel free to contact us.

Thank you.
      `,
    );

    return response;
  } catch (err) {
    console.log(err.message);
    return res.json({
      message: "Internal server error",
      success: false,
    });
  }
};
