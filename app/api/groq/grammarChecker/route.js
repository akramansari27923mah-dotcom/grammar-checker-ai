import { handelGroq } from "@/lib/groq";
import { NextResponse as res } from "next/server";
import { groqModel } from "@/schemas/groq.model.schema";
import { historyModel } from "@/schemas/history.model.schema";
import jwt from "jsonwebtoken";
import { totalChecksModel } from "@/schemas/totalChecks.model.schema";
import { SYSTEM_PROMPT } from "@/lib/allprompt";
import { config } from "@/lib/config";
export const POST = async (req) => {
  try {
    const body = await req.json();
    const accessToken = await req.cookies.get("accessToken");
    const { prompt, support } = body;
    

    if (!prompt) {
      return res.json({
        message: "Prompt is required",
        status: 401,
      });
    }

    const groqRes = await handelGroq(prompt, SYSTEM_PROMPT);

    const decoded = jwt.verify(
      accessToken?.value,
      config.JWT_ACCESS_SECRET,
    );

    await groqModel.create({
      prompt,
      replyFromAi: groqRes,
    });

    if (!support) {
      await historyModel.create({
        userId: decoded.id,
        prompt,
        replyFromAi: groqRes,
      });
    }

    await totalChecksModel.create({
      userId: decoded.id,
      prompt,
      replyFromAi: groqRes,
    });

    return res.json(groqRes);
  } catch (err) {
    console.log(err.message);
    return res.json({
      message: "Groq Api Failed",
      status: 500,
    });
  }
};
