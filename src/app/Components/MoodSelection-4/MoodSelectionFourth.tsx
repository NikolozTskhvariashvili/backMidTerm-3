import SelectedIcon from "@/app/Common/Images/SelectedIcon";
import React from "react";
interface MoodSelectionFourthProps {
  step: number;
  sleep: number | null;
  setSleep: (hour: number) => void;
  sleepOptions: number[];
  getSleepLabel: (hour: number) => string;
}

const MoodSelectionFourth: React.FC<MoodSelectionFourthProps>= ({step,sleepOptions,sleep,setSleep,getSleepLabel}) => {
  return (
    <div className="w-full flex flex-col">
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

      <p className="text-[32px] text-[#21214D] font-bold">How many hours did you sleep last night?</p>
      <p className="mb-3 font-medium">How many hours did you sleep?</p>
      <div className="flex flex-col gap-[12px]">
        {sleepOptions.map((hour) => (
          <div
            key={hour}
            className={`border-2 rounded-[10px] px-[20px] py-[16px] flex items-center gap-[12px] cursor-pointer ${
              sleep === hour ? "border-[#4865DB]" : "border-[#E0E6FA]"
            }`}
            onClick={() => setSleep(hour)}
          >

            {sleep === hour ? <SelectedIcon /> : <div className="w-[20px] h-[20px] rounded-full border-[#C7D3F7] border-[1.5px]"></div>}

            <p className="text-[20px] text-[#21214D]  font-semibold">{getSleepLabel(hour)} hrs</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelectionFourth;
