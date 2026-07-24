import connectDB from "@/db/database";
import { NextResponse as res } from "next/server";
import { userModel } from "@/schemas/user.model.schema";
import generateHash from "@/lib/generateHash";
import { registeredEmail, sendEmail } from "@/lib/sendEmail";
export const POST = async (req) => {
  await connectDB();
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return res.json(
        {
          message: "All fields are required",
          success: false,
        },
        { status: 400 },
      );
    }

    const isUser = await userModel.findOne({ email: email });

    if (isUser) {
      return res.json(
        {
          message: "User already exist!",
          success: false,
        },
        { status: 400 },
      );
    }

    const hasedPassword = await generateHash(password);

    const user = await userModel.create({
      username,
      email,
      password: hasedPassword,
      provider: "credentials",
    });

    const response = res.json(
      {
        message: "User created successfully",
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
        },
      },
      { status: 200 },
    );

    await registeredEmail(user?.email, user?.username);

    return response;
  } catch (err) {
    console.error(err.message);
    return res.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
};
