"use client";
import { Context } from "@/app/Components/MoodContext/MoodContext";
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
import DetailInformationPerBar from "../DetailInformationPerBar/DetailInformationPerBar";

const moodColorMap: Record<string, string> = {
  "😄": "#FFC97C",
  "🙂": "#89E780",
  "😐": "#89CAFF",
  "🙁": "#B8B1FF",
  "😢": "#FF9B99",
};

const moodScoreMap: Record<string, number> = {
  "😄": 5,
  "🙂": 4,
  "😐": 3,
  "🙁": 2,
  "😢": 1,
};

const scoreToEmoji: Record<number, string> = {
  5: "😄",
  4: "🙂",
  3: "😐",
  2: "🙁",
  1: "😢",
};

const scoreToLabel: Record<number, string> = {
  5: "Very Happy",
  4: "Happy",
  3: "Neutral",
  2: "Sad",
  1: "Very Sad",
};

const MoodInformations = () => {
  const { data } = useContext(Context);
  const last11Data = Array.isArray(data) ? data.slice(-11) : [];
  const last5 = last11Data.slice(-5);

  const hasEnoughData = last5.length === 5;

  const avgSleep = hasEnoughData
    ? (last5.reduce((sum, item) => sum + item.sleep, 0) / 5).toFixed(1)
    : null;

  const avgMoodScore = hasEnoughData
    ? Math.round(
        last5.reduce((sum, item) => sum + (moodScoreMap[item.mood] || 0), 0) / 5
      )
    : null;

  const avgMoodEmoji = avgMoodScore ? scoreToEmoji[avgMoodScore] : null;
  const avgMoodLabel = avgMoodScore ? scoreToLabel[avgMoodScore] : null;

  return (
    <div className="flex gap-[32px] mr-3.5 ml-3.5 max-lg:flex-col">
      <div className="flex flex-col p-[24px] gap-[24px] rounded-[16px] bg-white border border-[#E0E6FA] min-w-[300px]">
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-1">
            <p className="text-[#21214D] text-[20px] font-semibold">
              Average Mood
            </p>
            <p className="text-[#57577B] text-[15px]">(Last 5 Check-ins)</p>
          </div>
          {hasEnoughData ? (
            <div className="p-[20px] flex items-center gap-4 bg-[#E0E6FA] rounded-[16px]">
              <span className="text-3xl">{avgMoodEmoji}</span>
              <div>
                <p className="text-[#21214D] text-[20px] font-semibold">
                  {avgMoodLabel}
                </p>
                <p className="text-[#21214D] text-[15px]">Keep it up!</p>
              </div>
            </div>
          ) : (
            <div className="p-[20px] flex flex-col gap-[12px] bg-[#E0E6FA] rounded-[16px]">
              <p className="text-[#21214D] text-[24px] font-semibold">
                Keep tracking!
              </p>
              <p className="text-[#21214D] text-[15px]">
                Log 5 check-ins to see your average mood.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-1">
            <p className="text-[#21214D] text-[20px] font-semibold">
              Average Sleep
            </p>
            <p className="text-[#57577B] text-[15px]">(Last 5 Check-ins)</p>
          </div>
          {hasEnoughData ? (
            <div className="p-[20px] flex flex-col gap-[4px] bg-[#E0E6FA] rounded-[16px]">
              <p className="text-[#21214D] text-[24px] font-semibold">
                {avgSleep} hrs
              </p>
              <p className="text-[#21214D] text-[15px]">{`You're doing great!`}</p>
            </div>
          ) : (
            <div className="p-[20px] flex flex-col gap-[12px] bg-[#E0E6FA] rounded-[16px]">
              <p className="text-[#21214D] text-[24px] font-semibold">
                Not enough data yet!
              </p>
              <p className="text-[#21214D] text-[15px]">
                Track 5 nights to view average sleep.
              </p>
            </div>
          )}
        </div>
      </div>

<div className="p-[32px] flex flex-col gap-[32px] rounded-[16px] border border-[#E0E6FA] bg-white w-full max-w-[768px] h-[379px] max-[1024px]:h-[450px] max-[800px]:w-[600px] max-[630px]:w-[400px] max-[430px]:w-[300px]">
  <p className="text-base font-semibold mb-2">Mood and sleep trends</p>

  <div className="max-w-[768px] overflow-hidden max-[1024px]:overflow-x-auto">
    <div className="max-w-[768px] max-[1024px]:min-w-[900px] h-[269px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={last11Data} barSize={24}>
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 10]} tickCount={6} tick={{ fontSize: 10 }} />
          <Tooltip content={<DetailInformationPerBar />} />
          <Bar dataKey="sleep" radius={[25, 25, 25, 25]}>
            {last11Data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={moodColorMap[entry.mood]} />
            ))}
            <LabelList
              dataKey="mood"
              position="insideTop"
              style={{ fontSize: "18px" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>
    </div>
  );
};

export default MoodInformations;
