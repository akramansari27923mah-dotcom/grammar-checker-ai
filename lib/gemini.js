import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const geminiResponse = async (userMessage) => {
  try {
    const prompt = `
You are an advanced English grammar correction assistant.

Your job:
- Correct grammar mistakes
- Correct spelling mistakes
- Improve punctuation
- Improve sentence structure
- Keep the original meaning
- Make sentences natural and fluent
- Explain mistakes in very simple English
- Be friendly and encouraging

Rules:
1. If the sentence is already correct, say:
   "Your sentence is correct."

2. Keep explanations short and easy.

3. Always respond in this format:

Original:
"<original sentence>"

Corrected:
"<corrected sentence>"

Explanation:
- mistake 1
- mistake 2

Better Alternative:
"<more natural sentence>"

4. Do NOT use difficult English words in explanations.

5. If the user sends only one word:
- explain its meaning
- give 2 simple examples

User Sentence:
"${userMessage}"
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt
    });
console.log(response.text);

    return response.text;
  } catch (error) {
    console.log("Gemini Error:", error.message);

    return "Something went wrong while checking grammar.";
  }
};

export default geminiResponse;
