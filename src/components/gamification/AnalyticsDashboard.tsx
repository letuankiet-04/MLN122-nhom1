import React from 'react';
import { UserProgress, LessonModule } from '../../types';
import { LESSON_MODULES } from '../../data/lessonsData';
import { FLASHCARDS } from '../../data/flashcardsData';
import { Award, Flame, Clock, CheckCircle2, TrendingUp, Target, BookOpen, AlertCircle } from 'lucide-react';

interface AnalyticsDashboardProps {
  progress: UserProgress;
  onSelectModule: (moduleId: string) => void;
}

const BADGES = [
  { id: 'badge-welcome', title: 'Tân sinh viên Kinh tế', desc: 'Bắt đầu hành trình chinh phục môn MLN122', icon: '🎓' },
  { id: 'badge-value', title: 'Chuyên gia Giá trị', desc: 'Làm chủ lý thuyết hao phí LĐXH và nghiên cứu cà phê 2019', icon: '☕' },
  { id: 'badge-supply-demand', title: 'Bậc thầy Cung Cầu', desc: 'Thấu hiểu cơ chế cân bằng giá Tết Ất Tỵ 2025', icon: '📈' },
  { id: 'badge-competition', title: 'Nhà chiến lược Cạnh tranh', desc: 'Nắm vững case study Shopee - TikTok Shop và Luật Cạnh tranh', icon: '⚔️' },
  { id: 'badge-money', title: 'Hoạch định Tiền tệ', desc: 'Giải mã công thức M = (P×Q)/V và bức tranh vĩ mô 2025', icon: '💵' },
  { id: 'badge-master', title: 'Thủ khoa MLN122', desc: 'Hoàn thành trọn vẹn 100% các module và kiểm tra đánh giá', icon: '🏆' }
];

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ progress, onSelectModule }) => {
  const completedCount = progress.completedModules.length;
  const totalModules = LESSON_MODULES.length;
  const moduleProgressPercent = Math.round((completedCount / totalModules) * 100);

  const masteredFlashcardCount = progress.masteredFlashcardIds.length;
  const totalFlashcards = FLASHCARDS.length;
  const flashcardPercent = Math.round((masteredFlashcardCount / totalFlashcards) * 100);

  const totalStudyMinutes = Math.floor(progress.totalStudySeconds / 60);

  // Daily target: 30 minutes
  const dailyTargetMinutes = 30;
  const dailyPercent = Math.min(100, Math.round((totalStudyMinutes / dailyTargetMinutes) * 100));

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Bảng theo dõi tiến độ & Phân tích học tập cá nhân
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Dữ liệu ghi nhận trực tiếp theo hoạt động học tập thực tế của bạn trên nền tảng ECONVERSE.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Streak indicator */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 rounded-lg text-xs font-bold text-amber-700 dark:text-amber-300">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{progress.streakDays} ngày liên tục</span>
          </div>

          {/* XP Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 rounded-lg text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <Award className="w-4 h-4 text-indigo-500" />
            <span>{progress.xp} XP</span>
          </div>
        </div>
      </div>

      {/* KPI 4-Card Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-400 block">Thời gian học tập:</span>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1 tabular-nums">
            {totalStudyMinutes} <span className="text-xs font-normal text-slate-500">phút</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Tích lũy từ các phiên học</span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-400 block">Tiến độ Module:</span>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono mt-1 tabular-nums">
            {completedCount} / {totalModules}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Hoàn thành {moduleProgressPercent}% giáo trình</span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-400 block">Flashcards đã thuộc:</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1 tabular-nums">
            {masteredFlashcardCount} / {totalFlashcards}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Đạt {flashcardPercent}% mục tiêu nhớ</span>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800">
          <span className="text-xs text-slate-400 block">Số bài thi đã làm:</span>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono mt-1 tabular-nums">
            {progress.quizResults.length}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {progress.quizResults.length > 0
              ? `Điểm gần nhất: ${progress.quizResults[progress.quizResults.length - 1].percentage}%`
              : 'Chưa tham gia kiểm tra'}
          </span>
        </div>
      </div>

      {/* Daily Goal & Module Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Module Status Breakdown */}
        <div className="lg:col-span-7 space-y-2.5">
          <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-2">
            Tiến độ chi tiết từng Module học phần:
          </span>
          {LESSON_MODULES.map((mod) => {
            const isCompleted = progress.completedModules.includes(mod.id);
            return (
              <div
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className="p-3 bg-slate-50 dark:bg-slate-950/40 hover:bg-blue-50/40 dark:hover:bg-blue-950/20 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {isCompleted ? '✓' : mod.number}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 block">
                      {mod.title}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      PDF Trang {mod.pdfPages.join(', ')} · ~{mod.estimatedMinutes} phút
                    </span>
                  </div>
                </div>

                <span className={`text-[11px] font-semibold ${
                  isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
                }`}>
                  {isCompleted ? 'Đã hoàn thành' : 'Chưa học'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Gamification Badges & Recent History */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-3">
              Huy hiệu thành tích (Badges):
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {BADGES.map((b) => {
                const isEarned = progress.earnedBadgeIds.includes(b.id) ||
                  (b.id === 'badge-master' && completedCount === totalModules);

                return (
                  <div
                    key={b.id}
                    className={`p-2.5 rounded-lg border flex flex-col justify-between ${
                      isEarned
                        ? 'border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-900'
                        : 'border-slate-200/50 dark:border-slate-800 opacity-50 bg-slate-100/40 dark:bg-slate-900/40'
                    }`}
                  >
                    <div className="text-xl mb-1">{b.icon}</div>
                    <div className="font-bold text-[11px] text-slate-900 dark:text-slate-100 line-clamp-1">
                      {b.title}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                      {b.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Weak areas / Review recommendations */}
          {progress.strugglingFlashcardIds.length > 0 && (
            <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-xl text-xs">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300 mb-1">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Nội dung cần ôn tập lại:</span>
              </div>
              <p className="text-amber-900 dark:text-amber-200/80 leading-relaxed text-[11px]">
                Bạn đang có <strong>{progress.strugglingFlashcardIds.length}</strong> thẻ flashcard được đánh dấu chưa nhớ. Hãy vào mục Thẻ ghi nhớ để ôn tập ngắt quãng nhé!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
