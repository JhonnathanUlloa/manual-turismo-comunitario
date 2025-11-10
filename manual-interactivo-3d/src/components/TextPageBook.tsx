'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ManualSection } from '@/types/page';
import Image from 'next/image';
import { useState, useMemo, memo } from 'react';

interface TextPageProps {
  section: ManualSection;
  isMobile?: boolean;
}

/**
 * Componente de página individual para el libro
 * RESPONSIVE Y OPTIMIZADO - Se adapta a móvil, tablet y desktop
 */
const TextPageComponent: React.FC<TextPageProps> = ({ section, isMobile = false }) => {
  const [imageError, setImageError] = useState(false);
  
  // Generar ruta de imagen basada en el ID de la sección
  const imagePath = `/images/manual/seccion-${section.id}.jpg`;
  
  // Determinar si esta sección necesita imagen y dónde colocarla
  const imagePosition = useMemo(() => {
    const content = section.content.toLowerCase();
    const title = section.title.toLowerCase();
    
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
  
  // NO truncar contenido - mostrar todo
  const processContent = (content: string) => {
    // Simplemente retornar el contenido completo sin truncar
    return content;
  };

  // Componente de imagen reutilizable
  const ImageSection = () => {
    if (imagePosition === 'none') return null;
    
    // Altura responsive
    const imageHeight = isMobile ? '140px' : '180px';
    
    return (
      <div 
        className="flex-shrink-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-xl border-2 border-blue-200 overflow-hidden relative shadow-lg" 
        style={{ height: imageHeight }}
      >
        {!imageError ? (
          <Image
            src={imagePath}
            alt={`Ilustración - ${section.title}`}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700 p-3 bg-gradient-to-br from-yellow-50 to-orange-50">
            <svg className="w-14 h-14 mb-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="bg-white rounded-lg shadow-md px-3 py-2 border-2 border-dashed border-yellow-400">
              <p className="font-bold text-xs text-center text-gray-800">📷 Captura requerida</p>
              <p className="text-xs text-center mt-1 bg-yellow-100 px-2 py-1 rounded border border-yellow-300">
                <code className="text-yellow-900 font-mono font-bold">seccion-{section.id}.jpg</code>
              </p>
              <p className="text-[9px] text-gray-600 mt-1 text-center leading-tight">
                Guardar en: <span className="font-mono bg-gray-200 px-1 rounded text-[8px]">public/images/manual/</span>
              </p>
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
      {/* HEADER con gradiente y sombra - responsive */}
      <div className={`flex-shrink-0 border-b-4 border-brand ${isMobile ? 'pb-2 px-4 pt-4' : 'pb-4 px-6 pt-6'} bg-gradient-to-r from-brand via-brand-light to-brand shadow-lg`}>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className={`${isMobile ? 'text-3xl' : 'text-5xl'} flex-shrink-0 filter drop-shadow-lg`}>{section.emoji}</span>
            <div className="absolute inset-0 blur-xl opacity-30 bg-white scale-150"></div>
          </div>
          <div className="flex-1">
            <h1 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-extrabold text-white leading-tight line-clamp-2 drop-shadow-md`}>
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
      <div className={`flex-1 ${isMobile ? 'px-4 py-3' : 'px-6 py-5'} overflow-hidden flex flex-col gap-3`}>
        
        {/* Imagen arriba si es procedimiento */}
        {imagePosition === 'top' && <ImageSection />}
        
        {/* TEXTO DEL CONTENIDO con estilos mejorados */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
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
        </div>
        
        {/* Imagen en medio si es descriptivo */}
        {imagePosition === 'middle' && <ImageSection />}
        
        {/* Imagen al final si es conceptual */}
        {imagePosition === 'bottom' && <ImageSection />}
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