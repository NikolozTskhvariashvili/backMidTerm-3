"use client";
import React, { createContext, useState } from "react";

export interface MoodData {

  createdAt: string;

  sleep: number;    
  mood: string;       
  moodLabel: string;     
  feelings: string[];
  reflection: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  image?: string;
}

interface ContextType {
  data: MoodData[];
  setData: React.Dispatch<React.SetStateAction<MoodData[]>>;
  hasLoggedToday: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}


export const Context = createContext<ContextType>({
  data: [],
  setData: () => {},
  hasLoggedToday: false,
  user: null,
  setUser: () => {},
});

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<MoodData[]>([
    
  ]);

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
const hasLoggedToday = Array.isArray(data) && data.some(
  (e) =>
    new Date(e.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    }) === today,
);

  const [user, setUser] = useState<User | null>(null);

  return (
    <Context.Provider value={{ data, setData, hasLoggedToday, user, setUser }}>
      {children}
    </Context.Provider>
  );
};
