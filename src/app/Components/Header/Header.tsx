"use client";
import ArrowDown from "@/app/Common/Images/ArrowDown";
import LogOutIcon from "@/app/Common/Images/LogOutIcon";
import MoodTrackerLogo from "@/app/Common/Images/MoodTrackerLogo";
import SettingsIcon from "@/app/Common/Images/SettingsIcon";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import MoodSelectModal from "../MoodSelectModal/MoodSelectModal";
import { useRouter } from "next/navigation";
import { Context } from "../MoodContext/MoodContext";
import Qoutes from "@/app/Common/Images/Qoutes";
import SleepingIcon from "@/app/Common/Images/SleepingIcon";
import StarsIcon from "@/app/Common/Images/StarsIcon";
import OnBordingFields from "../OnBordingFelads/OnBordingFields";

interface MoodLogEntry {
  date: string;
  mood: string;
  moodLabel: string;
  sleep: number;
  reflection: string;
  feelings: string[];
}

const Header = () => {
  const [modal, setModal] = useState(false);
  const [LogModal, SetLogModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const { data } = useContext(Context);
  const router = useRouter();

  const stored = typeof window !== "undefined" ? localStorage.getItem("moodLogs") : null;
  const localData: MoodLogEntry[] = stored ? JSON.parse(stored) : [];
  const mergedData: MoodLogEntry[] = Array.isArray(data) ? [...data, ...localData] : localData;

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  const hasLoggedToday = mergedData.some((entry) => entry.date === today);
  const todayMood = mergedData.find((entry) => entry.date === today);

  const loggedUserRaw = localStorage.getItem("loggedInUser");
  const loggedUser = loggedUserRaw ? JSON.parse(loggedUserRaw) : null;

  useEffect(() => {
    if (!loggedUser) router.push("/");
  }, [router, loggedUser]);

  function LogOut() {
    router.push("/");
  }

  return (
    <>
      {settingsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="w-full max-w-[530px] mx-4">
            <OnBordingFields
              initialUser={loggedUser}
              onClose={() => setSettingsModal(false)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-[64px] w-full px-4">
        <div className="w-[1124px] max-w-full flex items-center justify-between relative">
          <MoodTrackerLogo />
          <div
            onClick={() => setModal((prev) => !prev)}
            className="flex gap-[10px] items-center cursor-pointer"
          >
            <Image
              className="w-[40px] h-[40px] rounded-full"
              src={
                loggedUser?.avatar !== ""
                  ? loggedUser?.avatar
                  : "https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png"
              }
              alt=""
              width={100}
              height={100}
            />
            <ArrowDown className={`${modal ? "rotate-180" : "rotate-0"} duration-500`} />
          </div>
          {modal && (
            <div className="py-[12px] px-[16px] flex flex-col w-[200px] absolute right-0 top-[50px] rounded-[8px] bg-white shadow-lg gap-[12px] z-40">
              <div className="flex flex-col">
                <p className="text-[#21214D] text-[18px]">{loggedUser?.nickname}</p>
                <p className="text-[#9393B7] text-[15px]">{loggedUser?.email}</p>
              </div>
              <div className="w-full h-[1px] bg-[#9393B7]"></div>
              <div onClick={() => setSettingsModal(true)} className="flex items-center gap-[10px] cursor-pointer">
                <SettingsIcon />
                <p className="text-[#21214D] text-[15px]">Settings</p>
              </div>
              <div onClick={LogOut} className="flex items-center gap-[10px] cursor-pointer">
                <LogOutIcon />
                <p className="text-[#21214D] text-[15px]">Logout</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between items-center gap-[64px]">
          <div className="flex flex-col items-center gap-[10px]">
            <p className="text-[#4865DB] text-[24px] sm:text-[28px] lg:text-[32px]">
              Hello, {loggedUser?.nickname}!
            </p>
            <p className="text-[#21214D] text-[28px] sm:text-[36px] lg:text-[44px] xl:text-[52px] text-center leading-tight">
              How are you feeling today?
            </p>
            <p className="text-[#57577B] text-[16px] sm:text-[18px] text-center">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {hasLoggedToday ? (
            <div className="flex flex-col xl:flex-row gap-[32px] w-full max-w-[1170px]">
              <div className="flex flex-col sm:flex-row gap-[32px] w-full xl:w-[670px] min-h-[340px] border border-[#E0E6FA] rounded-[16px] bg-white p-[20px] sm:p-[32px]">
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex flex-col">
                    <p className="text-[#21214D] text-[24px] sm:text-[32px] opacity-70 font-bold">
                      {`I'm feeling`}
                    </p>
                    <p className="text-[#21214D] text-[24px] sm:text-[32px] font-bold">
                      {todayMood?.moodLabel}
                    </p>
                  </div>
                  <div className="flex flex-col gap-[12px] w-full max-w-[246px] mt-4 sm:mt-0">
                    <Qoutes />
                    <p className="text-[#21214D] text-[16px] sm:text-[18px]">
                      You are stronger than you think; the storm will pass.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center flex-shrink-0">
                  <p className="text-[120px] sm:text-[180px] xl:text-[250px] leading-none">
                    {todayMood?.mood}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-[20px] w-full xl:w-[400px]">
                <div className="p-[20px] flex flex-col gap-[16px] bg-white rounded-[16px] border border-[#E0E6FA]">
                  <div className="flex gap-[12px]">
                    <SleepingIcon />
                    <p className="text-[#57577B] text-[18px]">Sleep</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-[#21214D] text-[28px] sm:text-[32px] font-bold">
                      {todayMood?.sleep}
                    </p>
                    <p className="text-[#21214D] text-[28px] sm:text-[32px] font-bold">hours</p>
                  </div>
                </div>
                <div className="flex flex-col gap-[16px] rounded-[16px] border border-[#E0E6FA] bg-white p-[20px]">
                  <div className="flex gap-[12px]">
                    <StarsIcon />
                    <p className="text-[#57577B] text-[18px]">Reflection of the day</p>
                  </div>
                  <p className="w-full min-h-[60px] text-[#21214D] text-[16px] leading-relaxed">
                    {todayMood?.reflection}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {todayMood?.feelings?.map((feeling, index) => (
                      <p
                        key={index}
                        className="text-[#57577B] text-[16px] sm:text-[18px] font-medium"
                      >
                        #{feeling}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => SetLogModal(true)}
              className="py-[16px] px-[32px] rounded-[10px] bg-[#4865DB] w-fit cursor-pointer"
            >
              <p className="text-white text-[20px]">{`Log today's mood`}</p>
            </div>
          )}
        </div>
      </div>

      {LogModal && (
        <MoodSelectModal SetLogModal={SetLogModal} LogModal={LogModal} />
      )}
    </>
  );
};

export default Header;
