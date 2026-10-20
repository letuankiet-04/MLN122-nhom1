import React, { useState } from 'react';
import { Briefcase, CheckCircle2, AlertTriangle, XCircle, ArrowRight, Lightbulb } from 'lucide-react';

interface StrategyOption {
  id: string;
  title: string;
  action: string;
  cost: string;
  economicFeedback: {
    result: 'success' | 'warning' | 'danger';
    headline: string;
    analysis: string;
    lawsInvolved: string[];
  };
}

const STRATEGIES: StrategyOption[] = [
  {
    id: 'strategy-tech',
    title: 'Cải tiến kỹ thuật & Đầu tư công nghệ (Shoppertainment / AI)',
    action: 'Đầu tư phát triển nền tảng phát video ngắn, thuật toán đề xuất thông minh và tự động hóa kho vận.',
    cost: 'Chi phí đầu tư ban đầu cao, đòi hỏi đội ngũ chuyên môn',
    economicFeedback: {
      result: 'success',
      headline: 'Tối ưu hóa năng suất và củng cố lợi thế cạnh tranh dài hạn',
      analysis: 'Vận dụng đúng Quy luật giá trị (hạ hao phí lao động cá biệt trên một đơn vị đơn hàng thông qua công nghệ) và Quy luật cạnh tranh (thu hút người dùng bằng trải nghiệm vượt trội). Giống như TikTok Shop đạt mức tăng trưởng 99% trong năm 2024 nhờ đổi mới hình thức mua sắm.',
      lawsInvolved: ['Quy luật giá trị (kích thích cải tiến kỹ thuật)', 'Quy luật cạnh tranh (phát triển LLSX)']
    }
  },
  {
    id: 'strategy-quality',
    title: 'Nâng cao chất lượng & Chứng nhận bền vững (Tiêu chuẩn SC)',
    action: 'Liên kết chặt chẽ với nhà sản xuất để chuẩn hóa nguồn gốc xuất xứ, kiểm định an toàn và dán nhãn chất lượng cao.',
    cost: 'Chi phí đầu vào tăng 8-10% cho kiểm định và giám sát',
    economicFeedback: {
      result: 'success',
      headline: 'Gia tăng giá trị thặng dư và xây dựng uy tín thương hiệu vững chắc',
      analysis: 'Tương tự nghiên cứu cà phê 2019: Nhóm hộ có chứng nhận SC tuy chi phí đầu vào cao hơn (43,982 so với 40,466 triệu đ/ha) nhưng giá bán cao hơn (+5,1%) và lợi nhuận gộp vượt trội +20,4% nhờ người tiêu dùng sẵn sàng trả giá cao cho chất lượng đáng tin cậy.',
      lawsInvolved: ['Quy luật giá trị (tăng giá trị sản phẩm)', 'Quy luật cạnh tranh (cạnh tranh bằng chất lượng)']
    }
  },
  {
    id: 'strategy-price-war',
    title: 'Cuộc chiến giảm giá sâu & Trợ cấp voucher ồ ạt',
    action: 'Cắt giảm tối đa biên lợi nhuận, tung mã giảm giá 50-70% để lôi kéo khách hàng trong thời gian ngắn.',
    cost: 'Đốt vốn lớn, biên lợi nhuận teo tóp, phụ thuộc vào dòng tiền huy động',
    economicFeedback: {
      result: 'warning',
      headline: 'Thu hút lượng lớn khách hàng ban đầu nhưng tiềm ẩn nguy cơ kiệt quệ tài chính',
      analysis: 'Quy luật cung - cầu: Giá giảm kích thích lượng cầu tức thời. Tuy nhiên, nếu giá bán thấp hơn giá trị cá biệt trong thời gian dài mà không có giải pháp giảm chi phí thực sự, doanh nghiệp sẽ rơi vào nhóm bị phân hóa và đào thải theo Quy luật giá trị.',
      lawsInvolved: ['Quy luật cung – cầu (giá giảm tăng lượng mua)', 'Quy luật giá trị (nguy cơ thua lỗ do dưới chi phí)']
    }
  },
  {
    id: 'strategy-unfair',
    title: 'Tung tin thất thiệt, bôi nhọ đối thủ trên mạng xã hội',
    action: 'Thuê tài khoản ẩn danh để gieo rắc tin đồn tiêu cực về chất lượng dịch vụ của nền tảng đối thủ.',
    cost: 'Chi phí truyền thông đen, nguy cơ đối mặt chế tài pháp lý nghiêm khắc',
    economicFeedback: {
      result: 'danger',
      headline: 'Vi phạm nghiêm trọng pháp luật và bị đào thải khỏi thị trường',
      analysis: 'Vi phạm trực tiếp Điều 45 Luật Cạnh tranh số 23/2018/QH14 về hành vi cạnh tranh không lành mạnh (cung cấp thông tin không trung thực về doanh nghiệp khác). Doanh nghiệp sẽ bị xử phạt hành chính, bồi thường thiệt hại và mất hoàn toàn uy tín với khách hàng.',
      lawsInvolved: ['Quy luật cạnh tranh (mặt trái cần Nhà nước quản lý)', 'Luật Cạnh tranh số 23/2018/QH14']
    }
  }
];

export const BusinessStrategySimulator: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('strategy-tech');
  const selected = STRATEGIES.find((s) => s.id === selectedId) || STRATEGIES[0];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm my-6">
      <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
            Tình huống tương tác · Nhập vai nhà quản trị
          </span>
        </div>
        <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Bạn là nhà quản lý doanh nghiệp: Lựa chọn chiến lược cạnh tranh
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Đặt mình vào vị trí giám đốc điều hành nền tảng kinh doanh để nhận phản hồi học thuật dựa trên 4 quy luật kinh tế.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        {/* Choices List */}
        <div className="lg:col-span-6 space-y-2.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">
            Chọn 1 chiến lược kinh doanh bạn muốn thực thi:
          </label>
          {STRATEGIES.map((strategy) => {
            const isSelected = strategy.id === selectedId;
            return (
              <button
                key={strategy.id}
                onClick={() => setSelectedId(strategy.id)}
                className={`w-full text-left p-3.5 rounded-lg border transition-all text-xs ${
                  isSelected
                    ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/20'
                }`}
              >
                <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                  <span>{strategy.title}</span>
                  {isSelected && <ArrowRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {strategy.action}
                </p>
                <div className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                  <span>Đặc điểm: {strategy.cost}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 dark:bg-slate-950/40 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {selected.economicFeedback.result === 'success' && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-4 h-4" /> Chiến lược khuyến nghị
                </div>
              )}
              {selected.economicFeedback.result === 'warning' && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md">
                  <AlertTriangle className="w-4 h-4" /> Hiệu quả ngắn hạn · Rủi ro cao
                </div>
              )}
              {selected.economicFeedback.result === 'danger' && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-md">
                  <XCircle className="w-4 h-4" /> Vi phạm pháp luật
                </div>
              )}
            </div>

            <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2 mb-2">
              {selected.economicFeedback.headline}
            </h5>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {selected.economicFeedback.analysis}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
              Cơ sở quy luật kinh tế liên quan:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selected.economicFeedback.lawsInvolved.map((law) => (
                <span
                  key={law}
                  className="px-2 py-0.5 text-[11px] rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                >
                  {law}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
