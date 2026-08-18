import { errorShow } from "@/lib/toast";
import { api } from "@/lib/axios";
import { saveInSessionStorage } from "@/lib/storageFunctions";

export const useGroqApiFunctions = () => {
  const correctEssay = async (
    setEssay,
    essayValue,
    setEssayUpdate,
    setLoader,
    setError,
  ) => {
    try {
      if (!essayValue.trim()) return errorShow("Please enter you essay!");
      if (essayValue?.length > 5000) return errorShow("It's too much words");
      setError("");
      setLoader(true);  
      setEssayUpdate(true);
      const { data } = await api.post("/groq/essayAnalyzer", { essayValue });
      console.log(data);

      if (!data?.data?.success)
        return setError(data?.data?.message) || errorShow(data?.data?.message);

      if (data?.success) {
        setEssay(data?.data);
        saveInSessionStorage("correctEssay", data?.data);
      }
    } catch (err) {
      console.log(err?.message);
      console.log(err?.response);
    } finally {
      setLoader(false);
      setError("");
    }
  };

  return {
    correctEssay,
  };
};
