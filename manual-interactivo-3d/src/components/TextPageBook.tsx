'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ManualSection } from '@/types/page';
import Image from 'next/image';
import { useState, useMemo, memo } from 'react';

interface TextPageProps {
  section: ManualSection;
  isMobile?: boolean;
  bookRef?: any;
}

/**
 * Componente de página individual para el libro
 * RESPONSIVE Y OPTIMIZADO - Se adapta a móvil, tablet y desktop
 */
const TextPageComponent: React.FC<TextPageProps> = ({ section, isMobile = false, bookRef }) => {
  const [imageError, setImageError] = useState(false);
  
  // Generar ruta de imagen basada en el ID de la sección
  const imagePath = `/images/manual/seccion-${section.id}.png`;
  
  // Manejador para navegar desde el índice
  const handleIndexClick = (pageNumber: number) => {
    if (bookRef?.current) {
      try {
        bookRef.current.pageFlip().turnToPage(pageNumber);
      } catch (err) {
        console.error('Error al navegar:', err);
      }
    }
  };
  
  // Determinar si esta sección necesita imagen y dónde colocarla
  const imagePosition = useMemo(() => {
    const content = section.content.toLowerCase();
    const title = section.title.toLowerCase();
    
    // Secciones 0 y 1 tienen imagen centrada (solo imagen, sin texto)
    if (section.id === 0 || section.id === 1) {
      return 'centered';
    }
    
    // Palabras clave que indican que necesita imagen
    const needsImage = 
      content.includes('pantalla') || 
      content.includes('interfaz') ||
      content.includes('vista') ||
      content.includes('formulario') ||
      content.includes('tabla') ||
      content.includes('página') ||
      content.includes('dashboard') ||
      content.includes('botón') ||
      content.includes('menú') ||
      title.includes('cómo') ||
      title.includes('gestión') ||
      title.includes('crear') ||
      title.includes('editar');
    
    // Si es introducción o conceptual, imagen al final
    if (title.includes('introducción') || title.includes('qué es') || title.includes('objetivo')) {
      return needsImage ? 'bottom' : 'none';
    }
    
    // Si tiene procedimientos, imagen arriba
    if (content.includes('paso') || content.includes('hacer') || content.includes('clic')) {
      return 'top';
    }
    
    // Por defecto, imagen en medio
    return needsImage ? 'middle' : 'none';
  }, [section.content, section.title]);
  
  // Procesar contenido - para el índice, hacerlo interactivo
  const processContent = (content: string) => {
    // Si es el índice (sección 2), convertir en lista clickeable
    if (section.id === 2) {
      // Mapeo manual del índice a las páginas reales
      const pageMapping: { [key: number]: number } = {
        1: 3,  // Introducción
        2: 4,  // Acceso al Sistema
        3: 5,  // Navegación Básica
        4: 6,  // Gestión de Alojamientos
        5: 7,  // Gestión de Experiencias y Rutas
        6: 8,  // Gestión de Platos
        7: 9,  // Gestión de Productos
        8: 10, // Gestión de Restaurantes
        9: 11, // Preguntas Frecuentes
        10: 12, // Soporte Técnico
        11: 13  // Consejos Finales
      };
      
      // Normalizar saltos de línea y dividir
      const normalizedContent = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
      const lines = normalizedContent.split('\n').filter(line => line.trim() && !line.includes('---'));
      
      return (
        <div className="space-y-3">
          {lines.map((line, index) => {
            // Extraer número y texto del enlace markdown: "1. [Introducción](#introduccion)"
            const match = line.match(/^(\d+)\.\s*\[([^\]]+)\]/);
            if (match) {
              const num = parseInt(match[1]);
              const title = match[2];
              const targetPage = pageMapping[num];
              
              if (!targetPage) return null;
              
              return (
                <button
                  key={index}
                  onClick={() => handleIndexClick(targetPage)}
                  className={`w-full text-left ${
                    isMobile ? 'px-3 py-2 text-sm' : 'px-4 py-3 text-base'
                  } bg-gradient-to-r from-green-50 to-blue-50 hover:from-green-100 hover:to-blue-100 rounded-lg border-2 border-green-200 hover:border-green-400 transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-3 group`}
                >
                  <span className="font-bold text-brand text-lg group-hover:scale-110 transition-transform">
                    {num}
                  </span>
                  <span className="flex-1 font-semibold text-gray-800 group-hover:text-brand-hover">
                    {title}
                  </span>
                  <span className="text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </button>
              );
            }
            return null;
          })}
        </div>
      );
    }
    // Para otras secciones, retornar contenido normal
    return content;
  };

  // Obtener ícono decorativo grande según la sección
  const getDecorativeIcon = () => {
    const id = section.id;
    const title = section.title.toLowerCase();
    
    // Mapeo de íconos por sección
    const iconMap: { [key: number]: { icon: string; gradient: string; bg: string } } = {
      0: { icon: '📘', gradient: 'from-blue-500 to-purple-600', bg: 'from-blue-50 to-purple-50' },
      1: { icon: '🏛️', gradient: 'from-green-500 to-teal-600', bg: 'from-green-50 to-teal-50' },
      2: { icon: '📑', gradient: 'from-indigo-500 to-blue-600', bg: 'from-indigo-50 to-blue-50' },
      3: { icon: '📖', gradient: 'from-emerald-500 to-green-600', bg: 'from-emerald-50 to-green-50' },
      11: { icon: '❓', gradient: 'from-yellow-500 to-orange-600', bg: 'from-yellow-50 to-orange-50' },
      12: { icon: '📞', gradient: 'from-cyan-500 to-blue-600', bg: 'from-cyan-50 to-blue-50' },
      13: { icon: '📌', gradient: 'from-pink-500 to-rose-600', bg: 'from-pink-50 to-rose-50' },
    };
    
    return iconMap[id] || { icon: '📄', gradient: 'from-gray-500 to-slate-600', bg: 'from-gray-50 to-slate-50' };
  };

  // Componente de imagen reutilizable
  const ImageSection = () => {
    if (imagePosition === 'none') return null;
    
    // Para secciones centradas (0 y 1), usar tamaño más grande
    const isCentered = imagePosition === 'centered';
    const imageHeight = isCentered 
      ? (isMobile ? '300px' : '400px') 
      : (isMobile ? '180px' : '240px');
    
    const imageWidth = isCentered ? (isMobile ? '90%' : '450px') : '100%';
    
    const decorative = getDecorativeIcon();
    
    // Padding uniforme para todas las imágenes
    const imageClass = 'object-contain p-3';
    
    return (
      <div 
        className={`${isCentered ? '' : 'flex-shrink-0'} bg-gradient-to-br ${decorative.bg} rounded-xl border-2 border-blue-200 overflow-hidden relative shadow-lg`}
        style={{ height: imageHeight, width: imageWidth }}
      >
        {!imageError ? (
          <Image
            src={imagePath}
            alt={`Ilustración - ${section.title}`}
            fill
            className={imageClass}
            onError={() => setImageError(true)}
            unoptimized
            priority={section.id <= 3}
          />
        ) : (
          <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${decorative.bg}`}>
            <div className={`mb-3 drop-shadow-lg ${isMobile ? 'text-7xl' : 'text-9xl'}`}>
              {decorative.icon}
            </div>
            <div className={`bg-gradient-to-r ${decorative.gradient} text-white px-4 py-2 rounded-full shadow-lg`}>
              <p className="font-bold text-sm text-center">{section.title.substring(0, 30)}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`w-full bg-white flex flex-col overflow-hidden shadow-xl ${isMobile ? 'h-screen' : ''}`}
      style={!isMobile ? { 
        height: '733px',
        maxHeight: '100%'
      } : {
        height: '100vh',
        maxHeight: '100vh'
      }}
    >
      {/* HEADER con gradiente y sombra - responsive y compacto */}
      <div className={`flex-shrink-0 border-b-4 border-brand ${isMobile ? 'pb-2 px-4 pt-3' : 'pb-3 px-6 pt-4'} bg-gradient-to-r from-brand via-brand-light to-brand shadow-lg`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className={`${isMobile ? 'text-2xl' : 'text-4xl'} flex-shrink-0 filter drop-shadow-lg`}>{section.emoji}</span>
            <div className="absolute inset-0 blur-xl opacity-30 bg-white scale-150"></div>
          </div>
          <div className="flex-1">
            <h1 className={`${isMobile ? 'text-base' : 'text-xl'} font-extrabold text-white leading-tight line-clamp-2 drop-shadow-md`}>
              {section.title}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} text-white bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full`}>
                Sección {section.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className={`flex-1 ${isMobile ? 'px-4 py-3' : 'px-6 py-5'} overflow-hidden ${imagePosition === 'centered' ? 'flex items-center justify-center' : 'flex flex-col gap-3'}`}>
        
        {/* Para secciones 0 y 1: solo imagen centrada */}
        {imagePosition === 'centered' ? (
          <ImageSection />
        ) : (
          <>
            {/* Imagen arriba si es procedimiento */}
            {imagePosition === 'top' && <ImageSection />}
            
            {/* TEXTO DEL CONTENIDO con estilos mejorados */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              {section.id === 2 ? (
                // Índice interactivo
                <div className={`prose ${isMobile ? 'prose-xs' : 'prose-sm'} max-w-none`}>
                  {processContent(section.content)}
                </div>
              ) : (
                // Contenido normal con markdown
              <div className={`prose ${isMobile ? 'prose-xs' : 'prose-sm'} max-w-none space-y-2`}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className={`${isMobile ? 'mb-2 text-xs' : 'mb-4 text-sm'} leading-relaxed text-justify text-gray-800 font-normal tracking-wide`}>
                    {children}
                  </p>
                ),
                h1: ({ children }) => (
                  <h2 className={`${isMobile ? 'text-base mt-3 mb-2' : 'text-xl mt-5 mb-4'} font-extrabold text-gray-900 pb-2 border-b-2 border-brand-light bg-gradient-to-r from-green-50 to-transparent pl-3 rounded shadow-sm`}>
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h3 className={`${isMobile ? 'text-sm mt-2 mb-2' : 'text-lg mt-4 mb-3'} font-bold text-gray-800 flex items-center gap-2`}>
                    <span className="w-1.5 h-6 bg-gradient-to-b from-brand to-brand-hover rounded"></span>
                    {children}
                  </h3>
                ),
                h3: ({ children }) => (
                  <h4 className={`${isMobile ? 'text-xs mt-2 mb-1' : 'text-base mt-3 mb-2'} font-semibold text-brand-hover italic`}>
                    {children}
                  </h4>
                ),
                ul: ({ children }) => (
                  <ul className={`${isMobile ? 'ml-3 mb-2 space-y-1 text-xs' : 'ml-5 mb-4 space-y-2 text-sm'}`}>
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className={`${isMobile ? 'ml-3 mb-2 space-y-1 text-xs' : 'ml-5 mb-4 space-y-2 text-sm'} list-decimal list-outside`}>
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className={`${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed text-gray-800 pl-2 relative before:content-['▸'] before:absolute before:left-[-16px] before:text-brand before:font-bold before:text-base`}>
                    {children}
                  </li>
                ),
                code: ({ inline, children }: any) => {
                  if (inline) {
                    return (
                      <code className={`bg-gradient-to-r from-green-100 to-green-50 text-brand-hover ${isMobile ? 'px-1 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'} rounded font-mono border border-green-200 shadow-sm`}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <pre className={`bg-gradient-to-br from-gray-900 to-gray-800 text-green-400 ${isMobile ? 'p-2 text-[10px] mb-2' : 'p-3 text-xs mb-3'} rounded-lg overflow-x-auto shadow-lg border border-gray-700`}>
                      <code className="font-mono">{children}</code>
                    </pre>
                  );
                },
                blockquote: ({ children }) => (
                  <blockquote className={`border-l-4 border-brand bg-gradient-to-r from-green-50 to-transparent ${isMobile ? 'pl-2 py-1 my-2 text-xs' : 'pl-4 py-2 my-3 text-sm'} italic text-gray-800 rounded-r-lg shadow-sm`}>
                    <span className="font-semibold text-brand">💡 </span>
                    {children}
                  </blockquote>
                ),
                strong: ({ children }) => (
                  <strong className={`font-extrabold text-gray-900 bg-yellow-100 ${isMobile ? 'px-1 py-0' : 'px-1.5 py-0.5'} rounded shadow-sm`}>
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-blue-700 font-semibold">{children}</em>
                ),
                table: ({ children }) => (
                  <div className={`overflow-x-auto ${isMobile ? 'my-2' : 'my-4'} shadow-lg rounded-lg border-2 border-green-200`}>
                    <table className={`w-full ${isMobile ? 'text-xs' : 'text-sm'} border-collapse bg-white`}>
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gradient-to-r from-brand to-brand-light text-white">
                    {children}
                  </thead>
                ),
                tbody: ({ children }) => (
                  <tbody className="bg-white divide-y divide-gray-300">{children}</tbody>
                ),
                tr: ({ children }) => (
                  <tr className="even:bg-green-50 hover:bg-green-100 transition-colors duration-150">
                    {children}
                  </tr>
                ),
                th: ({ children }) => (
                  <th className={`${isMobile ? 'px-2 py-2 text-[10px]' : 'px-4 py-3 text-sm'} text-left font-bold border-r border-green-400 last:border-r-0`}>
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className={`${isMobile ? 'px-2 py-2 text-[10px]' : 'px-4 py-3 text-sm'} text-gray-800 border-r border-gray-300 last:border-r-0 leading-relaxed`}>
                    {children}
                  </td>
                ),
                img: () => null,
                a: ({ href, children }) => (
                  <a 
                    href={href} 
                    className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 font-semibold text-sm transition-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <hr className="my-4 border-t-2 border-blue-200" />
                ),
              }}
              >
                {processContent(section.content)}
              </ReactMarkdown>
              </div>
              )}
            </div>
        
            {/* Imagen en medio si es descriptivo */}
            {imagePosition === 'middle' && <ImageSection />}
            
            {/* Imagen al final si es conceptual */}
            {imagePosition === 'bottom' && <ImageSection />}
          </>
        )}
      </div>

      {/* FOOTER elegante - responsive */}
      <div className={`flex-shrink-0 border-t-2 border-gray-300 ${isMobile ? 'py-1.5 px-4' : 'py-2 px-6'} bg-gradient-to-r from-gray-100 to-gray-50`}>
        <div className="flex items-center justify-between">
          <div className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} text-gray-500`}>
            Manual de Usuario • Sistema de Turismo Comunitario
          </div>
          <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-bold text-gray-700`}>
            {section.id}
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportar versión memorizada para evitar re-renders innecesarios
export const TextPage = memo(TextPageComponent);