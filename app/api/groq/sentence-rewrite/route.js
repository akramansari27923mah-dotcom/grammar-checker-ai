import { handelGroq } from "@/lib/groq";
import { NextResponse as res } from "next/server";
import jwt from "jsonwebtoken";
import { config } from "@/lib/config";
import { SENTENCE_REWRITE_PROMPT } from "@/lib/allprompt";
import { rewriteModel } from "@/schemas/rewrite.model.schema";
export const POST = async (req) => {
  try {
    const body = await req.json();
    const accessToken = await req.cookies.get("accessToken");
    const { sentence } = body;

    if (!sentence) {
      return res.json({
        message: "Sentence is required",
        status: 401,
      });
    }

    const groqRes = await handelGroq(sentence, SENTENCE_REWRITE_PROMPT);
    const parsed = JSON.parse(groqRes);


    const decoded = jwt.verify(accessToken?.value, config.JWT_ACCESS_SECRET);

    await rewriteModel.create({
        rewrite: parsed,
        userId: decoded?.id
    })

    return res.json({
      message: "generated successfully",
      success: true,
      data: parsed,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      message: "Groq Api Failed",
      status: 500,
    });
  }
};
