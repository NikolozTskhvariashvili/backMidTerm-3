"use client";
import Header from "@/app/Components/Header/Header";
import MoodInformations from "@/app/Components/MoodInformations/MoodInformations";
import { MoodProvider } from "@/app/Components/MoodContext/MoodContext";
import { useEffect, useState } from "react";

const Page = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
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
