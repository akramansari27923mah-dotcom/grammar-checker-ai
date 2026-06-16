import { handelGroq } from "@/lib/groq";
import { NextResponse as res } from "next/server";
import { groqModel } from "@/schemas/groq.model.schema";
import { historyModel } from "@/schemas/history.model.schema";
import jwt from "jsonwebtoken";
import { totalChecksModel } from "@/schemas/totalChecks.model.schema";
import { systemPrompt } from "@/lib/groqPrompt";
import { supportChatPrompt } from "@/lib/supportChatPrompt";
export const POST = async (req) => {
  try {
    const body = await req.json();
    const accessToken = await req.cookies.get("accessToken");
    const { prompt, support } = body;

    console.log(prompt);
    

    if (!prompt) {
      return res.json({
        message: "Prompt is required",
        status: 401,
      });
    }

    const sysPrompt = support ? supportChatPrompt : systemPrompt;

    const groqRes = await handelGroq(prompt, sysPrompt);

    const decoded = jwt.verify(
      accessToken?.value,
      process.env.JWT_ACCESS_SECRET,
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
