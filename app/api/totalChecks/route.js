import { totalChecksModel } from "@/schemas/totalChecks.model.schema";
import { NextResponse as res } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (req) => {
  try {
    const accessToken = await req.cookies.get("accessToken");

    const decoded = jwt.verify(
      accessToken?.value,
      process.env.JWT_ACCESS_SECRET,
    );

    const data = await totalChecksModel.find({ userId: decoded.id });

    if (!data) {
      return res.json(
        {
          message: "Total checkes not found",
        },
        { status: 404 },
      );
    }

    return res.json(
      {
        message: "TotalChecks fetched successfully",
        success: true,
        length: data.length,
        data,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err.message);
    return res.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
};
