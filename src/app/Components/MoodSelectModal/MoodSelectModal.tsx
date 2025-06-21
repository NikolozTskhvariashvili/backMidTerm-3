'use client';
import { useState, useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { Button } from "@/components/ui/button";
import { Contex } from '@/app/(pages)/main/page';

export default function MoodSelectModal({ SetLogModal, LogModal }: any) {
  const { data: logs, setData: setLogs } = useContext(Contex);

  const [step, setStep] = useState(1);
  const [mood, setMood] = useState(''); 
  const [feelings, setFeelings] = useState<string[]>([]);
  const [dayNote, setDayNote] = useState('');
  const [sleep, setSleep] = useState<number | null>(null);


  const moods = [
    { label: 'Very Happy', emoji: '😄' },
    { label: 'Happy', emoji: '🙂' },
    { label: 'Neutral', emoji: '😐' },
    { label: 'Sad', emoji: '🙁' },   
    { label: 'Very Sad', emoji: '😢' }
  ];

  const feelingsList = ['Motivated', 'Anxious', 'Relaxed', 'Tired', 'Stressed', 'Excited', 'Lonely'];
  const sleepOptions = [2, 4, 6, 8, 9];

  function getSleepLabel(hour: number) {
    switch (hour) {
      case 2: return '0-2';
      case 4: return '3-4';
      case 6: return '5-6';
      case 8: return '7-8';
      case 9: return '9+';
      default: return hour.toString();
    }
  }

  function getFormattedDate() {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit'
    });
  }

  function toggleFeeling(feeling: string) {
    setFeelings(prev =>
      prev.includes(feeling) ? prev.filter(f => f !== feeling) : [...prev, feeling]
    );
  }

  function handleClose() {
    setStep(1);
    setMood('');
    setFeelings([]);
    setDayNote('');
    setSleep(null);
    SetLogModal(false);
  }

  function handleSubmit() {
    const newEntry = {
      date: getFormattedDate(),
      sleep: sleep || 0,
      mood: mood
    };

    const updatedLogs = [...logs, newEntry];
    setLogs(updatedLogs);
    console.log("🧠 Mood log updated:", updatedLogs);
    handleClose();
  }

  return (
    <Dialog open={LogModal} onClose={handleClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog.Panel className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
        <Dialog.Title className="text-xl font-bold mb-4">Log your mood</Dialog.Title>

        {step === 1 && (
          <div>
            <p className="mb-3 font-medium">How was your mood today?</p>
            <div className="space-y-2">
              {moods.map(({ label, emoji }) => (
                <div
                  key={label}
                  className={`border rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer ${
                    mood === emoji ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setMood(emoji)}
                >
                  <span>{label}</span>
                  <span>{emoji}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Steps 2,3,4 remain unchanged */}

        {step === 2 && (
          <div>
            <p className="mb-3 font-medium">What are you feeling?</p>
            <div className="flex flex-wrap gap-2">
              {feelingsList.map(feeling => (
                <button
                  key={feeling}
                  onClick={() => toggleFeeling(feeling)}
                  className={`px-3 py-1 rounded-full border ${
                    feelings.includes(feeling)
                      ? 'bg-blue-100 border-blue-500 text-blue-600'
                      : 'border-gray-300 text-gray-600'
                  }`}
                >
                  {feeling}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="mb-3 font-medium">Write a bit about your day</p>
            <textarea
              value={dayNote}
              onChange={e => setDayNote(e.target.value)}
              className="w-full border rounded-lg p-3 h-28 resize-none"
              placeholder="Today was..."
            />
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="mb-3 font-medium">How many hours did you sleep?</p>
            <div className="grid grid-cols-3 gap-2">
              {sleepOptions.map(hour => (
                <div
                  key={hour}
                  className={`border rounded-lg px-4 py-2 text-center cursor-pointer ${
                    sleep === hour ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSleep(hour)}
                >
                  {getSleepLabel(hour)} hrs
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          {step > 1 && (
            <Button onClick={() => setStep(step - 1)} variant="outline">
              Back
            </Button>
          )}
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)} disabled={step === 1 && !mood}>
              Continue
            </Button>
          ) : (
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
