import React from 'react';
import { Search, Moon, Sun, FileText, Presentation } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenPdf: () => void;
  onOpenPresentation: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  onOpenPdf,
  onOpenPresentation,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 h-16">
        {/* Zone 1: Single text element Brand Wordmark */}
        <button
          onClick={() => onSelectTab('home')}
          className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          ECONVERSE
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={() => onSelectTab('home')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-slate-100 ${
              currentTab === 'home' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
            }`}
          >
            Tổng quan
          </button>
          <button
            onClick={() => onSelectTab('lessons')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-slate-100 ${
              currentTab === 'lessons' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
            }`}
          >
            Bài học
          </button>
          <button
            onClick={() => onSelectTab('flashcards')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-slate-100 ${
              currentTab === 'flashcards' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
            }`}
          >
            Flashcards
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-slate-100 ${
              currentTab === 'quiz' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
            }`}
          >
            Luyện thi
          </button>
          <button
            onClick={() => onSelectTab('mindmap')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-slate-100 ${
              currentTab === 'mindmap' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
            }`}
          >
            Sơ đồ tư duy
          </button>
          <button
            onClick={() => onSelectTab('references')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-slate-100 ${
              currentTab === 'references' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''
            }`}
          >
            Tài liệu tham khảo
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Spotlight Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-lg text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Tìm kiếm thông minh (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Tìm kiếm...</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-[10px] font-mono border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Presentation Mode Button */}
          <button
            onClick={onOpenPresentation}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Chế độ thuyết trình trên lớp"
          >
            <Presentation className="w-4 h-4" />
          </button>

          {/* PDF Viewer Trigger */}
          <button
            onClick={onOpenPdf}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            title="Xem tệp PDF gốc"
          >
            <FileText className="w-3.5 h-3.5 text-red-500" />
            <span className="hidden sm:inline">PDF gốc</span>
          </button>

          {/* Dark/Light mode toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Chuyển chế độ sáng tối"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
