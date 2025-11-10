'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ManualSection } from '@/types/page';
import Image from 'next/image';

interface TextPage3DProps {
  section: ManualSection;
}

/**
 * Componente optimizado para renderizar contenido dentro del libro 3D
 * Tamaños más pequeños y formato compacto para HTML en Three.js
 */
export const TextPage3D: React.FC<TextPage3DProps> = ({ section }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'white',
      color: '#1a1a1a',
      padding: '30px',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      overflow: 'auto',
    }}>
      {/* Header compacto */}
      <div style={{
        borderBottom: '2px solid #2563eb',
        paddingBottom: '15px',
        marginBottom: '20px',
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '10px',
        }}>
          {section.emoji}
        </div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1e40af',
          margin: 0,
          lineHeight: 1.3,
        }}>
          {section.title}
        </h1>
      </div>

      {/* Contenido Markdown */}
      <article style={{
        fontSize: '13px',
        lineHeight: 1.6,
      }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h2 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1e40af',
                marginTop: '20px',
                marginBottom: '12px',
                borderBottom: '1px solid #e5e7eb',
                paddingBottom: '6px',
              }}>
                {children}
              </h2>
            ),
            h2: ({ children }) => (
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#2563eb',
                marginTop: '16px',
                marginBottom: '10px',
              }}>
                {children}
              </h3>
            ),
            h3: ({ children }) => (
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#3b82f6',
                marginTop: '12px',
                marginBottom: '8px',
              }}>
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p style={{
                marginBottom: '12px',
                textAlign: 'justify',
              }}>
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul style={{
                marginLeft: '20px',
                marginBottom: '12px',
                listStyleType: 'disc',
              }}>
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol style={{
                marginLeft: '20px',
                marginBottom: '12px',
                listStyleType: 'decimal',
              }}>
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li style={{
                marginBottom: '6px',
              }}>
                {children}
              </li>
            ),
            table: ({ children }) => (
              <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '11px',
                  border: '1px solid #e5e7eb',
                }}>
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                color: 'white',
              }}>
                {children}
              </thead>
            ),
            th: ({ children }) => (
              <th style={{
                padding: '8px 12px',
                textAlign: 'left',
                fontWeight: '600',
                border: '1px solid #93c5fd',
              }}>
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td style={{
                padding: '6px 10px',
                border: '1px solid #e5e7eb',
              }}>
                {children}
              </td>
            ),
            blockquote: ({ children }) => (
              <blockquote style={{
                borderLeft: '3px solid #3b82f6',
                background: '#eff6ff',
                padding: '12px 16px',
                marginBottom: '16px',
                fontStyle: 'italic',
                borderRadius: '4px',
              }}>
                {children}
              </blockquote>
            ),
            code: ({ inline, children }: any) => {
              if (inline) {
                return (
                  <code style={{
                    background: '#f1f5f9',
                    color: '#dc2626',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}>
                    {children}
                  </code>
                );
              }
              return (
                <pre style={{
                  background: '#1e293b',
                  color: '#e2e8f0',
                  padding: '12px',
                  borderRadius: '6px',
                  overflow: 'auto',
                  marginBottom: '16px',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                }}>
                  <code>{children}</code>
                </pre>
              );
            },
            strong: ({ children }) => (
              <strong style={{ color: '#1e40af', fontWeight: '600' }}>
                {children}
              </strong>
            ),
            em: ({ children }) => (
              <em style={{ color: '#3b82f6' }}>{children}</em>
            ),
            img: ({ src, alt }) => (
              <div style={{
                margin: '16px 0',
                textAlign: 'center',
              }}>
                <Image
                  src={src || '/assets/placeholder.svg'}
                  alt={alt || 'Imagen del manual'}
                  width={600}
                  height={400}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                  }}
                  unoptimized
                />
                {alt && (
                  <p style={{
                    fontSize: '11px',
                    color: '#6b7280',
                    marginTop: '6px',
                    fontStyle: 'italic',
                  }}>
                    {alt}
                  </p>
                )}
              </div>
            ),
          }}
        >
          {section.content}
        </ReactMarkdown>
      </article>
    </div>
  );
};
