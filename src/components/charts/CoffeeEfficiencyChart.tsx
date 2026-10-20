import React, { useState } from 'react';
import { COFFEE_METRICS } from '../../data/lessonsData';
import { Info, ExternalLink, TrendingUp, CheckCircle2 } from 'lucide-react';

export const CoffeeEfficiencyChart: React.FC<{ onOpenPdf?: (page: number) => void }> = ({ onOpenPdf }) => {
  const [selectedMetricIndex, setSelectedMetricIndex] = useState<number>(4); // Default to Gross Profit
  const metric = COFFEE_METRICS[selectedMetricIndex];

  const maxVal = Math.max(metric.scValue, metric.nonScValue) * 1.15;
  const scHeightPercent = (metric.scValue / maxVal) * 100;
  const nonScHeightPercent = (metric.nonScValue / maxVal) * 100;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 uppercase">
              Thực nghiệm kinh tế · Nghiên cứu 2019
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <button
              onClick={() => onOpenPdf?.(2)}
              className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 transition-colors"
            >
              PDF Trang 2-3 <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            So sánh hiệu quả sản xuất cà phê giữa hai nhóm hộ tại Việt Nam
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Nguồn: Tạp chí <em>Economies</em> (2019) · Nguyen Hung Anh et al.
          </p>
        </div>

        {/* Metric Selector Pills */}
        <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-lg">
          {COFFEE_METRICS.map((m, idx) => (
            <button
              key={m.metric}
              onClick={() => setSelectedMetricIndex(idx)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                selectedMetricIndex === idx
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {m.metric.split(' ')[0]} {m.metric.includes('Lợi nhuận') ? 'Lợi nhuận' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Graphic & Comparison Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
        {/* Dynamic Bar Visualizer */}
        <div className="lg:col-span-7 flex flex-col justify-end bg-slate-50 dark:bg-slate-950/40 rounded-xl p-5 border border-slate-100 dark:border-slate-800/60 min-h-[280px]">
          <div className="text-center mb-4">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {metric.metric} ({metric.unit})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6 items-end h-44 px-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            {/* SC Bar */}
            <div className="flex flex-col items-center h-full justify-end group">
              <div className="mb-2 text-center">
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 block tabular-nums">
                  {metric.scValue.toLocaleString('vi-VN')} {metric.unit}
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  {metric.diffPercent}
                </span>
              </div>
              <div
                style={{ height: `${scHeightPercent}%` }}
                className="w-full max-w-[84px] bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-lg transition-all duration-500 shadow-sm relative group-hover:brightness-110"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
              </div>
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-2 text-center">
                Có chứng nhận (SC)
              </span>
            </div>

            {/* Non-SC Bar */}
            <div className="flex flex-col items-center h-full justify-end group">
              <div className="mb-2 text-center">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block tabular-nums">
                  {metric.nonScValue.toLocaleString('vi-VN')} {metric.unit}
                </span>
                <span className="text-[10px] text-slate-400">Đối chứng</span>
              </div>
              <div
                style={{ height: `${nonScHeightPercent}%` }}
                className="w-full max-w-[84px] bg-gradient-to-t from-amber-600 to-orange-400 rounded-t-lg transition-all duration-500 shadow-sm relative group-hover:brightness-110"
              />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-2 text-center">
                Không chứng nhận (Non-SC)
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 px-2">
            <span>Dữ liệu khảo sát từ các nông hộ trồng cà phê tại Tây Nguyên</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              Chênh lệch: {metric.diffPercent}
            </span>
          </div>
        </div>

        {/* Detailed Insights & Theoretical Link */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Liên hệ với quy luật giá trị:</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {metric.note}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-lg">
              <div className="text-slate-400 text-[11px]">Lợi nhuận gộp SC:</div>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm tabular-nums">
                68,366 <span className="text-[10px] font-normal text-slate-500">tr.đ/ha</span>
              </div>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-lg">
              <div className="text-slate-400 text-[11px]">Chênh lệch ròng:</div>
              <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm tabular-nums">
                +11,603 <span className="text-[10px] font-normal">tr.đ (+20,4%)</span>
              </div>
            </div>
          </div>

          {/* Academic Caution Box */}
          <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-lg flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-normal">
              <strong>Lưu ý từ tài liệu gốc:</strong> Số liệu là bằng chứng thực nghiệm dùng để liên hệ với quy luật giá trị, nhưng <em>chưa đủ để khẳng định riêng quy luật giá trị là nguyên nhân duy nhất tạo ra chênh lệch</em>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
