export const data = {
  message: "Reply successfully",
  success: true,
  result: {
    success: true,
    originalSentence: "i read book everyday",
    correctedSentence: "I read a book every day.",
    overallFeedback: "Good effort, but there are a few mistakes to correct.",
    mistakes: [
      {
        id: 1,
        type: "Capitalization",
        wrongText: "i",
        correctText: "I",
        explanation:
          "The first word in a sentence must start with a capital letter.",
        rule: "Always capitalize the first word in a sentence.",
      },
      {
        id: 2,
        type: "Article",
        wrongText: "book",
        correctText: "a book",
        explanation:
          "We use 'a' before a singular noun when we are talking about any book, not a specific one.",
        rule: "Use 'a' before singular nouns that are not specific.",
      },
      {
        id: 3,
        type: "Punctuation",
        wrongText: "everyday",
        correctText: "every day",
        explanation:
          "We use 'every day' with a space to mean each day, not 'everyday' which means done or used every day.",
        rule: "Use 'every day' with a space to mean each day.",
      },
    ],
  },
};