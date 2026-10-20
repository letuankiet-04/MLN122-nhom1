import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Module 01: Khái quát
  {
    id: 'q-01',
    moduleId: 'module-01',
    type: 'single',
    question: 'Nền kinh tế hàng hóa là nền kinh tế mà sản phẩm được sản xuất ra nhằm mục đích gì?',
    options: [
      'Tự cung tự cấp cho nhu cầu của người sản xuất',
      'Trao đổi, mua bán trên thị trường',
      'Dự trữ tích trữ qua các thế hệ',
      'Phục vụ độc quyền cho các tổ chức nhà nước'
    ],
    correctAnswer: 1,
    explanation: 'Theo mục 1 trang 1 của PDF: "Nền kinh tế hàng hóa là nền kinh tế trong đó các sản phẩm được sản xuất ra nhằm mục đích trao đổi, mua bán trên thị trường."',
    pdfPage: 1
  },
  {
    id: 'q-02',
    moduleId: 'module-01',
    type: 'multiple',
    question: 'Những khâu cơ bản nào cấu thành chu trình kinh tế trong nền kinh tế hàng hóa? (Chọn tất cả các đáp án đúng)',
    options: [
      'Sản xuất',
      'Phân phối',
      'Trao đổi',
      'Tiêu dùng'
    ],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Theo trang 1 của tài liệu: "các hoạt động sản xuất, phân phối, trao đổi và tiêu dùng chịu sự tác động của những quy luật kinh tế khách quan."',
    pdfPage: 1
  },
  {
    id: 'q-03',
    moduleId: 'module-02',
    type: 'single',
    question: 'Theo quy luật giá trị, việc sản xuất và trao đổi hàng hóa phải dựa trên cơ sở nào?',
    options: [
      'Hao phí lao động cá biệt của từng người sản xuất',
      'Ý muốn chủ quan của cơ quan quản lý nhà nước',
      'Hao phí lao động xã hội cần thiết để sản xuất ra hàng hóa đó',
      'Chi phí vận chuyển và đóng gói hàng hóa'
    ],
    correctAnswer: 2,
    explanation: 'Theo Bộ Giáo dục và Đào tạo (2019, tr. 42) được trích dẫn tại trang 1 PDF: "Quy luật này yêu cầu việc sản xuất và trao đổi hàng hóa phải dựa trên cơ sở hao phí lao động xã hội cần thiết để sản xuất ra hàng hóa đó."',
    pdfPage: 1
  },
  {
    id: 'q-04',
    moduleId: 'module-02',
    type: 'true_false',
    question: 'Trên thị trường, việc trao đổi hàng hóa luôn đảm bảo giá cả thực tế lúc nào cũng bằng tuyệt đối với giá trị hàng hóa.',
    options: ['Đúng', 'Sai'],
    correctAnswer: false,
    explanation: 'Sai. Theo trang 1 PDF: "Tuy nhiên, trên thị trường, giá cả thực tế có thể lên xuống quanh giá trị do tác động của cung – cầu và những yếu tố khác."',
    pdfPage: 1
  },
  {
    id: 'q-05',
    moduleId: 'module-02',
    type: 'single',
    question: 'Theo nghiên cứu về hộ trồng cà phê Việt Nam (2019), nhóm hộ có chứng nhận bền vững (SC) đạt lợi nhuận gộp chênh lệch thế nào so với nhóm không có chứng nhận (non-SC)?',
    options: [
      'Thấp hơn 5,1% do chi phí đầu vào quá cao',
      'Bằng nhau vì giá bán trên thị trường không thay đổi',
      'Cao hơn khoảng 20,4% (đạt 68,366 so với 56,763 triệu đồng/ha)',
      'Cao hơn 50% nhờ năng suất vượt trội gấp đôi'
    ],
    correctAnswer: 2,
    explanation: 'Theo bảng số liệu trang 2 và phân tích trang 3 của PDF: Lợi nhuận gộp nhóm SC đạt 68,366 tr/ha, nhóm non-SC đạt 56,763 tr/ha, chênh lệch 11,603 tr/ha tương đương cao hơn khoảng 20,4%.',
    pdfPage: 2
  },
  {
    id: 'q-06',
    moduleId: 'module-02',
    type: 'fill_blank',
    question: 'Hoàn thành nhận định trong tài liệu (trang 1): "Quy luật giá trị là quy luật kinh tế cơ bản của ________ và trao đổi hàng hóa."',
    correctAnswer: 'sản xuất',
    explanation: 'Đoạn đầu mục 2.1.a trang 1 nêu rõ: "Quy luật giá trị là quy luật kinh tế cơ bản của sản xuất và trao đổi hàng hóa."',
    pdfPage: 1
  },
  {
    id: 'q-07',
    moduleId: 'module-03',
    type: 'single',
    question: 'Khi các yếu tố khác không đổi, mối quan hệ giữa cung, cầu và xu hướng biến động giá cả diễn ra như thế nào?',
    options: [
      'Cung tăng tạo áp lực tăng giá; cầu tăng tạo áp lực giảm giá',
      'Cung tăng tạo áp lực giảm giá; cầu tăng tạo áp lực tăng giá',
      'Cả cung và cầu tăng đều làm giá giảm về 0',
      'Giá cả biến động hoàn toàn không phụ thuộc vào tương quan cung cầu'
    ],
    correctAnswer: 1,
    explanation: 'Theo mục 2.2.a trang 4 PDF: "cung tăng thường tạo áp lực giảm giá; cầu tăng thường tạo áp lực tăng giá."',
    pdfPage: 4
  },
  {
    id: 'q-08',
    moduleId: 'module-03',
    type: 'case_study',
    question: 'Dịp Tết Nguyên đán Ất Tỵ 2025, chỉ số giá nhóm thịt lợn tăng 2,45% nhưng nhóm rau tươi lại giảm 0,48%. Dưới góc độ quy luật cung - cầu, cách giải thích nào sau đây là chính xác theo tài liệu?',
    options: [
      'Giá thịt lợn tăng do người bán ép giá bất hợp pháp; giá rau giảm do không ai mua rau dịp Tết',
      'Giá thịt lợn tăng do nhu cầu tiêu dùng Tết tăng cao; giá rau giảm do thời tiết thuận lợi và nguồn cung rau củ dồi dào trong vụ đông xuân',
      'Cả hai mặt hàng đều vi phạm quy luật cung - cầu',
      'Giá cả hai mặt hàng biến động ngẫu nhiên không có nguyên nhân kinh tế'
    ],
    correctAnswer: 1,
    explanation: 'Theo trang 5 PDF: "nhu cầu tiêu dùng tăng trong dịp Tết là một trong những nguyên nhân khiến giá nhiều mặt hàng tăng (thịt lợn +2,45%). Ngược lại, chỉ số giá rau tươi, khô và chế biến giảm 0,48% do thời tiết thuận lợi và nguồn cung rau củ dồi dào trong vụ đông xuân."',
    pdfPage: 5
  },
  {
    id: 'q-09',
    moduleId: 'module-04',
    type: 'matching',
    question: 'Hãy ghép chỉ số thương mại điện tử năm 2024 tại Việt Nam với nền tảng tương ứng theo báo cáo của YouNet ECI (dẫn lại bởi VCCI):',
    correctAnswer: 'matched',
    matchingPairs: [
      { term: 'Shopee - Tổng GMV', definition: '9,3 tỷ USD' },
      { term: 'Shopee - Thị phần (trong 4 sàn)', definition: '66,7%' },
      { term: 'TikTok Shop - Thị phần (trong 4 sàn)', definition: '26,9%' },
      { term: 'TikTok Shop - Tốc độ tăng trưởng GMV', definition: '99%' }
    ],
    explanation: 'Theo mục 3 trang 7 PDF: Shopee đạt GMV 9,3 tỷ USD, thị phần 66,7%, tăng 41%; TikTok Shop đạt GMV 3,8 tỷ USD, thị phần 26,9%, tăng 99%.',
    pdfPage: 7
  },
  {
    id: 'q-10',
    moduleId: 'module-04',
    type: 'multiple',
    question: 'Những biểu hiện nào sau đây thuộc về tác động tiêu cực của quy luật cạnh tranh cần có sự quản lý của Nhà nước? (Chọn các phương án đúng)',
    options: [
      'Cung cấp thông tin không trung thực về doanh nghiệp khác',
      'Quảng cáo sai sự thật gây nhầm lẫn cho người tiêu dùng',
      'Ứng dụng công nghệ mới và nâng cao năng suất lao động',
      'Tìm cách thông đồng hạn chế cạnh tranh, chia sẻ thị trường bất hợp pháp'
    ],
    correctAnswer: [0, 1, 3],
    explanation: 'Trang 6 và trang 8 PDF nêu rõ: Tác động tiêu cực gồm cạnh tranh không lành mạnh, quảng cáo sai sự thật, tung tin không trung thực về đối thủ (vi phạm Luật Cạnh tranh số 23/2018/QH14). Còn ứng dụng công nghệ là tác động tích cực.',
    pdfPage: 6
  },
  {
    id: 'q-11',
    moduleId: 'module-05',
    type: 'single',
    question: 'Trong công thức lượng tiền cần thiết cho lưu thông M = (P × Q) / V, ký hiệu V đại diện cho đại lượng nào?',
    options: [
      'Tổng khối lượng hàng hóa đưa vào lưu thông',
      'Giá cả bình quân của một đơn vị hàng hóa',
      'Tốc độ lưu thông bình quân của tiền tệ',
      'Tỷ lệ dự trữ bắt buộc tại Ngân hàng Nhà nước'
    ],
    correctAnswer: 2,
    explanation: 'Theo mục 2.4.a trang 8 PDF: "V: tốc độ lưu thông bình quân của tiền tệ."',
    pdfPage: 8
  },
  {
    id: 'q-12',
    moduleId: 'module-05',
    type: 'true_false',
    question: 'Sự phát triển của các phương tiện thanh toán điện tử (như QR code, thẻ, ví điện tử) làm cho tiền tệ biến mất và quy luật lưu thông tiền tệ không còn tác dụng.',
    options: ['Đúng', 'Sai'],
    correctAnswer: false,
    explanation: 'Sai. Mục 2.4.b trang 9 PDF khẳng định: "thanh toán điện tử không có nghĩa là toàn bộ tiền trong nền kinh tế đã biến mất hoặc quy luật lưu thông tiền tệ không còn tác dụng."',
    pdfPage: 9
  },
  {
    id: 'q-13',
    moduleId: 'module-05',
    type: 'single',
    question: 'Năm 2025, tổng phương tiện thanh toán (M2) tăng 14,98% nhưng chỉ số giá tiêu dùng (CPI) chỉ tăng 3,31%. Yếu tố kinh tế nào sau đây giải thích sự ổn định này theo tài liệu?',
    options: [
      'Nền kinh tế đóng cửa không giao thương quốc tế',
      'Nền kinh tế phát triển và sản xuất được nhiều hàng hóa hơn với mức tăng trưởng GDP đạt 8,02%',
      'Nhà nước cấm hoàn toàn hoạt động cho vay ngân hàng',
      'Người dân không còn sử dụng tiền mặt trong đời sống'
    ],
    correctAnswer: 1,
    explanation: 'Theo trang 9-10 PDF: GDP năm 2025 tăng 8,02% cho thấy sản xuất phát triển mạnh, hàng hóa dịch vụ đáp ứng tốt nhu cầu, tạo lượng hàng hóa đối ứng giúp hấp thu lượng tiền tăng (+14,98%) mà không gây áp lực tăng vọt về giá cả.',
    pdfPage: 10
  },
  {
    id: 'q-14',
    moduleId: 'module-06',
    type: 'case_study',
    question: 'Quan sát ví dụ thị trường cà phê ở mục 3 trang 10 của PDF, thứ tự phản ứng tương tác giữa các quy luật nào sau đây là phù hợp nhất?',
    options: [
      'Cầu tăng nhưng cung chưa đáp ứng kịp → Giá tăng → Thúc đẩy mở rộng sản xuất & đầu tư kỹ thuật (Giá trị) → Cạnh tranh bằng chất lượng/chứng nhận SC → Giao dịch bằng tiền tệ',
      'Tiền tệ lưu thông trước → Nhà nước ấn định giá cà phê → Doanh nghiệp dừng cạnh tranh',
      'Cạnh tranh đào thải hết các hộ trồng → Thị trường không còn nguồn cung → Quy luật giá trị biến mất',
      'Chỉ có quy luật cung cầu tác động, 3 quy luật còn lại không tham gia'
    ],
    correctAnswer: 0,
    explanation: 'Trang 10 PDF phân tích: Khi cầu tăng, nguồn cung chưa đáp ứng kịp làm giá tăng. Tín hiệu này thúc đẩy người sản xuất hạ hao phí (Quy luật giá trị), cạnh tranh chất lượng & phương thức phân phối (Quy luật cạnh tranh), và các giao dịch thực hiện qua tiền tệ (Lưu thông tiền tệ).',
    pdfPage: 10
  },
  {
    id: 'q-15',
    moduleId: 'module-07',
    type: 'essay',
    question: 'Hãy phân tích vì sao các quy luật kinh tế vận động mang tính khách quan nhưng trong nền kinh tế thị trường định hướng xã hội chủ nghĩa tại Việt Nam vẫn rất cần phát huy vai trò quản lý của Nhà nước?',
    correctAnswer: 'essay_submitted',
    explanation: 'Tham khảo đáp án chuẩn theo mục 4 trang 10-11 PDF: Các quy luật mang tính khách quan và tạo ra cả tác động tích cực lẫn tiêu cực. Nhà nước quản lý để điều tiết vĩ mô, hạn chế mặt trái và bảo đảm phát triển bền vững.',
    pdfPage: 11,
    rubric: [
      'Nêu được tính khách quan của các quy luật kinh tế (vận động độc lập với ý chí chủ quan). (2.0 điểm)',
      'Chỉ ra tính chất hai mặt: Các quy luật vừa mang lại tác động tích cực (thúc đẩy LLSX, tối ưu nguồn lực), vừa tiềm ẩn tác động tiêu cực (phân hóa giàu nghèo, cạnh tranh không lành mạnh, nguy cơ lạm phát, mất cân đối cung cầu). (3.0 điểm)',
      'Nêu vai trò quản lý của Nhà nước: Hoạch định chính sách tiền tệ/tài khóa, kiểm soát thị trường, thực thi Luật Cạnh tranh, bảo vệ người tiêu dùng và hỗ trợ an sinh xã hội. (3.0 điểm)',
      'Khẳng định nguyên tắc biện chứng: Tôn trọng quy luật thị trường kết hợp phát huy vai trò quản lý của Nhà nước hướng tới phát triển bền vững. (2.0 điểm)'
    ],
    sampleAnswer: `1. Tính chất khách quan: Các quy luật giá trị, cung – cầu, cạnh tranh và lưu thông tiền tệ vận động theo các quy luật nội tại của sản xuất và lưu thông hàng hóa, không thể bãi bỏ bằng mệnh lệnh hành chính.
2. Tính hai mặt: Cạnh tranh thúc đẩy đổi mới công nghệ nhưng cũng có thể dẫn đến hành vi gian lận, bôi nhọ đối thủ; Quy luật giá trị kích thích năng suất nhưng dẫn tới phân hóa giàu nghèo sâu sắc; Cung - cầu có thể gây sốt giá hoặc dư thừa cục bộ.
3. Vai trò quản lý của Nhà nước:
   - Kiến tạo khung khổ pháp lý công bằng (như Luật Cạnh tranh số 23/2018/QH14).
   - Điều tiết kinh tế vĩ mô thông qua chính sách tiền tệ (kiểm soát M2, giữ CPI ổn định ở mức 3,31% năm 2025).
   - Dự trữ hàng hóa thiết yếu can thiệp bình ổn thị trường khi xảy ra biến động cung - cầu (như gói hàng Tết 8.000 tỷ tại TP.HCM).
4. Kết luận: Nhà nước không làm thay thị trường mà tôn trọng các quy luật khách quan, đồng thời phát huy vai trò định hướng, điều tiết để bảo vệ môi trường kinh doanh lành mạnh và phục vụ mục tiêu phát triển bền vững.`
  }
];
