'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ManualSection } from '@/types/page';
import Image from 'next/image';

interface TextPageProps {
  section: ManualSection;
  className?: string;
}

export const TextPage: React.FC<TextPageProps> = ({ section, className = '' }) => {
  return (
    <article className={`prose prose-base max-w-none ${className}`}>
      {/* Encabezado de la página estilo revista - Más compacto */}
      <header className="mb-8 pb-6 border-b-2 border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          {/* Emoji grande y decorativo */}
          <div className="relative">
            <div className="text-5xl sm:text-6xl filter drop-shadow-2xl">
              {section.emoji}
            </div>
            <div className="absolute inset-0 blur-2xl opacity-20 bg-gradient-to-br from-blue-500 to-purple-500 scale-150"></div>
          </div>

          {/* Título principal - Tamaño reducido */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-1">
              {section.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Sección {section.id + 1}
              </span>
              <span>•</span>
              <span>Manual de Usuario</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal con estilos de revista - Tamaños reducidos */}
      <div className="space-y-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Títulos principales - Más compactos
            h1: ({ children, ...props }) => (
              <h1 
                className="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-3 border-b-2 border-blue-500"
                {...props}
              >
                {children}
              </h1>
            ),
            
            h2: ({ children, ...props }) => (
              <h2 
                className="text-xl font-bold text-gray-800 mt-6 mb-3 flex items-center gap-2"
                {...props}
              >
                <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
                <span>{children}</span>
              </h2>
            ),
            
            h3: ({ children, ...props }) => (
              <h3 
                className="text-lg font-semibold text-blue-600 mt-5 mb-3"
                {...props}
              >
                {children}
              </h3>
            ),
            
            h4: ({ children, ...props }) => (
              <h4 
                className="text-base font-semibold text-gray-700 mt-4 mb-2"
                {...props}
              >
                {children}
              </h4>
            ),
            
            // Párrafos con mejor espaciado - Tamaño reducido
            p: ({ children, ...props }) => (
              <p className="text-base text-gray-700 leading-relaxed mb-4" {...props}>
                {children}
              </p>
            ),
            
            // Enlaces destacados
            a: ({ href, children, ...props }) => (
              <a 
                href={href} 
                className="text-blue-600 hover:text-blue-700 underline decoration-blue-400 hover:decoration-blue-600 decoration-2 underline-offset-2 font-medium transition-all"
                {...props}
              >
                {children}
              </a>
            ),
            
            // Código inline destacado - Más pequeño
            code: ({ className, children, ...props }) => {
              const isInline = !className;
              return isInline ? (
                <code 
                  className="bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded text-blue-700 text-sm font-mono font-semibold"
                  {...props}
                >
                  {children}
                </code>
              ) : (
                <code className={className} {...props}>{children}</code>
              );
            },
            
            // Bloques de código con estilo - Más compacto
            pre: ({ children, ...props }) => (
              <pre 
                className="bg-gray-900 text-gray-100 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6 overflow-x-auto shadow-xl font-mono text-xs leading-relaxed"
                {...props}
              >
                {children}
              </pre>
            ),
            
            // Tablas profesionales - Más compactas
            table: ({ children, ...props }) => (
              <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-200 shadow-lg">
                <table className="w-full border-collapse" {...props}>
                  {children}
                </table>
              </div>
            ),
            
            thead: ({ children, ...props }) => (
              <thead className="bg-gradient-to-r from-blue-600 to-blue-500" {...props}>
                {children}
              </thead>
            ),
            
            th: ({ children, ...props }) => (
              <th 
                className="px-4 py-2 text-left text-xs font-bold text-white uppercase tracking-wider"
                {...props}
              >
                {children}
              </th>
            ),
            
            tbody: ({ children, ...props }) => (
              <tbody className="bg-white divide-y divide-gray-200" {...props}>
                {children}
              </tbody>
            ),
            
            td: ({ children, ...props }) => (
              <td 
                className="px-4 py-2 text-sm text-gray-700 border-r border-gray-200 last:border-r-0"
                {...props}
              >
                {children}
              </td>
            ),
            
            // Blockquotes destacados (consejos, advertencias) - Más compactos
            blockquote: ({ children, ...props }) => (
              <blockquote 
                className="border-l-4 border-yellow-400 bg-yellow-50 pl-4 pr-4 py-3 my-6 rounded-r-lg shadow-md"
                {...props}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">💡</span>
                  <div className="flex-1 text-gray-800 text-base">
                    {children}
                  </div>
                </div>
              </blockquote>
            ),
            
            // Listas con mejor estilo - Más compactas
            ul: ({ children, ...props }) => (
              <ul className="space-y-2 my-4 ml-6" {...props}>
                {children}
              </ul>
            ),
            
            ol: ({ children, ...props }) => (
              <ol className="space-y-2 my-4 ml-6 list-decimal list-outside" {...props}>
                {children}
              </ol>
            ),
            
            li: ({ children, ...props }) => (
              <li 
                className="text-base text-gray-700 flex items-start gap-2 leading-relaxed"
                {...props}
              >
                <span className="text-blue-500 font-bold flex-shrink-0 mt-0.5">▸</span>
                <span className="flex-1">{children}</span>
              </li>
            ),
            
            // Líneas horizontales decorativas
            hr: ({ ...props }) => (
              <hr 
                className="my-8 border-0 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
                {...props}
              />
            ),
            
            // Imágenes grandes y prominentes - Más compactas
            img: ({ src, alt, width, height, ...props }) => {
              const imageSrc = src || '/assets/placeholder.svg';
              
              return (
                <figure className="my-6">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-gray-200 group">
                    <div className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                      <Image
                        src={imageSrc}
                        alt={alt || 'Imagen del manual'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                      />
                    </div>
                    {alt && (
                      <figcaption className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 text-center">
                        <p className="text-xs font-medium">{alt}</p>
                      </figcaption>
                    )}
                  </div>
                </figure>
              );
            },
            
            // Texto fuerte/negrita
            strong: ({ children, ...props }) => (
              <strong className="font-bold text-gray-900" {...props}>
                {children}
              </strong>
            ),
            
            // Texto en cursiva/énfasis
            em: ({ children, ...props }) => (
              <em className="italic text-gray-600" {...props}>
                {children}
              </em>
            ),
          }}
        >
          {section.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};
