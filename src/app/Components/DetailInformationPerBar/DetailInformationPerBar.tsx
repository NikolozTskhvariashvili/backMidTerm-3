import React from "react";

interface Props {
  active?: boolean;
  payload?: any[];
}

const DetailInformationPerBar: React.FC<Props> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  console.log(data);

  return (
    <div className="w-[175px] flex flex-col p-[12px] gap-[12px] bg-white rounded-[16px] border border-[#E0E6FA] mr-4 ml-4">
      <div className="flex  flex-col">
        <p className="text-[13px] text-[#57577B]">Mood</p>
        <div className="flex gap-2 items-center">
          <p className="text-[16px]">{data.mood}</p>
          <p className="text-[16px]">{data.moodLabel}</p>
        </div>
      </div>

      <div className="flex flex-col ">
        <p className="text-[13px] text-[#57577B]">Sleep</p>
        <p className="text-[15px] text-[#21214D]">{data.sleep} hours</p>
      </div>

      {data.reflection && (
        <div className="flex flex-col ">
          <p className="text-[13px] text-[#57577B]">Reflection</p>
          <p className="text-[12px] text-[#21214D]">{data.reflection}</p>
        </div>
      )}

      {data.feelings?.length > 0 && (
        <div className="flex flex-col ">
          <p className="text-[13px] text-[#57577B]">Tags</p>
          <p className="text-[12px] text-[#21214D]">
            {data.feelings.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default DetailInformationPerBar;
