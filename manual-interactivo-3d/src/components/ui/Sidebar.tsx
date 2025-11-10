'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useManualStore } from '@/store/manualStore';
import { manualSections } from '@/data/manualData';

interface SidebarProps {
  bookRef?: React.RefObject<any>;
}

export const Sidebar: React.FC<SidebarProps> = ({ bookRef }) => {
  const { sidebarOpen, toggleSidebar, currentPage, setPage } = useManualStore();

  const handleSectionClick = (index: number) => {
    if (bookRef?.current) {
      try {
        bookRef.current.pageFlip().turnToPage(index);
      } catch (e) {
        setPage(index);
      }
    } else {
      setPage(index);
    }
    // No cerrar el sidebar automáticamente para que puedan ver dónde están
  };

  return (
    <>
      {/* Overlay - más oscuro en móviles */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - adaptado para móviles */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-[85vw] sm:w-80 glass-effect border-r border-gray-700 z-50 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header - más compacto en móviles */}
            <div className="p-4 sm:p-6 border-b border-gray-700/50 flex items-center justify-between backdrop-blur-lg">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="text-2xl">📑</span>
                <span className="gradient-text">Índice</span>
              </h2>
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-700/50 transition-all active:scale-95 hover:rotate-90 duration-200"
                aria-label="Cerrar menú"
              >
                <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </button>
            </div>

            {/* Contenido scrollable - mejorado para móviles */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 custom-scrollbar">
              <nav className="space-y-2">
                {manualSections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => handleSectionClick(index)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.96 }}
                    className={`w-full text-left p-3 sm:p-4 rounded-lg transition-all duration-200 ${
                      currentPage === index
                        ? 'bg-gradient-to-r from-brand to-brand-light text-white shadow-lg shadow-brand/30 border border-brand-light/30'
                        : 'bg-gray-800/50 backdrop-blur-sm text-gray-300 hover:bg-gray-700/70 border border-gray-700/30 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <span className="text-xl sm:text-2xl flex-shrink-0 filter drop-shadow-lg">
                        {section.emoji}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-medium line-clamp-2">
                          {section.title}
                        </p>
                        <p className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 ${
                          currentPage === index ? 'text-green-100' : 'opacity-70'
                        }`}>
                          {currentPage === index ? '📍 ' : ''}Página {index + 1}
                        </p>
                      </div>
                      {currentPage === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="flex-shrink-0 w-2 h-2 rounded-full bg-white shadow-lg"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </nav>
            </div>

            {/* Footer - más compacto */}
            <div className="p-3 sm:p-4 border-t border-gray-700/50 backdrop-blur-lg">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-400">
                  <span className="font-semibold text-brand-light">{manualSections.length}</span> secciones totales
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                  Estás en: <span className="text-brand-light font-semibold">Página {currentPage + 1}</span>
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
