import React from 'react';
import { LESSON_MODULES } from '../../data/lessonsData';
import { UserProgress } from '../../types';
import {
  BookOpen,
  ArrowRight,
  TrendingUp,
  Coins,
  Swords,
  Banknote,
  Network,
  Sparkles,
  FileText,
  Flame,
  Award,
  Layers,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

interface HomeViewProps {
  progress: UserProgress;
  onSelectModule: (moduleId: string) => void;
  onStartLearning: () => void;
  onOpenPdf: (page: number) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  onSelectModule,
  onStartLearning,
  onOpenPdf
}) => {
  const completedCount = progress.completedModules.length;
  const totalModules = LESSON_MODULES.length;
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  const lawCards = [
    {
      moduleId: 'module-02',
      number: '02',
      title: 'Quy luật Giá trị',
      tagline: 'Hao phí LĐXH cần thiết & Nghiên cứu cà phê 2019',
      icon: Coins,
      accentColor: 'from-blue-600 to-indigo-600',
      bgSubtle: 'bg-blue-50/50 dark:bg-blue-950/20',
      borderColor: 'border-blue-100 dark:border-blue-900/40',
      statLabel: 'Lợi nhuận SC',
      statValue: '+20,4%',
      pdfPage: 1
    },
    {
      moduleId: 'module-03',
      number: '03',
      title: 'Quy luật Cung – Cầu',
      tagline: 'Mô phỏng cân bằng giá & Thị trường Tết Ất Tỵ 2025',
      icon: TrendingUp,
      accentColor: 'from-emerald-600 to-teal-600',
      bgSubtle: 'bg-emerald-50/50 dark:bg-emerald-950/20',
      borderColor: 'border-emerald-100 dark:border-emerald-900/40',
      statLabel: 'Thịt lợn Tết 2025',
      statValue: '+2,45%',
      pdfPage: 4
    },
    {
      moduleId: 'module-04',
      number: '04',
      title: 'Quy luật Cạnh tranh',
      tagline: 'Ganh đua kinh tế & Shopee vs TikTok Shop 2024',
      icon: Swords,
      accentColor: 'from-orange-600 to-amber-600',
      bgSubtle: 'bg-orange-50/50 dark:bg-orange-950/20',
      borderColor: 'border-orange-100 dark:border-orange-900/40',
      statLabel: 'TikTok Shop GMV',
      statValue: '+99%',
      pdfPage: 6
    },
    {
      moduleId: 'module-05',
      number: '05',
      title: 'Quy luật Lưu thông tiền tệ',
      tagline: 'Công thức M = (P×Q)/V & Vĩ mô Việt Nam 2025',
      icon: Banknote,
      accentColor: 'from-purple-600 to-pink-600',
      bgSubtle: 'bg-purple-50/50 dark:bg-purple-950/20',
      borderColor: 'border-purple-100 dark:border-purple-900/40',
      statLabel: 'GDP Việt Nam 2025',
      statValue: '+8,02%',
      pdfPage: 8
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Editorial Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-slate-50/80 to-blue-50/30 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-10 md:p-14 shadow-sm">
        <div className="max-w-3xl">
          {/* Subtle Tagline */}
          <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <span className="uppercase tracking-widest">Học phần MLN122 · Chương 2</span>
            <span>·</span>
            <span>Giáo trình Kinh tế chính trị Mác – Lênin</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-[1.1] mb-6 text-balance">
            Khám phá 4 quy luật kinh tế hàng hóa
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
            Học Kinh tế chính trị Mác – Lênin theo cách trực quan, tương tác và dễ ghi nhớ hơn. Trực quan hóa toàn bộ 12 trang tài liệu gốc với các mô phỏng thị trường thực tế và trợ lý AI thông minh.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartLearning}
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>Bắt đầu học ngay</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenPdf(1)}
              className="px-5 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-red-500" />
              <span>Xem tài liệu PDF gốc (12 trang)</span>
            </button>
          </div>

          {/* Quick Stats Strip below hero */}
          <div className="flex flex-wrap items-center gap-6 mt-10 pt-6 border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Nội dung bám sát PDF 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span>Mô phỏng đồ thị trực tiếp</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-500" />
              <span>Flashcard & Đề thi trắc nghiệm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid: 4 Core Economic Laws */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Bốn quy luật kinh tế cốt lõi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Chọn từng quy luật để đi sâu vào nội dung lý thuyết, đồ thị tương tác và phân tích số liệu thực chứng.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {lawCards.map((card) => {
            const Icon = card.icon;
            const isCompleted = progress.completedModules.includes(card.moduleId);

            return (
              <div
                key={card.moduleId}
                onClick={() => onSelectModule(card.moduleId)}
                className={`group p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-md ${card.bgSubtle} ${card.borderColor} hover:-translate-y-0.5`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.accentColor} text-white flex items-center justify-center shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">
                      Module {card.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {card.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/50 dark:border-slate-800/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{card.statLabel}:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      {card.statValue}
                    </span>
                  </div>

                  <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
                    {isCompleted ? 'Ôn tập' : 'Khám phá'} <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* All 7 Curriculum Modules Bento Overview */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Lộ trình 7 Module toàn diện
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LESSON_MODULES.map((mod) => {
            const isCompleted = progress.completedModules.includes(mod.id);

            return (
              <div
                key={mod.id}
                onClick={() => onSelectModule(mod.id)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 cursor-pointer transition-all hover:shadow-xs group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      Module {mod.number}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      PDF Tr.{mod.pdfPages.join(', ')}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-400">
                    ~{mod.estimatedMinutes} phút đọc
                  </span>

                  <span className={`text-[11px] font-semibold flex items-center gap-1 ${
                    isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {isCompleted ? '✓ Đã xong' : 'Bắt đầu học'}
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
