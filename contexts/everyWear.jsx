"use client";

import { api } from "@/lib/axios";
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
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/getme");
        setUser(data?.user);
      } catch (err) {
        console.log(err.message);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const everyWearCon = () => useContext(AuthContext);
