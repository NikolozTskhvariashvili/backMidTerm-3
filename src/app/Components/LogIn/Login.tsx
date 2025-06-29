"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/app/schemas/validationSchemas";
import { ValidationError } from "yup";
import MoodTrackerLogo from "@/app/Common/Images/MoodTrackerLogo";
import Link from "next/link";

interface FormData {
  email: string;
  password: string;
}

const API_BASE_URL = "https://moodappserver.onrender.com";

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setFormErrors({});
      await signInSchema.validate(formData, { abortEarly: false });

      const res = await fetch(`${API_BASE_URL}/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormErrors({ general: data.message || "Login failed" });
        return;
      }

      localStorage.setItem("authToken", data.token);

      router.push("/onbording");
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const errors: { email?: string; password?: string } = {};
        err.inner.forEach((e) => {
          if (e.path) errors[e.path as "email" | "password"] = e.message;
        });
        setFormErrors(errors);
      } else {
        setFormErrors({ general: "Unexpected error occurred" });
      }
    } finally {
      setIsLoading(false);
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

        {formErrors.general && (
          <div className="bg-red-50 border border-red-200 rounded-[10px] p-3">
            <p className="text-red-600 text-sm">{formErrors.general}</p>
          </div>
        )}

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <p className="text-[#21214D] text-[18px]">Email address</p>
            <input
              className="text-[#57577B] text-[18px] px-[16px] py-[12px] w-full border border-[#9393B7] rounded-[10px] outline-0 focus:border-[#4865DB]"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="name@mail.com"
              disabled={isLoading}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <p className="text-[#21214D] text-[18px]">Password</p>
            <input
              className="text-[#57577B] text-[18px] px-[16px] py-[12px] w-full border border-[#9393B7] rounded-[10px] outline-0 focus:border-[#4865DB]"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              disabled={isLoading}
            />
            {formErrors.password && (
              <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
            )}
          </div>
        </div>

        <div
          onClick={isLoading ? undefined : handleSubmit}
          className={`w-full py-[12px] flex items-center justify-center rounded-[10px] cursor-pointer transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#4865DB] hover:bg-blue-600"
          }`}
        >
          {isLoading ? (
            <p className="text-[20px] text-white">Signing in...</p>
          ) : (
            <p className="text-[20px] text-white">Log In</p>
          )}
        </div>

        <div className="flex gap-1 items-center justify-center">
          <p className="text-[#57577B] text-[18px]">{`Don't have an account?`}</p>
          <Link className="text-[#4865DB] text-[18px]" href="/">
            Sign up.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
