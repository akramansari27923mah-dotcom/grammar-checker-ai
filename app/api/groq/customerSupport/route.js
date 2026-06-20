import { handelGroq } from "@/lib/groq";
import { NextResponse as res } from "next/server";
import { supportChatPrompt } from "@/lib/supportChatPrompt";
export const POST = async (req) => {
  try {
    const body = await req.json();
    const { prompt } = body;

    console.log(prompt);

    if (!prompt) {
      return res.json({
        message: "Prompt is required",
        status: 401,
      });
    }

    const sysPrompt = supportChatPrompt;

    const groqRes = await handelGroq(prompt, sysPrompt);

    return res.json(groqRes);
  } catch (err) {
    console.log(err.message);
    return res.json({
      message: "Groq Api Failed",
      status: 500,
    });
  }
};
