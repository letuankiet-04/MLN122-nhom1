import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI if key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const SYSTEM_KNOWLEDGE_PROMPT = `Bạn là Trợ lý Học tập AI (AI Study Assistant) chuyên sâu về môn Kinh tế chính trị Mác – Lênin (MLN122), bám sát 100% theo tài liệu học tập PDF "MLN122 - CHAP 2: Phân tích các quy luật cơ bản trong nền kinh tế hàng hóa và ví dụ tác động trong nền kinh tế hiện nay".

CÁC NGUYÊN TẮC BẮT BUỘC:
1. Luôn ưu tiên nội dung tài liệu gốc và TRÍCH DẪN RÕ SỐ TRANG (từ trang 1 đến trang 12).
2. Tóm tắt nội dung 4 quy luật và ví dụ thực tiễn:
   - Quy luật giá trị (Trang 1-4): Sản xuất & trao đổi theo hao phí LĐXH cần thiết; trao đổi ngang giá; 3 tác động (điều tiết SX & lưu thông, kích thích cải tiến kỹ thuật & tăng NSLĐ, lựa chọn tự nhiên & phân hóa người SX). Ví dụ: Nghiên cứu hộ trồng cà phê Việt Nam 2019 (năng suất SC 3.215,77 kg/ha vs non-SC 2.933,25 kg/ha; giá bán 34.820 đ/kg vs 33.140 đ/kg; lợi nhuận SC cao hơn 20,4% đạt 68,366 tr/ha vs 56,763 tr/ha).
   - Quy luật cung - cầu (Trang 4-5): Cung & cầu; cầu > cung giá tăng, cung > cầu giá giảm; 3 tác động (hình thành & biến động giá cả, định hướng quyết định SX-KD, tác động đến tiêu dùng). Ví dụ: Chợ Tết Ất Tỵ 2025 (Ăn uống +0,74%, thực phẩm +0,97%, thịt lợn +2,45%, quả tươi +1,53%, rau giảm -0,48% do nguồn cung dồi dào; TP.HCM chuẩn bị >8.000 tỷ hàng Tết).
   - Quy luật cạnh tranh (Trang 6-8): Ganh đua giữa các chủ thể; tác động tích cực (lực lượng SX, phân bổ nguồn lực, người tiêu dùng) và tiêu cực (cạnh tranh không lành mạnh -> Luật Cạnh tranh 23/2018/QH14). Ví dụ: Shopee (GMV 9,3 tỷ USD, 66,7% thị phần 4 sàn, tăng 41%) vs TikTok Shop (GMV 3,8 tỷ USD, 26,9% thị phần, tăng 99%).
   - Quy luật lưu thông tiền tệ (Trang 8-10): Lượng tiền cần thiết M = (P × Q) / V; 3 tác động (phù hợp nhu cầu giao dịch, quản lý tiền tệ & ổn định sức mua, phương tiện thanh toán điện tử). Ví dụ: Năm 2025 (M2 tăng 14,98%, tín dụng tăng 17,65%, CPI 2025 tăng 3,31% thấp hơn mức 3,63% năm 2024, GDP 2025 tăng 8,02%).
   - Mối quan hệ giữa các quy luật (Trang 10): 4 quy luật cùng tác động tương hỗ; ví dụ thị trường cà phê gắn liền cả 4 quy luật.
3. Nếu nội dung câu trả lời có mở rộng hoặc liên hệ thêm kiến thức ngoài PDF, bạn PHẢI dán nhãn rõ ràng: "[Nội dung hỗ trợ học tập / Kiến thức mở rộng]".
4. Trả lời bằng tiếng Việt chuẩn mực, sư phạm, khích lệ sinh viên, định dạng markdown rõ ràng, không dùng ký hiệu mã hóa cơ học.`;

// API endpoint for AI Tutor
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, context, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Tin nhắn không được để trống.' });
    }

    if (!ai) {
      // Fallback deterministic smart tutor response if API key is not configured yet
      const fallbackResponses: Record<string, string> = {
        explain: `### Giải thích cốt lõi (Trích dẫn: Trang 1-2 PDF)
- **Quy luật giá trị**: Là quy luật kinh tế cơ bản nhất của sản xuất và trao đổi hàng hóa.
- **Nguyên tắc**: Sản xuất và trao đổi phải căn cứ vào *hao phí lao động xã hội cần thiết* chứ không phải lao động cá biệt của từng người.
- **Trao đổi**: Thực hiện theo nguyên tắc *ngang giá* (giá cả xoay quanh giá trị theo tác động của cung - cầu).
- **3 tác động cốt lõi**:
  1. Điều tiết sản xuất và lưu thông hàng hóa.
  2. Kích thích cải tiến kỹ thuật, hợp lý hóa sản xuất và tăng năng suất lao động.
  3. Thực hiện sự lựa chọn tự nhiên và phân hóa người sản xuất.

*(Lưu ý: API Gemini chưa gắn key thực tế, đây là câu trả lời chuẩn từ cơ sở dữ liệu học liệu MLN122)*`,
        compare: `### So sánh mối quan hệ 4 Quy luật (Trích dẫn: Trang 10 PDF)
Bốn quy luật không hoạt động tách biệt mà tác động qua lại chặt chẽ:
1. **Quy luật Giá trị**: Đặt nền móng chi phí, yêu cầu hao phí lao động xã hội cần thiết.
2. **Quy luật Cung - Cầu**: Tác động giá cả xoay quanh giá trị, phát tín hiệu khan hiếm hay dư thừa hàng hóa.
3. **Quy luật Cạnh tranh**: Thúc đẩy các bên tìm kiếm lợi thế công nghệ, chi phí, thị phần và đào thải doanh nghiệp kém hiệu quả.
4. **Quy luật Lưu thông Tiền tệ**: Xác định lượng tiền $M = \\frac{P \\times Q}{V}$ cần thiết để phục vụ toàn bộ chu chuyển hàng hóa đó.

*Ví dụ chuỗi liên kết thị trường cà phê*: Nhu cầu tăng $\\to$ giá tăng (Cung - Cầu) $\\to$ mở rộng diện tích & nâng cao năng suất (Giá trị) $\\to$ cạnh tranh chất lượng & chứng nhận SC (Cạnh tranh) $\\to$ các giao dịch được thanh toán bằng tiền tệ (Lưu thông tiền tệ).`,
      };

      let selectedFallback = fallbackResponses.explain;
      if (message.toLowerCase().includes('so sánh') || message.toLowerCase().includes('mối quan hệ')) {
        selectedFallback = fallbackResponses.compare;
      }

      return res.json({
        reply: `${selectedFallback}\n\n*Hệ thống trợ lý AI hoạt động ở chế độ cơ sở dữ liệu nội tại được chuẩn hóa từ PDF. Bạn có thể gắn GEMINI_API_KEY trong tệp .env để kích hoạt AI tạo sinh trực tiếp.*`,
        pageCitations: [1, 2, 4, 6, 8, 10],
        isConfigured: false,
      });
    }

    const promptText = `Ngữ cảnh học phần đang xem: ${context || 'Khái quát 4 quy luật kinh tế hàng hóa'}\n\nLịch sử trao đổi gần nhất: ${JSON.stringify(history || [])}\n\nCâu hỏi hoặc yêu cầu của sinh viên: "${message}"`;

    // Timeout after 10 seconds to prevent hanging
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('TIMEOUT')), 10000)
    );

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_KNOWLEDGE_PROMPT,
        temperature: 0.7,
      },
    });

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const reply = response.text || 'Không có phản hồi từ mô hình.';

    // Extract mentioned pages (e.g., "trang 3", "tr. 4")
    const pageMatches = reply.match(/(?:trang|tr\.)\s*(\d+)/gi) || [];
    const pageCitations = Array.from(new Set(pageMatches.map((m) => {
      const num = m.match(/\d+/);
      return num ? parseInt(num[0], 10) : null;
    }).filter((n): n is number => n !== null && n >= 1 && n <= 12)));

    return res.json({
      reply,
      pageCitations,
      isConfigured: true,
    });
  } catch (error: any) {
    console.error('Gemini API Error or Timeout:', error?.message);
    return res.json({
      reply: `### Hướng dẫn học tập theo tài liệu MLN122 (Trích dẫn: Trang 1-12)
- **4 quy luật kinh tế hàng hóa**: Quy luật giá trị (tr. 1-4), Quy luật cung - cầu (tr. 4-5), Quy luật cạnh tranh (tr. 6-8), Quy luật lưu thông tiền tệ (tr. 8-10).
- **Thực tiễn Việt Nam**:
  + Cà phê 2019: Hộ SC đạt năng suất cao hơn 9,6%, lợi nhuận cao hơn 20,4% (tr. 2-3).
  + Tết 2025: Thịt lợn +2,45%, rau quả vụ đông xuân -0,48% (tr. 4-5).
  + TMĐT 2024: Shopee GMV 9,3 tỷ USD vs TikTok Shop 3,8 tỷ USD (+99%) (tr. 7).
  + Vĩ mô 2025: M2 +14,98%, GDP +8,02%, CPI +3,31% (tr. 9).

*(Lưu ý: Phản hồi từ cơ sở dữ liệu học thuật chuẩn hóa của ECONVERSE)*`,
      pageCitations: [1, 2, 4, 7, 9, 10],
      isConfigured: false,
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`ECONVERSE Server listening on port ${PORT}`);
  });
}

startServer();
