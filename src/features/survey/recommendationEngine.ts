import type { TeaProduct } from '@/types/tea.types';
import type { SurveyAnswers, RecommendationResult, RecommendedTeaItem } from '@/types/survey.types';
import { teaData } from '@/data';

interface TeaDetailsPreset {
  id: string;
  badgeLabel: string;
  headline: string;
  biochemicalReason: string;
  sensoryNote: string;
  brewingTemp: string;
  ritualNote: string;
}

const TEA_PRESETS: Record<string, TeaDetailsPreset> = {
  'tra-tan-cuong': {
    id: 'tra-tan-cuong',
    badgeLabel: 'Hòa Hợp Tuyệt Đối',
    headline: 'Lục Trà Tân Cương: Đệ Nhất Khí Chất Tỉnh Thức',
    biochemicalReason:
      'Lục Trà Tân Cương sở hữu hàm lượng L-Theanine đặc hữu vượt trội (>50% tổng axit amin), kết hợp tỷ lệ vàng cùng Catechin (đặc biệt là EGCG). L-Theanine kích thích dải sóng não Alpha (8-12 Hz), đưa hệ thần kinh vào trạng thái tỉnh thức sâu sắc, tập trung minh mẫn mà không gây cồn cào hay tim đập nhanh. Vị tiền chát thanh chuyển hóa nhanh chóng thành hậu ngọt Umami lắng đọng.',
    sensoryNote:
      'Sắc nước xanh trong ánh vàng mật ong non, thoảng hương cốm nếp đầu mùa tinh khiết xứ Bắc. Tiền chát dịu êm nơi đầu lưỡi và hậu ngọt đượm dài nơi cổ họng.',
    brewingTemp: '75°C - 80°C (tránh nước sôi 100°C làm biến tính L-Theanine và diệp lục)',
    ritualNote:
      'Hãm 35-45 giây trong ấm tử sa hoặc chén khải men ngọc. Thưởng thức vào sáng sớm hoặc đầu giờ chiều để kích hoạt nguồn cảm hứng sáng tạo.',
  },
  'tra-b-lao': {
    id: 'tra-b-lao',
    badgeLabel: 'Thanh Lương Vỗ Về',
    headline: 'Trà Ô Long Bảo Lộc: Thanh Lương Vỗ Về Thân Tâm',
    biochemicalReason:
      'Quá trình bán oxy hóa (50-70%) và 36 giờ siết banh cơ học kích hoạt enzym Polyphenol Oxidase (PPO), chuyển hóa polyphenol đắng chát thành theaflavin và các dẫn xuất thơm este (lactone, terpenoid). Sự chuyển hóa này làm dịu hoàn toàn vị chát gắt, kiến tạo nốt hương hoa mộc và vị bơ sữa ngậy tự nhiên, kích hoạt hệ thần kinh đối giao cảm giúp xoa dịu căng thẳng và đưa tâm trí vào trạng thái an yên thư thái.',
    sensoryNote:
      'Nước trà vàng óng ánh hổ phách, hương hoa mộc lan thanh thoát quyện cùng nốt bơ sữa ngậy béo tự nhiên. Chất nước tròn đầy, êm mượt, không hề chát gắt.',
    brewingTemp: '85°C - 90°C (nhiệt độ chuẩn để đánh thức từng viên trà cuộn siết bung tỏa)',
    ritualNote:
      'Hãm trà trong 45-60 giây. Thích hợp thưởng ẩm vào buổi chiều tà hoặc tối muộn bên tiếng nhạc thiền dân tộc, gác lại mọi âu lo ngày dài.',
  },
  'tra-shan-tuyet-ha-giang': {
    id: 'tra-shan-tuyet-ha-giang',
    badgeLabel: 'Linh Khí Núi Cao',
    headline: 'Trà Shan Tuyết Cổ Thụ: Linh Khí Núi Rừng Hoàng Liên Sơn',
    biochemicalReason:
      'Búp chè từ cây cổ thụ 100 - 500 năm tuổi sinh trưởng ở độ cao 1000 - 1800m quanh năm sương tuyết che phủ, được bao bọc bởi lớp mao trạng (trichomes) trắng muốt. Khi hãm, các sợi mao trạng tạo hệ huyền phù mịn màng làm dịu gai vị giác, hòa cùng khoáng chất vi lượng từ tầng đá vôi cổ xưa tạo nên vị ngọt thanh sạch và nội chất dày dặn trường tồn.',
    sensoryNote:
      'Sắc nước vàng rơm sóng sánh óng ánh tơ sương. Hương thơm ngát của mật ong rừng hòa quyện hoa dại Tây Bắc, vị đằm mộc mạc và hậu vị ngọt sâu không dứt.',
    brewingTemp: '85°C - 95°C (búp chè cổ thụ dày dặn, chịu nhiệt bền bỉ qua 7-10 tuần nước)',
    ritualNote:
      'Tráng nhanh nước đầu trong 5 giây, sau đó hãm 40-50 giây. Cảm nhận độ dày của ngụm trà trôi êm qua cuống họng và âm vang đại ngàn kỳ vĩ.',
  },
  'tra-sen-tay-ho': {
    id: 'tra-sen-tay-ho',
    badgeLabel: 'Tinh Hoa Cung Đình',
    headline: 'Trà Sen Tây Hồ Bách Diệp: Tinh Hoa Đài Các Thăng Long',
    biochemicalReason:
      'Sự hòa quyện đỉnh cao giữa búp Lục Trà Tân Cương giàu L-Theanine và gạo sen Bách Diệp chứa 18 hợp chất tinh dầu quý hiếm. Quá trình ướp 7 lượt thẩm thấu các phân tử thơm tự nhiên vào tận tâm búp trà, vừa kích hoạt tinh thần minh mẫn, vừa giải tỏa căng thẳng thần kinh và đem lại cảm giác thanh thản đài các.',
    sensoryNote:
      'Sắc nước xanh trong ánh vàng hổ phách, ngào ngạt hương sen bách diệp thanh tao, tiền chát dịu êm chuyển hóa thành hậu ngọt ngậy béo lan tỏa khắp khoang miệng.',
    brewingTemp: '80°C - 85°C (nhiệt độ giữ trọn hương sen tinh khiết không bị nồng)',
    ritualNote:
      'Thưởng thức trong chén khải men lam mỏng hoặc chén sứ trắng để vừa thưởng hương sen ngào ngạt vừa ngắm sắc nước tinh tế.',
  },
  'hong-tra-shan-tuyet': {
    id: 'hong-tra-shan-tuyet',
    badgeLabel: 'Hổ Phách Ấm Áp',
    headline: 'Hồng Trà Shan Tuyết Cổ Thụ: Hương Vị Mật Ong & Quả Chín',
    biochemicalReason:
      'Quá trình oxy hóa hoàn toàn (90-100%) chuyển hóa triệt để Catechin thành Theaflavin và Thearubigin, loại bỏ hoàn toàn vị chát gắt. Nồng độ thearubigin cao tạo sắc đỏ ruby và mang đặc tính dưỡng vị, làm ấm dạ dày và hỗ trợ an thần sâu giấc mà không gây mất ngủ.',
    sensoryNote:
      'Nước trà màu đỏ ruby trong suốt, hương thơm nồng nàn của mật ong rừng hoa ban quyện cùng nốt quả chín sấy khô. Hậu vị ngọt ấm, êm mượt như nhung.',
    brewingTemp: '90°C - 95°C',
    ritualNote:
      'Rất thích hợp thưởng thức vào những buổi chiều đông se lạnh hoặc sau bữa tối để thư giãn tiêu hóa và nuôi dưỡng giấc ngủ sâu.',
  },
  'hac-tra-pho-nhi': {
    id: 'hac-tra-pho-nhi',
    badgeLabel: 'Trầm Tĩnh Niên Đại',
    headline: 'Hắc Trà Phổ Nhĩ Shan Tuyết: Trầm Tích Thời Gian & Rừng Già',
    biochemicalReason:
      'Lên men hậu kỳ nhờ hệ vi sinh vật bản địa tự nhiên trên búp chè cổ thụ Tây Côn Lĩnh qua nhiều năm. Quá trình sinh hóa đặc biệt này tổng hợp hàm lượng lớn Theabrownin và statin tự nhiên, giúp điều hòa chuyển hóa lipid, thanh lọc cơ thể và mang lại sự tĩnh tại, an thần sâu.',
    sensoryNote:
      'Sắc nước đỏ nâu đậm đà trong suốt, phảng phất hương gỗ mộc trầm ấm, lá mục rừng già và rêu phong. Nước trà dày dặn, ngọt dịu êm ái, trơn mượt vòm họng.',
    brewingTemp: '95°C - 100°C (nước sôi già để đánh thức bánh trà nén niên đại)',
    ritualNote:
      'Pha bằng ấm đất nung tử sa đáy dày. Thưởng ẩm trong không gian trà thất tĩnh lặng, đọc sách hoặc tĩnh tọa dưỡng tâm.',
  },
};

const getTeaProduct = (id: string): TeaProduct => {
  return teaData.find((t) => t.id === id) || teaData[0];
};

export const calculateRecommendation = (answers: SurveyAnswers): RecommendationResult => {
  const mindState = answers.mindState ?? 'alert_focus';
  const flavor = answers.flavor ?? 'astringent_sweet';
  const processing = answers.processingStyle ?? 'fresh_unfermented';

  // Hệ thống chấm điểm tương thích cho từng dòng trà trong danh mục
  const teaScores: Record<string, number> = {
    'tra-tan-cuong': 50,
    'tra-b-lao': 50,
    'tra-shan-tuyet-ha-giang': 50,
    'tra-sen-tay-ho': 50,
    'hong-tra-shan-tuyet': 50,
    'hac-tra-pho-nhi': 50,
  };

  // 1. Phân bổ điểm theo MindState
  if (mindState === 'alert_focus') {
    teaScores['tra-tan-cuong'] += 25;
    teaScores['tra-sen-tay-ho'] += 20;
    teaScores['tra-shan-tuyet-ha-giang'] += 15;
    teaScores['tra-b-lao'] += 5;
  } else if (mindState === 'relax_soothe') {
    teaScores['tra-b-lao'] += 25;
    teaScores['hong-tra-shan-tuyet'] += 22;
    teaScores['hac-tra-pho-nhi'] += 18;
    teaScores['tra-sen-tay-ho'] += 15;
  } else if (mindState === 'wild_heritage') {
    teaScores['tra-shan-tuyet-ha-giang'] += 25;
    teaScores['hac-tra-pho-nhi'] += 22;
    teaScores['hong-tra-shan-tuyet'] += 18;
    teaScores['tra-tan-cuong'] += 10;
  }

  // 2. Phân bổ điểm theo Flavor Profile
  if (flavor === 'astringent_sweet') {
    teaScores['tra-tan-cuong'] += 20;
    teaScores['tra-shan-tuyet-ha-giang'] += 15;
    teaScores['tra-sen-tay-ho'] += 10;
  } else if (flavor === 'floral_milky') {
    teaScores['tra-b-lao'] += 22;
    teaScores['tra-sen-tay-ho'] += 20;
    teaScores['hong-tra-shan-tuyet'] += 12;
  } else if (flavor === 'honey_mineral') {
    teaScores['tra-shan-tuyet-ha-giang'] += 22;
    teaScores['hong-tra-shan-tuyet'] += 18;
    teaScores['hac-tra-pho-nhi'] += 18;
  }

  // 3. Phân bổ điểm theo Processing Style
  if (processing === 'fresh_unfermented') {
    teaScores['tra-tan-cuong'] += 20;
    teaScores['tra-shan-tuyet-ha-giang'] += 15;
  } else if (processing === 'oxidized_fermented') {
    teaScores['tra-b-lao'] += 20;
    teaScores['hong-tra-shan-tuyet'] += 20;
    teaScores['hac-tra-pho-nhi'] += 20;
  } else if (processing === 'flower_scented') {
    teaScores['tra-sen-tay-ho'] += 25;
    teaScores['tra-b-lao'] += 12;
  }

  // Sắp xếp các dòng trà theo điểm số giảm dần
  const rankedTeaEntries = Object.entries(teaScores).sort((a, b) => b[1] - a[1]);

  const maxRawScore = rankedTeaEntries[0][1];

  // Chuẩn hóa điểm thành phần trăm (90-99% cho top 1, 80-92% cho top tiếp theo)
  const recommendations: RecommendedTeaItem[] = rankedTeaEntries
    .slice(0, 3)
    .filter(([_, score], idx) => idx === 0 || score >= maxRawScore - 15) // Chỉ lấy các trà thực sự đồng điệu (<= 15 điểm chênh lệch)
    .map(([teaId, rawScore], index) => {
      const preset = TEA_PRESETS[teaId] || TEA_PRESETS['tra-tan-cuong'];
      const product = getTeaProduct(teaId);
      const isPrimary = index === 0;

      // Tính điểm hiển thị đẹp mắt
      const matchedScore = isPrimary
        ? Math.min(99, 95 + Math.round((rawScore / 115) * 4))
        : Math.min(94, Math.max(82, Math.round((rawScore / maxRawScore) * 94)));

      return {
        product,
        matchedScore,
        matchType: isPrimary ? ('primary' as const) : ('alternative' as const),
        badgeLabel: isPrimary ? 'Danh Trà Tri Kỷ' : 'Gợi Ý Đồng Điệu',
        headline: preset.headline,
        biochemicalReason: preset.biochemicalReason,
        sensoryNote: preset.sensoryNote,
        brewingTemp: preset.brewingTemp,
        ritualNote: preset.ritualNote,
      };
    });

  const primaryItem = recommendations[0];

  return {
    region: primaryItem.product.region,
    product: primaryItem.product,
    matchedScore: primaryItem.matchedScore,
    headline: primaryItem.headline,
    biochemicalReason: primaryItem.biochemicalReason,
    sensoryNote: primaryItem.sensoryNote,
    brewingTemp: primaryItem.brewingTemp,
    ritualNote: primaryItem.ritualNote,
    recommendations,
  };
};
