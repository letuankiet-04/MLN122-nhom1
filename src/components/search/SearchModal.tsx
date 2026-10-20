import React, { useState, useEffect } from 'react';
import { LESSON_MODULES } from '../../data/lessonsData';
import { FLASHCARDS } from '../../data/flashcardsData';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { ACADEMIC_REFERENCES } from '../../data/referencesData';
import { Search, X, BookOpen, ExternalLink, HelpCircle, FileText, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (moduleId: string) => void;
  onOpenPdf: (page: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectModule,
  onOpenPdf
}) => {
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.trim().toLowerCase();

  // Search in modules
  const matchedSections: { moduleTitle: string; moduleId: string; title: string; page: number; preview: string }[] = [];
  if (cleanQ) {
    LESSON_MODULES.forEach((mod) => {
      mod.sections.forEach((sec) => {
        if (
          sec.title.toLowerCase().includes(cleanQ) ||
          sec.content.toLowerCase().includes(cleanQ) ||
          sec.summary.toLowerCase().includes(cleanQ)
        ) {
          matchedSections.push({
            moduleTitle: mod.title,
            moduleId: mod.id,
            title: sec.title,
            page: sec.pdfPage,
            preview: sec.summary
          });
        }
      });
    });
  }

  // Search in flashcards
  const matchedFlashcards = cleanQ
    ? FLASHCARDS.filter((f) => f.question.toLowerCase().includes(cleanQ) || f.answer.toLowerCase().includes(cleanQ))
    : [];

  // Search in references
  const matchedRefs = cleanQ
    ? ACADEMIC_REFERENCES.filter((r) => r.title.toLowerCase().includes(cleanQ) || r.authors.toLowerCase().includes(cleanQ))
    : [];

  const totalResults = matchedSections.length + matchedFlashcards.length + matchedRefs.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm kiếm quy luật, số liệu (cà phê, Shopee, M2, Tết...), từ khóa hoặc trang PDF..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent border-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 font-mono text-[11px] hidden sm:inline">
            Esc
          </kbd>
        </div>

        {/* Results Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {!cleanQ ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <p className="font-medium">Nhập từ khóa để tra cứu tức thì trên toàn bộ 12 trang tài liệu PDF</p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['Hao phí LĐXH cần thiết', 'Cà phê SC', 'Thịt lợn Tết 2025', 'TikTok Shop 99%', 'M = (P×Q)/V', 'M2 tăng 14,98%'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-[11px]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-slate-400">
              Không tìm thấy kết quả nào khớp với "<strong>{query}</strong>".
            </div>
          ) : (
            <>
              {/* Sections results */}
              {matchedSections.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                    Nội dung bài học & Mục sách ({matchedSections.length})
                  </span>
                  {matchedSections.slice(0, 5).map((sec, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        onSelectModule(sec.moduleId);
                        onClose();
                      }}
                      className="p-3 bg-slate-50 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {sec.title}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenPdf(sec.page);
                            onClose();
                          }}
                          className="text-[11px] text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                        >
                          Trang {sec.page} PDF <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 line-clamp-1">{sec.preview}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Flashcards */}
              {matchedFlashcards.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                    Thẻ ghi nhớ Flashcards ({matchedFlashcards.length})
                  </span>
                  {matchedFlashcards.slice(0, 3).map((f) => (
                    <div
                      key={f.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                        Q: {f.question}
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 line-clamp-2">A: {f.answer}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* References */}
              {matchedRefs.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
                    Tài liệu tham khảo ({matchedRefs.length})
                  </span>
                  {matchedRefs.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px]"
                    >
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        [{r.id}] {r.authors} ({r.year}). {r.title}.
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
