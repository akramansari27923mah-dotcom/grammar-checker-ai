import { handelGroq } from "@/lib/groq";
import { NextResponse as res } from "next/server";
import { ESSAY_CHECKER_PROMPT } from "@/lib/allprompt";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { essayValue } = body;
    
    if (!essayValue.trim() || typeof essayValue !== "string" || !essayValue) {
      return res.json(
        {
          message: "Essay is required.",
          success: false,
        },
        { status: 401 },
      );
    }
    
    const aiResponse = await handelGroq(essayValue, ESSAY_CHECKER_PROMPT);
    const result = JSON.parse(aiResponse)
    
    return res.json(  
      {
        message: "Respond successfully",
        success: true,
        data: result,
      },
      { status: 200 },
    );
  } catch (err) {
    return res.json(
      {
        message: err?.message || "Internal server error!",
        success: false,
      },
      { status: 500 },
    );
  }
};
