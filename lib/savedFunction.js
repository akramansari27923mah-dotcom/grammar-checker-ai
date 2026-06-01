import { api } from "./axios";

export const savedFunction = async ({ prompt, replyFromAi, userId }) => {
  try {
    const { data } = await api.post("/saved", { prompt, replyFromAi, userId });
  } catch (err) {
    console.log(err.message);
  }
};

