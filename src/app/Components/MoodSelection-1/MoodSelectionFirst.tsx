import SelectedIcon from "@/app/Common/Images/SelectedIcon";
import React from "react";

interface Mood {
  moods: { label: string; emoji: string }[];
  mood: string;
  setMood: (emoji: string) => void;
  step: number;
}

const MoodSelectionFirst: React.FC<Mood> = ({ moods, mood, setMood, step }) => {
  return (
    <div className="flex flex-col w-[600px] px-[40px] gap-[40px]">
      <p className="text-[40px] text-[#21214D] font-bold">Log your mood</p>

      <div className="flex gap-[16px] w-full">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`h-[6px] w-full rounded-[999px] ${
              step >= s ? "bg-[#4865DB]" : "bg-[#C7D3F7]"
            }`}
          ></div>
        ))}
      </div>

      <p className="text-[32px] text-[#21214D] font-bold">
        How was your mood today?
      </p>

      <div className="space-y-2">
        {moods.map(({ label, emoji }) => (
          <div
            key={label}
            className={`border rounded-[10px] px-4 py-2 flex items-center justify-between cursor-pointer ${
              mood === emoji ? "border-[#4865DB]" : "border-[#E0E6FA]"
            }`}
            onClick={() => setMood(emoji)}
          >
            <div className="flex items-center gap-[12px]">
              {mood === emoji ? (
                <SelectedIcon />
              ) : (
                <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-[#C7D3F7]"></div>
              )}

              <p className="text-[20px] text-[#21214D] font-semibold">
                {label}
              </p>
            </div>
            <p className="text-[40px]">{emoji}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelectionFirst;
