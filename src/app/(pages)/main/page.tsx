"use client"
import Header from "@/app/Components/Header/Header";
import MoodInformations from "@/app/Components/MoodInformations/MoodInformations";
import React, { createContext, useState } from "react";

export const Contex = createContext<any>({})

const page = () => {
  const [data, setData] = useState([
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
    <Contex.Provider value={{data,setData}}>
          <div className="w-full h-screen py-[40px] flex flex-col items-center gap-[80px]">
      <Header />

      <MoodInformations />
    </div>
    </Contex.Provider>
  );
};

export default page;
