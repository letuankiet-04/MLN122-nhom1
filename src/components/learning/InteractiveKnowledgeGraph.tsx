import React, { useState } from 'react';
import { Network, ArrowRight, CheckCircle, Info, Sparkles } from 'lucide-react';

interface LawNode {
  id: string;
  name: string;
  role: string;
  shortDesc: string;
  coffeeExample: string;
  connections: {
    targetId: string;
    relationship: string;
  }[];
}

const LAWS: LawNode[] = [
  {
    id: 'law-value',
    name: 'Quy luật Giá trị',
    role: 'Nền tảng chi phí & Hao phí LĐXH cần thiết',
    shortDesc: 'Quy luật cơ bản chi phối sản xuất và trao đổi theo hao phí LĐXH cần thiết, thúc đẩy tiết kiệm và tăng năng suất.',
    coffeeExample: 'Khi giá cà phê tăng, nông dân đầu tư kỹ thuật canh tác bền vững (SC) để giảm hao phí cá biệt trên 1 kg cà phê, đạt năng suất 3.215,77 kg/ha vượt trội.',
    connections: [
      { targetId: 'law-supply-demand', relationship: 'Giá trị là trục mà giá cả thị trường xoay quanh theo cung cầu' },
      { targetId: 'law-competition', relationship: 'Tạo động lực cạnh tranh kỹ thuật để hạ giá thành cá biệt dưới giá trị xã hội' },
      { targetId: 'law-money', relationship: 'Giá trị hàng hóa được biểu hiện bằng tiền tệ (P × Q)' }
    ]
  },
  {
    id: 'law-supply-demand',
    name: 'Quy luật Cung – Cầu',
    role: 'Tín hiệu giá cả & Cân bằng thị trường',
    shortDesc: 'Phản ánh tương quan giữa người bán và người mua, làm giá cả dao động và định hướng sản xuất kinh doanh.',
    coffeeExample: 'Nhu cầu tiêu dùng cà phê toàn cầu và dịp lễ Tết tăng vọt trong khi nguồn cung chưa đáp ứng kịp, đẩy giá cà phê tăng cao, phát tín hiệu cho thị trường mở rộng.',
    connections: [
      { targetId: 'law-value', relationship: 'Tác động làm giá cả dao động lên xuống quanh giá trị thực tế' },
      { targetId: 'law-competition', relationship: 'Sự khan hiếm hoặc dư thừa quyết định mức độ cạnh tranh giữa người mua và người bán' },
      { targetId: 'law-money', relationship: 'Tổng cầu và tổng cung quyết định tổng lượng giá cả cần thanh toán' }
    ]
  },
  {
    id: 'law-competition',
    name: 'Quy luật Cạnh tranh',
    role: 'Động lực phát triển LLSX & Sàng lọc',
    shortDesc: 'Sự ganh đua giành điều kiện thuận lợi để thu lợi ích kinh tế cao hơn, thúc đẩy đổi mới công nghệ và phân bổ nguồn lực.',
    coffeeExample: 'Các doanh nghiệp cạnh tranh về chất lượng, chứng nhận quốc tế (SC), chế biến sâu và logistics thay vì chỉ cạnh tranh bằng giá thuần túy.',
    connections: [
      { targetId: 'law-value', relationship: 'Thúc đẩy hạ hao phí cá biệt và đào thải người sản xuất kém hiệu quả' },
      { targetId: 'law-supply-demand', relationship: 'Cạnh tranh giữa các người bán làm tăng cung; cạnh tranh giữa người mua đẩy giá' },
      { targetId: 'law-money', relationship: 'Dòng vốn và tín dụng được chuyển dịch vào các doanh nghiệp cạnh tranh thắng thế' }
    ]
  },
  {
    id: 'law-money',
    name: 'Quy luật Lưu thông tiền tệ',
    role: 'Môi giới giao dịch & Ổn định sức mua',
    shortDesc: 'Xác định lượng tiền cần thiết M = (P × Q) / V để hàng hóa lưu thông trơn tru mà không gây sốt giá hay ách tắc thanh toán.',
    coffeeExample: 'Toàn bộ chuỗi mua bán phân bón, thu mua cà phê nhân xô tại rẫy và thanh toán hợp đồng xuất khẩu đều được hiện thực hóa qua tiền tệ và chuyển khoản ngân hàng.',
    connections: [
      { targetId: 'law-value', relationship: 'Tiền là thước đo giá trị và phương tiện lưu thông của giá trị hàng hóa' },
      { targetId: 'law-supply-demand', relationship: 'Cung tiền M2 ảnh hưởng trực tiếp đến mức giá chung P và sức mua của người tiêu dùng' },
      { targetId: 'law-competition', relationship: 'Hệ thống thanh toán số (QR, Fintech) tạo lợi thế cạnh tranh tốc độ cho doanh nghiệp' }
    ]
  }
];

export const InteractiveKnowledgeGraph: React.FC = () => {
  const [selectedLawId, setSelectedLawId] = useState<string>('law-value');
  const selectedLaw = LAWS.find((l) => l.id === selectedLawId) || LAWS[0];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-6 shadow-sm my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase">
              Hệ thống tương hỗ · Mục 3 PDF
            </span>
          </div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Interactive Knowledge Graph: Mối quan hệ tương hỗ giữa 4 quy luật
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Nhấp vào từng quy luật để xem các tuyến liên kết tương tác và chuỗi ví dụ thực tế về thị trường cà phê Việt Nam.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        {/* 4 Interactive Nodes */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
          {LAWS.map((law) => {
            const isSelected = law.id === selectedLawId;
            return (
              <button
                key={law.id}
                onClick={() => setSelectedLawId(law.id)}
                className={`text-left p-3.5 rounded-xl border transition-all text-xs ${
                  isSelected
                    ? 'border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {law.name}
                  </span>
                  {isSelected && (
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      Đang chọn <ArrowRight className="w-3 h-3" />
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-medium text-indigo-700 dark:text-indigo-300 mb-1">
                  {law.role}
                </div>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                  {law.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Law Details & Relationships Panel */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-50 dark:bg-slate-950/40 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                {selectedLaw.name}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{selectedLaw.role}</span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              {selectedLaw.shortDesc}
            </p>

            {/* Coffee Industry Example Walkthrough */}
            <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-lg mb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Ví dụ xuyên suốt thị trường cà phê (PDF Trang 10):</span>
              </div>
              <p className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed">
                {selectedLaw.coffeeExample}
              </p>
            </div>

            {/* Relationship Lines */}
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              Tác động tương hỗ tới các quy luật khác:
            </span>
            <div className="space-y-2">
              {selectedLaw.connections.map((conn) => {
                const target = LAWS.find((l) => l.id === conn.targetId);
                return (
                  <div
                    key={conn.targetId}
                    className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800 text-xs flex items-start gap-2 shadow-2xs"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        Với {target?.name}:
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-normal">
                        {conn.relationship}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>
              Bốn quy luật hoạt động như một chỉnh thể thống nhất, chi phối mọi quyết định của người sản xuất, người tiêu dùng và Nhà nước.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
