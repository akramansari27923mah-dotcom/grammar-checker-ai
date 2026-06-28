import { NextResponse as res } from "next/server";
import stayUpdateModel from "@/schemas/stayUpdate.model.schema";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { stayUpdate } = body;

    if (!stayUpdate) {
      return res.json(
        {
          message: "Email is required",
          success: false,
        },
        { status: 401 },
      );
    }

    const isEmailExist = await stayUpdateModel.findOne({ stayUpdate });

    if (isEmailExist) {
      return res.json(
        {
          message: "Email already exist",
          success: false,
        },
        { status: 400 },
      );
    }

    const Subscriber = await stayUpdateModel.create({
      stayUpdate,
    });

    const response = res.json(
      {
        message: "Subscribed Successfully",
        success: true,
        Subscriber,
      },
      { status: 201 },
    );

    return response;
  } catch (err) {
    return res.json(
      {
        message: "Internel server error",
        success: false,
      },
      { status: 500 },
    );
  }
};
