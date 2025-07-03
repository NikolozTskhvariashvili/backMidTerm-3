"use client";
import { Context } from "@/app/Components/MoodContext/MoodContext";
import React, { useContext, useEffect, useState } from "react";
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

interface MoodEntry {
  createdAt: string;
  date: string;
  mood: string;
  moodLabel: string;
  sleep: number;
  reflection: string;
  feelings: string[];
}

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

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit" });

const MoodInformations: React.FC = () => {
  const { user, data: ContexData } = useContext(Context);

  const [mood, setMood] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const controller = new AbortController();
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${user._id}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error(res.statusText);

        const json = await res.json();
        const formatted: MoodEntry[] = json.moods.map((m: any) => ({
          ...m,
          date: fmtDate(m.createdAt),
        }));
        setMood(formatted);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        console.error("fetch failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, [ContexData]);

  const last5 = mood.slice(-5);
  const avgSleep =
    last5.length === 5
      ? (last5.reduce((s, i) => s + i.sleep, 0) / 5).toFixed(1)
      : null;
  const avgMoodScore =
    last5.length === 5
      ? Math.round(
          last5.reduce((s, i) => s + (moodScoreMap[i.mood] || 0), 0) / 5
        )
      : null;
  const avgMoodEmoji = avgMoodScore ? scoreToEmoji[avgMoodScore] : null;
  const avgMoodLabel = avgMoodScore ? scoreToLabel[avgMoodScore] : null;

  if (isLoading) return <div>Loading…</div>;

  return (
    <div className="flex max-[1100px]:gap-2.5 gap-8 mr-3.5 ml-3.5 max-lg:flex-col">
      <div className="flex flex-col p-6 gap-6 rounded-2xl bg-white border border-[#E0E6FA] min-w-[300px]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <p className="text-[#21214D] text-lg font-semibold">Average Mood</p>
            <p className="text-[#57577B] text-sm">(Last 5 Check-ins)</p>
          </div>
          {last5.length === 5 ? (
            <div className="p-5 flex items-center gap-4 bg-[#E0E6FA] rounded-xl">
              <span className="text-3xl">{avgMoodEmoji}</span>
              <div>
                <p className="text-[#21214D] text-lg font-semibold">
                  {avgMoodLabel}
                </p>
                <p className="text-[#21214D] text-sm">Keep it up!</p>
              </div>
            </div>
          ) : (
            <div className="p-5 flex flex-col gap-3 bg-[#E0E6FA] rounded-xl">
              <p className="text-[#21214D] text-2xl font-semibold">
                Keep tracking!
              </p>
              <p className="text-[#21214D] text-sm">
                Log 5 check-ins to see your average mood.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1">
            <p className="text-[#21214D] text-lg font-semibold">
              Average Sleep
            </p>
            <p className="text-[#57577B] text-sm">(Last 5 Check-ins)</p>
          </div>
          {last5.length === 5 ? (
            <div className="p-5 flex flex-col gap-1 bg-[#E0E6FA] rounded-xl">
              <p className="text-[#21214D] text-2xl font-semibold">
                {avgSleep} hrs
              </p>
              <p className="text-[#21214D] text-sm">You’re doing great!</p>
            </div>
          ) : (
            <div className="p-5 flex flex-col gap-3 bg-[#E0E6FA] rounded-xl">
              <p className="text-[#21214D] text-2xl font-semibold">
                Not enough data yet!
              </p>
              <p className="text-[#21214D] text-sm">
                Track 5 nights to view average sleep.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 flex flex-col gap-8 rounded-2xl border border-[#E0E6FA] bg-white w-[700px] h-[379px] max-[1024px]:h-[450px] max-[720px]:max-w-[355px]">
        <p className="text-base font-semibold">Mood and sleep trends</p>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mood} barSize={24}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis domain={[0, 10]} tickCount={6} tick={{ fontSize: 10 }} />
            <Tooltip content={<DetailInformationPerBar />} />

            <Bar dataKey="sleep" radius={[25, 25, 0, 0]}>
              {mood.map((entry, idx) => (
                <Cell
                  width={30}
                  key={idx}
                  fill={moodColorMap[entry.mood] || "#ccc"}
                />
              ))}
              <LabelList
                dataKey="mood"
                position="insideTop"
                style={{ fontSize: 18 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MoodInformations;
