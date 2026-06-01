import { historyModel } from "@/schemas/history.model.schema";
import { NextResponse as res } from "next/server";
import jwt from "jsonwebtoken";

export const GET = async (req) => {
  try {
    const accessToken = await req.cookies.get("accessToken");

    const decoded = jwt.verify(
      accessToken?.value,
      process.env.JWT_ACCESS_SECRET,
    );

    const history = await historyModel.find({ userId: decoded?.id });   

    if (!history) {
      return res.json({
        message: "History not yet",
        status: 404,
      });
    }

    return res.json(
      {
        message: "History Fetched Successfully",
        history,
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
