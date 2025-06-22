"use client";
import MoodTrackerLogo from "@/app/Common/Images/MoodTrackerLogo";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/app/schemas/validationSchemas";
import { ValidationError } from "yup";
interface FormData {
  email: string;
  password: string;
}
interface UserType {
  id: number;
  email: string;
  password: string;
  createdAt: string;
}
const SignIn = () => {
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    try {
      await signInSchema.validate(formData, { abortEarly: false });
      setFormErrors({});
      const savedUsers = localStorage.getItem("tempUsers");
      if (!savedUsers) {
        setFormErrors({ email: "No users found. Please sign up first." });
        return;
      }
      const users: UserType[] = JSON.parse(savedUsers);
      const foundUser = users.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );
      if (foundUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
        router.push("/onbording");
      } else {
        setFormErrors({ password: "Invalid email or password." });
      }
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
          <p className="text-[#21214D] text-[32px] font-bold">Welcome back</p>
          <p className="text-[#57577B] text-[18px] font-normal">
            Log in to continue tracking your mood and sleep.
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
            <p className="text-[20px] text-white">Log In</p>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <p className="text-[#57577B] text-[18px] ">
              {`Don't have an account?`}
            </p>
            <Link className="text-[#4865DB] text-[18px]" href={"/"}>
              Sign up.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
