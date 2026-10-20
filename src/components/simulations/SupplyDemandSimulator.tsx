import React, { useState } from 'react';
import { Sliders, RefreshCw, AlertCircle, ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';

export const SupplyDemandSimulator: React.FC = () => {
  // Shifts: -50 to +50
  const [demandShift, setDemandShift] = useState<number>(20);
  const [supplyShift, setSupplyShift] = useState<number>(0);

  // Base equations:
  // Demand curve: P = 100 + demandShift - 0.8 * Q
  // Supply curve: P = 20 - supplyShift + 0.8 * Q
  // Equilibrium: 100 + D - 0.8*Q = 20 - S + 0.8*Q
  // 1.6*Q = 80 + D + S
  // Q* = (80 + D + S) / 1.6
  // P* = 20 - S + 0.8 * Q*

  const qEquilibrium = Math.max(10, Math.min(90, (80 + demandShift + supplyShift) / 1.6));
  const pEquilibrium = Math.max(10, Math.min(95, 20 - supplyShift + 0.8 * qEquilibrium));

  const baseP = 50;
  const baseQ = 50;
  const priceChangePercent = ((pEquilibrium - baseP) / baseP) * 100;
  const quantityChangePercent = ((qEquilibrium - baseQ) / baseQ) * 100;

  // Preset scenarios
  const applyScenario = (preset: 'normal' | 'tet-demand' | 'spring-harvest' | 'hcm-intervention') => {
    switch (preset) {
      case 'normal':
        setDemandShift(0);
        setSupplyShift(0);
        break;
      case 'tet-demand':
        setDemandShift(35);
        setSupplyShift(0);
        break;
      case 'spring-harvest':
        setDemandShift(10);
        setSupplyShift(35);
        break;
      case 'hcm-intervention':
        setDemandShift(35);
        setSupplyShift(30);
        break;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-purple-600 dark:text-purple-400 uppercase">
              Mô phỏng tương tác · Cơ chế cân bằng thị trường
            </span>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
            Mô phỏng tương tác Đồ thị Cung – Cầu (Supply & Demand)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Di chuyển các thanh trượt để quan sát phản ứng tức thì của điểm cân bằng giá cả ($P^*$) và sản lượng ($Q^*$).
          </p>
        </div>

        {/* Preset Scenarios */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => applyScenario('normal')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            Trạng thái chuẩn
          </button>
          <button
            onClick={() => applyScenario('tet-demand')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 hover:bg-red-100 transition-colors"
          >
            Tết: Cầu thịt lợn tăng
          </button>
          <button
            onClick={() => applyScenario('spring-harvest')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
          >
            Đông Xuân: Rau dồi dào
          </button>
          <button
            onClick={() => applyScenario('hcm-intervention')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors"
          >
            TP.HCM bơm 8.000 tỷ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        {/* SVG Dynamic Coordinate Plane */}
        <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800/80 relative">
          <div className="flex justify-between items-center text-xs text-slate-500 mb-2 px-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Đồ thị P-Q (Price vs Quantity)</span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                <span className="w-2.5 h-0.5 bg-blue-600 dark:bg-blue-400 inline-block"></span> Đường Cầu (D)
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2.5 h-0.5 bg-emerald-600 dark:bg-emerald-400 inline-block"></span> Đường Cung (S)
              </span>
            </div>
          </div>

          <div className="w-full aspect-[4/3] max-h-[320px] relative">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              {/* Grid Lines */}
              <line x1="12" y1="10" x2="12" y2="88" stroke="currentColor" strokeWidth="0.8" className="text-slate-300 dark:text-slate-700" />
              <line x1="12" y1="88" x2="95" y2="88" stroke="currentColor" strokeWidth="0.8" className="text-slate-300 dark:text-slate-700" />

              {/* Axis Labels */}
              <text x="6" y="14" fill="currentColor" className="text-[4px] font-bold text-slate-500">Giá (P)</text>
              <text x="90" y="93" fill="currentColor" className="text-[4px] font-bold text-slate-500">Lượng (Q)</text>

              {/* Demand Curve (Downward sloping): starts top-left, ends bottom-right */}
              {/* Map: x in [15, 90] => y = (100 - (100 + D - 0.8*x)) */}
              <line
                x1="18"
                y1={Math.max(12, Math.min(84, 100 - (100 + demandShift - 0.8 * 18)))}
                x2="88"
                y2={Math.max(12, Math.min(84, 100 - (100 + demandShift - 0.8 * 88)))}
                stroke="#2563EB"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              <text x="89" y={Math.max(14, Math.min(84, 100 - (100 + demandShift - 0.8 * 88)))} fill="#2563EB" className="text-[4px] font-bold">
                D
              </text>

              {/* Supply Curve (Upward sloping): starts bottom-left, ends top-right */}
              <line
                x1="18"
                y1={Math.max(12, Math.min(84, 100 - (20 - supplyShift + 0.8 * 18)))}
                x2="88"
                y2={Math.max(12, Math.min(84, 100 - (20 - supplyShift + 0.8 * 88)))}
                stroke="#059669"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="transition-all duration-300"
              />
              <text x="89" y={Math.max(14, Math.min(84, 100 - (20 - supplyShift + 0.8 * 88)))} fill="#059669" className="text-[4px] font-bold">
                S
              </text>

              {/* Dashed projections to axes */}
              {/* Coordinate mapping: x = 12 + (qEquilibrium/100) * 80, y = 88 - (pEquilibrium/100) * 75 */}
              {(() => {
                const cx = 12 + (qEquilibrium / 100) * 78;
                const cy = 88 - (pEquilibrium / 100) * 75;
                return (
                  <>
                    <line x1="12" y1={cy} x2={cx} y2={cy} stroke="#7C3AED" strokeWidth="0.75" strokeDasharray="1.5,1.5" />
                    <line x1={cx} y1={cy} x2={cx} y2="88" stroke="#7C3AED" strokeWidth="0.75" strokeDasharray="1.5,1.5" />
                    
                    {/* Equilibrium Point */}
                    <circle cx={cx} cy={cy} r="2.8" fill="#7C3AED" className="animate-pulse" />
                    <circle cx={cx} cy={cy} r="1.4" fill="#FFFFFF" />
                    <text x={cx + 3} y={cy - 2} fill="#7C3AED" className="text-[4.5px] font-bold">
                      E* (P*, Q*)
                    </text>
                  </>
                );
              })()}
            </svg>
          </div>

          <div className="mt-2 text-center text-[11px] text-slate-400">
            * Minh họa giáo dục nguyên lý cân bằng Walrasian. Trục tung P (Giá cả), trục hoành Q (Sản lượng).
          </div>
        </div>

        {/* Sliders and Market Readout */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Demand Slider */}
            <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-lg">
              <div className="flex justify-between items-center text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">
                <label htmlFor="demand-range">Dịch chuyển Đường Cầu (Demand Shift):</label>
                <span className="font-mono tabular-nums">{demandShift > 0 ? `+${demandShift}` : demandShift}%</span>
              </div>
              <input
                id="demand-range"
                type="range"
                min="-30"
                max="40"
                value={demandShift}
                onChange={(e) => setDemandShift(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Giảm sức mua</span>
                <span>Chuẩn</span>
                <span>Tết / Nhu cầu tăng vọt</span>
              </div>
            </div>

            {/* Supply Slider */}
            <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-lg">
              <div className="flex justify-between items-center text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-1">
                <label htmlFor="supply-range">Dịch chuyển Đường Cung (Supply Shift):</label>
                <span className="font-mono tabular-nums">{supplyShift > 0 ? `+${supplyShift}` : supplyShift}%</span>
              </div>
              <input
                id="supply-range"
                type="range"
                min="-30"
                max="40"
                value={supplyShift}
                onChange={(e) => setSupplyShift(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Thiếu hụt nguồn cung</span>
                <span>Chuẩn</span>
                <span>Vụ mùa bội thu / Dự trữ lớn</span>
              </div>
            </div>
          </div>

          {/* Equilibrium Indicators */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
              <div className="text-slate-400 text-[11px]">Giá cân bằng P*:</div>
              <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 mt-0.5 tabular-nums">
                {pEquilibrium.toFixed(1)} đ.v
                {priceChangePercent > 1 ? (
                  <span className="text-[10px] text-red-500 font-semibold flex items-center">
                    <ArrowUpRight className="w-3 h-3" /> +{priceChangePercent.toFixed(0)}%
                  </span>
                ) : priceChangePercent < -1 ? (
                  <span className="text-[10px] text-emerald-500 font-semibold flex items-center">
                    <ArrowDownRight className="w-3 h-3" /> {priceChangePercent.toFixed(0)}%
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">Ổn định</span>
                )}
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
              <div className="text-slate-400 text-[11px]">Sản lượng cân bằng Q*:</div>
              <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 mt-0.5 tabular-nums">
                {qEquilibrium.toFixed(1)} đ.v
                {quantityChangePercent > 1 ? (
                  <span className="text-[10px] text-blue-500 font-semibold flex items-center">
                    <ArrowUpRight className="w-3 h-3" /> +{quantityChangePercent.toFixed(0)}%
                  </span>
                ) : quantityChangePercent < -1 ? (
                  <span className="text-[10px] text-amber-500 font-semibold flex items-center">
                    <ArrowDownRight className="w-3 h-3" /> {quantityChangePercent.toFixed(0)}%
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">Chuẩn</span>
                )}
              </div>
            </div>
          </div>

          {/* Educational Note */}
          <div className="p-3 bg-slate-100/70 dark:bg-slate-800/40 rounded-lg text-xs text-slate-600 dark:text-slate-400 leading-relaxed border border-slate-200/50 dark:border-slate-700/50">
            <span className="font-semibold text-slate-800 dark:text-slate-200">Nhận xét quy luật: </span>
            {priceChangePercent > 5 ? (
              <span>Cầu vượt trội so với cung tạo áp lực đẩy giá cả tăng cao (như thịt lợn dịp Tết).</span>
            ) : priceChangePercent < -5 ? (
              <span>Nguồn cung dồi dào vượt nhu cầu tạo áp lực hạ giá thị trường (như rau củ vụ đông xuân).</span>
            ) : (
              <span>Cung và cầu cân bằng hoặc Nhà nước can thiệp bơm nguồn hàng dự trữ giúp giữ mặt bằng giá ổn định.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
