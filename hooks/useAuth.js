import { everyWearCon } from "@/contexts/everyWear";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { errorShow, successShow } from "@/lib/toast";

export const useAuth = () => {
  const { setUser, setLoader, setUpdate } = everyWearCon();
  const router = useRouter();

  const login = async (userd) => {
    setLoader(true);
    setUpdate(true);
    try {
      const { data } = await api.post("/auth/signin", userd);

      if (data?.user) {
        router.push("/");
        setUser(data?.user);
        successShow("Loggdin successfully");
      }
    } catch (err) {
      if (err.response.status === 401) errorShow("Invalid Credentials");
    } finally {
      setLoader(false);
      setUpdate(false);
    }
  };

  const signup = async (userd) => {
    setLoader(true);
    setUpdate(true);
    try {
      const { data } = await api.post("/auth/signup", userd);
      console.log(data);
      
      if (data?.user) {
        router.push("/login");
        setUser(data?.user);
        successShow("Account created successfully");
      }
    } catch (err) {
      
      if (err.response.status === 400)
        errorShow("This email is already registered. Please sign in.");
      else {
        errorShow("Failed to create account. Please try again.");
      }
    } finally {
      setLoader(false);
      setUpdate(false);
    }
  };

  const logout = async () => {
    setLoader(true);
    setUpdate(true);
    try {
      const { data } = await api.post("/auth/logout");

      if (data?.success) {
        router.push("/login");
        successShow("Logged out successfully");
      }
    } catch (err) {
      console.log(err.message);
      errorShow("Logout failed");
    } finally {
      setLoader(false);
      setUpdate(false);
    }
  };

  return {
    login,
    signup,
    logout,
  };
};
