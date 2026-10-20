import React, { useState, useEffect } from 'react';
import { LESSON_MODULES } from '../../data/lessonsData';
import { CoffeeEfficiencyChart } from '../charts/CoffeeEfficiencyChart';
import { SupplyDemandSimulator } from '../simulations/SupplyDemandSimulator';
import { TetPriceChangeChart } from '../charts/TetPriceChangeChart';
import { EcommerceCompetitionChart } from '../charts/EcommerceCompetitionChart';
import { MoneyEquationCalculator } from '../simulations/MoneyEquationCalculator';
import { MoneyCirculationChart } from '../charts/MoneyCirculationChart';
import { InteractiveKnowledgeGraph } from '../learning/InteractiveKnowledgeGraph';
import { X, ChevronLeft, ChevronRight, Clock, MessageSquare, Maximize2, Minimize2 } from 'lucide-react';

interface PresentationSlide {
  id: string;
  title: string;
  subtitle: string;
  pdfPage: number;
  component: React.ReactNode;
  speakerNotes: string;
}

export const PresentationView: React.FC<{
  onClose: () => void;
  onOpenPdf?: (page: number) => void;
}> = ({ onClose, onOpenPdf }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const slides: PresentationSlide[] = [
    {
      id: 'slide-intro',
      title: 'Phân tích các quy luật cơ bản trong nền kinh tế hàng hóa',
      subtitle: 'Học phần: Kinh tế chính trị Mác – Lênin (MLN122)',
      pdfPage: 1,
      component: (
        <div className="flex flex-col items-center justify-center text-center p-8 h-full">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">
            Báo cáo học phần MLN122 · Chương 2
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-100 max-w-3xl leading-tight mb-4">
            Bốn quy luật cơ bản & Ví dụ thực tiễn trong nền kinh tế hiện nay
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
            Khái quát 4 quy luật: Giá trị, Cung - Cầu, Cạnh tranh, Lưu thông tiền tệ và phân tích số liệu thực chứng tại Việt Nam.
          </p>
        </div>
      ),
      speakerNotes: 'Kính chào Thầy/Cô và các bạn. Hôm nay nhóm em xin trình bày về bốn quy luật kinh tế cơ bản trong nền kinh tế hàng hóa theo giáo trình MLN122 và liên hệ các số liệu thực tiễn mới nhất tại Việt Nam.'
    },
    {
      id: 'slide-overview',
      title: 'Khái quát nền kinh tế hàng hóa & 4 quy luật',
      subtitle: 'Sản xuất - Phân phối - Trao đổi - Tiêu dùng',
      pdfPage: 1,
      component: <InteractiveKnowledgeGraph />,
      speakerNotes: 'Nền kinh tế hàng hóa vận động qua 4 khâu. 4 quy luật kinh tế không đứng độc lập mà tương tác đa chiều. Ở slide này, chúng ta quan sát toàn bộ sơ đồ mạng lưới quan hệ giữa các quy luật.'
    },
    {
      id: 'slide-value-coffee',
      title: 'Quy luật giá trị & Nghiên cứu hộ trồng cà phê (2019)',
      subtitle: 'Hao phí LĐXH cần thiết & Số liệu thực nghiệm tạp chí Economies',
      pdfPage: 2,
      component: <CoffeeEfficiencyChart onOpenPdf={onOpenPdf} />,
      speakerNotes: 'Quy luật giá trị đòi hỏi hao phí cá biệt phải phù hợp với hao phí LĐXH cần thiết. Nghiên cứu thực tế năm 2019 cho thấy hộ có chứng nhận SC đạt năng suất cao hơn 9,6%, giá bán cao hơn 5,1% và lợi nhuận gộp cao hơn 20,4%.'
    },
    {
      id: 'slide-supply-demand-sim',
      title: 'Quy luật cung – cầu: Mô phỏng tương tác',
      subtitle: 'Cân bằng động P* và Q* theo sự dịch chuyển thị trường',
      pdfPage: 4,
      component: <SupplyDemandSimulator />,
      speakerNotes: 'Khi cung và cầu biến thiên đồng thời, giá cả sẽ dao động. Chúng ta có thể trực tiếp kéo thanh trượt mô phỏng trên màn hình để kiểm chứng phản ứng của điểm cân bằng.'
    },
    {
      id: 'slide-tet-market',
      title: 'Thực tiễn Cung - Cầu: Thị trường Tết Ất Tỵ 2025',
      subtitle: 'Biến động chỉ số giá & Vai trò can thiệp bình ổn của Nhà nước',
      pdfPage: 5,
      component: <TetPriceChangeChart onOpenPdf={onOpenPdf} />,
      speakerNotes: 'Dịp Tết 2025: Nhu cầu đẩy giá thịt lợn (+2,45%), nhưng nguồn cung dồi dào khiến giá rau củ giảm (-0,48%). Tại TP.HCM, các doanh nghiệp dự trữ gói hàng hơn 8.000 tỷ để bình ổn giá.'
    },
    {
      id: 'slide-competition-ecommerce',
      title: 'Quy luật cạnh tranh: Shopee vs TikTok Shop (2024)',
      subtitle: 'Thị phần GMV & Tốc độ tăng trưởng thần tốc',
      pdfPage: 7,
      component: <EcommerceCompetitionChart onOpenPdf={onOpenPdf} />,
      speakerNotes: 'Năm 2024, Shopee giữ 66,7% thị phần (9,3 tỷ USD), trong khi TikTok Shop tăng trưởng 99% (đạt 3,8 tỷ USD). Cạnh tranh thúc đẩy đổi mới nhưng cần tuân thủ Luật Cạnh tranh 2018.'
    },
    {
      id: 'slide-money-calc',
      title: 'Quy luật lưu thông tiền tệ: Công thức M = (P × Q)/V',
      subtitle: 'Công cụ tính toán tương tác lượng tiền cần thiết',
      pdfPage: 8,
      component: <MoneyEquationCalculator />,
      speakerNotes: 'Lượng tiền M cần thiết tỉ lệ thuận với tổng giá cả hàng hóa P×Q và tỉ lệ nghịch với tốc độ lưu thông V. Công cụ này cho phép chúng ta thử nghiệm các kịch bản thanh toán QR và mở rộng GDP.'
    },
    {
      id: 'slide-money-macro',
      title: 'Bối cảnh vĩ mô Việt Nam năm 2025',
      subtitle: 'M2 (+14,98%), Tín dụng (+17,65%), GDP (+8,02%), CPI (+3,31%)',
      pdfPage: 9,
      component: <MoneyCirculationChart onOpenPdf={onOpenPdf} />,
      speakerNotes: 'Năm 2025, dù lượng tiền M2 tăng 14,98%, CPI chỉ tăng 3,31% nhờ GDP tăng trưởng mạnh mẽ 8,02% tạo ra khối lượng hàng hóa dồi dào hấp thụ lượng tiền đưa vào nền kinh tế.'
    }
  ];

  const currentSlide = slides[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlideIndex((idx) => Math.min(slides.length - 1, idx + 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((idx) => Math.max(0, idx - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onClose]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Top Presentation Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
            Slide {currentSlideIndex + 1} / {slides.length}
          </span>
          <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
            {currentSlide.title}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
              showSpeakerNotes ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ghi chú người nói</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Thoát chế độ thuyết trình (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col justify-center max-w-6xl w-full mx-auto">
        <div className="w-full">
          {currentSlide.component}
        </div>
      </div>

      {/* Speaker Notes Drawer (if enabled) */}
      {showSpeakerNotes && (
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 flex items-start gap-3">
          <span className="font-bold text-indigo-400 shrink-0">Gợi ý thuyết trình:</span>
          <p className="leading-relaxed flex-1">{currentSlide.speakerNotes}</p>
        </div>
      )}

      {/* Bottom Controls */}
      <div className="px-6 py-3 border-t border-slate-800/80 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Dùng phím mũi tên</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">←</kbd>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">→</kbd>
          <span>để chuyển slide</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlideIndex((idx) => Math.max(0, idx - 1))}
            disabled={currentSlideIndex === 0}
            className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentSlideIndex((idx) => Math.min(slides.length - 1, idx + 1))}
            disabled={currentSlideIndex === slides.length - 1}
            className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-300 disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
