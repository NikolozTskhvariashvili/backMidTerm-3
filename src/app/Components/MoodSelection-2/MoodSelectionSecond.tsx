import FeelingSelectionIcon from "@/app/Common/Images/FeelingSelectionIcon";
import React from "react";

interface MoodSelectionSecondProps {
  step: number;
  feelings: string[];
  feelingsList: string[];
  toggleFeeling: (feeling: string) => void;
}

const MoodSelectionSecond: React.FC<MoodSelectionSecondProps> = ({
  step,
  feelings,
  feelingsList,
  toggleFeeling,
}) => {
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

        <div className="flex flex-col">
                  <p className="text-[32px] text-[#21214D] font-bold">How did you feel?</p>
      <p className="text-[18px] text-[#57577B]">Select up to three tags:</p>
        </div>

      <div className="flex flex-wrap gap-2">
        {feelingsList.map((feeling) => (
          <div
            key={feeling}
            onClick={() => toggleFeeling(feeling)}
            className={`px-[16px] py-[12px] rounded-[10px] border-2 flex gap-[8px] items-center cursor-pointer ${
              feelings.includes(feeling)
                ? "border-[#4865DB]"
                : "border-[#E0E6FA]"
            }`}
          >
            {feelings.includes(feeling) ? <FeelingSelectionIcon /> : <div className="w-[16px] h-[16px] border-[1.5px] border-[#C7D3F7] rounded-[4px]"></div>}

            <p className="text-[#21214D] text-[18px]">{feeling}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelectionSecond;
