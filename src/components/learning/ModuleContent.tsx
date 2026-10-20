import React, { useState } from 'react';
import { LessonModule, StudyMode, UserProgress } from '../../types';
import { CoffeeEfficiencyChart } from '../charts/CoffeeEfficiencyChart';
import { SupplyDemandSimulator } from '../simulations/SupplyDemandSimulator';
import { TetPriceChangeChart } from '../charts/TetPriceChangeChart';
import { EcommerceCompetitionChart } from '../charts/EcommerceCompetitionChart';
import { BusinessStrategySimulator } from '../simulations/BusinessStrategySimulator';
import { MoneyEquationCalculator } from '../simulations/MoneyEquationCalculator';
import { MoneyCirculationChart } from '../charts/MoneyCirculationChart';
import { InteractiveKnowledgeGraph } from './InteractiveKnowledgeGraph';
import {
  BookOpen,
  Zap,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Award,
  Sparkles,
  HelpCircle,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../../utils/audio';

interface ModuleContentProps {
  module: LessonModule;
  studyMode: StudyMode;
  onChangeStudyMode: (mode: StudyMode) => void;
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenPdf: (page: number) => void;
  onNextModule?: () => void;
  onPrevModule?: () => void;
}

export const ModuleContent: React.FC<ModuleContentProps> = ({
  module,
  studyMode,
  onChangeStudyMode,
  progress,
  onUpdateProgress,
  onOpenPdf,
  onNextModule,
  onPrevModule
}) => {
  const [quickQuizAnswers, setQuickQuizAnswers] = useState<Record<string, number>>({});
  const isCompleted = progress.completedModules.includes(module.id);
  const isBookmarked = progress.bookmarks.includes(module.id);

  const handleToggleComplete = () => {
    onUpdateProgress((prev) => {
      const alreadyCompleted = prev.completedModules.includes(module.id);
      const newCompleted = alreadyCompleted
        ? prev.completedModules.filter((id) => id !== module.id)
        : [...prev.completedModules, module.id];

      const addedXp = alreadyCompleted ? 0 : 50;
      if (!alreadyCompleted) {
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        playSuccessChime();
      }

      return {
        ...prev,
        completedModules: newCompleted,
        xp: prev.xp + addedXp
      };
    });
  };

  const handleToggleBookmark = () => {
    onUpdateProgress((prev) => {
      const isMarked = prev.bookmarks.includes(module.id);
      const newBookmarks = isMarked
        ? prev.bookmarks.filter((id) => id !== module.id)
        : [...prev.bookmarks, module.id];
      return { ...prev, bookmarks: newBookmarks };
    });
  };

  return (
    <article className="space-y-6">
      {/* Module Hero Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                Module {module.number}
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <button
                onClick={() => onOpenPdf(module.pdfPages[0])}
                className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-medium transition-colors"
                title="Mở tài liệu PDF gốc tương ứng"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>PDF Trang {module.pdfPages.join(', ')}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {module.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {module.subtitle}
            </p>
          </div>

          {/* Action Tools: Bookmark / Complete status */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleToggleBookmark}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
              title={isBookmarked ? 'Đã đánh dấu bài học' : 'Đánh dấu bài học'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span className="hidden sm:inline">{isBookmarked ? 'Đã lưu' : 'Lưu bài'}</span>
            </button>

            <button
              onClick={handleToggleComplete}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs ${
                isCompleted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isCompleted ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành (+50 XP)'}</span>
            </button>
          </div>
        </div>

        {/* Study Mode Switcher Segmented Control */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
            <button
              onClick={() => onChangeStudyMode('full')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                studyMode === 'full'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Học đầy đủ
            </button>
            <button
              onClick={() => onChangeStudyMode('summary')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                studyMode === 'summary'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Học nhanh (Tóm tắt)
            </button>
            <button
              onClick={() => onChangeStudyMode('review')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                studyMode === 'review'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Ôn tập trọng tâm
            </button>
            <button
              onClick={() => onChangeStudyMode('focus')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                studyMode === 'focus'
                  ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-2xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Chế độ tập trung
            </button>
          </div>

          <span className="text-[11px] text-slate-400">
            Ước tính thời gian đọc: ~{module.estimatedMinutes} phút
          </span>
        </div>
      </div>

      {/* Sections Content Stream */}
      <div className="space-y-6">
        {module.sections.map((section) => (
          <section
            key={section.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
                {section.title}
              </h2>

              <button
                onClick={() => onOpenPdf(section.pdfPage)}
                className="text-xs text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 font-mono shrink-0"
                title="Đối chiếu nguyên văn trang tài liệu PDF"
              >
                Trang {section.pdfPage} PDF <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Display according to Study Mode */}
            {studyMode === 'summary' ? (
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl space-y-2">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider block">
                  Tóm tắt cốt lõi từ tài liệu gốc:
                </span>
                <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  {section.summary}
                </p>
                <button
                  onClick={() => onChangeStudyMode('full')}
                  className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline inline-flex items-center gap-1 mt-1"
                >
                  Xem toàn bộ nội dung phân tích chi tiết →
                </button>
              </div>
            ) : (
              <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line space-y-3 font-normal">
                {section.content}
              </div>
            )}

            {/* Key Takeaways Box */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Luận điểm cốt lõi cần ghi nhớ:
              </span>
              <ul className="space-y-1.5 pl-1">
                {section.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5"></span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Citation footnote */}
            {section.citation && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 italic">
                Trích dẫn học thuật: {section.citation}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Embedded Dynamic Interactive Component */}
      {module.id === 'module-01' && <InteractiveKnowledgeGraph />}

      {module.id === 'module-02' && (
        <CoffeeEfficiencyChart onOpenPdf={onOpenPdf} />
      )}

      {module.id === 'module-03' && (
        <>
          <SupplyDemandSimulator />
          <TetPriceChangeChart onOpenPdf={onOpenPdf} />
        </>
      )}

      {module.id === 'module-04' && (
        <>
          <EcommerceCompetitionChart onOpenPdf={onOpenPdf} />
          <BusinessStrategySimulator />
        </>
      )}

      {module.id === 'module-05' && (
        <>
          <MoneyEquationCalculator />
          <MoneyCirculationChart onOpenPdf={onOpenPdf} />
        </>
      )}

      {module.id === 'module-06' && <InteractiveKnowledgeGraph />}

      {/* Bottom Module Navigation */}
      <div className="flex items-center justify-between pt-4 pb-8">
        <button
          onClick={onPrevModule}
          disabled={!onPrevModule}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Module trước</span>
        </button>

        <button
          onClick={onNextModule}
          disabled={!onNextModule}
          className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold disabled:opacity-30 transition-colors shadow-xs"
        >
          <span>Tiếp tục Module sau</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
