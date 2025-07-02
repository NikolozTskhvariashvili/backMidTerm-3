"use client";
import Header from "@/app/Components/Header/Header";
import MoodInformations from "@/app/Components/MoodInformations/MoodInformations";
import { MoodProvider } from "@/app/Components/MoodContext/MoodContext";
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookieToken = getCookie("token");
    if (!cookieToken) {
      router.push("/");
    } else {
      setToken(cookieToken as string);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3001/current-user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.status === 200) {
          setUser(data);
        }
      } catch (e) {
        deleteCookie("token");
        router.push("/");
      }
    };

    getCurrentUser();
  }, [token]);

  if (!mounted) return null;

  return (
    <MoodProvider>
      <div className="w-full min-h-screen py-[40px] flex flex-col items-center gap-[80px]">
        <Header />
        <MoodInformations />
      </div>
    </MoodProvider>
  );
};

export default Page;
