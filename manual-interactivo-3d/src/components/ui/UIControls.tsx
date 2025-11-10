'use client';

import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/solid';
import { useManualStore } from '@/store/manualStore';

interface UIControlsProps {
  bookRef?: React.RefObject<any>;
}

export const UIControls: React.FC<UIControlsProps> = ({ bookRef }) => {
  const { soundEnabled, toggleSound, toggleSidebar, currentPage, totalPages, setPage } = useManualStore();

  const handleNext = () => {
    if (bookRef?.current && currentPage < totalPages - 1) {
      try {
        bookRef.current.pageFlip().flipNext();
      } catch (e) {
        // Fallback al store
        setPage(currentPage + 1);
      }
    }
  };

  const handlePrev = () => {
    if (bookRef?.current && currentPage > 0) {
      try {
        bookRef.current.pageFlip().flipPrev();
      } catch (e) {
        // Fallback al store
        setPage(currentPage - 1);
      }
    }
  };

  const handleGoToPage = (page: number) => {
    if (bookRef?.current) {
      try {
        bookRef.current.pageFlip().turnToPage(page);
      } catch (e) {
        // Fallback al store
        setPage(page);
      }
    }
  };

  const canGoNext = currentPage < totalPages - 1;
  const canGoPrev = currentPage > 0;

  const buttonClass =
    'icon-button text-white shadow-lg backdrop-blur-sm hover:shadow-xl transition-all';

  return (
    <>
      {/* Controles de navegación - Centro inferior - responsive */}
      <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 sm:space-x-4">
        <motion.button
          onClick={handlePrev}
          disabled={!canGoPrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${buttonClass} ${!canGoPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Página anterior"
        >
          <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>

        {/* Indicador de página - responsive */}
        <div className="page-indicator min-w-[80px] sm:min-w-[120px] text-center">
          <span className="font-semibold text-white text-xs sm:text-base">
            {currentPage + 1} / {totalPages}
          </span>
        </div>

        <motion.button
          onClick={handleNext}
          disabled={!canGoNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`${buttonClass} ${!canGoNext ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label="Página siguiente"
        >
          <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.button>
      </div>

      {/* Controles laterales - Izquierda - ocultos en móvil */}
      <div className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col space-y-4">
        <motion.button
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={buttonClass}
          aria-label="Abrir índice"
        >
          <Bars3Icon className="h-6 w-6" />
        </motion.button>

        <motion.button
          onClick={() => handleGoToPage(0)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={buttonClass}
          aria-label="Ir al inicio"
        >
          <HomeIcon className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Controles laterales - Derecha - responsive */}
      <div className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 flex flex-col space-y-2 sm:space-y-4">
        <motion.button
          onClick={toggleSound}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={buttonClass}
          aria-label={soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}
        >
          {soundEnabled ? (
            <SpeakerWaveIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          ) : (
            <SpeakerXMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
          )}
        </motion.button>
      </div>
      
      {/* Botón menú móvil - Arriba izquierda solo móvil */}
      <div className="fixed left-2 top-20 z-30 md:hidden">
        <motion.button
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={buttonClass}
          aria-label="Abrir índice"
        >
          <Bars3Icon className="h-5 w-5" />
        </motion.button>
      </div>
    </>
  );
};
