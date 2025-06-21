"use client";
import { Contex } from "@/app/(pages)/main/page";
import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const moodColorMap: Record<string, string> = {
  "😄": "#FFC97C",
  "🙂": "#89E780",
  "😐": "#89CAFF",
  "🙁": "#B8B1FF",
  "😢": "#FF9B99",
};

const MoodInformations = () => {
  const { data } = useContext(Contex);
  const last11Data = Array.isArray(data) ? data.slice(-11) : [];
  return (
    <div className="flex gap-[32px]">
      <div className="flex flex-col p-[24px] gap-[24px] rounded-[16px] bg-white border border-[#E0E6FA]">
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-1">
            <p className="text-[#21214D] text-[20px] font-semibold">
              Average Mood
            </p>
            <p className="text-[#57577B] text-[15px]">(Last 5 Check-ins)</p>
          </div>

          <div className="p-[20px] flex flex-col gap-[12px] bg-[#E0E6FA] rounded-[16px]">
            <p className="text-[#21214D] text-[24px] font-semibold">
              Keep tracking!
            </p>

            <p className="text-[#21214D] text-[15px]">
              Log 5 check-ins to see your average mood.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-1">
            <p className="text-[#21214D] text-[20px] font-semibold">
              Average Sleep
            </p>
            <p className="text-[#57577B] text-[15px]">(Last 5 Check-ins)</p>
          </div>

          <div className="p-[20px] flex flex-col gap-[12px] bg-[#E0E6FA] rounded-[16px]">
            <p className="text-[#21214D] text-[24px] font-semibold">
              Not enough data yet!
            </p>

            <p className="text-[#21214D] text-[15px]">
              Track 5 nights to view average sleep.
            </p>
          </div>
        </div>
      </div>

      <div className="p-[32px] flex flex-col gap-[32px] rounded-[16px] border border-[#E0E6FA] bg-white w-[768px] h-[379px]">
        <p className="text-base font-semibold mb-2">Mood and sleep trends</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={last11Data} barSize={24}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 10]} tickCount={6} tick={{ fontSize: 10 }} />
            <Tooltip formatter={(value) => `${value} hrs`} />
            <Bar dataKey="sleep" radius={[25, 25, 25, 25]}>
              {last11Data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={moodColorMap[entry.mood]} />
              ))}
              <LabelList
                dataKey="mood"
                position="insideTop"
                style={{ fontSize: "14px" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodInformations;
