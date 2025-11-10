import { create } from 'zustand';
import { ViewMode } from '@/types/page';

interface ManualState {
  // Estado de navegación
  currentPage: number;
  totalPages: number;
  isFlipping: boolean;
  direction: 'forward' | 'backward' | null;

  // Estado de UI
  sidebarOpen: boolean;
  soundEnabled: boolean;
  zoomLevel: number;
  showControls: boolean;
  viewMode: ViewMode;

  // Acciones de navegación
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToSection: (sectionIndex: number) => void;
  setFlipping: (isFlipping: boolean, direction?: 'forward' | 'backward' | null) => void;
  setTotalPages: (total: number) => void;

  // Acciones de UI
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSound: () => void;
  setZoomLevel: (level: number) => void;
  toggleControls: () => void;
  setViewMode: (mode: ViewMode) => void;

  // Reset
  reset: () => void;
}

export const useManualStore = create<ManualState>((set, get) => ({
  // Estado inicial
  currentPage: 0,
  totalPages: 0,
  isFlipping: false,
  direction: null,
  sidebarOpen: false,
  soundEnabled: true,
  zoomLevel: 1,
  showControls: true,
  viewMode: 'flipbook',

  // Implementación de acciones de navegación
  setPage: (page) => {
    const { totalPages } = get();
    if (page >= 0 && page < totalPages) {
      set({ currentPage: page });
    }
  },

  nextPage: () => {
    const { currentPage, totalPages } = get();
    if (currentPage < totalPages - 1) {
      set({
        isFlipping: true,
        direction: 'forward',
      });
      setTimeout(() => {
        set({
          currentPage: currentPage + 1,
          isFlipping: false,
          direction: null,
        });
      }, 600);
    }
  },

  prevPage: () => {
    const { currentPage } = get();
    if (currentPage > 0) {
      set({
        isFlipping: true,
        direction: 'backward',
      });
      setTimeout(() => {
        set({
          currentPage: currentPage - 1,
          isFlipping: false,
          direction: null,
        });
      }, 600);
    }
  },

  goToSection: (sectionIndex) => {
    set({
      currentPage: sectionIndex,
      isFlipping: false,
      direction: null,
    });
  },

  setFlipping: (isFlipping, direction = null) => {
    set({ isFlipping, direction });
  },

  setTotalPages: (total) => {
    set({ totalPages: total });
  },

  // Implementación de acciones de UI
  toggleSidebar: () => {
    set((state) => ({ sidebarOpen: !state.sidebarOpen }));
  },

  setSidebarOpen: (open) => {
    set({ sidebarOpen: open });
  },

  toggleSound: () => {
    set((state) => ({ soundEnabled: !state.soundEnabled }));
  },

  setZoomLevel: (level) => {
    const clampedLevel = Math.max(0.5, Math.min(2, level));
    set({ zoomLevel: clampedLevel });
  },

  toggleControls: () => {
    set((state) => ({ showControls: !state.showControls }));
  },

  setViewMode: (mode) => {
    set({ viewMode: mode });
  },

  // Reset
  reset: () => {
    set({
      currentPage: 0,
      isFlipping: false,
      direction: null,
      sidebarOpen: false,
      soundEnabled: true,
      zoomLevel: 1,
      showControls: true,
      viewMode: 'flipbook',
    });
  },
}));
