import MoodTrackerLogo from "@/app/Common/Images/MoodTrackerLogo";
import Link from "next/link";
import React from "react";

const SignUp = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-[48px] items-center justify-center">
      <MoodTrackerLogo />

      <div className="max-w-[530px] px-[40px] py-[32px] flex flex-col justify-between gap-[30px] rounded-[16px] bg-white shadow-lg">
        <div className="flex flex-col">
          <p className="text-[#21214D] text-[32px] font-bold">
            Create an account
          </p>
          <p className="text-[#57577B] text-[18px] font-normal">
            Join to track your daily mood and sleep with ease.
          </p>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <p className="text-[#21214D]  text-[18px]">Email address</p>
            <input
              className="text-[#57577B] text-[18px] px-[16px] py-[12px] w-full border border-[#9393B7] rounded-[10px] outline-0"
              type="text"
              placeholder="name@mail.com"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-[#21214D]  text-[18px]">Password</p>
            <input
              className="text-[#57577B] text-[18px] px-[16px] py-[12px] w-full border border-[#9393B7] rounded-[10px] outline-0"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="w-full py-[12px] flex items-center justify-center bg-[#4865DB] rounded-[10px]  cursor-pointer">
            <p className="text-[20px] text-white">Sign Up</p>
          </div>

          <div className="flex gap-1 items-center justify-center">
            <p className="text-[#57577B] text-[18px] ">
              Already got an account?
            </p>
            <Link className="text-[#4865DB] text-[18px]" href={"/log-in"}>
              Log in.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
