"use client";
import React, { createContext, useState } from "react";
interface MoodData {
  date: string;
  sleep: number;
  mood: string;
}
interface ContextType {
  data: MoodData[];
  setData: React.Dispatch<React.SetStateAction<MoodData[]>>;
}
export const Context = createContext<ContextType>({
  data: [],
  setData: () => {},
});
export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<MoodData[]>([
    { date: "Mar 31", sleep: 7, mood: "😐" },
    { date: "Apr 02", sleep: 9, mood: "😄" },
    { date: "Apr 04", sleep: 6, mood: "🙂" },
    { date: "Apr 06", sleep: 5, mood: "🙁" },
    { date: "Apr 07", sleep: 8, mood: "😄" },
    { date: "Apr 09", sleep: 4, mood: "😢" },
    { date: "Apr 10", sleep: 9, mood: "😄" },
    { date: "Apr 12", sleep: 7, mood: "😐" },
    { date: "Apr 13", sleep: 5, mood: "🙁" },
    { date: "Apr 14", sleep: 3, mood: "😢" },
    { date: "Apr 15", sleep: 9.5, mood: "😄" },
  ]);
  return (
    <Context.Provider value={{ data, setData }}>{children}</Context.Provider>
  );
};
