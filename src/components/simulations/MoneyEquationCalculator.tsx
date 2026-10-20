import React, { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import { Calculator, ArrowRight, Sparkles, RefreshCcw, Info } from 'lucide-react';

export const MoneyEquationCalculator: React.FC = () => {
  const [price, setPrice] = useState<number>(2.5); // P (triệu đồng/sản phẩm)
  const [quantity, setQuantity] = useState<number>(400); // Q (triệu sản phẩm)
  const [velocity, setVelocity] = useState<number>(5.0); // V (vòng quay tiền tệ/năm)

  const formulaContainerRef = useRef<HTMLDivElement>(null);

  // Compute
  const totalGoodsValue = price * quantity; // P * Q (nghìn tỷ đồng)
  const moneyNeeded = velocity > 0 ? totalGoodsValue / velocity : 0; // M (nghìn tỷ đồng)

  useEffect(() => {
    if (formulaContainerRef.current) {
      try {
        katex.render(
          `M = \\frac{P \\times Q}{V}`,
          formulaContainerRef.current,
          { displayMode: true, throwOnError: false }
        );
      } catch (err) {
        console.error('KaTeX error:', err);
      }
    }
  }, []);

  const handleApplyPreset = (preset: 'cashless' | 'growth' | 'inflation') => {
    switch (preset) {
      case 'cashless':
        setVelocity(7.5); // QR and e-wallets increase V
        break;
      case 'growth':
        setQuantity(450); // Production expansion Q
        break;
      case 'inflation':
        setPrice(3.2); // Price increase P
        break;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
              Công cụ tính toán tương tác · KaTeX Engine
            </span>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Tính lượng tiền cần thiết cho lưu thông (Công thức M = (P × Q)/V)
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Nhập các thông số thực tế để xem lượng tiền tệ tương ứng cần thiết phục vụ chu chuyển hàng hóa.
          </p>
        </div>

        {/* Preset Experiments */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => { setPrice(2.5); setQuantity(400); setVelocity(5.0); }}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
          >
            Mặc định
          </button>
          <button
            onClick={() => handleApplyPreset('cashless')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-100 transition-colors"
          >
            Thanh toán QR (V tăng lên 7,5)
          </button>
          <button
            onClick={() => handleApplyPreset('growth')}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 transition-colors"
          >
            GDP mở rộng (Q tăng 450)
          </button>
        </div>
      </div>

      {/* KaTeX Math Formula Display */}
      <div className="my-5 p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200/60 dark:border-slate-800 flex flex-col items-center justify-center">
        <div ref={formulaContainerRef} className="text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-semibold" />
        <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
          <span><strong className="text-slate-800 dark:text-slate-200">M:</strong> Lượng tiền cần thiết</span>
          <span>·</span>
          <span><strong className="text-slate-800 dark:text-slate-200">P:</strong> Mức giá bình quân</span>
          <span>·</span>
          <span><strong className="text-slate-800 dark:text-slate-200">Q:</strong> Khối lượng hàng hóa</span>
          <span>·</span>
          <span><strong className="text-slate-800 dark:text-slate-200">V:</strong> Tốc độ lưu thông tiền tệ</span>
        </div>
      </div>

      {/* Interactive Controls & Computation breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sliders / Inputs */}
        <div className="lg:col-span-6 space-y-4">
          {/* P input */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-lg border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-semibold mb-1">
              <label htmlFor="price-p" className="text-slate-700 dark:text-slate-300">
                Mức giá cả bình quân (P):
              </label>
              <span className="font-mono text-blue-600 dark:text-blue-400 font-bold tabular-nums">
                {price.toFixed(2)} triệu đ/đơn vị
              </span>
            </div>
            <input
              id="price-p"
              type="range"
              min="1.0"
              max="5.0"
              step="0.1"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Q input */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-lg border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-semibold mb-1">
              <label htmlFor="quantity-q" className="text-slate-700 dark:text-slate-300">
                Tổng khối lượng hàng hóa, dịch vụ (Q):
              </label>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold tabular-nums">
                {quantity.toLocaleString()} triệu đơn vị
              </span>
            </div>
            <input
              id="quantity-q"
              type="range"
              min="100"
              max="800"
              step="10"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* V input */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950/40 rounded-lg border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-semibold mb-1">
              <label htmlFor="velocity-v" className="text-slate-700 dark:text-slate-300">
                Tốc độ lưu thông bình quân (V):
              </label>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">
                {velocity.toFixed(1)} vòng/năm
              </span>
            </div>
            <input
              id="velocity-v"
              type="range"
              min="1.5"
              max="10.0"
              step="0.5"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Step-by-step Solution Card */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-50 to-emerald-50/30 dark:from-slate-950/60 dark:to-emerald-950/20 border border-slate-200 dark:border-slate-800 rounded-xl p-5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
            Các bước giải và tính toán chi tiết:
          </span>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-[11px] shrink-0">
                1
              </span>
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Tính tổng giá cả hàng hóa, dịch vụ lưu thông ($P \\times Q$):
                </span>
                <div className="font-mono text-slate-600 dark:text-slate-300 mt-0.5 tabular-nums">
                  {price.toFixed(2)} × {quantity} = <strong>{totalGoodsValue.toLocaleString('vi-VN')}</strong> nghìn tỷ đồng
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-[11px] shrink-0">
                2
              </span>
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Chia cho tốc độ lưu thông bình quân ($V = {velocity.toFixed(1)}$ vòng):
                </span>
                <div className="font-mono text-slate-600 dark:text-slate-300 mt-0.5 tabular-nums">
                  M = {totalGoodsValue.toLocaleString('vi-VN')} / {velocity.toFixed(1)}
                </div>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200 dark:border-emerald-800/60 mt-3 shadow-2xs">
              <span className="text-[11px] font-semibold text-slate-400 block">
                Kết quả lượng tiền cần thiết (M):
              </span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 tabular-nums">
                {moneyNeeded.toFixed(2)} <span className="text-xs font-normal text-slate-500">nghìn tỷ đồng</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Nếu Ngân hàng Trung ương cung ứng vượt quá mức {moneyNeeded.toFixed(2)} nghìn tỷ này mà hàng hóa không tăng, áp lực lạm phát sẽ xuất hiện.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-1.5 text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-500" />
            <span>
              Công thức khái quát cơ bản từ trang 8 PDF. Trong thực tế, công thức đầy đủ cần cộng trừ thêm bán chịu, thanh toán bù trừ và các khoản đến hạn thanh toán.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
