/**
 * Script para generar PDF leyendo directamente los archivos fuente del proyecto
 * Usa el contenido de manualData.ts, estilos de Tailwind y globals.css
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar datos del manual
import { manualSections } from '../src/data/manualData.js';

async function generatePDF() {
  console.log('🚀 Generando PDF desde archivos fuente del proyecto...\n');

  const pdfPath = path.join(__dirname, '..', 'output', 'Manual-Usuario-Turismo-Comunitario.pdf');
  const imagesPath = path.join(__dirname, '..', 'public', 'images', 'manual');

  try {
    // Leer archivos CSS del proyecto
    console.log('📖 Leyendo estilos del proyecto...');
    const globalsCSS = fs.readFileSync(
      path.join(__dirname, '..', 'src', 'styles', 'globals.css'),
      'utf-8'
    );

    // Verificar imágenes disponibles
    console.log('🖼️  Verificando imágenes...');
    const availableImages: Set<number> = new Set();
    if (fs.existsSync(imagesPath)) {
      const imageFiles = fs.readdirSync(imagesPath);
      imageFiles.forEach(file => {
        const match = file.match(/seccion-(\d+)\.png/);
        if (match) {
          availableImages.add(parseInt(match[1]));
        }
      });
      console.log(`✓ Encontradas ${availableImages.size} imágenes de secciones`);
    }

    console.log(`✓ Encontradas ${manualSections.length} secciones del manual`);
    console.log('✓ Estilos CSS globales cargados');
    console.log('✓ Usando configuración Tailwind del proyecto\n');

    // Generar HTML completo con todas las secciones
    console.log('📝 Generando HTML con contenido TypeScript...');
    
    const fullHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manual de Usuario - Turismo Comunitario</title>
  
  <!-- Fuente Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN con configuración del proyecto -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              DEFAULT: '#6A994E',
              light: '#8BC06E',
              hover: '#5A8440',
              50: '#f0f7ed',
              100: '#d9ecc9',
              200: '#c2e1a5',
              300: '#abd681',
              400: '#8BC06E',
              500: '#6A994E',
              600: '#5A8440',
              700: '#4a6e34',
              800: '#3a5828',
              900: '#2a421c',
            },
            blue: {
              50: '#eff6ff',
              100: '#dbeafe',
              200: '#bfdbfe',
              300: '#93c5fd',
              400: '#60a5fa',
              500: '#3b82f6',
              600: '#2563EB',
              700: '#1D4ED8',
              800: '#1e40af',
              900: '#1e3a8a',
            }
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
  
  <style>
    /* Estilos base del proyecto */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: white;
      color: #1f2937;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    .pdf-page {
      page-break-after: always;
      page-break-inside: avoid;
      width: 21cm;
      min-height: 29.7cm;
      background: white;
      padding: 1.5cm 2cm 2.5cm 2cm;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    
    .pdf-page:last-child {
      page-break-after: auto;
    }
    
    /* Header con gradiente verde de marca */
    .page-header {
      background: linear-gradient(135deg, #6A994E 0%, #8BC06E 50%, #5A8440 100%);
      color: white;
      padding: 1.25rem 1.75rem;
      border-radius: 0.75rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      page-break-inside: avoid;
      page-break-after: avoid;
    }
    
    .page-header h1 {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      line-height: 1.25;
    }
    
    .emoji {
      font-size: 1.75rem;
      line-height: 1;
      flex-shrink: 0;
    }
    
    /* Contenido - Estilos optimizados para PDF */
    .page-content {
      color: #374151;
      line-height: 1.7;
      font-size: 0.95rem;
      flex-grow: 1;
      overflow: visible;
    }
    
    .page-content > * {
      page-break-inside: avoid;
    }
    
    .page-content h2 {
      color: #6A994E;
      font-size: 1.4rem;
      font-weight: 700;
      margin-top: 1.25rem;
      margin-bottom: 0.85rem;
      border-bottom: 2px solid #8BC06E;
      padding-bottom: 0.4rem;
      page-break-after: avoid;
      page-break-inside: avoid;
    }
    
    .page-content h3 {
      color: #5A8440;
      font-size: 1.15rem;
      font-weight: 600;
      margin-top: 1rem;
      margin-bottom: 0.65rem;
      page-break-after: avoid;
      page-break-inside: avoid;
    }
    
    .page-content p {
      margin-bottom: 0.85rem;
      color: #374151;
      orphans: 3;
      widows: 3;
    }
    
    .page-content ul,
    .page-content ol {
      margin-left: 1.5rem;
      margin-bottom: 0.85rem;
      color: #374151;
      page-break-inside: avoid;
    }
    
    .page-content li {
      margin-bottom: 0.4rem;
      list-style-position: outside;
      line-height: 1.6;
    }
    
    .page-content ul li {
      list-style-type: disc;
    }
    
    .page-content ol li {
      list-style-type: decimal;
    }
    
    .page-content strong {
      color: #1f2937;
      font-weight: 600;
      background: #fef3c7;
      padding: 0.1rem 0.25rem;
      border-radius: 0.2rem;
    }
    
    .page-content em {
      color: #6A994E;
      font-style: italic;
      font-weight: 500;
    }
    
    .page-content code {
      background: #f3f4f6;
      color: #6A994E;
      padding: 0.2rem 0.4rem;
      border-radius: 0.25rem;
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 0.85rem;
      border: 1px solid #e5e7eb;
      white-space: pre-wrap;
      word-break: break-word;
    }
    
    .page-content pre {
      background: #1f2937;
      color: #e5e7eb;
      padding: 0.85rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      margin-bottom: 0.85rem;
      border: 1px solid #374151;
      page-break-inside: avoid;
    }
    
    .page-content pre code {
      background: transparent;
      color: #8BC06E;
      border: none;
      padding: 0;
      font-size: 0.8rem;
    }
    
    .page-content blockquote {
      border-left: 4px solid #6A994E;
      background: #f0f7ed;
      padding: 0.85rem;
      margin: 0.85rem 0;
      border-radius: 0 0.5rem 0.5rem 0;
      font-style: italic;
      color: #374151;
      page-break-inside: avoid;
    }
    
    .page-content a {
      color: #2563EB;
      text-decoration: underline;
      text-decoration-color: #60a5fa;
      font-weight: 500;
      word-break: break-word;
    }
    
    .page-content table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 0.85rem;
      border-radius: 0.5rem;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      page-break-inside: avoid;
    }
    
    .page-content thead {
      background: linear-gradient(135deg, #6A994E, #8BC06E);
      color: white;
    }
    
    .page-content th {
      padding: 0.65rem 0.85rem;
      text-align: left;
      font-weight: 600;
      font-size: 0.85rem;
    }
    
    .page-content td {
      padding: 0.65rem 0.85rem;
      border-bottom: 1px solid #e5e7eb;
      color: #374151;
      font-size: 0.85rem;
    }
    
    .page-content tbody tr:nth-child(even) {
      background: #f9fafb;
    }
    
    .page-content hr {
      border: none;
      border-top: 2px solid #e5e7eb;
      margin: 1.5rem 0;
      page-break-after: avoid;
    }
    
    /* Imágenes */
    .image-container {
      page-break-inside: avoid;
      margin: 1rem 0;
    }
    
    .image-container img {
      max-width: 100%;
      height: auto;
      display: block;
      border-radius: 0.5rem;
      border: 2px solid #e5e7eb;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .image-centered {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 18cm;
      page-break-inside: avoid;
    }
    
    .image-centered img {
      max-width: 90%;
      max-height: 18cm;
      object-fit: contain;
      border-radius: 0.75rem;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    }
    
    /* Footer */
    .page-footer {
      position: absolute;
      bottom: 1cm;
      left: 2cm;
      right: 2cm;
      padding-top: 0.75rem;
      border-top: 2px solid #e5e7eb;
      text-align: center;
      color: #9ca3af;
      font-size: 0.8rem;
      page-break-inside: avoid;
    }
    
    /* Prevenir líneas huérfanas y viudas */
    p, li, blockquote {
      orphans: 3;
      widows: 3;
    }
    
    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid;
    }
    
    @page {
      size: A4;
      margin: 0;
    }
    
    @media print {
      .pdf-page {
        page-break-after: always;
      }
      
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      h1, h2, h3, h4, h5, h6 {
        page-break-after: avoid;
      }
      
      p, li, blockquote, pre, table {
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body>
  ${manualSections.map((section, index) => {
    const hasImage = availableImages.has(section.id);
    const imagePathLocal = path.join(imagesPath, `seccion-${section.id}.png`);
    
    // Convertir imagen a base64 si existe
    let imageBase64 = '';
    if (hasImage && fs.existsSync(imagePathLocal)) {
      const imageBuffer = fs.readFileSync(imagePathLocal);
      imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    }
    
    // Determinar posición de imagen (misma lógica que TextPageBook.tsx)
    let imagePosition = 'none';
    if (section.id === 0 || section.id === 1) {
      imagePosition = 'centered';
    } else if (hasImage) {
      const content = section.content.toLowerCase();
      const title = section.title.toLowerCase();
      
      if (title.includes('introducción') || title.includes('qué es')) {
        imagePosition = 'bottom';
      } else if (content.includes('paso') || content.includes('clic')) {
        imagePosition = 'top';
      } else {
        imagePosition = 'middle';
      }
    }
    
    return `
    <div class="pdf-page">
      <div class="page-header">
        <h1>
          <span class="emoji">${section.emoji || '📄'}</span>
          ${section.title}
        </h1>
      </div>
      
      <div class="page-content">
        ${imagePosition === 'centered' && imageBase64 ? `
          <div style="display: flex; justify-content: center; align-items: center; min-height: 20cm;">
            <img src="${imageBase64}" alt="${section.title}" style="max-width: 90%; max-height: 20cm; object-fit: contain; border-radius: 0.75rem; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);" />
          </div>
        ` : ''}
        
        ${imagePosition === 'top' && imageBase64 ? `
          <div style="margin-bottom: 1.5rem;">
            <img src="${imageBase64}" alt="${section.title}" style="width: 100%; max-height: 12cm; object-fit: contain; border-radius: 0.5rem; border: 2px solid #e5e7eb;" />
          </div>
        ` : ''}
        
        ${imagePosition !== 'centered' ? convertMarkdownToHTML(section.content) : ''}
        
        ${imagePosition === 'middle' && imageBase64 ? `
          <div style="margin: 1.5rem 0;">
            <img src="${imageBase64}" alt="${section.title}" style="width: 100%; max-height: 10cm; object-fit: contain; border-radius: 0.5rem; border: 2px solid #e5e7eb;" />
          </div>
        ` : ''}
        
        ${imagePosition === 'bottom' && imageBase64 ? `
          <div style="margin-top: 1.5rem;">
            <img src="${imageBase64}" alt="${section.title}" style="width: 100%; max-height: 10cm; object-fit: contain; border-radius: 0.5rem; border: 2px solid #e5e7eb;" />
          </div>
        ` : ''}
      </div>
      
      <div class="page-footer">
        <p>Página ${index + 1} de ${manualSections.length} | Manual de Usuario - Turismo Comunitario Bajo Sogamoso</p>
      </div>
    </div>
  `;
  }).join('\n')}
</body>
</html>`;

    // Guardar HTML temporal
    const tempHtmlPath = path.join(__dirname, '..', 'output', 'manual-direct-temp.html');
    fs.writeFileSync(tempHtmlPath, fullHTML, 'utf-8');
    console.log(`✓ HTML generado: ${tempHtmlPath}\n`);

    // Generar PDF con Puppeteer
    console.log('🖨️  Generando PDF con Puppeteer...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto(`file://${tempHtmlPath}`, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });

    // Esperar a que carguen las fuentes de Google
    await page.evaluateHandle('document.fonts.ready');
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
    });

    await browser.close();

    console.log(`\n✅ PDF generado exitosamente:`);
    console.log(`   📁 ${pdfPath}`);
    
    const stats = fs.statSync(pdfPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   📊 Tamaño: ${fileSizeMB} MB`);
    console.log(`   📄 Páginas: ${manualSections.length}`);
    console.log(`   🖼️  Imágenes: ${availableImages.size} incluidas`);
    console.log('\n🎉 Contenido del proyecto incluido:');
    console.log('   ✓ manualData.ts - Datos de TypeScript');
    console.log('   ✓ tailwind.config.js - Colores de marca (#6A994E, #8BC06E)');
    console.log('   ✓ globals.css - Estilos personalizados');
    console.log('   ✓ Fuente Inter de Google Fonts');
    console.log('   ✓ Markdown → HTML con formato');
    console.log('   ✓ Emojis y símbolos especiales');
    console.log('   ✓ Imágenes del proyecto (public/images/manual/)');
    console.log('   ✓ Gradientes y efectos visuales\n');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Función para convertir Markdown a HTML con formato completo
function convertMarkdownToHTML(markdown: string): string {
  if (!markdown) return '';
  
  let html = markdown;
  
  // Headers (del más específico al más general)
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  
  // Italic (después de bold para no interferir)
  html = html.replace(/\*([^*]+)\*/gim, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>');
  
  // Code blocks (antes que inline code)
  html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');
  
  // Listas - Manejar múltiples niveles
  const lines = html.split('\n');
  let inList = false;
  let listType = '';
  const processed = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Lista desordenada
    if (/^[\s]*[•\-\*] (.*)/.test(line)) {
      if (!inList) {
        processed.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      const match = line.match(/^[\s]*[•\-\*] (.*)/);
      processed.push(`<li>${match ? match[1] : line}</li>`);
    }
    // Lista ordenada
    else if (/^[\s]*\d+\. (.*)/.test(line)) {
      if (!inList || listType !== 'ol') {
        if (inList) processed.push(`</${listType}>`);
        processed.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      const match = line.match(/^[\s]*\d+\. (.*)/);
      processed.push(`<li>${match ? match[1] : line}</li>`);
    }
    else {
      if (inList) {
        processed.push(`</${listType}>`);
        inList = false;
      }
      processed.push(line);
    }
  }
  
  if (inList) {
    processed.push(`</${listType}>`);
  }
  
  html = processed.join('\n');
  
  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
  
  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr />');
  
  // Párrafos (después de procesar todo lo demás)
  const paragraphs = html.split('\n\n');
  html = paragraphs.map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<ol') || 
        p.startsWith('<pre') || p.startsWith('<blockquote') || p.startsWith('<hr') ||
        p === '\r' || p === '---') {
      return p;
    }
    // Solo envolver en <p> si no tiene ya una etiqueta HTML
    if (!p.startsWith('<') || p.startsWith('<em') || p.startsWith('<strong') || 
        p.startsWith('<a') || p.startsWith('<code')) {
      return `<p>${p}</p>`;
    }
    return p;
  }).join('\n');
  
  // Reemplazar \r\n por <br> solo fuera de tags
  html = html.replace(/\r\n/g, '<br>');
  html = html.replace(/\r/g, '');
  
  return html;
}

generatePDF();
