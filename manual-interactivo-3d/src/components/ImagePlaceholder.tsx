'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImagePlaceholderProps {
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src = '/assets/placeholder.svg',
  alt = 'Imagen del manual',
  className = '',
  priority = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative my-6 rounded-lg overflow-hidden shadow-2xl border border-gray-700 group ${className}`}>
      <div className="relative w-full aspect-video bg-gray-900/50">
        {/* Skeleton loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {/* Imagen principal */}
        {!imageError ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-contain hover:scale-105 transition-transform duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority={priority}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setImageError(true);
              setIsLoading(false);
            }}
          />
        ) : (
          // Fallback SVG cuando falla la carga
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="text-6xl opacity-30">📷</div>
              <p className="text-sm text-gray-500">Imagen no disponible</p>
            </div>
          </div>
        )}
      </div>

      {/* Caption con efecto hover */}
      {alt && !imageError && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-xs sm:text-sm text-white text-center font-medium">{alt}</p>
        </div>
      )}

      {/* Efecto de borde con brillo */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 transition-all duration-300 rounded-lg pointer-events-none" />
    </div>
  );
};
