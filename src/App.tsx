/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LESSON_MODULES } from './data/lessonsData';
import { StudyMode, UserProgress, StudyNote } from './types';
import {
  loadUserProgress,
  saveUserProgress,
  loadNotes,
  saveNotes,
  loadThemePreference,
  saveThemePreference
} from './utils/storage';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/home/HomeView';
import { ModuleContent } from './components/learning/ModuleContent';
import { FlashcardDeck } from './components/flashcards/FlashcardDeck';
import { QuizRunner } from './components/quiz/QuizRunner';
import { InteractiveMindmap } from './components/mindmap/InteractiveMindmap';
import { NotesManager } from './components/notes/NotesManager';
import { AnalyticsDashboard } from './components/gamification/AnalyticsDashboard';
import { ReferencesView } from './components/learning/ReferencesView';
import { PomodoroTimer } from './components/timer/PomodoroTimer';
import { PdfViewerModal } from './components/layout/PdfViewerModal';
import { SearchModal } from './components/search/SearchModal';
import { PresentationView } from './components/presentation/PresentationView';
import { AiStudyAssistant } from './components/assistant/AiStudyAssistant';
import {
  Layers,
  BookOpen,
  HelpCircle,
  FileText,
  Clock,
  TrendingUp,
  Bookmark,
  ChevronRight,
  ListFilter
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [activeModuleId, setActiveModuleId] = useState<string>('module-01');
  const [studyMode, setStudyMode] = useState<StudyMode>('full');

  // Persistence
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [notes, setNotes] = useState<StudyNote[]>(loadNotes);
  const [theme, setTheme] = useState<'light' | 'dark'>(loadThemePreference);

  // Modals
  const [isPdfOpen, setIsPdfOpen] = useState<boolean>(false);
  const [pdfInitialPage, setPdfInitialPage] = useState<number>(1);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [showPomodoroPanel, setShowPomodoroPanel] = useState<boolean>(false);

  // Sync theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveThemePreference(theme);
  }, [theme]);

  // Sync progress
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // Sync notes
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenPdf = (page: number = 1) => {
    setPdfInitialPage(page);
    setIsPdfOpen(true);
  };

  const handleSelectModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setCurrentTab('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartLearning = () => {
    setActiveModuleId('module-01');
    setCurrentTab('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentModule = LESSON_MODULES.find((m) => m.id === activeModuleId) || LESSON_MODULES[0];
  const currentModuleIndex = LESSON_MODULES.findIndex((m) => m.id === activeModuleId);

  const handleNextModule = currentModuleIndex < LESSON_MODULES.length - 1
    ? () => {
        const nextMod = LESSON_MODULES[currentModuleIndex + 1];
        setActiveModuleId(nextMod.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    : undefined;

  const handlePrevModule = currentModuleIndex > 0
    ? () => {
        const prevMod = LESSON_MODULES[currentModuleIndex - 1];
        setActiveModuleId(prevMod.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    : undefined;

  const handleAddStudySeconds = (seconds: number) => {
    setProgress((prev) => ({
      ...prev,
      totalStudySeconds: prev.totalStudySeconds + seconds
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#080D1A] text-[#0F172A] dark:text-[#F8FAFC] transition-colors duration-200">
      {/* Top Bar Contract Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPdf={() => handleOpenPdf(1)}
        onOpenPresentation={() => setIsPresentationOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {/* Tab 1: Home View */}
        {currentTab === 'home' && (
          <HomeView
            progress={progress}
            onSelectModule={handleSelectModule}
            onStartLearning={handleStartLearning}
            onOpenPdf={handleOpenPdf}
          />
        )}

        {/* Tab 2: Lessons View (Sidebar navigation + Lesson Content) */}
        {currentTab === 'lessons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Module Sidebar (Desktop) */}
            <aside className="lg:col-span-3 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm sticky top-24">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                    Các Module bài học
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {progress.completedModules.length}/{LESSON_MODULES.length} xong
                  </span>
                </div>

                <div className="space-y-1">
                  {LESSON_MODULES.map((mod) => {
                    const isSelected = mod.id === activeModuleId;
                    const isDone = progress.completedModules.includes(mod.id);

                    return (
                      <button
                        key={mod.id}
                        onClick={() => handleSelectModule(mod.id)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between group ${
                          isSelected
                            ? 'bg-blue-600 text-white font-bold shadow-xs'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 line-clamp-1">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                            isSelected
                              ? 'bg-white/20 text-white font-bold'
                              : isDone
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {isDone ? '✓' : mod.number}
                          </span>
                          <span className="truncate">{mod.title}</span>
                        </div>

                        <span className={`text-[10px] font-mono shrink-0 ml-1 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                          Tr.{mod.pdfPages[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Focus Timer Mini Launcher in Sidebar */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setShowPomodoroPanel(!showPomodoroPanel)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{showPomodoroPanel ? 'Ẩn Pomodoro' : 'Mở Pomodoro Focus'}</span>
                  </button>
                </div>
              </div>

              {/* Pomodoro Panel if opened */}
              {showPomodoroPanel && (
                <PomodoroTimer
                  totalStudySeconds={progress.totalStudySeconds}
                  onAddStudySeconds={handleAddStudySeconds}
                />
              )}
            </aside>

            {/* Right Stage: Detailed Module Content */}
            <div className="lg:col-span-9">
              <ModuleContent
                module={currentModule}
                studyMode={studyMode}
                onChangeStudyMode={setStudyMode}
                progress={progress}
                onUpdateProgress={setProgress}
                onOpenPdf={handleOpenPdf}
                onNextModule={handleNextModule}
                onPrevModule={handlePrevModule}
              />
            </div>
          </div>
        )}

        {/* Tab 3: Flashcards */}
        {currentTab === 'flashcards' && (
          <div className="max-w-4xl mx-auto">
            <FlashcardDeck
              progress={progress}
              onUpdateProgress={setProgress}
              onOpenPdf={handleOpenPdf}
            />
          </div>
        )}

        {/* Tab 4: Quiz & Exam */}
        {currentTab === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            <QuizRunner
              progress={progress}
              onUpdateProgress={setProgress}
              onOpenPdf={handleOpenPdf}
            />
          </div>
        )}

        {/* Tab 5: Mindmap */}
        {currentTab === 'mindmap' && (
          <div className="max-w-6xl mx-auto">
            <InteractiveMindmap
              onSelectModule={handleSelectModule}
              onOpenPdf={handleOpenPdf}
            />
          </div>
        )}

        {/* Tab 6: Notes & Bookmarks */}
        {currentTab === 'notes' && (
          <div className="max-w-5xl mx-auto">
            <NotesManager
              notes={notes}
              onSaveNotes={setNotes}
              bookmarks={progress.bookmarks}
              onToggleBookmark={(bm) =>
                setProgress((p) => ({
                  ...p,
                  bookmarks: p.bookmarks.includes(bm)
                    ? p.bookmarks.filter((b) => b !== bm)
                    : [...p.bookmarks, bm]
                }))
              }
              onOpenPdf={handleOpenPdf}
            />
          </div>
        )}

        {/* Tab 7: Analytics Dashboard */}
        {currentTab === 'analytics' && (
          <div className="max-w-5xl mx-auto">
            <AnalyticsDashboard
              progress={progress}
              onSelectModule={handleSelectModule}
            />
          </div>
        )}

        {/* Tab 8: References */}
        {currentTab === 'references' && (
          <div className="max-w-4xl mx-auto">
            <ReferencesView onOpenPdf={handleOpenPdf} />
          </div>
        )}
      </main>

      {/* Floating Utilities */}
      <AiStudyAssistant
        currentModuleTitle={currentModule.title}
        onOpenPdf={handleOpenPdf}
      />

      {/* Side-by-side or Modal PDF Viewer */}
      <PdfViewerModal
        isOpen={isPdfOpen}
        onClose={() => setIsPdfOpen(false)}
        initialPage={pdfInitialPage}
      />

      {/* Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectModule={handleSelectModule}
        onOpenPdf={handleOpenPdf}
      />

      {/* Full-Screen Presentation Mode */}
      {isPresentationOpen && (
        <PresentationView
          onClose={() => setIsPresentationOpen(false)}
          onOpenPdf={handleOpenPdf}
        />
      )}

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around py-2 px-1">
        <button
          onClick={() => setCurrentTab('home')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentTab === 'home' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Tổng quan</span>
        </button>
        <button
          onClick={() => setCurrentTab('lessons')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentTab === 'lessons' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Bài học</span>
        </button>
        <button
          onClick={() => setCurrentTab('flashcards')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentTab === 'flashcards' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Flashcard</span>
        </button>
        <button
          onClick={() => setCurrentTab('quiz')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentTab === 'quiz' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Luyện thi</span>
        </button>
        <button
          onClick={() => setCurrentTab('analytics')}
          className={`flex flex-col items-center gap-0.5 text-[10px] ${
            currentTab === 'analytics' ? 'text-blue-600 font-bold' : 'text-slate-500'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Tiến độ</span>
        </button>
      </nav>

      {/* Footer */}
      <Footer onOpenPdf={handleOpenPdf} />
    </div>
  );
}
