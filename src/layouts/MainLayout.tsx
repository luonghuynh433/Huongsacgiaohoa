import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Leaf, Compass, FileText, Box } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { TeaAudioPlayer } from '@/components/audio/TeaAudioPlayer';

export const MainLayout = () => {
  const location = useLocation();

  // Tự động cuộn mượt mà lên đầu trang khi chuyển tuyến đường
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-teal-deep font-serif selection:bg-gold/30">
      <header className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md border-b border-gold/20 shadow-paper">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-cream-50 text-gold group-hover:border-gold transition-colors duration-300 shadow-xs">
              <Leaf className="w-5 h-5 text-gold" strokeWidth={1.75} />
            </div>
            <div>
              <span className="text-xl md:text-2xl font-bold tracking-widest text-teal-deep uppercase font-serif">
                Gentea
              </span>
              <p className="text-[10px] tracking-widest uppercase text-gold font-sans font-medium">
                Chạm Sắc Hương
              </p>
            </div>
          </NavLink>

          <nav className="flex items-center gap-2 sm:gap-6 text-sm font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-md transition-colors duration-200 relative font-sans text-xs uppercase tracking-wider ${
                  isActive
                    ? 'text-teal-deep font-bold'
                    : 'text-teal-deep/70 hover:text-teal-deep'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Trang chủ
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gold rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/survey"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors duration-200 relative font-sans text-xs uppercase tracking-wider ${
                  isActive
                    ? 'text-teal-deep font-bold'
                    : 'text-teal-deep/70 hover:text-teal-deep'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <FileText className="w-4 h-4 text-gold/80" />
                  <span>Khảo sát</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gold rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/minimap"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors duration-200 relative font-sans text-xs uppercase tracking-wider ${
                  isActive
                    ? 'text-teal-deep font-bold'
                    : 'text-teal-deep/70 hover:text-teal-deep'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Compass className="w-4 h-4 text-gold/80" />
                  <span>Bản đồ</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gold rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/custom-kit"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-md transition-colors duration-200 relative font-sans text-xs uppercase tracking-wider ${
                  isActive
                    ? 'text-teal-deep font-bold'
                    : 'text-teal-deep/70 hover:text-teal-deep'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Box className="w-4 h-4 text-gold/80" />
                  <span>Phối Bộ Kit</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gold rounded-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Hiệu ứng chuyển trang mềm mại phong cách Zen */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Trình phát nhạc thiền trà cố định góc dưới */}
      <TeaAudioPlayer />

      <footer className="border-t border-gold/20 py-8 text-center text-xs text-teal-deep/70 bg-cream-200/50">
        <div className="max-w-4xl mx-auto px-6 space-y-2">
          <p className="font-serif font-bold text-teal-deep text-sm tracking-wide">
            GENTEA 2026 &bull; SẮC HƯƠNG GIAO HOÀ &bull; CHẠM SẮC HƯƠNG
          </p>
          <p className="text-[11px] text-teal-deep/75 font-serif italic">
            Giao thoa tinh hoa Trà Việt và bộ ba di sản Tranh Xưa: Tranh Đông Hồ (Bắc) &bull; Tranh Làng Sình (Trung) &bull; Tranh Kiếng (Nam)
          </p>
          <p className="text-[10px] text-gold-dark font-sans uppercase tracking-widest pt-2">
            Bộ Quà Tặng Trải Nghiệm Sinh Học &bull; QR Bản Đồ Vị Giác & Âm Nhạc
          </p>
        </div>
      </footer>
    </div>
  );
};
