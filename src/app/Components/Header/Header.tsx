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
import { deleteCookie } from "cookies-next";

interface MoodLogEntry {
  date: string;
  mood: string;
  moodLabel: string;
  sleep: number;
  reflection: string;
  feelings: string[];
}

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Header: React.FC = () => {
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const [hasLoggedToday, setHasLoggedToday] = useState(false);
  const [todayMood, setTodayMood] = useState<MoodLogEntry | null>(null);

  const { user, data: ContexData } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (!user?._id) return;

    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user._id}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(res.statusText);

        const json = await res.json();
        const today = new Date().toDateString();

        const entry = json?.moods?.find(
          (m: any) => new Date(m.createdAt).toDateString() === today
        );

        setTodayMood(
          entry
            ? {
                date: today,
                mood: entry.mood,
                moodLabel: entry.moodLabel,
                sleep: entry.sleep,
                reflection: entry.reflection,
                feelings: entry.feelings,
              }
            : null
        );
        setHasLoggedToday(Boolean(entry));
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error(err);
      }
    };

    load();
    return () => controller.abort();
  }, [ContexData, user?._id]);

  const handleLogout = () => {
    deleteCookie("token");
    router.push("/");
  };

  return (
    <>
      {settingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-full max-w-[530px] mx-4">
            <OnBordingFields
              initialUser={user}
              onClose={() => setSettingsModalOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-16 w-full px-4">
        <div className="w-[1124px] max-w-full flex items-center justify-between relative">
          <MoodTrackerLogo />

          <div
            onClick={() => setAvatarModalOpen((p) => !p)}
            className="flex gap-2.5 items-center cursor-pointer"
          >
            <Image
              className="w-10 h-10 rounded-full"
              src={
                user?.image?.trim()
                  ? user.image
                  : "https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png"
              }
              alt="User avatar"
              width={100}
              height={100}
            />
            <ArrowDown
              className={`${
                avatarModalOpen ? "rotate-180" : "rotate-0"
              } transition-transform duration-500`}
            />
          </div>

          {avatarModalOpen && (
            <div className="py-3 px-4 flex flex-col w-52 absolute right-0 top-14 rounded-lg bg-white shadow-lg gap-3 z-40">
              <div className="flex flex-col">
                <p className="text-[#21214D] text-lg">{user?.fullName}</p>
                <p className="text-[#9393B7] text-sm">{user?.email}</p>
              </div>
              <div className="w-full h-px bg-[#9393B7]" />
              <button
                onClick={() => setSettingsModalOpen(true)}
                className="flex items-center gap-2.5 text-left"
              >
                <SettingsIcon />
                <span className="text-[#21214D] text-sm">Settings</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 text-left"
              >
                <LogOutIcon />
                <span className="text-[#21214D] text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-2.5">
            <p className="text-[#4865DB] text-2xl sm:text-3xl lg:text-4xl">
              Hello, {user?.fullName.split(" ")[0]}!
            </p>
            <p className="text-[#21214D] text-3xl sm:text-4xl lg:text-5xl text-center leading-tight">
              How are you feeling today?
            </p>
            <p className="text-[#57577B] text-base sm:text-lg text-center">
              {fmtDate(new Date())}
            </p>
          </div>

          {hasLoggedToday && todayMood ? (
            <div className="flex flex-col xl:flex-row gap-8 w-full max-w-[1170px]">
              <div className="flex flex-col sm:flex-row gap-8 w-full xl:w-[670px] min-h-[340px] border border-[#E0E6FA] rounded-2xl bg-white p-5 sm:p-8">
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-[#21214D] text-2xl sm:text-3xl opacity-70 font-bold">
                      I'm feeling
                    </p>
                    <p className="text-[#21214D] text-2xl sm:text-3xl font-bold">
                      {todayMood.moodLabel}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 w-full max-w-[246px] mt-4 sm:mt-0">
                    <Qoutes />
                    <p className="text-[#21214D] text-base sm:text-lg">
                      You are stronger than you think; the storm will pass.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center flex-shrink-0">
                  <p className="text-[120px] sm:text-[180px] xl:text-[250px] leading-none">
                    {todayMood.mood}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5 w-full xl:w-[400px]">
                <div className="p-5 flex flex-col gap-4 bg-white rounded-2xl border border-[#E0E6FA]">
                  <div className="flex gap-3">
                    <SleepingIcon />
                    <p className="text-[#57577B] text-lg">Sleep</p>
                  </div>
                  <div className="flex gap-2">
                    <p className="text-[#21214D] text-2xl sm:text-3xl font-bold">
                      {todayMood.sleep}
                    </p>
                    <p className="text-[#21214D] text-2xl sm:text-3xl font-bold">
                      hours
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border border-[#E0E6FA] bg-white p-5">
                  <div className="flex gap-3">
                    <StarsIcon />
                    <p className="text-[#57577B] text-lg">
                      Reflection of the day
                    </p>
                  </div>
                  <p className="w-full min-h-[60px] text-[#21214D] text-base leading-relaxed">
                    {todayMood.reflection}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {todayMood.feelings.map((feeling, i) => (
                      <p
                        key={i}
                        className="text-[#57577B] text-base sm:text-lg font-medium"
                      >
                        #{feeling}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setLogModalOpen(true)}
              className="py-4 px-8 rounded-lg bg-[#4865DB] text-white text-xl"
            >
              Log today's mood
            </button>
          )}
        </div>
      </div>

      {logModalOpen && (
        <MoodSelectModal
          SetLogModal={setLogModalOpen}
          LogModal={logModalOpen}
        />
      )}
    </>
  );
};

export default Header;
