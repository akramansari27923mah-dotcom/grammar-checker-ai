import { WRITING_CHECKER_PROMPT } from "@/lib/allprompt";
import { handelGroq } from "@/lib/groq";
import { NextResponse as res } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { writing } = body;

    if (!writing.trim()) {
      return res?.json(
        {
          message: "Writing is required",
          success: false,
        },
        { status: 401 },
      );
    }

    const aiReply = await handelGroq(writing, WRITING_CHECKER_PROMPT);
    const result = JSON.parse(aiReply);
    return res?.json({
      message: "Writing Corrected successfully",
      success: true,
      data: result,
    });
  } catch (err) {
    return res?.json(
      {
        message: "Internal server errro",
        success: false,
      },
      { status: 500 },
    );
  }
};
