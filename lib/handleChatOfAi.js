import { api } from "./axios";
const handleChat = async (prompt, setLoader) => {

  try {
    setLoader(true);
    const { data } = await api.post("/groq/customerSupport", { prompt});
    return data;
  } catch (err) {
    console.log(err.message);
  } finally {
    setLoader(false);
  }
};
export default handleChat;
