"use client";
import MoodTrackerLogo from "@/app/Common/Images/MoodTrackerLogo";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OnBoarding = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");
    if (!stored) {
      router.push("/");
    } else {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      if (parsed.nickname) {
        router.push("/main");
      }
    }
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 250 * 1024) {
      alert("Image must be smaller than 250KB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    const updatedUser = {
      ...user,
      nickname: name,
      avatar: imageUrl || user?.avatar || "",
    };

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    router.push("/main");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-[100px]">
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-[#57577B] text-[18px] px-[16px] py-[12px] w-full border border-[#9393B7] rounded-[10px] outline-0"
            type="text"
            placeholder="Jane Appleseed"
          />
        </div>

        <div className="w-full flex gap-[20px]">
          <Image
            className="rounded-full w-[64px] h-[64px] object-cover"
            src={
              imageUrl ||
              "https://static-00.iconduck.com/assets.00/profile-user-icon-2048x2048-m41rxkoe.png"
            }
            alt=""
            width={64}
            height={64}
          />

          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col">
              <p className="text-[#21214D] text-[18px]">Upload Image</p>
              <p className="text-[#57577B] text-[15px]">
                Max 250KB, PNG or JPEG
              </p>
            </div>

            <input className="hidden" type="file" id="image" onChange={handleImageChange} />
            <label
              className="py-[8px] px-[16px] border border-[#9393B7] rounded-[8px] w-fit cursor-pointer"
              htmlFor="image"
            >
              <p className="text-[#21214D] text-[18px]">Upload</p>
            </label>
          </div>
        </div>

        <div
          onClick={handleSave}
          className="w-full py-[12px] flex items-center justify-center bg-[#4865DB] rounded-[10px] cursor-pointer"
        >
          <p className="text-[20px] text-white">Start Tracking</p>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
