"use client";
import Header from "@/app/Components/Header/Header";
import MoodInformations from "@/app/Components/MoodInformations/MoodInformations";
import { Context } from "@/app/Components/MoodContext/MoodContext";
import { useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Loading from "@/app/Components/Loading/Loading";

const Page = () => {
  const { user, setUser } = useContext(Context);
  const [mounted, setMounted] = useState(false);
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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/current-user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.status === 200) {
          console.log(data, "data in main");
          setUser(data);
        }
      } catch (e) {
        console.log(e, "error");
        deleteCookie("token");
        router.push("/");
      }
    };

    getCurrentUser();
  }, [token]);

  if (!mounted) return null;

  console.log("current user:", user);

  if(user === null) return <Loading />

  return (
    <div className="w-full min-h-screen py-[40px] flex flex-col items-center gap-[80px]">
      <Header />
      <MoodInformations />
    </div>
  );
};

export default Page;
