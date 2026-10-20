import React from 'react';
import { MONEY_METRICS } from '../../data/lessonsData';
import { Landmark, ArrowUpRight, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';

export const MoneyCirculationChart: React.FC<{ onOpenPdf?: (page: number) => void }> = ({ onOpenPdf }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
              Chỉ số kinh tế vĩ mô · Năm 2025
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <button
              onClick={() => onOpenPdf?.(9)}
              className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 transition-colors"
            >
              PDF Trang 9-10 <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Quy luật lưu thông tiền tệ trong nền kinh tế Việt Nam
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Mối quan hệ giữa lượng tiền, tín dụng, giá cả và tăng trưởng kinh tế (Nguồn: Cục Thống kê Quốc gia, 2025/2026)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
        {MONEY_METRICS.map((item, idx) => {
          const colors = [
            'from-blue-600 to-indigo-500 text-blue-600 dark:text-blue-400',
            'from-emerald-600 to-teal-500 text-emerald-600 dark:text-emerald-400',
            'from-amber-600 to-orange-500 text-amber-600 dark:text-amber-400',
            'from-purple-600 to-pink-500 text-purple-600 dark:text-purple-400'
          ];
          const color = colors[idx % colors.length];

          return (
            <div
              key={item.indicator}
              className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block line-clamp-1">
                  {item.indicator}
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl font-black font-mono text-slate-900 dark:text-slate-100 tabular-nums">
                    +{item.valuePercent.toFixed(2)}%
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {item.targetOrComparison}
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                {item.description}
              </div>
            </div>
          );
        })}
      </div>

      {/* Synthesis Analytical Box */}
      <div className="mt-5 p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong className="text-slate-900 dark:text-slate-100">Kết luận học thuật theo PDF (trang 10): </strong>
            Lượng tiền (M2 +14,98%) và tín dụng (+17,65%) tăng cao nhằm hỗ trợ vốn cho sản xuất. Nhờ GDP tăng trưởng mạnh mẽ <strong>+8,02%</strong>, hàng hóa dịch vụ dồi dào đối ứng đã giúp chỉ số CPI giữ ở mức thấp <strong>3,31%</strong> (thấp hơn 3,63% của năm 2024), đạt mục tiêu kiểm soát lạm phát và ổn định sức mua đồng tiền.
          </div>
        </div>
      </div>
    </div>
  );
};
