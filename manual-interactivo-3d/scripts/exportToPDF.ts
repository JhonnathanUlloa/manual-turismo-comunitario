/**
 * Script para exportar el manual a PDF con alta calidad
 * Incluye imágenes y mantiene el formato visual
 */

import fs = require('fs');
import path = require('path');

// Importar manualSections usando require
const { manualSections } = require('../src/data/manualData');

interface PDFSection {
  id: number;
  title: string;
  emoji: string;
  content: string;
  imagePath?: string;
}

/**
 * Genera HTML completo para el PDF
 */
function generateHTML(sections: PDFSection[]): string {
  const styles = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
      
      @page {
        size: A4;
        margin: 0;
        background: white;
      }
      
      @page :first {
        margin: 0;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html {
        background: white;
      }
      
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        font-size: 11pt;
        line-height: 1.6;
        color: #1f2937;
        background: white;
        margin: 0;
        padding: 0;
      }
      
      .cover {
        page-break-after: always;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: linear-gradient(135deg, #6A994E 0%, #8BC06E 50%, #6A994E 100%);
        color: white;
        padding: 2cm;
        position: relative;
      }
      
      .cover h1 {
        font-size: 56pt;
        font-weight: 800;
        margin-bottom: 0.5cm;
        color: white;
        text-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      }
      
      .cover .subtitle {
        font-size: 22pt;
        color: white;
        margin-bottom: 0.3cm;
        font-weight: 500;
        opacity: 0.95;
      }
      
      .cover .date {
        font-size: 14pt;
        color: white;
        margin-top: 1cm;
        font-weight: 400;
        opacity: 0.9;
      }
      
      .cover-footer {
        position: absolute;
        bottom: 2cm;
        font-size: 10pt;
        color: white;
        font-weight: 400;
        opacity: 0.8;
      }
      
      .section {
        page-break-before: always;
        padding: 1.5cm 2cm;
        background: white;
        min-height: 100vh;
        box-sizing: border-box;
      }
      
      .section-header {
        margin-bottom: 0.5cm;
        padding: 0.4cm 0.5cm;
        background: linear-gradient(to right, #6A994E, #8BC06E, #6A994E);
        border-bottom: 4px solid #6A994E;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        display: flex;
        align-items: center;
        gap: 0.3cm;
      }
      
      .section-title {
        font-size: 20pt;
        color: white;
        font-weight: 800;
        line-height: 1.3;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      }
      
      .section-emoji {
        font-size: 32pt;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
      }
      
      .section-badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(4px);
        padding: 0.1cm 0.3cm;
        border-radius: 0.3cm;
        font-size: 10pt;
        color: white;
        margin-top: 0.1cm;
      }
      
      .section-content {
        margin-top: 0.4cm;
        color: #374151;
      }
      
      .section-content h1 {
        font-size: 18pt;
        color: #111827;
        margin-top: 0.5cm;
        margin-bottom: 0.3cm;
        font-weight: 700;
        padding: 0.3cm 0.4cm;
        padding-left: 0.5cm;
        background: linear-gradient(to right, #f0fdf4, transparent);
        border-left: 4px solid #8BC06E;
        border-bottom: 2px solid #e5e7eb;
        border-radius: 0.1cm;
      }
      
      .section-content h2 {
        font-size: 15pt;
        color: #1f2937;
        margin-top: 0.4cm;
        margin-bottom: 0.25cm;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.2cm;
      }
      
      .section-content h2::before {
        content: '';
        width: 4px;
        height: 24px;
        background: linear-gradient(to bottom, #6A994E, #5A8440);
        border-radius: 2px;
      }
      
      .section-content h3 {
        font-size: 13pt;
        color: #5A8440;
        margin-top: 0.4cm;
        margin-bottom: 0.2cm;
        font-weight: 600;
        font-style: italic;
      }
      
      .section-content h4 {
        font-size: 11pt;
        color: #1f2937;
        margin-top: 0.3cm;
        margin-bottom: 0.15cm;
        font-weight: 600;
      }
      
      .section-content p {
        margin-bottom: 0.35cm;
        text-align: justify;
        color: #1f2937;
        line-height: 1.6;
        font-size: 10.5pt;
      }
      
      .section-content ul,
      .section-content ol {
        margin-left: 0.6cm;
        margin-bottom: 0.4cm;
        counter-reset: list-counter;
      }
      
      .section-content ol {
        list-style: none;
        counter-reset: item;
      }
      
      .section-content ol li {
        counter-increment: item;
        position: relative;
        padding-left: 0.5cm;
      }
      
      .section-content ol li::before {
        content: counter(item) ".";
        position: absolute;
        left: 0;
        color: #1f2937;
        font-weight: 700;
      }
      
      .section-content li {
        margin-bottom: 0.2cm;
        color: #1f2937;
        line-height: 1.5;
      }
      
      .section-content ul li::before {
        content: '▸';
        position: absolute;
        left: -0.3cm;
        color: #6A994E;
        font-weight: bold;
      }
      
      .section-content strong {
        color: #111827;
        font-weight: 800;
        background: #fef3c7;
        padding: 0.05cm 0.2cm;
        border-radius: 0.1cm;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
      
      .section-content em {
        font-style: italic;
        color: #1e40af;
        font-weight: 600;
      }
      
      .section-content code {
        background: linear-gradient(to right, #f0fdf4, #dcfce7);
        color: #5A8440;
        border: 1px solid #bbf7d0;
        padding: 0.05cm 0.15cm;
        border-radius: 0.1cm;
        font-family: 'Courier New', monospace;
        font-size: 10pt;
        box-shadow: 0 1px 2px rgba(106, 153, 78, 0.1);
      }
      
      .section-content pre {
        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
        color: #6ee7b7;
        border: 1px solid #374151;
        padding: 0.3cm;
        border-radius: 0.15cm;
        overflow-x: auto;
        margin: 0.3cm 0;
        font-family: 'Courier New', monospace;
        font-size: 9pt;
        line-height: 1.4;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      }
      
      .section-content pre code {
        background: none;
        color: #6ee7b7;
        border: none;
        padding: 0;
        box-shadow: none;
      }
      
      .section-content blockquote {
        border-left: 4px solid #6A994E;
        padding: 0.3cm 0.4cm;
        margin: 0.3cm 0;
        background: linear-gradient(to right, #f0fdf4, transparent);
        border-radius: 0 0.1cm 0.1cm 0;
        color: #1f2937;
        font-style: italic;
        box-shadow: 0 1px 3px rgba(106, 153, 78, 0.1);
      }
      
      .section-content blockquote::before {
        content: '💡 ';
        font-style: normal;
      }
      
      .section-content table {
        width: 100%;
        border-collapse: collapse;
        margin: 0.3cm 0;
        background: white;
        border-radius: 0.15cm;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(106, 153, 78, 0.2);
        border: 2px solid #bbf7d0;
      }
      
      .section-content th,
      .section-content td {
        border: 1px solid #d1d5db;
        padding: 0.2cm 0.3cm;
        text-align: left;
      }
      
      .section-content th {
        background: linear-gradient(135deg, #6A994E 0%, #8BC06E 100%);
        color: white;
        font-weight: 700;
        border-right: 1px solid #5A8440;
      }
      
      .section-content tr:nth-child(even) {
        background: #f0fdf4;
      }
      
      .section-content tr:hover {
        background: #dcfce7;
      }
      
      .section-image {
        margin: 0.5cm 0 0.6cm 0;
        text-align: center;
        page-break-inside: avoid;
        background: #f9fafb;
        padding: 0.4cm;
        border-radius: 0.3cm;
        border: 2px solid #e5e7eb;
      }
      
      .section-image img {
        max-width: 100%;
        max-height: 12cm;
        border-radius: 0.2cm;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border: 1px solid #d1d5db;
      }
      
      .section-image-caption {
        font-size: 9pt;
        color: #6b7280;
        margin-top: 0.25cm;
        font-style: italic;
        font-weight: 500;
      }
      
      .last-page {
        page-break-before: always;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: linear-gradient(135deg, #6A994E 0%, #8BC06E 100%);
        color: white;
        padding: 2cm;
        position: relative;
      }
      
      .last-page h2 {
        font-size: 32pt;
        font-weight: 700;
        margin-bottom: 1cm;
      }
      
      .last-page p {
        font-size: 16pt;
        opacity: 0.95;
      }
      
      .last-page-footer {
        position: absolute;
        bottom: 2cm;
        font-size: 11pt;
        opacity: 0.9;
      }
      
      a {
        color: #2563eb;
        text-decoration: underline;
        text-decoration-color: #93c5fd;
        font-weight: 600;
      }
      
      a:hover {
        color: #1e40af;
        text-decoration-color: #60a5fa;
      }
      
      hr {
        margin: 0.4cm 0;
        border: none;
        border-top: 2px solid #e5e7eb;
      }
    </style>
  `;

  // Función para generar ID válido desde texto
  function generateId(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Función para convertir Markdown a HTML básico
  function markdownToHTML(text: string, isIndex: boolean = false): string {
    let html = text;
    
    // Reemplazar líneas vacías \r\n por saltos
    html = html.replace(/\r\n/g, '\n');
    
    // Headers
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bloques de código
    html = html.replace(/```([^`]+)```/gim, '<pre><code>$1</code></pre>');
    
    // Negritas
    html = html.replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>');
    
    // Itálicas
    html = html.replace(/\*([^*]+)\*/gim, '<em>$1</em>');
    
    // Código inline
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
    
    // Listas con viñetas
    html = html.replace(/^[•\-\*] (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>');
    
    // Listas numeradas
    html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');
    
    // Links internos del índice
    if (isIndex) {
      html = html.replace(/\[([^\]]+)\]\(#([^)]+)\)/gim, (match, text, anchor) => {
        return `<a href="#${anchor}" style="color: #8BC06E; text-decoration: none; font-weight: 500; transition: color 0.2s;">${text}</a>`;
      });
    } else {
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');
    }
    
    // Líneas horizontales
    html = html.replace(/^---$/gim, '<hr>');
    
    // Párrafos
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Limpiar párrafos vacíos y múltiples
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)<\/p>/g, '$1');
    html = html.replace(/<p>(<pre>)/g, '$1');
    html = html.replace(/(<\/pre>)<\/p>/g, '$1');
    html = html.replace(/<p>(<hr>)/g, '$1');
    html = html.replace(/(<hr>)<\/p>/g, '$1');
    
    // Formatear cajas especiales
    html = html.replace(/⚠️ \*\*([^*]+)\*\*/g, '<div class="warning-box"><strong>⚠️ $1</strong>');
    html = html.replace(/💡 \*\*([^*]+)\*\*/g, '<div class="info-box"><strong>💡 $1</strong>');
    html = html.replace(/✅ \*\*([^*]+)\*\*/g, '<div class="success-box"><strong>✅ $1</strong>');
    
    return html;
  }

  // Generar portada
  let html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Manual de Usuario - Sistema de Turismo Comunitario</title>
      ${styles}
    </head>
    <body>
      <div class="cover">
        <h1>📖 Manual de Usuario</h1>
        <div class="subtitle">Sistema de Gestión de Contenidos</div>
        <div class="subtitle">Plataforma Turismo Bajo Sogamoso</div>
        <div class="date">Noviembre 2025</div>
        <div class="cover-footer">© 2025 Turismo Bajo Sogamoso - Manual de Usuario v1.0</div>
      </div>
  `;

  // Generar secciones (filtrar vacías o inútiles)
  const validSections = sections.filter(s => {
    const content = s.content?.trim() || '';
    const title = s.title?.toLowerCase() || '';
    
    // Filtrar secciones vacías
    if (!content || content.length <= 2) return false;
    if (content === '\r' || content === '---') return false;
    
    // Filtrar títulos duplicados o inútiles
    if (title.includes('manual de usuario - sistema')) return false;
    if (title === 'plataforma turismo bajo sogamoso') return false;
    
    return true;
  });

  validSections.forEach((section, index) => {
    const sectionId = generateId(section.title);
    const isIndexSection = section.title.toLowerCase().includes('índice') || section.title.toLowerCase().includes('indice');
    
    html += `
      <div class="section" id="${sectionId}">
        <div class="section-header">
          <div class="section-title">
            <span class="section-emoji">${section.emoji}</span>
            ${section.title}
          </div>
        </div>
    `;

    // Agregar imagen si existe
    if (section.imagePath && fs.existsSync(section.imagePath)) {
      const imageBuffer = fs.readFileSync(section.imagePath);
      const base64Image = imageBuffer.toString('base64');
      const ext = path.extname(section.imagePath).toLowerCase();
      const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
      
      html += `
        <div class="section-image">
          <img src="data:${mimeType};base64,${base64Image}" alt="${section.title}" />
          <div class="section-image-caption">Figura ${index + 1}: ${section.title}</div>
        </div>
      `;
    }

    // Agregar contenido
    html += `
        <div class="section-content">
          ${markdownToHTML(section.content, isIndexSection)}
        </div>
      </div>
    `;
  });

  html += `
      <div class="last-page">
        <h2>¡Gracias por utilizar este manual!</h2>
        <p style="margin-top: 1cm; font-size: 13pt;">Para soporte técnico o consultas adicionales,<br>contacte al equipo de desarrollo.</p>
        <div class="last-page-footer">© 2025 Turismo Bajo Sogamoso - Manual de Usuario v1.0</div>
      </div>
    </body>
    </html>
  `;

  return html;
}

/**
 * Función principal
 */
async function exportToPDF() {
  console.log('🚀 Iniciando exportación a PDF...\n');

  // Preparar secciones con rutas de imágenes
  const sections: PDFSection[] = manualSections.map((section) => {
    const imagePath = path.join(
      process.cwd(),
      'public',
      'images',
      'manual',
      `seccion-${section.id}.png`
    );

    return {
      id: section.id,
      title: section.title,
      emoji: section.emoji || '📄',
      content: section.content,
      imagePath: fs.existsSync(imagePath) ? imagePath : undefined,
    };
  });

  console.log(`📄 Procesando ${sections.length} secciones...`);
  
  // Contar imágenes encontradas
  const imagesFound = sections.filter(s => s.imagePath).length;
  console.log(`🖼️  Imágenes encontradas: ${imagesFound}/${sections.length}`);

  // Generar HTML
  const html = generateHTML(sections);
  
  // Guardar HTML temporal
  const outputDir = path.join(process.cwd(), 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const htmlPath = path.join(outputDir, 'manual-temp.html');
  fs.writeFileSync(htmlPath, html, 'utf-8');
  console.log(`\n✅ HTML generado: ${htmlPath}`);

  console.log('\n📋 Pasos siguientes:');
  console.log('   1. Instala Puppeteer: npm install --save-dev puppeteer');
  console.log('   2. Ejecuta: npm run export-pdf');
  console.log('   3. O abre manual-temp.html en Chrome y usa Ctrl+P para imprimir a PDF');
  console.log('\n💡 El HTML está optimizado para impresión con alta calidad.\n');
}

// Ejecutar
exportToPDF().catch(console.error);
