// Dữ liệu bộ tranh dân gian 3 miền in trên giấy dó nén bã trà GENTEA 2026

export interface FolkArtwork {
  id: string;
  traditionId: 'dong-ho' | 'lang-sinh' | 'tranh-kieng';
  traditionName: string;
  region: string;
  title: string;
  subtitle: string;
  teaPaperType: string;
  teaPaperDesc: string;
  story: string;
  pigments: string[];
  teaPairing: string;
  mood: string;
  artCategory: string;
}

export const FOLK_ARTWORKS: FolkArtwork[] = [
  // ==================== TRANH ĐÔNG HỒ (MIỀN BẮC) ====================
  {
    id: 'dongho-muc-dong',
    traditionId: 'dong-ho',
    traditionName: 'Tranh Đông Hồ (Bắc Ninh)',
    region: 'Miền Bắc',
    title: 'Mục Đồng Thổi Tiêu',
    subtitle: 'Chăn trâu thả diều • Tiếng sáo trúc đồng nội Kinh Bắc',
    teaPaperType: 'Giấy Dó nén bã Lục Trà Tân Cương',
    teaPaperDesc:
      'Vỏ dướng giã tay phối cùng bã chè búp Tân Cương sấy lạnh, nén nhiệt tạo nền giấy thô mộc lấm tấm sợi trà, thoảng hương cốm non mộc mạc.',
    story:
      'Hình ảnh cậu bé mục đồng ngồi vắt vẻo trên lưng trâu, tay nâng tiêu trúc gửi vào mây trời khúc nhạc thanh bình. Đóa sen ngát hương dưới chân trâu gợi nhắc sự thanh sạch, an nhiên của tâm hồn người Việt chốn thôn dã.',
    pigments: ['Điệp vỏ sò quét chổi thông', 'Than lá tre già đen nhánh', 'Vàng hoa hòe ấm áp', 'Đỏ son chu sa'],
    teaPairing: 'Lục Trà Tân Cương thượng hạng (vị tiền chát ngọt hậu làm bừng nở xúc giác)',
    mood: 'Thanh tịnh • An nhiên • Gần gũi',
    artCategory: 'Đồng dao dân gian',
  },
  {
    id: 'dongho-dam-cuoi-chuot',
    traditionId: 'dong-ho',
    traditionName: 'Tranh Đông Hồ (Bắc Ninh)',
    region: 'Miền Bắc',
    title: 'Đám Cưới Chuột',
    subtitle: 'Nghênh hôn hỷ lạc • Khắc họa trào lộng thâm trầm',
    teaPaperType: 'Giấy Dó nén bã Lục Trà Tân Cương & Than Lá Tre',
    teaPaperDesc:
      'Sợi dó dai mịn hòa cùng vụn bã trà xanh phơi nắng, tạo độ xốp nhẹ giúp mực mộc bản thấm sâu từng thớ giấy.',
    story:
      'Tác phẩm trào lộng bậc nhất của mỹ thuật dân gian Đông Hồ. Đoàn chuột rước dâu kèn trống rộn ràng, dâng cá dâng chim cho mèo béo với nụ cười hóm hỉnh, mang triết lý ứng xử hòa hiếu, nhân văn nơi làng xã xưa.',
    pigments: ['Đen khói than rơm nếp', 'Trắng điệp xà cừ', 'Đỏ gỉ đồng nung', 'Vàng hạt dành dành'],
    teaPairing: 'Trà Móc Câu Đại Từ (đậm đà, bùi ngậy, khơi mở câu chuyện đầu xuân)',
    mood: 'Hỷ lạc • Trí tuệ • Trào lộng',
    artCategory: 'Trào lộng dân gian',
  },
  {
    id: 'dongho-vinh-hoa',
    traditionId: 'dong-ho',
    traditionName: 'Tranh Đông Hồ (Bắc Ninh)',
    region: 'Miền Bắc',
    title: 'Vinh Hoa - Bé Ôm Gà Đại Cát',
    subtitle: 'Gà trống ngũ đức • Ước nguyện no ấm thái bình',
    teaPaperType: 'Giấy Dó nén bã Trà Shan Tuyết Cổ Thụ',
    teaPaperDesc:
      'Sợi búp chè Shan tuyết cổ thụ chứa mao trạng trắng mịn được dập ép cùng xơ dó, cho sắc vàng hổ phách quý phái.',
    story:
      'Bé trai bụ bẫm ôm chú gà trống oai vệ. Chú gà tượng trưng cho năm đức tính của bậc quân tử: Văn - Vũ - Dũng - Nhân - Tín. Bức tranh là lời chúc phúc đầu năm cho gia đình sung túc, con cháu phương trưởng.',
    pigments: ['Sơn then bóng mịn', 'Vỏ sò điệp nghiền mịn lấp lánh', 'Đỏ chu sa đất đồi', 'Vàng nghệ tự nhiên'],
    teaPairing: 'Trà Shan Tuyết Suối Giàng (hương khói lam chiều, vị ngọt mật lắng đọng)',
    mood: 'Sung túc • Hoan hỷ • Phú quý',
    artCategory: 'Chúc tụng đầu xuân',
  },
  {
    id: 'dongho-hung-dua',
    traditionId: 'dong-ho',
    traditionName: 'Tranh Đông Hồ (Bắc Ninh)',
    region: 'Miền Bắc',
    title: 'Hứng Dừa',
    subtitle: 'Tình tứ làng quê • Vạt váy lụa đón quả ngọt',
    teaPaperType: 'Giấy Dó nén bã Lục Trà Phủ Điệp Óng Ánh',
    teaPaperDesc:
      'Bề mặt giấy dó đúc bã trà được quét một lớp hồ điệp mỏng, ánh lên sắc bạc xà cừ như nắng mai xuyên qua rặng dừa.',
    story:
      'Chàng trai thoăn thoắt trèo cây hái dừa thả xuống cho người thương đón lấy bằng vạt váy. Bức họa mộc mạc ngợi ca tình yêu đôi lứa hồn nhiên, gắn kết cùng nếp sinh hoạt cần lao đầy thi vị của thôn quê Bắc Bộ.',
    pigments: ['Chàm lá cây rừng', 'Hoa hòe vàng mơ', 'Bột điệp ánh xà cừ', 'Than rơm nếp'],
    teaPairing: 'Trà Ướp Hoa Nhài Cổ Truyền (hương hoa thanh thoát như làn gió đồng quê)',
    mood: 'Duyên dáng • Tươi vui • Thi vị',
    artCategory: 'Sinh hoạt phong tục',
  },
  {
    id: 'dongho-to-nu',
    traditionId: 'dong-ho',
    traditionName: 'Tranh Đông Hồ (Bắc Ninh)',
    region: 'Miền Bắc',
    title: 'Tố Nữ Cổ Truyền',
    subtitle: 'Tứ bình thanh nhã • Cung đàn phách nhịp bên án trà',
    teaPaperType: 'Giấy Dó nén bã Trà Cổ Thụ Hà Giang',
    teaPaperDesc:
      'Xơ dướng tự nhiên ngâm nước giếng ngọc, ép thủ công với bã trà cổ thụ tạo thớ giấy mềm mại, thơm ngát thảo mộc cổ.',
    story:
      'Thiếu nữ Kinh Bắc đoan trang trong tà áo tứ thân, tay nâng cây đàn nguyệt dạo khúc thiền ca. Vẻ đẹp thanh thoát, kín đáo hòa cùng hương khói trà trầm gợi nhớ phong thái tao nhã của danh sĩ đất Thăng Long xưa.',
    pigments: ['Mực nho mộc bản cổ', 'Điệp óng ánh rải đều', 'Vàng hoa dành dành', 'Hồng cánh sen son'],
    teaPairing: 'Bạch Trà Shan Tuyết Cổ Thụ (vị ngọt thanh tuyết trắng, êm dịu sâu lắng)',
    mood: 'Tao nhã • Tĩnh mặc • Quý phái',
    artCategory: 'Tố nữ tứ bình',
  },

  // ==================== TRANH LÀNG SÌNH (MIỀN TRUNG) ====================
  {
    id: 'langsinh-bat-am',
    traditionId: 'lang-sinh',
    traditionName: 'Tranh Làng Sình (Cố Đô Huế)',
    region: 'Miền Trung',
    title: 'Bát Âm Triều Hạ',
    subtitle: 'Nhã nhạc cung đình • Khúc hoan ca bên dòng sông Hương',
    teaPaperType: 'Giấy Dó nén bã Trà Sen Cung Đình Huế',
    teaPaperDesc:
      'Xơ dướng mộc kết hợp cùng bã trà sen ngâm ủ trong chum sành, ép nhiệt thủ công tạo nên bề mặt nâu cánh gián cổ kính.',
    story:
      'Tái hiện dàn nhạc bát âm cung đình xứ Huế với đàn nguyệt, đàn tỳ bà, sáo trúc và phách tiền. Nét vẽ mộc bản phóng khoáng kết hợp lối tô màu tay tài hoa của nghệ nhân Làng Sình mang lại âm hưởng triều hạ uy nghiêm mà thanh nhã.',
    pigments: ['Mực mộc bản in tay', 'Vàng củ nghệ Cố Đô', 'Đỏ đất son sông Hương', 'Xanh lam hoa đậu biếc'],
    teaPairing: 'Trà Sen Cung Đình Thượng Hạng (hương sen ngát hồ Tịnh Tâm, vị chát ngọt hoàng cung)',
    mood: 'Uy nghiêm • Thanh tao • Nhã nhặn',
    artCategory: 'Âm nhạc cung đình',
  },
  {
    id: 'langsinh-ba-dua-noi',
    traditionId: 'lang-sinh',
    traditionName: 'Tranh Làng Sình (Cố Đô Huế)',
    region: 'Miền Trung',
    title: 'Bà Đưa Nôi',
    subtitle: 'Tình mẫu tử Cố Đô • Nhịp võng ru êm đềm mưa xứ Huế',
    teaPaperType: 'Giấy Dó nén bã Trà Ô Long Bảo Lộc',
    teaPaperDesc:
      'Được ép từ bã trà Ô Long bán lên men nén chặt, tạo bề mặt giấy vàng nâu mộc mạc và vân sợi tự nhiên độc bản.',
    story:
      'Hình ảnh người mẹ xứ Huế tảo tần ngồi đưa nôi ru con giữa buổi chiều mưa Cố Đô. Chiếc nôi tre mộc mạc đong đưa những khúc ca dao nuôi dưỡng tâm hồn trẻ thơ qua bao thế hệ người con đất miền Trung kiên cường.',
    pigments: ['Đỏ son chu sa ấm áp', 'Vàng gừng tự nhiên', 'Nâu vỏ cây sú vẹt', 'Mực đen than củi'],
    teaPairing: 'Trà Ô Long Kim Tuyên (vị ngọt ngậy bơ sữa béo bùi, êm dịu hệ thần kinh)',
    mood: 'Ấm áp • Ru hời • Lắng đọng',
    artCategory: 'Dân sinh xứ Huế',
  },
  {
    id: 'langsinh-voi-le',
    traditionId: 'lang-sinh',
    traditionName: 'Tranh Làng Sình (Cố Đô Huế)',
    region: 'Miền Trung',
    title: 'Voi Lễ Cung Đình',
    subtitle: 'Nghi thức đại lễ • Linh vật trấn giữ thái bình',
    teaPaperType: 'Giấy Dó nén bã Hồng Trà Cổ Thụ & Vỏ Quế',
    teaPaperDesc:
      'Hòa trộn bã hồng trà lên men cùng bột quế Trà My, tạo màu giấy nâu sẫm trầm mặc và thoảng hương thảo mộc nồng ấm.',
    story:
      'Voi thần khoác gấm vóc hoa văn cung đình trong đại lễ Tế Giao triều Nguyễn. Nét khắc mộc bản khỏe khoắn thể hiện sức mạnh linh thiêng, sự trường tồn của giang sơn và lời cầu chúc quốc thái dân an.',
    pigments: ['Vàng hoàng kim bột đồng', 'Đỏ thắm chu sa', 'Đen than gỗ kiền kiền', 'Trắng đá vôi Cố Đô'],
    teaPairing: 'Hồng Trà Cổ Thụ Rừng Già (nước trà đỏ hổ phách, vị ngọt hậu nồng nàn thảo mộc)',
    mood: 'Uy dũng • Trang nghiêm • Cổ kính',
    artCategory: 'Nghi lễ triều đình',
  },
  {
    id: 'langsinh-hoa-dang',
    traditionId: 'lang-sinh',
    traditionName: 'Tranh Làng Sình (Cố Đô Huế)',
    region: 'Miền Trung',
    title: 'Thả Hoa Đăng Sông Hương',
    subtitle: 'Ánh nến lung linh • Gửi ước nguyện bình an bên chén trà',
    teaPaperType: 'Giấy Dó nén bã Trà Ướp Hoa Nhài & Sen',
    teaPaperDesc:
      'Nền giấy dó ép bã trà hoa tỏa hương dịu nhẹ, bề mặt gợn sóng như mặt nước sông Hương lúc hoàng hôn buông xuống.',
    story:
      'Người thiếu nữ xứ Huế trong tà áo dài tím thả chiếc hoa đăng giấy bập bềnh trên dòng Hương Giang. Ngọn nến lung linh phản chiếu muôn ngàn đốm sáng, mang theo tâm nguyện cầu an lành cho vạn sự sinh linh.',
    pigments: ['Tím hoa cà tự nhiên', 'Vàng nến lung linh', 'Lam trầm sông Hương', 'Son đỏ gỉ sắt'],
    teaPairing: 'Trà Nhài Cổ Thụ (thanh nhẹ, thơm ngát, gột rửa mọi ưu tư muộn phiền)',
    mood: 'Thơ mộng • Lắng đọng • Trầm mặc',
    artCategory: 'Tâm linh phong cảnh',
  },
  {
    id: 'langsinh-thanh-long',
    traditionId: 'lang-sinh',
    traditionName: 'Tranh Làng Sình (Cố Đô Huế)',
    region: 'Miền Trung',
    title: 'Thần Thú Thanh Long',
    subtitle: 'Tứ linh bảo hộ • Mây cuộn sóng xô trấn an cõi thế',
    teaPaperType: 'Giấy Dó nén bã Trà Shan Tuyết & Tro Than',
    teaPaperDesc:
      'Bột giấy dướng hòa cùng tro bã trà cổ thụ qua lửa, tạo vân đá thô ráp mang dấu ấn linh thiêng huyền bí.',
    story:
      'Rồng xanh uốn lượn giữa tầng mây ngũ sắc của bầu trời phương Nam. Đây là bức tranh mộc bản dân gian Làng Sình được người dân dán trước cổng nhà trong dịp lễ tết để trừ tà, đón vượng khí và may mắn.',
    pigments: ['Xanh ngọc chàm rừng', 'Đỏ son rực rỡ', 'Vàng nghệ tươi', 'Mực than mộc bản'],
    teaPairing: 'Trà Lão Shan Tuyết 500 Năm (nội lực mạnh mẽ, hậu vị ngọt sâu muôn thuở)',
    mood: 'Huyền bí • Linh thiêng • Hộ mệnh',
    artCategory: 'Linh thú trừ tà',
  },

  // ==================== TRANH KIẾNG NAM BỘ (MIỀN NAM) ====================
  {
    id: 'tranhkieng-cuu-huyen',
    traditionId: 'tranh-kieng',
    traditionName: 'Tranh Kiếng (Nam Bộ)',
    region: 'Miền Nam',
    title: 'Cửu Huyền Thất Tổ',
    subtitle: 'Tôn kính cội nguồn • Cẩn ốc xà cừ & mạ nhũ vàng lộng lẫy',
    teaPaperType: 'Mặt kiếng vẽ ngược bồi lưng Giấy Dó bã Trà Lài Nam Bộ',
    teaPaperDesc:
      'Lớp kính trong suốt vẽ ngược công phu, phía sau được bồi nền giấy dó nén bã trà lài hữu cơ giúp bảo quản màu sơn trường tồn.',
    story:
      'Bức hoành phi tranh kiếng thờ phụng trang trọng nơi gian giữa nhà người phương Nam. Chữ vàng rực rỡ giữa nền cẩn xà cừ ngũ sắc lấp lánh biểu trưng cho lòng hiếu thảo, tri ân công đức tổ tiên ngàn đời của người Nam Bộ.',
    pigments: ['Nhũ vàng son mạ lộng lẫy', 'Ốc xà cừ óng ánh ngũ sắc', 'Sơn then vẽ ngược', 'Đỏ điều hoàng gia'],
    teaPairing: 'Trà Lài Miệt Vườn (vị ngọt thanh hoa cỏ, tôn kính không gian thờ tự thiêng liêng)',
    mood: 'Trang trọng • Hiếu nghĩa • Trường cửu',
    artCategory: 'Thờ tự di sản',
  },
  {
    id: 'tranhkieng-ma-dao',
    traditionId: 'tranh-kieng',
    traditionName: 'Tranh Kiếng (Nam Bộ)',
    region: 'Miền Nam',
    title: 'Bát Tuấn Mã Đáo Thành Công',
    subtitle: 'Hào sảng phương Nam • Tám tuấn mã phi nước đại đạp gió',
    teaPaperType: 'Kính thủy tinh vẽ ngược bồi Giấy Dó nén bã Trà Ô Long',
    teaPaperDesc:
      'Kỹ thuật vẽ ngược từng lớp màu, lớp nền sau cùng là bột giấy dó nén bã trà Ô Long thơm hương mật trái cây.',
    story:
      'Tám chú ngựa dũng mãnh phi nước đại qua sông nước miệt vườn ngút ngàn lau lách. Nét vẽ trên kiếng phóng khoáng, dứt khoát phản ánh tinh thần khai hoang mở cõi hào sảng, không ngại gian khó của người dân Nam Bộ.',
    pigments: ['Nhũ kim sa phản chiếu ánh sáng', 'Sơn men dầu bóng loáng', 'Xanh ngọc bích', 'Hồng son tươi'],
    teaPairing: 'Trà Ô Long Thuần (đượm vị trái cây chín, hậu ngọt tràn đầy sinh lực)',
    mood: 'Hào sảng • Bứt phá • Thành tựu',
    artCategory: 'Cát tường may mắn',
  },
  {
    id: 'tranhkieng-me-sanh',
    traditionId: 'tranh-kieng',
    traditionName: 'Tranh Kiếng (Nam Bộ)',
    region: 'Miền Nam',
    title: 'Mẹ Sanh Mẹ Độ',
    subtitle: 'Nữ thần phương Nam • Che chở trẻ thơ & hoa trái tốt tươi',
    teaPaperType: 'Mặt kiếng trong suốt bồi Giấy Dó bã Trà Thảo Mộc',
    teaPaperDesc:
      'Giấy dó ép bã trà cỏ ngọt và hoa cúc Nam Bộ, tạo cảm giác thanh khiết mát lành đằng sau lớp kính vẽ ngũ sắc.',
    story:
      'Hình ảnh Bà Chúa Xứ và các Mẹ phù hộ cho sự sinh sôi nảy nở của con người cùng vườn tược trái ngọt phù sa. Phong cách vẽ nét thanh mảnh, ánh mắt nhân từ khoan dung mang đậm văn hóa tín ngưỡng miệt vườn Tây Nam Bộ.',
    pigments: ['Sơn men màu tự nhiên', 'Nhũ bạc xà cừ', 'Vàng kim tuyến óng ả', 'Xanh lá mạ non'],
    teaPairing: 'Trà Cúc Thảo Mộc Nam Bộ (thanh nhiệt, dịu mát, an thần sâu giấc)',
    mood: 'Từ bi • Bao dung • Phúc lành',
    artCategory: 'Tín ngưỡng dân gian',
  },
  {
    id: 'tranhkieng-tu-quy',
    traditionId: 'tranh-kieng',
    traditionName: 'Tranh Kiếng (Nam Bộ)',
    region: 'Miền Nam',
    title: 'Tứ Quý Phương Nam',
    subtitle: 'Mai - Lan - Cúc - Trúc • Bốn mùa trĩu quả bên dòng Cửu Long',
    teaPaperType: 'Kiếng mỹ thuật cẩn ốc bồi Giấy Dó bã Trà Búp Tân Cương',
    teaPaperDesc:
      'Sợi búp chè phối trộn xơ dướng ép mỏng làm nền lót, tạo chiều sâu thị giác độc đáo sau mặt kính long lanh.',
    story:
      'Bộ bốn loài hoa quý đại diện cho khí tiết và bốn mùa no ấm. Trên kính Nam Bộ, hoa mai vàng rực rỡ và khóm trúc ngà vươn cao trong nắng ấm phương Nam, tượng trưng cho gia đạo thịnh vượng bền lâu.',
    pigments: ['Vàng mai óng ả', 'Xanh ngọc trúc diệp', 'Tím phong lan rực rỡ', 'Đỏ chu sa cúc đại đóa'],
    teaPairing: 'Trà Búp Hương Hoa Bưởi (hương vị mùa xuân ngập tràn đầu lưỡi)',
    mood: 'Tươi sáng • Đơm hoa • Thịnh vượng',
    artCategory: 'Tứ thời phong cảnh',
  },
  {
    id: 'tranhkieng-cho-noi',
    traditionId: 'tranh-kieng',
    traditionName: 'Tranh Kiếng (Nam Bộ)',
    region: 'Miền Nam',
    title: 'Sông Nước Cửu Long & Chợ Nổi',
    subtitle: 'Bình minh miệt vườn • Ghe thuyền tấp nập hương trà hoa trái',
    teaPaperType: 'Kiếng viền mạ vàng bồi Giấy Dó nén bã Trà Xanh Phù Sa',
    teaPaperDesc:
      'Lấy cảm hứng từ đất phù sa và bã lá trà ủ hương sen, nén trên mặt giấy dó thô mộc mang sắc nâu đất mẹ phù sa.',
    story:
      'Bình minh trên chợ nổi Cái Răng với những chiếc ghe chở đầy xoài, bưởi, hoa tươi và những ấm trà nóng hổi đãi khách phương xa. Nét vẽ sôi nổi, chân chất như chính nụ cười hiếu khách của người miền Tây sông nước.',
    pigments: ['Xanh nước phù sa', 'Vàng nắng bình minh', 'Đỏ quả chín miệt vườn', 'Trắng bọt sóng nước'],
    teaPairing: 'Trà Lài Đá Thanh Mát (ngọt mát sảng khoái giữa tiết trời phương Nam ngập nắng)',
    mood: 'Nồng hậu • Rộn ràng • Phóng khoáng',
    artCategory: 'Đời sống sông nước',
  },
];

