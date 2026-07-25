import { NextResponse as res } from "next/server";
import { textToSpeech } from "@/lib/groq";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { word } = body;

    const audio = await textToSpeech(word);
    const audioBuffer = Buffer.from(await audio.arrayBuffer());

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/wav",
      },
    });
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
