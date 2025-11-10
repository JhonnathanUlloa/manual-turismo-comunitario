// Tipos para las páginas del manual
export interface ManualSection {
  id: number;
  title: string;
  content: string;
  emoji?: string;
}

export interface PageTexture {
  front: string;
  back: string;
}

export interface FlipbookPage {
  index: number;
  section: ManualSection;
  texture?: PageTexture;
}

export interface NavigationState {
  currentPage: number;
  totalPages: number;
  isFlipping: boolean;
  direction: 'forward' | 'backward' | null;
}

export interface UIState {
  sidebarOpen: boolean;
  soundEnabled: boolean;
  zoomLevel: number;
  showControls: boolean;
}

export type ViewMode = 'flipbook' | 'reader' | 'index';
