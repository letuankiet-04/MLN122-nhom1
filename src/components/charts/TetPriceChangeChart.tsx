import React from 'react';
import { TET_PRICE_METRICS } from '../../data/lessonsData';
import { TrendingUp, TrendingDown, ExternalLink, PackageCheck, AlertCircle } from 'lucide-react';

export const TetPriceChangeChart: React.FC<{ onOpenPdf?: (page: number) => void }> = ({ onOpenPdf }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-rose-600 dark:text-rose-400 uppercase">
              Thực tiễn thị trường · Tháng 01/2025
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <button
              onClick={() => onOpenPdf?.(4)}
              className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 transition-colors"
            >
              PDF Trang 4-5 <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Biến động giá một số mặt hàng tiêu dùng dịp Tết Nguyên đán Ất Tỵ 2025
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Nguồn: Cục Thống kê Quốc gia (tháng 01/2025) & Cổng Thông tin điện tử Chính phủ (13/01/2025)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-stretch">
        {/* Horizontal bar indicators */}
        <div className="lg:col-span-7 space-y-3.5">
          {TET_PRICE_METRICS.map((item) => {
            const isPositive = item.changePercent > 0;
            const barWidth = Math.min(100, (Math.abs(item.changePercent) / 2.5) * 100);

            return (
              <div key={item.category} className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-lg border border-slate-100 dark:border-slate-800/60">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {item.category}
                  </span>
                  <span
                    className={`font-mono font-bold flex items-center gap-1 tabular-nums ${
                      isPositive
                        ? item.changePercent > 1.5
                          ? 'text-rose-600 dark:text-rose-400'
                          : 'text-amber-600 dark:text-amber-400'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {isPositive ? `+${item.changePercent.toFixed(2)}%` : `${item.changePercent.toFixed(2)}%`}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${barWidth}%` }}
                    className={`h-full rounded-full transition-all duration-700 ${
                      isPositive
                        ? item.changePercent > 1.5
                          ? 'bg-rose-500'
                          : 'bg-amber-500'
                        : 'bg-emerald-500'
                    }`}
                  />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* TP.HCM Government Intervention Box */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-blue-50/70 to-indigo-50/40 dark:from-slate-800/40 dark:to-slate-900/40 border border-blue-100 dark:border-blue-900/40 rounded-xl p-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300 mb-2">
              <PackageCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Chủ động chuẩn bị nguồn hàng tại TP. Hồ Chí Minh</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Theo Cổng TTĐT Chính phủ (13/01/2025), các doanh nghiệp đã chuẩn bị lượng hàng thiết yếu phục vụ Tết trị giá <strong>hơn 8.000 tỷ đồng</strong> để bình ổn giá cả:
            </p>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/60 shadow-2xs">
                <span className="text-slate-400 text-[11px] block">Gạo lương thực:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm tabular-nums">Gần 8.000 tấn</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/60 shadow-2xs">
                <span className="text-slate-400 text-[11px] block">Thịt gia súc:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm tabular-nums">5.000 tấn</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/60 shadow-2xs">
                <span className="text-slate-400 text-[11px] block">Thịt gia cầm:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm tabular-nums">5.500 tấn</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700/60 shadow-2xs">
                <span className="text-slate-400 text-[11px] block">Rau củ quả:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm tabular-nums">10.000 tấn</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-blue-200/50 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
            <strong>Ý nghĩa kinh tế:</strong> Nguồn cung dồi dào hạn chế tình trạng thiếu hàng và sốt giá đột biến, thể hiện sự vận dụng quy luật cung - cầu để ổn định an sinh.
          </div>
        </div>
      </div>
    </div>
  );
};
