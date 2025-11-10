import { useCallback } from 'react';
import useSound from 'use-sound';
import { useManualStore } from '@/store/manualStore';

/**
 * Hook para manejar efectos de sonido del flipbook
 */
export const useSoundFx = () => {
  const { soundEnabled, direction } = useManualStore();

  // Cargar sonido de página que agregaste
  const [playFlip] = useSound('/sounds/turn-a-page-336933.mp3', {
    volume: 0.6,
    playbackRate: 1,
    soundEnabled,
  });

  const [playFlipFast] = useSound('/sounds/turn-a-page-336933.mp3', {
    volume: 0.4,
    playbackRate: 1.3,
    soundEnabled,
  });

  const playPageFlip = useCallback(
    (speed: 'normal' | 'fast' = 'normal') => {
      if (!soundEnabled) return;

      if (speed === 'fast') {
        playFlipFast();
      } else {
        playFlip();
      }
    },
    [soundEnabled, playFlip, playFlipFast]
  );

  // Reproducir sonido basado en la dirección
  const playDirectionalFlip = useCallback(() => {
    if (!soundEnabled || !direction) return;
    playPageFlip('normal');
  }, [soundEnabled, direction, playPageFlip]);

  return {
    playPageFlip,
    playDirectionalFlip,
    soundEnabled,
  };
};
