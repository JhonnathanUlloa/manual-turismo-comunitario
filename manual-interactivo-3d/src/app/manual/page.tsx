'use client';

import { useEffect, useRef, useState } from 'react';
import { BackgroundFX } from '@/components/BackgroundFX';
import { Navbar } from '@/components/ui/Navbar';
import { Sidebar } from '@/components/ui/Sidebar';
import { UIControls } from '@/components/ui/UIControls';
import { useManualStore } from '@/store/manualStore';
import { manualSections } from '@/data/manualData';
import HTMLFlipBook from 'react-pageflip';
import { TextPage } from '@/components/TextPageBook';
import { useSoundFx } from '@/hooks/useSoundFx';

export default function ManualPage() {
  const { currentPage, setTotalPages, setPage, nextPage, prevPage } = useManualStore();
  const bookRef = useRef<any>(null);
  const { playPageFlip, soundEnabled } = useSoundFx();
  const isUpdatingFromBook = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar solo si es móvil para usePortrait
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setTotalPages(manualSections.length);
  }, [setTotalPages]);

  // Manejar teclas - Llama directamente al libro
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!bookRef.current) return;
      
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentPage < manualSections.length - 1) {
          try {
            bookRef.current.pageFlip().flipNext();
          } catch (err) {
            console.error('Error al voltear página:', err);
          }
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentPage > 0) {
          try {
            bookRef.current.pageFlip().flipPrev();
          } catch (err) {
            console.error('Error al voltear página:', err);
          }
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        try {
          bookRef.current.pageFlip().turnToPage(0);
        } catch (err) {
          console.error('Error al ir al inicio:', err);
        }
      } else if (e.key === 'End') {
        e.preventDefault();
        try {
          bookRef.current.pageFlip().turnToPage(manualSections.length - 1);
        } catch (err) {
          console.error('Error al ir al final:', err);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Sincronizar store → libro
  useEffect(() => {
    if (bookRef.current && !isUpdatingFromBook.current) {
      try {
        bookRef.current.pageFlip().turnToPage(currentPage);
      } catch (e) {
        // Ignorar error
      }
    }
  }, [currentPage]);

  const handleFlip = (e: any) => {
    isUpdatingFromBook.current = true;
    setPage(e.data);
    
    // Reproducir sonido
    if (soundEnabled) {
      playPageFlip('normal');
    }
    
    setTimeout(() => {
      isUpdatingFromBook.current = false;
    }, 100);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800">
      {/* Efectos de fondo - Desactivado en móvil para mejor rendimiento */}
      {!isMobile && <BackgroundFX />}

      {/* Navegación superior */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar bookRef={bookRef} />

      {/* Contenedor del libro - responsive */}
      <div className="relative w-full h-full pt-16 z-10 flex items-center justify-center px-0 sm:px-4">
        <div className="w-full h-full flex items-center justify-center">
          {/* @ts-ignore */}
          <HTMLFlipBook
            ref={bookRef}
            width={isMobile ? window.innerWidth : 550}
            height={isMobile ? window.innerHeight : 733}
            size="stretch"
            minWidth={280}
            maxWidth={600}
            minHeight={400}
            maxHeight={900}
            drawShadow={!isMobile}
            flippingTime={isMobile ? 600 : 800}
            usePortrait={isMobile}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={isMobile ? 0.1 : 0.5}
            showCover={false}
            mobileScrollSupport={true}
            onFlip={handleFlip}
            className="flipbook-responsive mx-auto"
            startPage={currentPage}
            clickEventForward={true}
            useMouseEvents={!isMobile}
            swipeDistance={isMobile ? 50 : 30}
            showPageCorners={!isMobile}
            disableFlipByClick={false}
          >
            {manualSections.map((section) => (
              <div key={section.id} className="page bg-white shadow-xl">
                <TextPage section={section} isMobile={isMobile} />
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>

      {/* Controles de navegación */}
      <UIControls bookRef={bookRef} />

      {/* Ayuda contextual - Solo desktop */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20 glass-effect px-4 py-2 rounded-full text-xs text-gray-300 hidden xl:flex items-center gap-3">
        <span>⌨️</span>
        <span className="text-blue-400">← →</span> Pasar páginas
        <span className="text-blue-400">Click en bordes</span> Voltear
      </div>
      
      {/* Ayuda móvil */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-20 glass-effect px-3 py-1.5 rounded-full text-[10px] text-gray-300 flex md:hidden items-center gap-2">
        <span>👆</span>
        <span className="text-blue-400">Desliza</span> para voltear
      </div>
    </div>
  );
}
