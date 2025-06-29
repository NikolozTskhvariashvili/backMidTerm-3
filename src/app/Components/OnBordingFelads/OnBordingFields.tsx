"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  nickname?: string;
  avatar?: string;
  email?: string;
  [key: string]: unknown;
}

const OnBordingFields = ({
  onClose,
  initialUser,
}: {
  onClose?: () => void;
  initialUser?: User;
}) => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState<User | null>(initialUser ?? null);

  useEffect(() => {
    if (!initialUser) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/");
        return;
      }
      fetch("https://moodappserver.onrender.com/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((user) => {
          setUser(user);
          setName(user.nickname || "");
          setImageUrl(user.avatar || "");
          localStorage.setItem("loggedInUser", JSON.stringify(user));
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("loggedInUser");
          router.push("/");
        });
    } else {
      setUser(initialUser);
      setName(initialUser.nickname || "");
      setImageUrl(initialUser.avatar || "");
    }
  }, [initialUser, router]);

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
      nickname: name.trim(),
      avatar: imageUrl || user?.avatar || "",
    };

    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    if (onClose) {
      onClose();
    } else {
      router.push("/main");
    }
  };

  return (
    <div className="max-w-[530px] w-full px-[40px] py-[32px] flex flex-col justify-between gap-[30px] rounded-[16px] bg-white shadow-lg">
      <div className="flex flex-col">
        <p className="text-[#21214D] text-[32px] font-bold">
          Personalize your experience
        </p>
        <p className="text-[#57577B] text-[18px] font-normal">
          Add or update your name and profile picture to make Mood yours.
        </p>
      </div>

      <div className="flex flex-col">
        <p className="text-[#21214D] text-[18px]">Name</p>
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
          alt="Profile"
          width={64}
          height={64}
        />

        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col">
            <p className="text-[#21214D] text-[18px]">Upload Image</p>
            <p className="text-[#57577B] text-[15px]">Max 250KB, PNG or JPEG</p>
          </div>

          <input
            className="hidden"
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
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
        <p className="text-[20px] text-white">Save</p>
      </div>
    </div>
  );
};

export default OnBordingFields;
