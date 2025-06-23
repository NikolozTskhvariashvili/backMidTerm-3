import MoodTrackerLogo from "@/app/Common/Images/MoodTrackerLogo";
import React from "react";
import OnBordingFields from "../OnBordingFelads/OnBordingFields";

const OnBoarding = () => {

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gap-[100px]">
      <MoodTrackerLogo />

      <OnBordingFields />
    </div>
  );
};

export default OnBoarding;
