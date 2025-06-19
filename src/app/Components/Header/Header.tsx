'use client'
import ArrowDown from "@/app/Common/Images/ArrowDown";
import LogOutIcon from "@/app/Common/Images/LogOutIcon";
import MoodTrackerLogo from "@/app/Common/Images/MoodTrackerLogo";
import SettingsIcon from "@/app/Common/Images/SettingsIcon";
import Image from "next/image";
import React, { useState } from "react";

const Header = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="w-[1170px] flex items-center justify-between relative">
      <MoodTrackerLogo />

      <div onClick={() => setModal(prev => !prev)} className="flex gap-[10px] items-center cursor-pointer">
        <Image
          className="w-[40px] h-[40px] rounded-full"
          src={
            "https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png"
          }
          alt=""
          width={100}
          height={100}
        />
        {modal ? <ArrowDown className={"rotate-180 duration-500"} /> : <ArrowDown className={"rotate-0 duration-500"} />}
      </div>

      {modal && (
        <div className="py-[12px] px-[16px] flex flex-col w-[200px] absolute right-[0px] top-[50px] rounded-[8px] bg-white shadow-lg gap-[12px]">
          <div className="flex flex-col">
            <p className="text-[#21214D] text-[18px]">Lisa Maria</p>
            <p className="text-[#9393B7] text-[15px]">lisa@mail.com</p>
          </div>

          <div className="w-full h-[1px] bg-[#9393B7]"></div>

          <div className="flex items-center gap-[10px] cursor-pointer">
            <SettingsIcon />
            <p className="text-[#21214D] text-[15px]">Settings</p>
          </div>

          <div className="flex items-center gap-[10px] cursor-pointer">
            <LogOutIcon />
            <p className="text-[#21214D] text-[15px]">Logout</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
