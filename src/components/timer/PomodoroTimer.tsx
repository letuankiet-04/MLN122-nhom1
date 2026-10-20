import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, BookOpen, Clock, Sparkles } from 'lucide-react';
import { playTimerFinishChime } from '../../utils/audio';

interface PomodoroTimerProps {
  totalStudySeconds: number;
  onAddStudySeconds: (seconds: number) => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  totalStudySeconds,
  onAddStudySeconds,
}) => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [workMinutes, setWorkMinutes] = useState<number>(25);
  const [breakMinutes, setBreakMinutes] = useState<number>(5);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playTimerFinishChime();
            if (mode === 'work') {
              onAddStudySeconds(workMinutes * 60);
              setMode('break');
              return breakMinutes * 60;
            } else {
              setMode('work');
              return workMinutes * 60;
            }
          }
          if (mode === 'work') {
            onAddStudySeconds(1);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode, workMinutes, breakMinutes, onAddStudySeconds]);

  const toggleRunning = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? workMinutes * 60 : breakMinutes * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'work' ? workMinutes * 60 : breakMinutes * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = mode === 'work'
    ? ((workMinutes * 60 - timeLeft) / (workMinutes * 60)) * 100
    : ((breakMinutes * 60 - timeLeft) / (breakMinutes * 60)) * 100;

  const totalHours = (totalStudySeconds / 3600).toFixed(1);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Đồng hồ tập trung Pomodoro
        </h4>

        {/* Mode Switcher */}
        <div className="flex p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
          <button
            onClick={() => switchMode('work')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              mode === 'work'
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Học (25m)
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
              mode === 'break'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Nghỉ (5m)
          </button>
        </div>
      </div>

      {/* Main Countdown Display */}
      <div className="py-6 flex flex-col items-center justify-center">
        <div className="relative w-36 h-36 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="text-slate-100 dark:text-slate-800 stroke-current"
              strokeWidth="6"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className={`${mode === 'work' ? 'text-blue-600' : 'text-emerald-500'} stroke-current transition-all duration-300`}
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={(2 * Math.PI * 44) * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-slate-100 tabular-nums">
              {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
            </span>
            <span className="text-[11px] font-medium text-slate-400 capitalize mt-0.5">
              {mode === 'work' ? 'Tập trung cao độ' : 'Nghỉ giải lao'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={toggleRunning}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-xs ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Tạm dừng' : 'Bắt đầu học'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Đặt lại đồng hồ"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
        <span>Tổng thời gian học tích lũy:</span>
        <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
          {totalHours} giờ ({Math.floor(totalStudySeconds / 60)} phút)
        </span>
      </div>
    </div>
  );
};
