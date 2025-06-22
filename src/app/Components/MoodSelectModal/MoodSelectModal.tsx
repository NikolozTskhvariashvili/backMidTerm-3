"use client";
import { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { Context } from "@/app/Components/MoodContext/MoodContext";
import SelectedIcon from "@/app/Common/Images/SelectedIcon";
import CloseIcon from "@/app/Common/Images/CloseIcon";
import MoodSelectionFirst from "../MoodSelection-1/MoodSelectionFirst";
import MoodSelectionSecond from "../MoodSelection-2/MoodSelectionSecond";
import MoodSelectionThird from "../MoodSelection-3/MoodSelectionThird";
import MoodSelectionFourth from "../MoodSelection-4/MoodSelectionFourth";
interface MoodSelectModalProps {
  LogModal: boolean;
  SetLogModal: (open: boolean) => void;
}

export default function MoodSelectModal({
  SetLogModal,
  LogModal,
}: MoodSelectModalProps) {
  const { data: logs, setData: setLogs } = useContext(Context);

  const [step, setStep] = useState(1);
  const [mood, setMood] = useState("");
  const [feelings, setFeelings] = useState<string[]>([]);
  const [dayNote, setDayNote] = useState("");
  const [sleep, setSleep] = useState<number | null>(null);

  const moods = [
    { label: "Very Happy", emoji: "😄" },
    { label: "Happy", emoji: "🙂" },
    { label: "Neutral", emoji: "😐" },
    { label: "Sad", emoji: "🙁" },
    { label: "Very Sad", emoji: "😢" },
  ];

  const feelingsList = [
    "Joyful",
    "Down",
    "Anxious",
    "Calm",
    "Excited",
    "Frustrated",
    "Lonely",
    "Grateful",
    "Overwhelmed",
    "Motivated",
    "Irritable",
    "Peaceful",
    "Tired",
    "Hopeful",
    "Confident",
    "Stressed",
    "Content",
    "Disappointed",
    "Optimistic",
    "Restless",
  ];
  const sleepOptions = [2, 4, 6, 8, 9];

  function getSleepLabel(hour: number) {
    switch (hour) {
      case 2:
        return "0-2";
      case 4:
        return "3-4";
      case 6:
        return "5-6";
      case 8:
        return "7-8";
      case 9:
        return "9+";
      default:
        return hour.toString();
    }
  }

  function getFormattedDate() {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    });
  }

  function toggleFeeling(feeling: string) {
    setFeelings((prev) =>
      prev.includes(feeling)
        ? prev.filter((f) => f !== feeling)
        : [...prev, feeling]
    );
  }

  function handleClose() {
    setStep(1);
    setMood("");
    setFeelings([]);
    setDayNote("");
    setSleep(null);
    SetLogModal(false);
  }

  function handleSubmit() {
    const newEntry = {
    date: getFormattedDate(),
    mood,
    sleep: sleep || 0,
    reflection: dayNote,
    feelings,   
    };

    const updatedLogs = [...logs, newEntry];
    setLogs(updatedLogs);
    console.log("🧠 Mood log updated:", updatedLogs);
    handleClose();
  }

  function CheckValidate() {
    if (mood && step === 1) setStep(step + 1);
    if (feelings && step === 2) setStep(step + 1);
    if (dayNote && step === 3) setStep(step + 1);
    if (step === 4 && sleep !== null) return handleSubmit();
  }

  return (
    <Dialog
      open={LogModal}
      onClose={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <Dialog.Panel className="relative flex flex-col w-[600px] py-[48px] px-[40px] gap-[40px] bg-white items-center justify-center rounded-[10px]">
        <div
          onClick={() => SetLogModal(false)}
          className="absolute right-10 top-10 cursor-pointer"
        >
          <CloseIcon />
        </div>
        {step === 1 && (
          <MoodSelectionFirst
            moods={moods}
            mood={mood}
            setMood={setMood}
            step={step}
          />
        )}

        {step === 2 && (
          <MoodSelectionSecond
            step={step}
            feelingsList={feelingsList}
            toggleFeeling={toggleFeeling}
            feelings={feelings}
          />
        )}

        {step === 3 && (
          <MoodSelectionThird
            step={step}
            dayNote={dayNote}
            setDayNote={setDayNote}
          />
        )}

        {step === 4 && (
          <MoodSelectionFourth
            step={step}
            sleep={sleep}
            sleepOptions={sleepOptions}
            setSleep={setSleep}
            getSleepLabel={getSleepLabel}
          />
        )}

        <div className="mt-6 flex justify-between">
          {step <= 4 && (
            <div
              onClick={() => CheckValidate()}
              className={`w-[520px] rounded-[10px] text-[24px] p-[16px] flex items-center justify-center ${
                step === 1 && !mood
                  ? "bg-[#4865DB] opacity-50 cursor-not-allowed"
                  : "bg-[#4865DB] cursor-pointer"
              }`}
            >
              <p className="text-[24px] text-white">Continue</p>
            </div>
          )}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
