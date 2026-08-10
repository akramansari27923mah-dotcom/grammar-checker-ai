import { handelGroq } from "@/lib/groq";
import { NextResponse as res } from "next/server";
import { SUPPORT_CHAT_PROMPT } from "@/lib/allprompt";
export const POST = async (req) => {
  try {
    const body = await req.json();
    const { prompt } = body;


    if (!prompt) {
      return res.json({
        message: "Prompt is required",
        status: 401,
      });
    }

    const groqRes = await handelGroq(prompt, SUPPORT_CHAT_PROMPT);

    return res.json(groqRes);
  } catch (err) {
    console.log(err.message);
    return res.json({
      message: "Groq Api Failed",
      status: 500,
    });
  }
};
