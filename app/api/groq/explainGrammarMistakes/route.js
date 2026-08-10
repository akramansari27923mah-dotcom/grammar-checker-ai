import { config } from "@/lib/config";
import { EXPLAIN_GRAMMAR_PROMPT } from "@/lib/allprompt";
import { handelGroq } from "@/lib/groq";
import { explainGrammerModel } from "@/schemas/grammerMistakes.model.schema";
import { NextResponse as res } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const accessToken = await req.cookies.get("accessToken");
    const { sentence } = body;

    if (!sentence) {
      return res.json(
        {
          message: "Please enter your sentence",
          success: false,
        },
        { status: 400 },
      );
    }

    const decoded = jwt.verify(accessToken?.value, config.JWT_ACCESS_SECRET);

    const systemPrompt = EXPLAIN_GRAMMAR_PROMPT.replace("{sentence}", sentence);
    const aiResponse = await handelGroq(sentence, systemPrompt);

    const result = JSON.parse(aiResponse);

    if (!result) {
      return res.json(
        {
          message: "Ai response failed",
          success: false,
        },
        { status: 401 },
      );
    }

    await explainGrammerModel.create({
      mistakes: result,
      userId: decoded?.id,
    });

    console.log("result is working");

    return res.json(
      {
        message: "Reply successfully",
        success: true,
        result,
      },
      { status: 200 },
    );
  } catch (err) {
    return res.json(
      {
        message: "Internal server error",
        success: false,
      },
      { status: 500 },
    );
  }
};
