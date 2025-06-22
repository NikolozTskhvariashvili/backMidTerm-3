"use client"
import MoodTrackerLogo from "@/app/Common/Images/MoodTrackerLogo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const OnBoarding = () => {

   const router = useRouter();
  
    useEffect(() => {
      const loggedUser = localStorage.getItem("loggedInUser");
      if (!loggedUser) {
        router.push("/");
      }
    }, [router]);
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <MoodTrackerLogo />

      <div className="max-w-[530px] px-[40px] py-[32px] flex flex-col justify-between gap-[30px] rounded-[16px] bg-white shadow-lg">
        <div className="flex flex-col">
          <p className="text-[#21214D] text-[32px] font-bold">
            Personalize your experience
          </p>
          <p className="text-[#57577B] text-[18px] font-normal">
            Add your name and a profile picture to make Mood yours.
          </p>
        </div>

        <div className="flex flex-col">
          <p className="text-[#21214D]  text-[18px]">Name</p>
          <input
            className="text-[#57577B] text-[18px] px-[16px] py-[12px] w-full border border-[#9393B7] rounded-[10px] outline-0"
            type="text"
            placeholder="Jane Appleseed"
          />
        </div>

        <div className="w-full flex gap-[20px]">
          <Image
            className="rounded-full w-[64px] h-[64px]"
            src={
              "https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png"
            }
            alt=""
            width={100}
            height={100}
          />

          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col">
              <p className="text-[#21214D] text-[18px]">Upload Image</p>
              <p className="text-[#57577B] text-[15px]">
                Max 250KB, PNG or JPEG
              </p>
            </div>

            <input className="hidden" type="file" id="image" />
            <label
              className="py-[8px] px-[16px] border border-[#9393B7] rounded-[8px] w-fit cursor-pointer"
              htmlFor="image"
            >
              <p className="text-[#21214D] text-[18px]">Upload</p>
            </label>
          </div>
        </div>

        <div className="w-full py-[12px] flex items-center justify-center bg-[#4865DB] rounded-[10px] cursor-pointer">
          <p className="text-[20px] text-white">Start Tracking</p>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
