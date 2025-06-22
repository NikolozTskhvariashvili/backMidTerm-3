"use client";
import MoodTrackerLogo from "@/app/Common/Images/MoodTrackerLogo";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { signUpSchema } from "@/app/schemas/validationSchemas";
import { ValidationError } from "yup";
interface User {
  id: number;
  email: string;
  password: string;
  createdAt: string;
}
interface FormData {
  email: string;
  password: string;
}
const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [savedUsers, setSavedUsers] = useState<User[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("tempUsers");
    if (saved) {
      const parsedUsers: User[] = JSON.parse(saved);
      setSavedUsers(parsedUsers);
    }
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      await signUpSchema.validate(formData, { abortEarly: false });
      setFormErrors({});
      const existingUsers: User[] = savedUsers;
      if (existingUsers.find((user) => user.email === formData.email)) {
        setFormErrors({ email: "Email already exists!" });
        return;
      }
      const newUser: User = {
        id: Date.now(),
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString(),
      };
      const updatedUsers: User[] = [...existingUsers, newUser];
      localStorage.setItem("tempUsers", JSON.stringify(updatedUsers));
      setSavedUsers(updatedUsers);
      setFormData({ email: "", password: "" });
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const errors: { email?: string; password?: string } = {};
        err.inner.forEach((e) => {
          if (e.path) errors[e.path as "email" | "password"] = e.message;
        });
        setFormErrors(errors);
      }
    }
  };
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
              className="text-[#57577B] text-[18px] px-[16px] py-[12px] w-full border border-[#9393B7] rounded-[10px] outline-0 focus:border-[#4865DB]"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@mail.com"
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-[#21214D]  text-[18px]">Password</p>
            <input
              className="text-[#57577B] text-[18px] px-[16px] py-[12px] w-full border border-[#9393B7] rounded-[10px] outline-0 focus:border-[#4865DB]"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div
            onClick={handleSubmit}
            className="w-full py-[12px] flex items-center justify-center bg-[#4865DB] hover:bg-blue-600 rounded-[10px] cursor-pointer transition-colors"
          >
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
