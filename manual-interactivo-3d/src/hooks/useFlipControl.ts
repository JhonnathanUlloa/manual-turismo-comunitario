import { useCallback } from 'react';
import { useManualStore } from '@/store/manualStore';

/**
 * Hook personalizado para controlar la navegación del flipbook
 */
export const useFlipControl = () => {
  const {
    currentPage,
    totalPages,
    isFlipping,
    direction,
    nextPage,
    prevPage,
    goToSection,
    setPage,
  } = useManualStore();

  const canGoNext = currentPage < totalPages - 1;
  const canGoPrev = currentPage > 0;

  const handleNext = useCallback(() => {
    if (!isFlipping && canGoNext) {
      nextPage();
    }
  }, [isFlipping, canGoNext, nextPage]);

  const handlePrev = useCallback(() => {
    if (!isFlipping && canGoPrev) {
      prevPage();
    }
  }, [isFlipping, canGoPrev, prevPage]);

  const handleGoToPage = useCallback(
    (pageNumber: number) => {
      if (!isFlipping && pageNumber >= 0 && pageNumber < totalPages) {
        setPage(pageNumber);
      }
    },
    [isFlipping, totalPages, setPage]
  );

  const handleGoToSection = useCallback(
    (sectionIndex: number) => {
      if (!isFlipping) {
        goToSection(sectionIndex);
      }
    },
    [isFlipping, goToSection]
  );

  // Navegación con teclado
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isFlipping) return;

      switch (event.key) {
        case 'ArrowRight':
        case ' ': // Espacio
          event.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          handlePrev();
          break;
        case 'Home':
          event.preventDefault();
          handleGoToPage(0);
          break;
        case 'End':
          event.preventDefault();
          handleGoToPage(totalPages - 1);
          break;
      }
    },
    [isFlipping, handleNext, handlePrev, handleGoToPage, totalPages]
  );

  return {
    // Estado
    currentPage,
    totalPages,
    isFlipping,
    direction,
    canGoNext,
    canGoPrev,

    // Acciones
    handleNext,
    handlePrev,
    handleGoToPage,
    handleGoToSection,
    handleKeyDown,
  };
};
