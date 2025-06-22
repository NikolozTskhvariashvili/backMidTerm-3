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
    {
      date: "Apr 07",
      sleep: 8,
      mood: "😄",
      moodLabel: "Very Happy",
      feelings: ["Excited", "Confident"],
      reflection: "Got great news!",
    },
    {
      date: "Apr 09",
      sleep: 4,
      mood: "😢",
      moodLabel: "Very Sad",
      feelings: ["Stressed", "Overwhelmed"],
      reflection: "Hard day, too much work.",
    },
    {
      date: "Apr 10",
      sleep: 9,
      mood: "😄",
      moodLabel: "Very Happy",
      feelings: ["Relaxed", "Content"],
      reflection: "Felt refreshed and rested.",
    },
    {
      date: "Apr 12",
      sleep: 7,
      mood: "😐",
      moodLabel: "Neutral",
      feelings: ["Peaceful", "Tired"],
      reflection: "Nothing special happened today.",
    },
    {
      date: "Apr 13",
      sleep: 5,
      mood: "🙁",
      moodLabel: "Sad",
      feelings: ["Disappointed", "Irritable"],
      reflection: "Wasn’t my best day.",
    },
    {
      date: "Apr 14",
      sleep: 3,
      mood: "😢",
      moodLabel: "Very Sad",
      feelings: ["Restless", "Frustrated"],
      reflection: "Couldn’t sleep well last night.",
    },
    {
      date: "Apr 15",
      sleep: 9.5,
      mood: "😄",
      moodLabel: "Very Happy",
      feelings: ["Grateful", "Optimistic"],
      reflection: "Everything felt perfect today!",
    },
  ]);

  return (
    <Context.Provider value={{ data, setData }}>
      {children}
    </Context.Provider>
  );
};
