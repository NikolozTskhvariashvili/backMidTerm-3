import Header from "@/app/Components/Header/Header";
import MoodInformations from "@/app/Components/MoodInformations/MoodInformations";
import { MoodProvider } from "@/app/Components/MoodContext/MoodContext";
import React from "react";

const Page = () => {
  return (
    <MoodProvider>
      <div className="w-full min-h-screen py-[40px] flex flex-col items-center gap-[80px]">
        <Header />
        <MoodInformations />
      </div>
    </MoodProvider>
  );
};

export default Page;
