import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { QuizQuestion, UserProgress } from '../../types';
import { CheckCircle2, XCircle, Clock, Award, RotateCcw, ArrowRight, ExternalLink, HelpCircle, CheckSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSuccessChime } from '../../utils/audio';

interface QuizRunnerProps {
  progress: UserProgress;
  onUpdateProgress: (updater: (prev: UserProgress) => UserProgress) => void;
  onOpenPdf?: (page: number) => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ progress, onUpdateProgress, onOpenPdf }) => {
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [isExamMode, setIsExamMode] = useState<boolean>(false);
  const [quizList, setQuizList] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(600); // 10 minutes
  const [isReviewingMistakes, setIsReviewingMistakes] = useState<boolean>(false);

  // Initialize or start quiz
  const startQuiz = (onlyMistakes = false) => {
    let pool = QUIZ_QUESTIONS;
    if (selectedModule !== 'all') {
      pool = pool.filter((q) => q.moduleId === selectedModule);
    }

    if (onlyMistakes) {
      const lastResult = progress.quizResults[progress.quizResults.length - 1];
      if (lastResult && lastResult.mistakeQuestionIds.length > 0) {
        pool = QUIZ_QUESTIONS.filter((q) => lastResult.mistakeQuestionIds.includes(q.id));
      }
      setIsReviewingMistakes(true);
    } else {
      setIsReviewingMistakes(false);
    }

    setQuizList(pool);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setTimeRemainingSeconds(Math.max(180, pool.length * 60)); // 60s per question
    setIsExamMode(true);
  };

  // Timer countdown
  useEffect(() => {
    if (!isExamMode || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamMode, isSubmitted]);

  const currentQ = quizList[currentIndex];

  const handleSelectOption = (answer: any) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: answer
    }));
  };

  const handleToggleMultiple = (optionIndex: number) => {
    if (isSubmitted) return;
    const current = (userAnswers[currentQ.id] as number[]) || [];
    const exists = current.includes(optionIndex);
    const updated = exists ? current.filter((i) => i !== optionIndex) : [...current, optionIndex].sort();
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: updated
    }));
  };

  // Grade the quiz
  const calculateScore = () => {
    let score = 0;
    const mistakes: string[] = [];

    quizList.forEach((q) => {
      const userAns = userAnswers[q.id];
      let isCorrect = false;

      if (q.type === 'single' || q.type === 'case_study') {
        isCorrect = userAns === q.correctAnswer;
      } else if (q.type === 'true_false') {
        isCorrect = userAns === q.correctAnswer;
      } else if (q.type === 'multiple') {
        const correctArray = (q.correctAnswer as number[]).sort();
        const userArray = ((userAns as number[]) || []).sort();
        isCorrect = JSON.stringify(correctArray) === JSON.stringify(userArray);
      } else if (q.type === 'fill_blank') {
        isCorrect = typeof userAns === 'string' && userAns.trim().toLowerCase() === (q.correctAnswer as string).toLowerCase();
      } else if (q.type === 'matching') {
        isCorrect = userAns === 'matched';
      } else if (q.type === 'essay') {
        isCorrect = Boolean(userAns && userAns.trim().length > 30);
      }

      if (isCorrect) {
        score++;
      } else {
        mistakes.push(q.id);
      }
    });

    return { score, total: quizList.length, mistakes };
  };

  const handleSubmitQuiz = () => {
    setIsSubmitted(true);
    const { score, total, mistakes } = calculateScore();
    const percentage = Math.round((score / total) * 100);
    const xpEarned = score * 20;

    if (percentage >= 70) {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      playSuccessChime();
    }

    onUpdateProgress((prev) => ({
      ...prev,
      xp: prev.xp + xpEarned,
      quizResults: [
        ...prev.quizResults,
        {
          quizId: `quiz-${Date.now()}`,
          score,
          total,
          percentage,
          timestamp: Date.now(),
          mistakeQuestionIds: mistakes
        }
      ]
    }));
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If not started yet
  if (!isExamMode) {
    const lastResult = progress.quizResults[progress.quizResults.length - 1];

    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Hệ thống trắc nghiệm & Luyện thi MLN122
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ngân hàng câu hỏi đa dạng: Trắc nghiệm 1 đáp án, nhiều đáp án, đúng/sai, điền khuyết, ghép thuật ngữ và tình huống thực tiễn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-xl">
            <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold block">Tổng số câu trong kho:</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1 block">
              {QUIZ_QUESTIONS.length} câu hỏi
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">Bám sát 100% nội dung 12 trang PDF</span>
          </div>

          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-xl">
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block">Lần thi gần nhất:</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1 block">
              {lastResult ? `${lastResult.score}/${lastResult.total} (${lastResult.percentage}%)` : 'Chưa thi'}
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">
              {lastResult ? `${new Date(lastResult.timestamp).toLocaleDateString('vi-VN')}` : 'Hãy bắt đầu làm bài'}
            </span>
          </div>

          <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30 rounded-xl">
            <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold block">Phần thưởng XP:</span>
            <span className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1 block">
              +20 XP
            </span>
            <span className="text-[11px] text-slate-500 mt-1 block">Cho mỗi câu trả lời chính xác</span>
          </div>
        </div>

        {/* Configuration Form */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label htmlFor="quiz-module-select" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Chọn phạm vi ôn tập:
            </label>
            <select
              id="quiz-module-select"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300 focus:outline-hidden"
            >
              <option value="all">Toàn bộ đề thi (Tổng hợp 4 quy luật)</option>
              <option value="module-01">Module 01: Khái quát nền kinh tế hàng hóa</option>
              <option value="module-02">Module 02: Quy luật giá trị & Nghiên cứu cà phê</option>
              <option value="module-03">Module 03: Quy luật cung – cầu & Thị trường Tết 2025</option>
              <option value="module-04">Module 04: Quy luật cạnh tranh & Shopee vs TikTok</option>
              <option value="module-05">Module 05: Quy luật lưu thông tiền tệ & Kinh tế 2025</option>
              <option value="module-06">Module 06: Mối quan hệ giữa 4 quy luật</option>
              <option value="module-07">Module 07: Kết luận & Quản lý của Nhà nước</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => startQuiz(false)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              Bắt đầu làm bài thi ({selectedModule === 'all' ? QUIZ_QUESTIONS.length : QUIZ_QUESTIONS.filter(q => q.moduleId === selectedModule).length} câu)
            </button>

            {lastResult && lastResult.mistakeQuestionIds.length > 0 && (
              <button
                onClick={() => startQuiz(true)}
                className="px-4 py-2.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Làm lại các câu sai lần trước ({lastResult.mistakeQuestionIds.length} câu)
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If Quiz is completed / Submitted view
  if (isSubmitted) {
    const { score, total } = calculateScore();
    const percentage = Math.round((score / total) * 100);

    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm">
        <div className="text-center py-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Kết quả bài làm: {score} / {total} câu đúng
          </h3>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
            Đạt {percentage}% · Thưởng +{score * 20} XP
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={() => setIsExamMode(false)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Về bảng điều khiển
            </button>
            <button
              onClick={() => startQuiz(false)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Làm lại bài thi mới
            </button>
          </div>
        </div>

        {/* Detailed Review of All Questions */}
        <div className="mt-6 space-y-6">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Chi tiết giải thích và đáp án từng câu:
          </h4>

          {quizList.map((q, idx) => {
            const userAns = userAnswers[q.id];
            let isCorrect = false;
            if (q.type === 'single' || q.type === 'case_study' || q.type === 'true_false') {
              isCorrect = userAns === q.correctAnswer;
            } else if (q.type === 'multiple') {
              isCorrect = JSON.stringify((q.correctAnswer as number[]).sort()) === JSON.stringify(((userAns as number[]) || []).sort());
            } else if (q.type === 'fill_blank') {
              isCorrect = typeof userAns === 'string' && userAns.trim().toLowerCase() === (q.correctAnswer as string).toLowerCase();
            } else if (q.type === 'matching' || q.type === 'essay') {
              isCorrect = true;
            }

            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border text-xs ${
                  isCorrect
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/10'
                    : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      Câu {idx + 1}: {q.question}
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenPdf?.(q.pdfPage)}
                    className="text-[11px] text-slate-400 hover:text-blue-600 flex items-center gap-1 shrink-0"
                  >
                    Trang {q.pdfPage} PDF <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 space-y-1.5 mt-2">
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Giải thích chi tiết: </span>
                    {q.explanation}
                  </div>
                  {q.rubric && (
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                        Tiêu chí chấm điểm (Rubric):
                      </span>
                      <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                        {q.rubric.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm">
      {/* Quiz Top bar: Counter & Timer */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
            Câu {currentIndex + 1} / {quizList.length}
          </span>
          {isReviewingMistakes && (
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
              (Chế độ ôn lại câu sai)
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{formatTimer(timeRemainingSeconds)}</span>
          </div>

          <button
            onClick={() => onOpenPdf?.(currentQ.pdfPage)}
            className="text-xs text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
          >
            Trang {currentQ.pdfPage} <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Question Content */}
      <div className="py-6">
        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Options based on type */}
        {(currentQ.type === 'single' || currentQ.type === 'case_study') && currentQ.options && (
          <div className="space-y-2.5">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = userAnswers[currentQ.id] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  className={`w-full text-left p-3.5 rounded-lg border text-xs transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-blue-600 dark:border-blue-500 bg-blue-50/60 dark:bg-blue-950/30 font-semibold text-blue-900 dark:text-blue-200 shadow-2xs'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[11px] shrink-0 font-bold ${
                    isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 dark:border-slate-600 text-slate-500'
                  }`}>
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {currentQ.type === 'true_false' && (
          <div className="grid grid-cols-2 gap-4">
            {[true, false].map((val) => {
              const isSelected = userAnswers[currentQ.id] === val;
              return (
                <button
                  key={String(val)}
                  onClick={() => handleSelectOption(val)}
                  className={`p-4 rounded-xl border text-sm font-bold text-center transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 shadow-2xs'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {val ? 'ĐÚNG' : 'SAI'}
                </button>
              );
            })}
          </div>
        )}

        {currentQ.type === 'multiple' && currentQ.options && (
          <div className="space-y-2.5">
            <span className="text-[11px] text-slate-400 block mb-1">
              * Câu hỏi có thể chọn nhiều đáp án. Nhấn vào các ô để chọn:
            </span>
            {currentQ.options.map((opt, oIdx) => {
              const selectedArray = (userAnswers[currentQ.id] as number[]) || [];
              const isSelected = selectedArray.includes(oIdx);
              return (
                <button
                  key={oIdx}
                  onClick={() => handleToggleMultiple(oIdx)}
                  className={`w-full text-left p-3.5 rounded-lg border text-xs transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/30 font-semibold text-indigo-900 dark:text-indigo-200'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 text-transparent'
                  }`}>
                    ✓
                  </div>
                  <span className="leading-relaxed">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {currentQ.type === 'fill_blank' && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nhập từ hoặc cụm từ còn thiếu..."
              value={userAnswers[currentQ.id] || ''}
              onChange={(e) => handleSelectOption(e.target.value)}
              className="w-full max-w-md p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {currentQ.type === 'matching' && currentQ.matchingPairs && (
          <div className="p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Bảng ghép nối dữ liệu:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {currentQ.matchingPairs.map((pair, idx) => (
                <div key={idx} className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800 flex justify-between items-center">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{pair.term}</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{pair.definition}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSelectOption('matched')}
              className={`w-full py-2 rounded-lg text-xs font-semibold transition-colors ${
                userAnswers[currentQ.id] === 'matched'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {userAnswers[currentQ.id] === 'matched' ? '✓ Đã xác nhận đối chiếu đúng' : 'Nhấn để xác nhận đối chiếu'}
            </button>
          </div>
        )}

        {currentQ.type === 'essay' && (
          <div className="space-y-3">
            <textarea
              rows={6}
              placeholder="Nhập bài phân tích tự luận của bạn theo các luận điểm chính..."
              value={userAnswers[currentQ.id] || ''}
              onChange={(e) => handleSelectOption(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
            {currentQ.rubric && (
              <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-lg text-xs">
                <span className="font-semibold text-blue-700 dark:text-blue-300 block mb-1">
                  Khung tiêu chí chấm tự luận (Rubric):
                </span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600 dark:text-slate-400">
                  {currentQ.rubric.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setCurrentIndex((idx) => Math.max(0, idx - 1))}
          disabled={currentIndex === 0}
          className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Câu trước
        </button>

        {currentIndex < quizList.length - 1 ? (
          <button
            onClick={() => setCurrentIndex((idx) => idx + 1)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={handleSubmitQuiz}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
          >
            Nộp bài & Chấm điểm
          </button>
        )}
      </div>
    </div>
  );
};
