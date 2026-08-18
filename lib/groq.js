import Groq from "groq-sdk";
import { config } from "./config";

const groq = new Groq({
  apiKey: config?.GROQ_API_KEY,
});

export const handelGroq = async (prompt, systemPrompt) => {
  try {
    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const callAi = async (model) => {
      return await Promise.race([
        groq.chat.completions.create({
          model,
          messages,
          temperature: 0.2,
          response_format: {
            type: "json_object"
          },
          max_completion_tokens: 6000 
        }),

        new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Timeout")), 20000);
        }),
      ]);
    };

    try {
      const res = await callAi("openai/gpt-oss-120b");
      return res.choices[0]?.message?.content || "";
    } catch (err) {
      console.log("Primary model failed, switching...");

      try {
        const res = await callAi("openai/gpt-oss-20b");
        return res.choices[0]?.message?.content || "";
      } catch (err) {
        console.log("Fallback also failed", err);
        return "Server is currently busy. Please try again later.";
      }
    }
  } catch (err) {
    console.error("Groq Error:", err);
    return "Server is busy, please try again.";
  }
};

export const textToSpeech = async (word) => {
  try {
    const response = await groq.audio.speech.create({
      model: "canopylabs/orpheus-v1-english",
      voice: "hannah",
      input: word,
      response_format: "wav",
    });

    return response;
  } catch (error) {
    console.error("TTS Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};
