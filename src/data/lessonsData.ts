import { LessonModule, CoffeeMetric, TetPriceMetric, EcommerceMetric, MoneyMetric } from '../types';

export const COFFEE_METRICS: CoffeeMetric[] = [
  {
    metric: 'Năng suất bình quân',
    unit: 'kg/ha',
    scValue: 3215.77,
    nonScValue: 2933.25,
    diffPercent: '+9,6%',
    note: 'Nhóm SC cao hơn 282,52 kg/ha nhờ cải tiến kỹ thuật canh tác bền vững.'
  },
  {
    metric: 'Giá bán bình quân',
    unit: 'đồng/kg',
    scValue: 34820,
    nonScValue: 33140,
    diffPercent: '+5,1%',
    note: 'Chênh lệch 1.680 đồng/kg do chất lượng và chứng nhận sản phẩm.'
  },
  {
    metric: 'Doanh thu bình quân',
    unit: 'triệu đồng/ha',
    scValue: 112.347,
    nonScValue: 97.229,
    diffPercent: '+15,5%',
    note: 'Doanh thu nhóm SC cao hơn nhờ cả năng suất lẫn giá bán.'
  },
  {
    metric: 'Chi phí đầu vào bình quân',
    unit: 'triệu đồng/ha',
    scValue: 43.982,
    nonScValue: 40.466,
    diffPercent: '+8,7%',
    note: 'Chi phí nhóm SC cao hơn 3,516 triệu đồng/ha do đầu tư phân bón hữu cơ, đào tạo quy trình.'
  },
  {
    metric: 'Lợi nhuận gộp theo nghiên cứu',
    unit: 'triệu đồng/ha',
    scValue: 68.366,
    nonScValue: 56.763,
    diffPercent: '+20,4%',
    note: 'Lợi nhuận nhóm SC vượt trội 11,603 triệu đồng/ha (+20,4%).'
  }
];

export const TET_PRICE_METRICS: TetPriceMetric[] = [
  { category: 'Hàng ăn và dịch vụ ăn uống', changePercent: 0.74, description: 'Chỉ số giá chung của toàn nhóm dịch vụ ăn uống tháng 01/2025.' },
  { category: 'Thực phẩm (nói chung)', changePercent: 0.97, description: 'Nhu cầu chuẩn bị thực phẩm dự trữ cho các bữa ăn dịp Tết tăng cao.' },
  { category: 'Thịt lợn', changePercent: 2.45, description: 'Mặt hàng thiết yếu phục vụ giò chả, mâm cỗ truyền thống đón Tết.' },
  { category: 'Quả tươi và chế biến', changePercent: 1.53, description: 'Nhu cầu bày mâm ngũ quả, thờ cúng và tiếp khách gia tăng.' },
  { category: 'Rau tươi, khô và chế biến', changePercent: -0.48, description: 'Giảm giá do thời tiết vụ đông xuân thuận lợi, nguồn cung dồi dào.' }
];

export const ECOMMERCE_METRICS: EcommerceMetric[] = [
  { platform: 'Shopee', gmvBillionUsd: 9.3, marketSharePercent: 66.7, gmvGrowthPercent: 41 },
  { platform: 'TikTok Shop', gmvBillionUsd: 3.8, marketSharePercent: 26.9, gmvGrowthPercent: 99 },
];

export const MONEY_METRICS: MoneyMetric[] = [
  { indicator: 'Tổng phương tiện thanh toán (M2)', valuePercent: 14.98, targetOrComparison: 'So với cuối năm 2024', description: 'Đến ngày 22/12/2025 theo Cục Thống kê, phản ánh thanh khoản và cung tiền mở rộng.' },
  { indicator: 'Dư nợ tín dụng nền kinh tế', valuePercent: 17.65, targetOrComparison: 'So với cuối năm 2024', description: 'Hoạt động cho vay hỗ trợ sản xuất kinh doanh và đầu tư của hệ thống ngân hàng.' },
  { indicator: 'Chỉ số giá tiêu dùng bình quân (CPI) 2025', valuePercent: 3.31, targetOrComparison: 'Thấp hơn mức 3,63% năm 2024', description: 'Kiểm soát lạm phát thành công dưới mục tiêu Quốc hội đề ra.' },
  { indicator: 'Tăng trưởng kinh tế (GDP) năm 2025', valuePercent: 8.02, targetOrComparison: 'So với năm 2024', description: 'Nền kinh tế tiếp tục tăng trưởng mạnh mẽ, sản xuất mở rộng đáp ứng lượng tiền.' }
];

export const LESSON_MODULES: LessonModule[] = [
  {
    id: 'module-01',
    number: '01',
    title: 'Khái quát nền kinh tế hàng hóa',
    subtitle: 'Bản chất, 4 khâu tái sản xuất và hệ thống 4 quy luật cơ bản',
    description: 'Tìm hiểu định nghĩa nền kinh tế hàng hóa, vai trò của sản xuất, phân phối, trao đổi, tiêu dùng và tương tác tổng thể của 4 quy luật kinh tế khách quan.',
    pdfPages: [1],
    icon: 'Layers',
    estimatedMinutes: 10,
    interactiveComponent: 'knowledge-graph',
    sections: [
      {
        id: 'm1-s1',
        title: 'Khái niệm nền kinh tế hàng hóa & 4 khâu tái sản xuất',
        pdfPage: 1,
        content: `Nền kinh tế hàng hóa là nền kinh tế trong đó **các sản phẩm được sản xuất ra nhằm mục đích trao đổi, mua bán trên thị trường**.

Trong nền kinh tế hàng hóa, các hoạt động kinh tế bao gồm 4 khâu cơ bản:
1. **Sản xuất**: Khâu khởi đầu, tạo ra sản phẩm và của cải vật chất nhằm đáp ứng nhu cầu thị trường.
2. **Phân phối**: Phân chia các kết quả sản xuất và nguồn lực cho các thành viên xã hội.
3. **Trao đổi**: Cầu nối giữa sản xuất và tiêu dùng, thực hiện thông qua mua bán bằng tiền tệ theo nguyên tắc thỏa thuận.
4. **Tiêu dùng**: Mục đích cuối cùng của sản xuất, nơi giá trị sử dụng của hàng hóa được hiện thực hóa và triệt tiêu để mở ra chu kỳ sản xuất mới.

Tất cả các khâu này chịu sự tác động chi phối của những quy luật kinh tế khách quan, vận động độc lập với ý chí chủ quan của con người.`,
        summary: 'Kinh tế hàng hóa sản xuất để trao đổi, mua bán trên thị trường. Vận động qua 4 khâu: Sản xuất - Phân phối - Trao đổi - Tiêu dùng dưới sự chi phối của các quy luật khách quan.',
        keyTakeaways: [
          'Sản phẩm sản xuất ra để trao đổi, mua bán chứ không phải tự cung tự cấp.',
          '4 khâu gắn kết hữu cơ: Sản xuất → Phân phối → Trao đổi → Tiêu dùng.',
          'Các quy luật kinh tế mang tính khách quan, con người chỉ có thể nhận thức và vận dụng.'
        ],
        citation: 'Trang 1, Mục 1: Khái quát chung'
      },
      {
        id: 'm1-s2',
        title: 'Hệ thống bốn quy luật kinh tế cơ bản',
        pdfPage: 1,
        content: `Các quy luật cơ bản của kinh tế thị trường được trình bày trong nội dung môn học gồm:
- **Quy luật giá trị**: Quy luật kinh tế cơ bản nhất của sản xuất và trao đổi hàng hóa.
- **Quy luật cung – cầu**: Quy luật phản ánh mối quan hệ giữa người bán và người mua, hình thành giá cả thị trường.
- **Quy luật cạnh tranh**: Quy luật thúc đẩy sự ganh đua giành ưu thế kinh tế giữa các chủ thể.
- **Quy luật lưu thông tiền tệ**: Quy luật xác định lượng tiền cần thiết để bảo đảm sự lưu thông trơn tru của hàng hóa.

Các quy luật này có mối quan hệ chặt chẽ với nhau, cùng tác động đến quyết định sản xuất, kinh doanh, giá cả hàng hóa và sự vận động của thị trường.`,
        summary: '4 quy luật cơ bản gồm Giá trị, Cung - cầu, Cạnh tranh và Lưu thông tiền tệ. Chúng không tách rời mà cùng tác động điều tiết toàn bộ nền kinh tế.',
        keyTakeaways: [
          '4 quy luật: Giá trị, Cung - Cầu, Cạnh tranh, Lưu thông tiền tệ.',
          'Có mối quan hệ hữu cơ mật thiết, tác động đa chiều đến giá cả và hành vi thị trường.',
          'Là cơ sở lý luận then chốt để phân tích chính sách kinh tế vĩ mô và vi mô.'
        ],
        citation: 'Trang 1, Mục 1: Khái quát chung'
      }
    ]
  },
  {
    id: 'module-02',
    number: '02',
    title: 'Quy luật giá trị',
    subtitle: 'Nội dung cốt lõi, 3 tác động & thực tiễn nghiên cứu cà phê Việt Nam 2019',
    description: 'Quy luật kinh tế cơ bản của sản xuất hàng hóa: hao phí LĐXH cần thiết, trao đổi ngang giá và phân tích định lượng từ bài báo khoa học về nông dân cà phê Việt Nam.',
    pdfPages: [1, 2, 3, 4],
    icon: 'Coins',
    estimatedMinutes: 20,
    interactiveComponent: 'coffee-chart',
    sections: [
      {
        id: 'm2-s1',
        title: 'Nội dung của quy luật giá trị',
        pdfPage: 1,
        content: `Quy luật giá trị là **quy luật kinh tế cơ bản của sản xuất và trao đổi hàng hóa**.

Quy luật này yêu cầu việc sản xuất và trao đổi hàng hóa phải dựa trên cơ sở **hao phí lao động xã hội cần thiết** để sản xuất ra hàng hóa đó *(Bộ Giáo dục và Đào tạo, 2019, tr. 42)*.

- **Trong sản xuất**: Người sản xuất phải có mức *hao phí lao động cá biệt* phù hợp với mức *hao phí lao động xã hội cần thiết*. Nếu hao phí cá biệt lớn hơn mức xã hội cần thiết, người sản xuất sẽ thua lỗ; ngược lại nếu thấp hơn, họ sẽ thu được lợi nhuận siêu ngạch.
- **Trong trao đổi**: Việc trao đổi hàng hóa về nguyên tắc phải dựa trên cơ sở giá trị, tức là **trao đổi ngang giá**. Tuy nhiên, trên thị trường, giá cả thực tế có thể lên xuống quanh giá trị do tác động của cung – cầu và những yếu tố khác *(Bộ Giáo dục và Đào tạo, 2019, tr. 42)*.`,
        summary: 'Sản xuất và trao đổi phải căn cứ theo hao phí lao động xã hội cần thiết; trao đổi theo nguyên tắc ngang giá, giá cả xoay quanh trục giá trị.',
        keyTakeaways: [
          'Hao phí lao động cá biệt ≤ Hao phí lao động xã hội cần thiết.',
          'Nguyên tắc trao đổi: Trao đổi ngang giá.',
          'Giá cả thị trường dao động lên xuống quanh giá trị do tác động cung - cầu.'
        ],
        citation: 'Bộ Giáo dục và Đào tạo, 2019, Giáo trình Kinh tế chính trị Mác - Lênin, tr. 42'
      },
      {
        id: 'm2-s2',
        title: 'Ba tác động của quy luật giá trị',
        pdfPage: 1,
        content: `Quy luật giá trị có 3 tác động to lớn:

1. **Thứ nhất, điều tiết sản xuất và lưu thông hàng hóa**:
   Thông qua sự biến động của giá cả, quy luật giá trị tác động đến việc phân bổ tư liệu sản xuất và sức lao động giữa các ngành, lĩnh vực. Khi một mặt hàng có giá bán và khả năng sinh lời cao, người sản xuất có xu hướng mở rộng sản xuất; khi sản xuất không có hiệu quả, họ có xu hướng thu hẹp hoặc chuyển sang lĩnh vực khác *(Bộ Giáo dục và Đào tạo, 2019, tr. 42)*.

2. **Thứ hai, kích thích cải tiến kỹ thuật, hợp lý hóa sản xuất và tăng năng suất lao động**:
   Những người sản xuất có hao phí lao động cá biệt thấp hơn mức xã hội cần thiết thường có lợi thế về chi phí và khả năng thu được lợi nhuận cao hơn. Vì vậy, họ có động lực ứng dụng công nghệ, cải tiến quy trình và nâng cao hiệu quả sản xuất *(Bộ Giáo dục và Đào tạo, 2019, tr. 42, 43)*.

3. **Thứ ba, thực hiện sự lựa chọn tự nhiên và phân hóa những người sản xuất hàng hóa**:
   Những chủ thể sản xuất hiệu quả, có chi phí hợp lý và đáp ứng tốt nhu cầu thị trường có khả năng mở rộng kinh doanh. Ngược lại, những chủ thể có chi phí cao, năng suất thấp và kinh doanh kéo dài không hiệu quả có thể bị thua lỗ, thu hẹp sản xuất hoặc rời khỏi thị trường *(Bộ Giáo dục và Đào tạo, 2019, tr. 43)*.`,
        summary: '3 tác động: (1) Điều tiết sản xuất & lưu thông qua giá cả; (2) Kích thích cải tiến kỹ thuật, tăng năng suất; (3) Lựa chọn tự nhiên và phân hóa người sản xuất giàu - nghèo.',
        keyTakeaways: [
          'Điều tiết phân bổ tư liệu sản xuất và nhân lực theo tín hiệu giá trị.',
          'Tạo động lực nội tại buộc chủ thể đổi mới công nghệ để hạ giá thành cá biệt.',
          'Dẫn đến sự phân hóa: Người thích ứng tốt vươn lên, người lạc hậu bị đào thải.'
        ],
        citation: 'Bộ Giáo dục và Đào tạo, 2019, tr. 42-43'
      },
      {
        id: 'm2-s3',
        title: 'Số liệu thực tế: Nghiên cứu hộ trồng cà phê Việt Nam (2019)',
        pdfPage: 2,
        content: `Nghiên cứu *"Toward Sustainability or Efficiency: The Case of Smallholder Coffee Farmers in Vietnam"*, đăng trên tạp chí khoa học **Economies** năm 2019, so sánh nhóm hộ sản xuất cà phê có chứng nhận bền vững (SC) với nhóm hộ không có chứng nhận (non-SC).

Dữ liệu thực nghiệm thu thập:
- **Năng suất bình quân**: Nhóm SC đạt **3.215,77 kg/ha** so với **2.933,25 kg/ha** của nhóm non-SC (cao hơn khoảng 9,6%).
- **Giá bán bình quân**: Nhóm SC đạt **34.820 đồng/kg** so với **33.140 đồng/kg** (cao hơn khoảng 5,1%).
- **Doanh thu bình quân**: Nhóm SC đạt **112,347 triệu đồng/ha** so với **97,229 triệu đồng/ha**.
- **Chi phí đầu vào bình quân**: Nhóm SC là **43,982 triệu đồng/ha** so với **40,466 triệu đồng/ha** (cao hơn do chi phí phân bón hữu cơ, quản lý quy chuẩn).
- **Lợi nhuận gộp theo nghiên cứu**: Nhóm SC đạt **68,366 triệu đồng/ha**, cao hơn nhóm non-SC (**56,763 triệu đồng/ha**) khoảng **11,603 triệu đồng/ha** (vượt trội **20,4%**).`,
        summary: 'Hộ có chứng nhận bền vững (SC) đạt năng suất cao hơn 9,6%, giá bán cao hơn 5,1% và lợi nhuận gộp cao hơn 20,4% (11,6 triệu đ/ha) so với hộ không chứng nhận.',
        keyTakeaways: [
          'Năng suất: SC 3.215,77 kg/ha (+9,6%) vs non-SC 2.933,25 kg/ha.',
          'Giá bán: SC 34.820 đ/kg (+5,1%) vs non-SC 33.140 đ/kg.',
          'Lợi nhuận gộp: SC 68,366 tr/ha (+20,4%) vs non-SC 56,763 tr/ha.'
        ],
        citation: 'Economies 2019, 7(3), 66 (Nguyen Hung Anh et al.)'
      },
      {
        id: 'm2-s4',
        title: 'Phân tích & Kết luận theo quy luật giá trị',
        pdfPage: 3,
        content: `Số liệu khảo sát từ bài báo cho thấy sự khác biệt rõ rệt và có thể liên hệ với quy luật giá trị như sau:

- **Thúc đẩy cải tiến kỹ thuật và nâng cao năng suất**: Nhóm hộ có chứng nhận bền vững đạt năng suất 3.215,77 kg/ha, cao hơn mức 2.933,25 kg/ha của nhóm còn lại. Điều này phù hợp với yêu cầu giảm hao phí nguồn lực trên một đơn vị sản phẩm để nâng cao hiệu quả sản xuất.
- **Tác động đến khả năng cạnh tranh**: Giá bán của nhóm hộ có chứng nhận đạt 34.820 đồng/kg, cao hơn 33.140 đồng/kg. Tuy nhiên, chênh lệch này còn liên quan đến chất lượng và chứng nhận sản phẩm, không thể quy hoàn toàn cho quy luật giá trị.
- **Tác động đến hiệu quả kinh tế**: Lợi nhuận gộp của nhóm có chứng nhận đạt 68,366 triệu đồng/ha, cao hơn nhóm không có chứng nhận khoảng 11,603 triệu đồng/ha. Điều này cho thấy việc cải thiện phương thức sản xuất và nâng cao giá trị sản phẩm có thể giúp tăng hiệu quả kinh tế.

**KẾT LUẬN QUAN TRỌNG TỪ TÀI LIỆU**:
*Số liệu khảo sát thực tế cho thấy sự khác biệt về năng suất, giá bán và lợi nhuận giữa hai nhóm hộ trồng cà phê. Đây là bằng chứng thực nghiệm có thể dùng để liên hệ với quy luật giá trị, nhưng chưa đủ để khẳng định riêng quy luật giá trị là nguyên nhân duy nhất tạo ra chênh lệch.*`,
        summary: 'Quy luật giá trị thúc đẩy nâng năng suất và phân hóa hộ sản xuất, tuy nhiên chênh lệch thực tế còn chịu tác động của chất lượng chứng nhận, không quy kết tuyệt đối cho riêng một quy luật.',
        keyTakeaways: [
          'Giảm hao phí tài nguyên trên đơn vị sản phẩm qua cải tiến kỹ thuật.',
          'Lợi nhuận cao hơn khẳng định tính vượt trội của phương thức sản xuất tiến bộ.',
          'Lưu ý khoa học: Số liệu là bằng chứng thực nghiệm liên hệ, không phải nguyên nhân duy nhất.'
        ],
        citation: 'Trang 3, Mục 2: Phân tích theo quy luật giá trị'
      }
    ]
  },
  {
    id: 'module-03',
    number: '03',
    title: 'Quy luật cung – cầu',
    subtitle: 'Cân bằng thị trường, 3 tác động & dữ liệu thị trường Tết Nguyên đán Ất Tỵ 2025',
    description: 'Tìm hiểu mối tương quan cung cầu và giá cả thị trường, trải nghiệm mô phỏng đồ thị trực tiếp và phân tích số liệu biến động giá Tết Ất Tỵ 2025 của Cục Thống kê.',
    pdfPages: [4, 5],
    icon: 'TrendingUp',
    estimatedMinutes: 18,
    interactiveComponent: 'supply-demand',
    sections: [
      {
        id: 'm3-s1',
        title: 'Nội dung của quy luật cung – cầu',
        pdfPage: 4,
        content: `Quy luật cung – cầu phản ánh **mối quan hệ tác động qua lại giữa cung và cầu trên thị trường, qua đó ảnh hưởng đến giá cả hàng hóa và dịch vụ** *(Bộ Giáo dục và Đào tạo, 2019, tr. 43)*.

Trong đó:
- **Cung** là lượng hàng hóa, dịch vụ mà người bán có khả năng và sẵn sàng cung cấp ra thị trường ở các mức giá khác nhau trong một khoảng thời gian nhất định.
- **Cầu** là lượng hàng hóa, dịch vụ mà người mua có khả năng và sẵn sàng mua ở các mức giá khác nhau trong một khoảng thời gian nhất định.

**Cơ chế biến động giá cả**:
- Khi các yếu tố khác không đổi:
  - Cung tăng thường tạo áp lực **giảm giá**.
  - Cầu tăng thường tạo áp lực **tăng giá**.
  - Khi cung và cầu thay đổi đồng thời, mức độ và chiều hướng biến động của giá phụ thuộc vào sự thay đổi tương quan giữa chúng *(Bộ Giáo dục và Đào tạo, 2019, tr. 43)*.

Giá cả thị trường đóng vai trò **phát tín hiệu** về tình trạng khan hiếm hoặc dư thừa hàng hóa, từ đó tác động trở lại quyết định của người sản xuất và người tiêu dùng.`,
        summary: 'Cung là lượng hàng bán sẵn sàng bán; Cầu là lượng hàng mua sẵn sàng mua. Cầu > Cung gây tăng giá, Cung > Cầu gây giảm giá. Giá cả phát tín hiệu thị trường.',
        keyTakeaways: [
          'Định nghĩa chuẩn xác về Cung và Cầu trong khoảng thời gian nhất định.',
          'Giá cả thị trường là thước đo tín hiệu khan hiếm hay dư thừa hàng hóa.',
          'Sự biến động giá phụ thuộc vào tương quan biến đổi đồng thời giữa cung và cầu.'
        ],
        citation: 'Bộ Giáo dục và Đào tạo, 2019, tr. 43'
      },
      {
        id: 'm3-s2',
        title: 'Ba tác động của quy luật cung – cầu',
        pdfPage: 4,
        content: `Quy luật cung – cầu có ba tác động chính:

1. **Thứ nhất, tác động đến sự hình thành và biến động của giá cả thị trường**:
   Khi cầu vượt cung, giá có xu hướng tăng; khi cung vượt cầu, giá có xu hướng giảm *(Bộ Giáo dục và Đào tạo, 2019, tr. 44)*.

2. **Thứ hai, định hướng quyết định sản xuất, kinh doanh**:
   Người sản xuất căn cứ vào nhu cầu thị trường và khả năng tiêu thụ để quyết định số lượng, chủng loại và thời điểm đưa hàng hóa ra thị trường *(Bộ Giáo dục và Đào tạo, 2019, tr. 44)*.

3. **Thứ ba, tác động đến tiêu dùng**:
   Khi giá tăng, người tiêu dùng có thể giảm lượng mua, chuyển sang sản phẩm thay thế hoặc điều chỉnh ngân sách. Khi giá giảm, họ có thể tăng lượng mua nếu các yếu tố khác không đổi *(Bộ Giáo dục và Đào tạo, 2019, tr. 44)*.`,
        summary: '3 tác động: (1) Quyết định sự dao động giá cả thị trường; (2) Định hướng nhà sản xuất về số lượng, chủng loại, thời điểm; (3) Điều chỉnh hành vi tiêu dùng và sản phẩm thay thế.',
        keyTakeaways: [
          'Hình thành giá cả cân bằng động trên thị trường.',
          'Định hướng kế hoạch cung ứng và thời vụ của doanh nghiệp.',
          'Tác động trực tiếp đến ngân sách và thói quen mua sắm của người dân.'
        ],
        citation: 'Bộ Giáo dục và Đào tạo, 2019, tr. 44'
      },
      {
        id: 'm3-s3',
        title: 'Ví dụ thực tế: Thị trường hàng hóa dịp Tết Ất Tỵ 2025',
        pdfPage: 4,
        content: `Thị trường hàng hóa dịp **Tết Nguyên đán Ất Tỵ năm 2025 tại Việt Nam** là ví dụ thực tế điển hình cho tác động của quy luật cung – cầu:

Theo **Cục Thống kê (tháng 01/2025)**:
- Chỉ số giá nhóm hàng ăn và dịch vụ ăn uống: **tăng 0,74%** so với tháng trước.
- Nhóm thực phẩm: **tăng 0,97%**.
- Thịt lợn: **tăng 2,45%** (do nhu cầu chế biến mâm cỗ Tết tăng vọt).
- Quả tươi và chế biến: **tăng 1,53%** (nhu cầu bày mâm ngũ quả, quà biếu).
- **Ngược lại**: Nhóm rau tươi, khô và chế biến **giảm 0,48%** do thời tiết thuận lợi và nguồn cung rau củ dồi dào trong vụ đông xuân *(Cục Thống kê, 2025)*.

**Chủ động điều tiết nguồn cung tại TP. Hồ Chí Minh**:
Theo Cổng Thông tin điện tử Chính phủ ngày 13/01/2025, các doanh nghiệp tại TP.HCM đã chuẩn bị lượng hàng thiết yếu phục vụ Tết trị giá **hơn 8.000 tỷ đồng**. Lượng hàng dự kiến cung ứng mỗi tháng Tết gồm:
- Gần **8.000 tấn gạo**
- **5.000 tấn thịt gia súc**
- **5.500 tấn thịt gia cầm**
- **10.000 tấn rau củ quả** *(Cổng Thông tin điện tử Chính phủ, 2025)*.

**Ý nghĩa**:
Khi nhu cầu tiêu dùng tăng, giá một số mặt hàng có xu hướng tăng; ngược lại khi nguồn cung dồi dào, giá có thể ổn định hoặc giảm. Việc doanh nghiệp chủ động dự trữ và cung ứng đã giúp hạn chế tình trạng sốt giá cục bộ.`,
        summary: 'Tết 2025: Nhu cầu tăng đẩy giá thịt lợn (+2,45%), hoa quả (+1,53%); nhưng nguồn cung rau dồi dào vụ đông xuân khiến giá rau giảm (-0,48%). TP.HCM chuẩn bị >8.000 tỷ đồng hàng hóa giúp bình ổn giá.',
        keyTakeaways: [
          'Thịt lợn (+2,45%) & quả tươi (+1,53%) tăng do cầu Tết tăng đột biến.',
          'Rau tươi (-0,48%) giảm nhờ cung vụ đông xuân vượt trội.',
          'Doanh nghiệp chuẩn bị >8.000 tỷ đồng hàng hóa can thiệp ổn định cân bằng thị trường.'
        ],
        citation: 'Cục Thống kê (2025) & Cổng Thông tin điện tử Chính phủ (13/01/2025)'
      }
    ]
  },
  {
    id: 'module-04',
    number: '04',
    title: 'Quy luật cạnh tranh',
    subtitle: 'Ganh đua kinh tế, hai mặt tác động & Cuộc chiến TMĐT Shopee vs TikTok Shop 2024',
    description: 'Phân tích bản chất của cạnh tranh, tác động thúc đẩy đổi mới công nghệ so với mặt trái cạnh tranh không lành mạnh, cùng case study kinh điển Shopee và TikTok Shop.',
    pdfPages: [6, 7, 8],
    icon: 'Swords',
    estimatedMinutes: 20,
    interactiveComponent: 'ecommerce-chart',
    sections: [
      {
        id: 'm4-s1',
        title: 'Nội dung của quy luật cạnh tranh',
        pdfPage: 6,
        content: `Cạnh tranh là **sự ganh đua giữa các chủ thể kinh tế nhằm giành những điều kiện thuận lợi trong sản xuất, kinh doanh và tiêu thụ hàng hóa, dịch vụ để thu được lợi ích kinh tế cao hơn**.

Quy luật cạnh tranh phản ánh sự tác động khách quan của cạnh tranh trong nền kinh tế thị trường. Các doanh nghiệp phải tìm cách nâng cao năng lực cạnh tranh để thu hút khách hàng, mở rộng thị trường và đạt hiệu quả kinh doanh *(Bộ Giáo dục và Đào tạo, 2019, tr. 45)*.

Cạnh tranh có thể diễn ra thông qua:
- **Giá bán**: Cắt giảm giá thành, khuyến mãi, chiết khấu.
- **Chất lượng sản phẩm & mẫu mã**: Đổi mới thiết kế, tiêu chuẩn cao cấp.
- **Công nghệ**: Tự động hóa, trí tuệ nhân tạo, nền tảng số.
- **Dịch vụ khách hàng & uy tín thương hiệu**: Chăm sóc hậu mãi, bảo hành, tốc độ giao hàng.
- **Hệ thống phân phối**: Đa kênh trực tuyến kết hợp trực tiếp.`,
        summary: 'Cạnh tranh là sự ganh đua giành điều kiện thuận lợi để thu lợi ích kinh tế cao hơn, diễn ra qua giá, chất lượng, công nghệ, thương hiệu và kênh phân phối.',
        keyTakeaways: [
          'Bản chất: Sự ganh đua kinh tế khách quan vì lợi ích cao hơn.',
          'Phương thức cạnh tranh đa dạng: Giá bán, chất lượng, công nghệ, logistics, thương hiệu.',
          'Tạo áp lực sinh tồn buộc doanh nghiệp không ngừng tự hoàn thiện.'
        ],
        citation: 'Bộ Giáo dục và Đào tạo, 2019, tr. 45'
      },
      {
        id: 'm4-s2',
        title: 'Bốn tác động của quy luật cạnh tranh',
        pdfPage: 6,
        content: `Quy luật cạnh tranh tạo ra cả những tác động tích cực lẫn tiêu cực:

- **Thứ nhất, thúc đẩy phát triển lực lượng sản xuất**: Để tạo lợi thế cạnh tranh, các doanh nghiệp có động lực ứng dụng khoa học – công nghệ, đổi mới phương thức quản lý, nâng cao năng suất và chất lượng sản phẩm *(Bộ Giáo dục và Đào tạo, 2019, tr. 46)*.
- **Thứ hai, thúc đẩy phân bổ nguồn lực theo tín hiệu thị trường**: Những doanh nghiệp đáp ứng tốt nhu cầu khách hàng và sử dụng nguồn lực hiệu quả có cơ hội mở rộng quy mô; các doanh nghiệp hoạt động kém hiệu quả phải cải tổ hoặc thu hẹp sản xuất.
- **Thứ ba, tác động đến người tiêu dùng**: Cạnh tranh lành mạnh tạo ra nhiều lựa chọn hơn về sản phẩm, giá cả và chất lượng, đồng thời khuyến khích doanh nghiệp cải thiện dịch vụ chăm sóc khách hàng.
- **Thứ tư, tác động tiêu cực**: Cạnh tranh có thể dẫn tới các hành vi cạnh tranh không lành mạnh, quảng cáo sai sự thật, xâm phạm quyền lợi người tiêu dùng hoặc tìm cách hạn chế cạnh tranh, thao túng thị trường. Vì vậy, **cần có sự quản lý của Nhà nước** để duy trì môi trường cạnh tranh công bằng.`,
        summary: 'Tích cực: phát triển lực lượng sản xuất, phân bổ nguồn lực tối ưu, người tiêu dùng hưởng lợi. Tiêu cực: nguy cơ cạnh tranh không lành mạnh, quảng cáo sai sự thật đòi hỏi Nhà nước quản lý.',
        keyTakeaways: [
          'Thúc đẩy ứng dụng KHCN và đổi mới quản trị.',
          'Phân bổ dòng vốn và nhân lực vào đơn vị kinh doanh hiệu quả.',
          'Mặt trái cạnh tranh không lành mạnh đặt ra yêu cầu vai trò điều tiết của Nhà nước.'
        ],
        citation: 'Bộ Giáo dục và Đào tạo, 2019, tr. 46'
      },
      {
        id: 'm4-s3',
        title: 'Ví dụ thực tiễn: Shopee và TikTok Shop tại Việt Nam (2024)',
        pdfPage: 7,
        content: `Trên thị trường thương mại điện tử Việt Nam, sự cạnh tranh giữa **Shopee** và **TikTok Shop** là ví dụ tiêu biểu cho quy luật cạnh tranh.

Theo báo cáo của **YouNet ECI** được Liên đoàn Thương mại và Công nghiệp Việt Nam (VCCI) dẫn lại:
- **Shopee (2024)**:
  - Tổng giá trị giao dịch hàng hóa (GMV): **9,3 tỷ USD**.
  - Chiếm **66,7% thị phần** của 4 nền tảng được khảo sát (Shopee, TikTok Shop, Lazada, Tiki).
  - Tốc độ tăng trưởng GMV: **41%** so với năm 2023.
- **TikTok Shop (2024)**:
  - Tổng giá trị giao dịch hàng hóa (GMV): **3,8 tỷ USD**.
  - Chiếm **26,9% thị phần** của 4 nền tảng.
  - Tốc độ tăng trưởng GMV: **99%** so với năm 2023 (tăng gấp gần 2 lần).

*(Lưu ý phương pháp luận: Thị phần nêu trên tính trên tổng GMV 13,82 tỷ USD của bốn nền tảng thương mại điện tử lớn nhất được khảo sát theo báo cáo VCCI 2025).*

**Chiến lược cạnh tranh đổi mới sáng tạo**:
- TikTok Shop tận dụng mô hình Shoppertainment (video ngắn, livestream bán hàng trực tiếp với nhà sáng tạo nội dung), tạo sức ép đổi mới mạnh mẽ.
- Shopee đáp trả bằng việc ra mắt Shopee Live, trợ giá voucher vận chuyển, rút ngắn thời gian giao hàng.
- **Tuân thủ pháp luật**: Cạnh tranh thúc đẩy đổi mới nhưng phải tuân thủ **Luật Cạnh tranh số 23/2018/QH14**, cấm các hành vi tung tin sai sự thật, gian lận thương mại hoặc xâm phạm quyền lợi người tiêu dùng.`,
        summary: 'Năm 2024: Shopee dẫn đầu với GMV 9,3 tỷ USD (66,7% thị phần, tăng 41%), trong khi TikTok Shop bứt phá ngoạn mục với GMV 3,8 tỷ USD (26,9% thị phần, tăng 99%). Áp lực cạnh tranh buộc hai bên đổi mới phương thức livestream và logistics.',
        keyTakeaways: [
          'Shopee: GMV 9,3 tỷ USD, 66,7% thị phần, tăng trưởng 41%.',
          'TikTok Shop: GMV 3,8 tỷ USD, 26,9% thị phần, tăng trưởng thần tốc 99%.',
          'Động lực thúc đẩy Shoppertainment và nâng chuẩn dịch vụ giao nhận.',
          'Ràng buộc pháp lý bởi Luật Cạnh tranh 23/2018/QH14.'
        ],
        citation: 'VCCI (2025) & YouNet ECI / Google, Temasek & Bain (2024)'
      }
    ]
  },
  {
    id: 'module-05',
    number: '05',
    title: 'Quy luật lưu thông tiền tệ',
    subtitle: 'Công thức M = (P × Q)/V, 3 tác động & Diễn biến kinh tế vĩ mô Việt Nam 2025',
    description: 'Xác định lượng tiền cần thiết trong nền kinh tế, công thức toán học KaTeX, công cụ tính toán tương tác và phân tích số liệu M2, Tín dụng, CPI và GDP năm 2025.',
    pdfPages: [8, 9, 10],
    icon: 'Banknote',
    estimatedMinutes: 22,
    interactiveComponent: 'money-calc',
    sections: [
      {
        id: 'm5-s1',
        title: 'Nội dung & Công thức quy luật lưu thông tiền tệ',
        pdfPage: 8,
        content: `Quy luật lưu thông tiền tệ **phản ánh yêu cầu về lượng tiền cần thiết cho lưu thông hàng hóa trong một thời kỳ nhất định** *(Bộ Giáo dục và Đào tạo, 2019, tr. 44)*.

Theo cách trình bày cơ bản của kinh tế chính trị Mác – Lênin, lượng tiền cần thiết cho lưu thông phụ thuộc vào **tổng giá cả hàng hóa** và **tốc độ lưu thông của tiền tệ**.

Có thể khái quát bằng công thức:

$$M = \\frac{P \\times Q}{V}$$

Trong đó:
- **$M$**: Lượng tiền cần thiết cho lưu thông trong một thời kỳ xác định.
- **$P \\times Q$**: Tổng giá cả của hàng hóa, dịch vụ được đưa vào lưu thông trong kỳ ($P$: Mức giá cả bình quân; $Q$: Tổng khối lượng hàng hóa, dịch vụ đưa ra thị trường).
- **$V$**: Tốc độ lưu thông bình quân của tiền tệ (số vòng quay của một đơn vị tiền tệ trong kỳ).

*Lưu ý học thuật*: Khi xét thêm các giao dịch bán chịu, các khoản thanh toán bù trừ và những khoản đến hạn phải thanh toán, công thức đầy đủ cần tính đến những yếu tố này. Vì vậy, công thức trên là cách khái quát đơn giản cho trường hợp cơ bản *(Bộ Giáo dục và Đào tạo, 2019, tr. 44)*.`,
        summary: 'Lượng tiền cần thiết M tỉ lệ thuận với tổng giá cả P × Q và tỉ lệ nghịch với tốc độ chu chuyển của đồng tiền V: M = (P × Q) / V.',
        keyTakeaways: [
          'Công thức cơ bản: M = (P × Q) / V.',
          'M phụ thuộc đồng thời vào quy mô hàng hóa (P×Q) và số vòng quay tiền tệ (V).',
          'Là cơ sở khoa học cốt lõi cho Ngân hàng Trung ương điều tiết cung tiền M2.'
        ],
        citation: 'Bộ Giáo dục và Đào tạo, 2019, tr. 44'
      },
      {
        id: 'm5-s2',
        title: 'Ba tác động của quy luật lưu thông tiền tệ',
        pdfPage: 9,
        content: `Ba tác động cơ bản của quy luật lưu thông tiền tệ:

1. **Thứ nhất, lượng tiền đưa vào lưu thông cần phù hợp với nhu cầu giao dịch của nền kinh tế**:
   Nếu lượng tiền tăng nhanh hơn khả năng cung ứng hàng hóa, dịch vụ trong những điều kiện nhất định, áp lực tăng giá có thể xuất hiện (dẫn tới nguy cơ lạm phát) *(Bộ Giáo dục và Đào tạo, 2019, tr. 44)*.

2. **Thứ hai, có ý nghĩa đối với việc quản lý tiền tệ và ổn định sức mua của đồng tiền**:
   Việc điều hành chính sách tiền tệ cần xem xét tốc độ tăng trưởng kinh tế, nhu cầu thanh toán, diễn biến giá cả và các yếu tố liên quan *(Bộ Giáo dục và Đào tạo, 2019, tr. 44)*.

3. **Thứ ba, tác động của các phương tiện thanh toán điện tử**:
   Sự phát triển của thanh toán không dùng tiền mặt (thẻ, ví điện tử, chuyển khoản QR) làm thay đổi cách thức thực hiện giao dịch, giúp việc thanh toán thuận tiện và tăng tốc độ vòng quay tiền tệ ($V$). Tuy nhiên, thanh toán điện tử không có nghĩa là toàn bộ tiền trong nền kinh tế đã biến mất hoặc quy luật lưu thông tiền tệ không còn tác dụng *(Bộ Giáo dục và Đào tạo, 2019, tr. 44)*.`,
        summary: '3 tác động: (1) Cân đối lượng tiền với hàng hóa tránh lạm phát; (2) Cơ sở điều hành chính sách tiền tệ vĩ mô; (3) Thanh toán điện tử làm tăng tốc độ V nhưng không làm mất hiệu lực của quy luật.',
        keyTakeaways: [
          'Cung tiền vượt quá hàng hóa thực tế sẽ gây áp lực trượt giá, lạm phát.',
          'Cơ sở định hướng chính sách lãi suất và hạn mức tín dụng của Ngân hàng Nhà nước.',
          'Thanh toán số làm tăng V, giảm nhu cầu tiền mặt vật lý nhưng bản chất quy luật giữ nguyên.'
        ],
        citation: 'Bộ Giáo dục và Đào tạo, 2019, tr. 44'
      },
      {
        id: 'm5-s3',
        title: 'Ví dụ kinh tế Việt Nam năm 2025: Số liệu & Phân tích',
        pdfPage: 9,
        content: `Ở Việt Nam, quy luật lưu thông tiền tệ thể hiện rõ qua mối quan hệ giữa lượng tiền trong nền kinh tế và lượng hàng hóa, dịch vụ được mua bán.

Theo số liệu từ **Cục Thống kê Quốc gia**:
- Đến ngày 22/12/2025: **Tổng phương tiện thanh toán (M2) tăng 14,98%** so với cuối năm 2024.
- **Dư nợ tín dụng tăng 17,65%** so với cuối năm 2024, cho thấy nguồn vốn được mở rộng hỗ trợ sản xuất kinh doanh.
- **Chỉ số giá tiêu dùng (CPI) bình quân năm 2025 tăng 3,31%**, thấp hơn mức tăng **3,63% của năm 2024**, đạt mục tiêu Quốc hội đề ra.
- **Tổng sản phẩm trong nước (GDP) năm 2025 tăng trưởng 8,02%** so với năm trước.

**Phân tích học thuật sâu sắc từ tài liệu**:
Những số liệu trên cho thấy lượng tiền và hoạt động cho vay của ngân hàng tăng lên, đồng thời nền kinh tế cũng phát triển và sản xuất được nhiều hàng hóa, dịch vụ hơn (GDP +8,02%). Vì vậy, dù lượng tiền tăng (+14,98%), giá cả không nhất thiết phải tăng với cùng tỷ lệ (CPI chỉ tăng 3,31%).

*Nguyên lý cốt lõi*: Nếu lượng tiền tăng nhanh trong khi hàng hóa không tăng tương ứng, lạm phát sẽ bùng phát. Ngược lại, khi năng lực sản xuất phát triển, hàng hóa dồi dào đáp ứng nhu cầu thì áp lực tăng giá được kiềm chế. Ngân hàng Nhà nước cần điều tiết cung tiền ăn khớp với nhịp độ sản xuất thực tế để giữ vững ổn định kinh tế vĩ mô.`,
        summary: 'Năm 2025: M2 tăng 14,98%, tín dụng tăng 17,65%, nhưng CPI chỉ tăng 3,31% nhờ GDP tăng trưởng mạnh 8,02% cung ứng hàng hóa dồi dào. Lượng tiền tăng không nhất thiết gây lạm phát nếu sản xuất thực tế tăng trưởng tương ứng.',
        keyTakeaways: [
          'M2 tăng 14,98%, Tín dụng tăng 17,65% hỗ trợ thanh khoản nền kinh tế.',
          'GDP tăng 8,02% tạo lượng hàng hóa đối ứng khổng lồ.',
          'CPI giữ mức ổn định 3,31% (thấp hơn 3,63% năm 2024), chứng minh sự điều hành nhịp nhàng của Ngân hàng Nhà nước.'
        ],
        citation: 'Cục Thống kê Quốc gia (Báo cáo KTXH 2025) & Báo Điện tử Chính phủ (2026)'
      }
    ]
  },
  {
    id: 'module-06',
    number: '06',
    title: 'Mối quan hệ giữa các quy luật',
    subtitle: 'Tác động tương hỗ hữu cơ & Chuỗi vận động thị trường cà phê Việt Nam',
    description: 'Phân tích cơ chế phối hợp đồng thời của 4 quy luật kinh tế, khám phá Interactive Knowledge Graph và ví dụ xuyên suốt về thị trường cà phê trong PDF.',
    pdfPages: [10],
    icon: 'Network',
    estimatedMinutes: 15,
    interactiveComponent: 'knowledge-graph',
    sections: [
      {
        id: 'm6-s1',
        title: 'Tác động qua lại giữa 4 quy luật kinh tế',
        pdfPage: 10,
        content: `Bốn quy luật trên **không hoạt động tách biệt mà có sự tác động qua lại trong nền kinh tế hàng hóa**:

- **Quy luật giá trị**: Đặt ra yêu cầu sản xuất và trao đổi dựa trên *hao phí lao động xã hội cần thiết*, đồng thời thúc đẩy tiết kiệm chi phí và nâng cao năng suất.
- **Quy luật cung – cầu**: Thể hiện mối quan hệ giữa *lượng hàng hóa được cung ứng và nhu cầu mua* của thị trường, qua đó tác động đến sự biến động giá cả xoay quanh trục giá trị và định hướng quyết định sản xuất.
- **Quy luật cạnh tranh**: Thúc đẩy các chủ thể kinh tế *tìm kiếm lợi thế*, cải tiến kỹ thuật, nâng cao chất lượng dịch vụ và phân bổ nguồn lực theo tín hiệu thị trường.
- **Quy luật lưu thông tiền tệ**: Phản ánh yêu cầu về *lượng tiền cần thiết* cho lưu thông hàng hóa, gắn với nhu cầu giao dịch và sự ổn định giá cả.

Các quy luật này cùng tác động đồng thời đến quyết định của người sản xuất, doanh nghiệp, người tiêu dùng và cơ quan quản lý nhà nước.`,
        summary: '4 quy luật tác động đa chiều: Giá trị là nền tảng chi phí; Cung - Cầu làm giá dao động; Cạnh tranh thúc đẩy đổi mới; Lưu thông tiền tệ bảo đảm phương tiện thanh toán.',
        keyTakeaways: [
          'Không một quy luật nào hoạt động đơn độc trong thực tế.',
          'Quy luật giá trị là cơ sở gốc rễ của mọi quan hệ kinh tế hàng hóa.',
          'Nhà nước và doanh nghiệp phải nắm bắt tổng hòa cả 4 quy luật để ra quyết định tối ưu.'
        ],
        citation: 'Trang 10, Mục 3: Mối quan hệ giữa các quy luật cơ bản'
      },
      {
        id: 'm6-s2',
        title: 'Ví dụ chuỗi liên kết thị trường cà phê Việt Nam',
        pdfPage: 10,
        content: `Tài liệu sử dụng ví dụ thị trường cà phê để minh họa cách cả bốn quy luật cùng tương tác:

1. **Quy luật Cung – Cầu phát tín hiệu**: Khi nhu cầu tiêu dùng cà phê thế giới và nội địa tăng nhưng nguồn cung chưa đáp ứng kịp, giá cà phê có xu hướng tăng cao.
2. **Quy luật Giá trị điều tiết sản xuất**: Sự biến động giá tăng tạo động lực và khả năng sinh lời, thúc đẩy người nông dân mở rộng diện tích trồng hoặc đầu tư thâm canh nâng cao năng suất để tối ưu hao phí cá biệt.
3. **Quy luật Cạnh tranh định hình thị phần**: Các doanh nghiệp và nông hộ không chỉ cạnh tranh về giá mà còn cạnh tranh bằng chất lượng sản phẩm, chứng nhận phát triển bền vững (SC), công nghệ chế biến sâu và hệ thống phân phối xuất khẩu.
4. **Quy luật Lưu thông tiền tệ hiện thực hóa giao dịch**: Toàn bộ chuỗi mua bán phân bón, vật tư, thu mua cà phê nhân xô và xuất khẩu đều được thực hiện thông qua tiền tệ và các phương tiện thanh toán ngân hàng, đòi hỏi lượng tiền tệ lưu thông phải tương thích.`,
        summary: 'Chuỗi thị trường cà phê: Cầu tăng → Giá tăng (Cung - Cầu) → Mở rộng sản xuất, giảm hao phí (Giá trị) → Cạnh tranh chất lượng, chứng nhận bền vững (Cạnh tranh) → Thanh toán qua hệ thống tiền tệ (Lưu thông tiền tệ).',
        keyTakeaways: [
          'Cung - cầu mở đường bằng tín hiệu giá cả.',
          'Giá trị dẫn dắt phân bổ nguồn lực và năng suất lao động.',
          'Cạnh tranh thúc đẩy chuẩn hóa quy trình và tiêu chuẩn bền vững.',
          'Tiền tệ đóng vai trò môi giới lưu thông thông suốt toàn bộ chuỗi giá trị.'
        ],
        citation: 'Trang 10, Đoạn 2: Ví dụ minh họa thị trường cà phê'
      }
    ]
  },
  {
    id: 'module-07',
    number: '07',
    title: 'Kết luận & Tài liệu tham khảo',
    subtitle: 'Đúc kết khoa học & 10 nguồn trích dẫn học thuật chuẩn xác từ PDF',
    description: 'Tổng kết vai trò khách quan của các quy luật, sự điều tiết cần thiết của Nhà nước và toàn bộ danh mục 10 tài liệu tham khảo chính thức.',
    pdfPages: [10, 11, 12],
    icon: 'BookOpen',
    estimatedMinutes: 12,
    sections: [
      {
        id: 'm7-s1',
        title: 'Kết luận toàn diện về các quy luật kinh tế',
        pdfPage: 10,
        content: `Các quy luật **giá trị, cung – cầu, cạnh tranh và lưu thông tiền tệ** là những quy luật cơ bản có vai trò quan trọng trong sự vận động của nền kinh tế hàng hóa. Mỗi quy luật có nội dung và cơ chế tác động riêng, nhưng đều góp phần chi phối hoạt động sản xuất, trao đổi, tiêu dùng và sự hình thành giá cả trên thị trường *(Bộ Giáo dục và Đào tạo, 2019)*.

**Ý nghĩa thực tiễn trong nền kinh tế hiện nay**:
- **Đối với doanh nghiệp**: Giúp xây dựng kế hoạch sản xuất kinh doanh sát thực tế, phân bổ và sử dụng nguồn lực hiệu quả, chủ động đổi mới công nghệ để nâng cao năng lực cạnh tranh.
- **Đối với người tiêu dùng**: Giúp đưa ra quyết định mua sắm hợp lý, cân đối ngân sách và lựa chọn sản phẩm thay thế phù hợp.
- **Đối với Nhà nước**: Cung cấp cơ sở khoa học để hoạch định chính sách kinh tế vĩ mô, điều tiết cung tiền, kiểm soát lạm phát, ổn định thị trường và bảo vệ quyền lợi hợp pháp của các chủ thể tham gia.

**Quan điểm phát triển bền vững**:
Các quy luật kinh tế vận động mang tính **khách quan** và luôn tạo ra cả tác động tích cực lẫn tiêu cực (mặt trái). Do đó, cần **tôn trọng sự vận động của thị trường**, đồng thời **phát huy vai trò quản lý của Nhà nước** để hạn chế những mặt trái, bảo đảm môi trường kinh doanh lành mạnh, bình đẳng và hướng tới sự phát triển bền vững.`,
        summary: 'Các quy luật vận động khách quan, chi phối toàn bộ nền kinh tế. Cần tôn trọng thị trường kết hợp phát huy vai trò điều tiết của Nhà nước để hạn chế mặt trái và phát triển bền vững.',
        keyTakeaways: [
          'Chi phối toàn diện hoạt động của doanh nghiệp, người tiêu dùng và Nhà nước.',
          'Quy luật kinh tế vừa có mặt tích cực vừa có nguy cơ tiêu cực.',
          'Kết hợp hài hòa bàn tay thị trường khách quan và bàn tay điều tiết của Nhà nước.'
        ],
        citation: 'Trang 10-11, Mục 4: Kết luận'
      }
    ]
  }
];
