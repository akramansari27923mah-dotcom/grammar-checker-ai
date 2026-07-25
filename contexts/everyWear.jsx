/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { api } from "@/lib/axios";
import { getFromLocalStorage } from "@/lib/storageFunctions";
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [update, setUpdate] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoader, setHistoryLoader] = useState(false);
  const [saved, setSaved] = useState([]);
  const [saveLoader, setSaveLoader] = useState(false);
  const [checkUserLoader, setCheckUserLoader] = useState(false);
  const [synData, setSynData] = useState([])
  const [synDataUpdate, setSynDataUpdate] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      setCheckUserLoader(true);
      try {
        const { data } = await api.get("/auth/getme");
        setUser(data?.user);
        
        localStorage.setItem("userId", data?.user?.id);
      } catch (err) {
        console.log(err.message);
      } finally {
        setCheckUserLoader(false);
      }
    };

    fetchUser();
  }, [update]);

  useEffect(() => {
    const fetchUser = async () => {
      setHistoryLoader(true);
      try {
        const { data } = await api.get("/history");
        setHistory(data?.history);
      } catch (err) {
        console.log(err.message);
      } finally {
        setHistoryLoader(false);
      }
    };

    fetchUser();
  }, [update]);

  useEffect(() => {
     const data = getFromLocalStorage('word')
     setSynData(data)
  }, [synDataUpdate])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loader,
        setLoader,
        setUpdate,
        update,
        history,
        setHistory,
        setHistoryLoader,
        historyLoader,
        saved,
        setSaved,
        saveLoader,
        setSaveLoader,
        checkUserLoader,
        synData,
        setSynData,
        synDataUpdate, setSynDataUpdate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const everyWearCon = () => useContext(AuthContext);
