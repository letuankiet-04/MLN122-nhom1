import React, { useState } from 'react';
import { ECOMMERCE_METRICS } from '../../data/lessonsData';
import { ExternalLink, TrendingUp, ShoppingBag, Video, ShieldCheck } from 'lucide-react';

export const EcommerceCompetitionChart: React.FC<{ onOpenPdf?: (page: number) => void }> = ({ onOpenPdf }) => {
  const [activeTab, setActiveTab] = useState<'market_share' | 'growth'>('market_share');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
              Thực tế cạnh tranh TMĐT · Năm 2024
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <button
              onClick={() => onOpenPdf?.(7)}
              className="text-xs text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 transition-colors"
            >
              PDF Trang 7-8 <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Cạnh tranh giữa Shopee và TikTok Shop tại Việt Nam
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Nguồn: Báo cáo YouNet ECI được VCCI dẫn lại (2025) · Tổng GMV 4 sàn đạt 13,82 tỷ USD
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg self-start md:self-auto">
          <button
            onClick={() => setActiveTab('market_share')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'market_share'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Thị phần & GMV 2024
          </button>
          <button
            onClick={() => setActiveTab('growth')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'growth'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Tốc độ tăng trưởng GMV (%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
        {/* Dynamic Comparison Visualizer */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/40 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300 mb-6">
            <span>{activeTab === 'market_share' ? 'So sánh Thị phần GMV (%)' : 'Tốc độ tăng trưởng so với năm 2023 (%)'}</span>
            <span className="text-slate-400 text-[11px]">Đơn vị: %</span>
          </div>

          <div className="grid grid-cols-2 gap-8 items-end h-48 px-6 pb-2 border-b border-slate-200 dark:border-slate-800">
            {/* Shopee */}
            <div className="flex flex-col items-center h-full justify-end group">
              <div className="mb-2 text-center">
                <span className="text-sm font-bold text-orange-600 dark:text-orange-400 block tabular-nums">
                  {activeTab === 'market_share' ? '66,7%' : '+41%'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {activeTab === 'market_share' ? '9,3 tỷ USD' : 'Ổn định vị thế'}
                </span>
              </div>
              <div
                style={{
                  height: activeTab === 'market_share' ? '66.7%' : '41%'
                }}
                className="w-full max-w-[90px] bg-gradient-to-t from-orange-600 to-amber-500 rounded-t-lg transition-all duration-500 shadow-sm relative group-hover:brightness-110 flex items-center justify-center"
              >
                <ShoppingBag className="w-5 h-5 text-white/80" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2.5">Shopee</span>
            </div>

            {/* TikTok Shop */}
            <div className="flex flex-col items-center h-full justify-end group">
              <div className="mb-2 text-center">
                <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400 block tabular-nums">
                  {activeTab === 'market_share' ? '26,9%' : '+99%'}
                </span>
                <span className="text-[11px] text-slate-400 block">
                  {activeTab === 'market_share' ? '3,8 tỷ USD' : 'Tăng gấp gần 2 lần'}
                </span>
              </div>
              <div
                style={{
                  height: activeTab === 'market_share' ? '26.9%' : '99%'
                }}
                className="w-full max-w-[90px] bg-gradient-to-t from-cyan-600 to-blue-500 rounded-t-lg transition-all duration-500 shadow-sm relative group-hover:brightness-110 flex items-center justify-center"
              >
                <Video className="w-5 h-5 text-white/80" />
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-2.5">TikTok Shop</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 px-2">
            <span>Shopee giữ vững thị phần chi phối</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold font-mono">
              TikTok Shop tăng tốc thần tốc 99%
            </span>
          </div>
        </div>

        {/* Detailed Insights & Legal Framework */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-800">
            <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Động lực đổi mới sáng tạo
            </h5>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              TikTok Shop phát triển hình thức mua hàng gắn với video ngắn và livestream, tạo sức ép đổi mới trực tiếp lên Shopee. Cạnh tranh thúc đẩy cả hai nâng cấp logistics, trải nghiệm mua sắm và chính sách trợ giá cho người tiêu dùng.
            </p>
          </div>

          <div className="p-3.5 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-lg">
            <h5 className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Tuân thủ Luật Cạnh tranh số 23/2018/QH14
            </h5>
            <p className="text-[11px] text-amber-900 dark:text-amber-300/90 leading-relaxed">
              Cạnh tranh phải lành mạnh, minh bạch. Luật nghiêm cấm các hành vi cung cấp thông tin không trung thực về đối thủ nhằm gây thiệt hại hoặc trục lợi bất chính, bảo vệ quyền lợi người tiêu dùng và nền kinh tế số.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
