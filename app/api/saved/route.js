import { savedModel } from "@/schemas/saved.model.schema";
import { NextResponse as res } from "next/server";
import jwt from 'jsonwebtoken'

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { prompt, replyFromAi, userId } = body;

    if (!prompt || !replyFromAi) {
      return res.json({
        message: "Prompt or replyformai are both required",
        status: 401,
      });
    }

    const saved = await savedModel.create({
      userId,
      prompt,
      replyFromAi,
    });

    const response = res.json(
      {
        saved,
      },
      { status: 200 },
    );

    return response;
  } catch (err) {
    console.log(err.message);
    return res.json({
      message: "Internal server error",
      status: 500,
    });
  }
};

export const GET = async (req) => {
  try {
    const accessToken = await req.cookies.get("accessToken");

    const decoded = jwt.verify(
      accessToken?.value,
      process.env.JWT_ACCESS_SECRET,
    );

    const saved = await savedModel.find({ userId: decoded?.id });

    if (!saved) {
      return res.json(
        {
          message: "not save yet",
        },
        { status: 404 },
      );
    }

    return res.json(
      {
        message: "Fetched successfully saved",
        saved,
      },
      { status: 200 },
    );
  } catch (err) {
    return res.json(
      {
        message: "Internal server error",
        error: err.message,
      },
      { status: 500 },
    );
  }
};
