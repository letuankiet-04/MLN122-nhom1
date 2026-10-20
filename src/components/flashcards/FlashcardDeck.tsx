import React, { useState } from 'react';
import { FLASHCARDS } from '../../data/flashcardsData';
import { Flashcard, UserProgress } from '../../types';
import { RotateCw, Check, X, Shuffle, Filter, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../../utils/audio';

interface FlashcardDeckProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenPdf?: (page: number) => void;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ progress, onUpdateProgress, onOpenPdf }) => {
  const [filterModule, setFilterModule] = useState<string>('all');
  const [cards, setCards] = useState<Flashcard[]>(FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Filter cards
  const filteredCards = filterModule === 'all'
    ? cards
    : cards.filter((c) => c.moduleId === filterModule);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const handleMarkMastered = (cardId: string) => {
    onUpdateProgress((prev) => {
      const alreadyMastered = prev.masteredFlashcardIds.includes(cardId);
      const newMastered = alreadyMastered ? prev.masteredFlashcardIds : [...prev.masteredFlashcardIds, cardId];
      const newStruggling = prev.strugglingFlashcardIds.filter((id) => id !== cardId);
      const addedXp = alreadyMastered ? 0 : 15;

      if (!alreadyMastered && newMastered.length % 5 === 0) {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
        playSuccessChime();
      }

      return {
        ...prev,
        masteredFlashcardIds: newMastered,
        strugglingFlashcardIds: newStruggling,
        xp: prev.xp + addedXp
      };
    });
    handleNext();
  };

  const handleMarkStruggling = (cardId: string) => {
    onUpdateProgress((prev) => {
      const newMastered = prev.masteredFlashcardIds.filter((id) => id !== cardId);
      const newStruggling = prev.strugglingFlashcardIds.includes(cardId)
        ? prev.strugglingFlashcardIds
        : [...prev.strugglingFlashcardIds, cardId];

      return {
        ...prev,
        masteredFlashcardIds: newMastered,
        strugglingFlashcardIds: newStruggling
      };
    });
    handleNext();
  };

  const isMastered = currentCard ? progress.masteredFlashcardIds.includes(currentCard.id) : false;
  const isStruggling = currentCard ? progress.strugglingFlashcardIds.includes(currentCard.id) : false;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Thẻ ghi nhớ thông minh (Flashcards)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Lật thẻ 3D, đánh giá mức độ ghi nhớ và ôn tập ngắt quãng (Spaced Repetition).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Module Filter */}
          <select
            value={filterModule}
            onChange={(e) => {
              setFilterModule(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-hidden"
          >
            <option value="all">Tất cả quy luật ({cards.length})</option>
            <option value="module-01">Khái quát chung</option>
            <option value="module-02">Quy luật giá trị</option>
            <option value="module-03">Quy luật cung – cầu</option>
            <option value="module-04">Quy luật cạnh tranh</option>
            <option value="module-05">Quy luật lưu thông tiền tệ</option>
            <option value="module-06">Mối quan hệ 4 quy luật</option>
            <option value="module-07">Kết luận & Nhà nước</option>
          </select>

          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium rounded-lg transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Trộn thẻ</span>
          </button>
        </div>
      </div>

      {/* Progress & Deck Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-4 pb-2">
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          Thẻ {currentIndex + 1} / {filteredCards.length}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            ✓ Đã nhớ: {progress.masteredFlashcardIds.length}
          </span>
          <span className="text-amber-600 dark:text-amber-400 font-medium">
            ? Cần ôn lại: {progress.strugglingFlashcardIds.length}
          </span>
        </div>
      </div>

      {/* 3D Flipping Card Container */}
      {currentCard && (
        <div className="my-4 [perspective:1000px]">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`w-full min-h-[300px] md:min-h-[340px] rounded-2xl border transition-all duration-500 [transform-style:preserve-3d] cursor-pointer relative shadow-sm hover:shadow-md ${
              isFlipped ? '[transform:rotateY(180deg)]' : ''
            } ${
              isMastered
                ? 'border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-900'
                : isStruggling
                ? 'border-amber-300 dark:border-amber-800 bg-white dark:bg-slate-900'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
            }`}
          >
            {/* Front of Card */}
            <div className="absolute inset-0 [backface-visibility:hidden] p-6 md:p-8 flex flex-col justify-between rounded-2xl">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                    Mặt trước · Câu hỏi / Khái niệm
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPdf?.(currentCard.pdfPage);
                    }}
                    className="text-xs text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                  >
                    Trang {currentCard.pdfPage} PDF <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {currentCard.question}
                </h3>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5 text-blue-500" />
                  Nhấn vào thẻ để lật xem đáp án
                </span>
                <span className="capitalize px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px]">
                  Mức độ: {currentCard.difficulty}
                </span>
              </div>
            </div>

            {/* Back of Card */}
            <div className="absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] p-6 md:p-8 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-white to-blue-50/20 dark:from-slate-900 dark:to-slate-800/40">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    Mặt sau · Đáp án theo giáo trình
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPdf?.(currentCard.pdfPage);
                    }}
                    className="text-xs text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
                  >
                    Xem PDF Trang {currentCard.pdfPage} <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-base md:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed whitespace-pre-line mb-3">
                  {currentCard.answer}
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-xs text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-700">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Giải thích chi tiết: </span>
                  {currentCard.explanation}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span>Nhấn lại để lật về câu hỏi</span>
                <span className="text-[11px] font-mono text-blue-600 dark:text-blue-400">
                  +15 XP khi ghi nhớ thành công
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons: Struggling / Mastered / Navigation */}
      {currentCard && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleMarkStruggling(currentCard.id)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 rounded-lg text-xs font-semibold transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Chưa nhớ (Ôn lại)</span>
            </button>

            <button
              onClick={() => handleMarkMastered(currentCard.id)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Đã thuộc vững (+15 XP)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Thẻ trước
            </button>
            <button
              onClick={handleNext}
              className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Thẻ tiếp theo
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
