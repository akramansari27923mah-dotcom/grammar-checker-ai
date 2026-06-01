import { NextResponse as res } from "next/server";
import { savedModel } from "@/schemas/saved.model.schema";

export const DELETE = async (req, { params }) => {
  const { id } = await params;

  try {
    const data = await savedModel.findByIdAndDelete(id);

    if (!data) {
      return res.json(
        {
          message: "data not found",
        },
        { status: 404 },
      );
    }

    return res.json(
      {
        message: "data deleted successfully",
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
