"use client";
import React, { createContext, useState } from "react";

export interface MoodData {
  date: string;
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
    {
      date: "Mar 31",
      sleep: 7,
      mood: "😐",
      moodLabel: "Neutral",
      feelings: ["Calm", "Tired"],
      reflection: "It was a slow and normal day.",
    },
    {
      date: "Apr 02",
      sleep: 9,
      mood: "😄",
      moodLabel: "Very Happy",
      feelings: ["Joyful", "Grateful"],
      reflection: "Had a fun day with friends.",
    },
    {
      date: "Apr 04",
      sleep: 6,
      mood: "🙂",
      moodLabel: "Happy",
      feelings: ["Hopeful", "Motivated"],
      reflection: "Productive mood, finished tasks.",
    },
    {
      date: "Apr 06",
      sleep: 5,
      mood: "🙁",
      moodLabel: "Sad",
      feelings: ["Down", "Lonely"],
      reflection: "Missed someone today.",
    },
  ]);

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  const hasLoggedToday = data.some((entry) => entry.date === today);

  const [user, setUser] = useState<User | null>(null);

  return (
    <Context.Provider value={{ data, setData, hasLoggedToday, user, setUser }}>
      {children}
    </Context.Provider>
  );
};
