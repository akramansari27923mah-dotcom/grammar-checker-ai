import { api } from "./axios";
const handleChat = async (prompt, setLoader, support) => {

  try {
    setLoader(true);
    const { data } = await api.post("/groq/grammarChecker", { prompt, support });
    return data;
  } catch (err) {
    console.log(err.message);
  } finally {
    setLoader(false);
  }
};
export default handleChat;
