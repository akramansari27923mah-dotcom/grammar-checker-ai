import { handelGroq } from "@/lib/groq";
import { NextResponse as res } from "next/server";
import { SynonymAntonymModel } from "@/schemas/ayn&syn.model.schema";
import jwt from "jsonwebtoken";
import { config } from "@/lib/config";
import { SYN_ANT_PROMPT } from "@/lib/allprompt";
export const POST = async (req) => {
  try {
    const body = await req.json();
    const accessToken = await req.cookies.get("accessToken");
    const { word } = body;

    if (!word) {
      return res.json({
        message: "Prompt is required",
        status: 401,
      });
    }

    const groqRes = await handelGroq(word, SYN_ANT_PROMPT);
    const parsed = JSON.parse(groqRes);

    const { partOfSpeech, meaning, synonyms, antonyms, example } = parsed || {};

    const decoded = jwt.verify(accessToken?.value, config.JWT_ACCESS_SECRET);

    await SynonymAntonymModel.create({
      word,
      partOfSpeech,
      meaning,
      synonyms,
      antonyms,
      example,
      userId: decoded.id,
    });

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
