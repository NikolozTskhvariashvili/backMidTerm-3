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

const Header = () => {
  const [modal, setModal] = useState(false);
  const [LogModal, SetLogModal] = useState(false);
  const { data, hasLoggedToday } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedInUser");
    if (!loggedUser) {
      router.push("/");
    }
  }, [router]);

  function LogOut() {
    localStorage.removeItem("loggedInUser");
    router.push("/");
    console.log("user deleted from localstorage");
  }

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });

  const todayMood = data.find((entry) => entry.date === today);
  const loggedUserRaw = localStorage.getItem("loggedInUser");
  const loggedUser = loggedUserRaw ? JSON.parse(loggedUserRaw) : null;

  return (
    <div className="flex flex-col items-center gap-[64px]">
      <div className="w-[1170px] flex items-center justify-between relative">
        <MoodTrackerLogo />

        <div
          onClick={() => setModal((prev) => !prev)}
          className="flex gap-[10px] items-center cursor-pointer"
        >
          <Image
            className="w-[40px] h-[40px] rounded-full"
            src={
              "https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png"
            }
            alt=""
            width={100}
            height={100}
          />
          {modal ? (
            <ArrowDown className={"rotate-180 duration-500"} />
          ) : (
            <ArrowDown className={"rotate-0 duration-500"} />
          )}
        </div>

        {modal && (
          <div className="py-[12px] px-[16px] flex flex-col w-[200px] absolute right-[0px] top-[50px] rounded-[8px] bg-white shadow-lg gap-[12px]">
            <div className="flex flex-col">
              <p className="text-[#21214D] text-[18px]">
                {loggedUser?.nickname}
              </p>
              <p className="text-[#9393B7] text-[15px]">{loggedUser?.email}</p>
            </div>

            <div className="w-full h-[1px] bg-[#9393B7]"></div>

            <div className="flex items-center gap-[10px] cursor-pointer">
              <SettingsIcon />
              <p className="text-[#21214D] text-[15px]">Settings</p>
            </div>

            <div
              onClick={LogOut}
              className="flex items-center gap-[10px] cursor-pointer"
            >
              <LogOutIcon />
              <p className="text-[#21214D] text-[15px]">Logout</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between w-[656px] items-center gap-[64px]">
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <p className="text-[#4865DB] text-[32px]">
            Hello, {loggedUser.nickname}!
          </p>
          <p className="text-[#21214D] text-[52px]">
            How are you feeling today?
          </p>
          <p className="text-[#57577B] text-[18px]">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {hasLoggedToday ? (
          <div className="flex gap-[32px]">
            <div className="flex gap-[32px] w-[670px] h-[340px] border border-[#E0E6FA] rounded-[16px] bg-white p-[32px]">
              <div className="flex flex-col justify-between">
                <div className="flex flex-col">
                  <p className="text-[#21214D] text-[32px] opacity-70 font-bold">
                    I’m feeling
                  </p>
                  <p className="text-[#21214D] text-[32px] font-bold">
                    {todayMood?.moodLabel}
                  </p>
                </div>

                <div className="flex flex-col gap-[12px] w-[246px]">
                  <Qoutes />

                  <p className="text-[#21214D] text-[18px]">
                    You are stronger than you think; the storm will pass.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <p className="text-[250px]">{todayMood?.mood}</p>
              </div>
            </div>

            <div className="flex flex-col gap-[20px] w-[400px]">
              <div className="p-[20px] flex flex-col gap-[16px] bg-white rounded-[16px] border border-[#E0E6FA]">
                <div className="flex gap-[12px]">
                  <SleepingIcon />
                  <p className="text-[#57577B] text-[18px]">Sleep</p>
                </div>

                <div className="flex gap-2">
                  <p className="text-[#21214D] text-[32px] font-bold">
                    {todayMood?.sleep}
                  </p>
                  <p className="text-[#21214D] text-[32px] font-bold">hours</p>
                </div>
              </div>

              <div className="flex flex-col gap-[16px] rounded-[16px] border border-[#E0E6FA] bg-white p-[20px]">
                <div className="flex gap-[12px]">
                  <StarsIcon />
                  <p className="text-[#57577B] text-[18px]">
                    Reflection of the day
                  </p>
                </div>

                <p className="w-full h-[60px] resize-none">
                  {todayMood?.reflection}
                </p>

                {todayMood?.feelings.map((feeling, index) => (
                  <p
                    key={index}
                    className="text-[#57577B] text-[18px] font-medium"
                  >
                    #{feeling}
                  </p>
                ))}
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

      {LogModal && (
        <MoodSelectModal SetLogModal={SetLogModal} LogModal={LogModal} />
      )}
    </div>
  );
};

export default Header;
