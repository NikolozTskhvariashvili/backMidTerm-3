import React from "react";
interface MoodSelectionThirdProps {
  step: number;
  dayNote: string;
  setDayNote: (note: string) => void;
}

const MoodSelectionThird: React.FC<MoodSelectionThirdProps> = ({step,dayNote,setDayNote}) => {
  return (
    <div className="w-full flex flex-col gap-[32px]">
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

      <p className="text-[32px] text-[#21214D] font-bold">Write about your day...</p>
      <textarea
        value={dayNote}
        onChange={(e) => setDayNote(e.target.value)}
        className="w-full h-[150px] border rounded-[10px] border-[#9393B7] py-[12px] px-[16px] resize-none text-[#57577B] text-[18px]"
        placeholder="Today, I felt…"
      />
    </div>
  );
};

export default MoodSelectionThird;
