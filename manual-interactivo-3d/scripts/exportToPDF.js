/**
 * Script para exportar el manual a PDF con alta calidad
 * Incluye imágenes y mantiene el formato visual
 */

const fs = require('fs');
const path = require('path');

// Leer manualData.ts y extraer el array manualSections
const manualDataPath = path.join(__dirname, '..', 'src', 'data', 'manualData.ts');
const manualDataContent = fs.readFileSync(manualDataPath, 'utf-8');

// Extraer el array JSON (está entre export const manualSections = [ ... ];)
const match = manualDataContent.match(/export const manualSections[^=]*=\s*(\[[\s\S]*?\n\]);/);
if (!match) {
  console.error('❌ Error: No se pudo extraer manualSections de manualData.ts');
  process.exit(1);
}

// Evaluar el array (es JSON válido)
const manualSections = eval(match[1]);

/**
 * Genera HTML completo para el PDF
 */
function generateHTML(sections) {
  const styles = `
    <style>
      @page {
        size: A4;
        margin: 2cm 2cm 1.5cm 2cm;
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
        font-size: 10.5pt;
        line-height: 1.7;
        color: #2c3e50;
        background: white;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
      }
      
      .cover {
        page-break-after: always;
        min-height: 28cm;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 3cm 2cm;
        position: relative;
        box-shadow: inset 0 0 100px rgba(0,0,0,0.1);
      }
      
      .cover::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="2" fill="white" opacity="0.1"/></svg>');
        background-size: 50px 50px;
        opacity: 0.3;
      }
      
      .cover h1 {
        font-size: 52pt;
        margin-bottom: 0.8cm;
        font-weight: 700;
        letter-spacing: -1px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.2);
        z-index: 1;
        position: relative;
      }
      
      .cover .subtitle {
        font-size: 22pt;
        opacity: 0.95;
        margin-bottom: 0.5cm;
        font-weight: 300;
        z-index: 1;
        position: relative;
      }
      
      .cover .date {
        font-size: 13pt;
        opacity: 0.85;
        margin-top: 3cm;
        font-weight: 300;
        z-index: 1;
        position: relative;
      }
      
      .section {
        page-break-before: always;
        padding-top: 0.3cm;
      }
      
      .section-header {
        margin-bottom: 1.2cm;
        padding-bottom: 0.5cm;
        border-bottom: 4px solid #667eea;
        background: linear-gradient(to right, rgba(102, 126, 234, 0.05) 0%, transparent 100%);
        padding: 0.6cm 0.4cm 0.5cm 0.4cm;
        margin-left: -0.4cm;
        margin-right: -0.4cm;
        border-radius: 4px 4px 0 0;
      }
      
      .section-title {
        font-size: 26pt;
        color: #667eea;
        font-weight: 700;
        margin-bottom: 0.1cm;
        letter-spacing: -0.5px;
        display: flex;
        align-items: center;
      }
      
      .section-emoji {
        font-size: 36pt;
        margin-right: 0.4cm;
        display: inline-block;
      }
      
      .section-content {
        margin-top: 0.5cm;
      }
      
      .section-content h1 {
        font-size: 18pt;
        color: #1a202c;
        margin-top: 1cm;
        margin-bottom: 0.5cm;
        font-weight: 700;
        border-left: 5px solid #667eea;
        padding-left: 0.4cm;
        background: rgba(102, 126, 234, 0.03);
        padding-top: 0.3cm;
        padding-bottom: 0.3cm;
      }
      
      .section-content h2 {
        font-size: 15pt;
        color: #2d3748;
        margin-top: 0.8cm;
        margin-bottom: 0.4cm;
        font-weight: 600;
        border-left: 3px solid #4299e1;
        padding-left: 0.3cm;
      }
      
      .section-content h3 {
        font-size: 13pt;
        color: #4a5568;
        margin-top: 0.6cm;
        margin-bottom: 0.3cm;
        font-weight: 600;
        padding-left: 0.2cm;
      }
      
      .section-content h4 {
        font-size: 11.5pt;
        color: #718096;
        margin-top: 0.5cm;
        margin-bottom: 0.25cm;
        font-weight: 600;
        font-style: italic;
      }
      
      .section-content p {
        margin-bottom: 0.5cm;
        text-align: justify;
        hyphens: auto;
      }
      
      .section-content ul,
      .section-content ol {
        margin-left: 1cm;
        margin-bottom: 0.5cm;
        padding-left: 0.3cm;
      }
      
      .section-content ul {
        list-style-type: none;
      }
      
      .section-content ul li::before {
        content: "▸";
        color: #667eea;
        font-weight: bold;
        display: inline-block;
        width: 0.5cm;
        margin-left: -0.5cm;
      }
      
      .section-content ol {
        counter-reset: item;
      }
      
      .section-content ol li {
        counter-increment: item;
        position: relative;
      }
      
      .section-content ol li::before {
        content: counter(item) ".";
        color: #667eea;
        font-weight: 600;
        position: absolute;
        left: -0.7cm;
      }
      
      .section-content li {
        margin-bottom: 0.3cm;
        line-height: 1.6;
      }
      
      .section-content strong {
        color: #1a202c;
        font-weight: 700;
      }
      
      .section-content em {
        font-style: italic;
        color: #4a5568;
      }
      
      .section-content code {
        background-color: #f7f9fc;
        color: #e53e3e;
        padding: 0.08cm 0.2cm;
        border-radius: 0.12cm;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 9.5pt;
        border: 1px solid #e2e8f0;
        font-weight: 500;
      }
      
      .section-content pre {
        background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
        color: #f7fafc;
        padding: 0.5cm;
        border-radius: 0.25cm;
        overflow-x: auto;
        margin: 0.6cm 0;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 9pt;
        line-height: 1.5;
        border: 1px solid #4a5568;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        page-break-inside: avoid;
      }
      
      .section-content pre code {
        background: none;
        color: #f7fafc;
        padding: 0;
        border: none;
      }
      
      .section-content blockquote {
        border-left: 5px solid #667eea;
        padding-left: 0.5cm;
        padding-top: 0.3cm;
        padding-bottom: 0.3cm;
        margin: 0.6cm 0;
        background: rgba(102, 126, 234, 0.05);
        color: #4a5568;
        font-style: italic;
        border-radius: 0 4px 4px 0;
      }
      
      .section-content table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin: 0.6cm 0;
        border: 1px solid #cbd5e0;
        border-radius: 6px;
        overflow: hidden;
        page-break-inside: avoid;
      }
      
      .section-content th,
      .section-content td {
        padding: 0.3cm 0.4cm;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
      }
      
      .section-content th {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-weight: 600;
        font-size: 10pt;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .section-content td {
        background-color: white;
      }
      
      .section-content tr:nth-child(even) td {
        background-color: #f8fafc;
      }
      
      .section-content tr:hover td {
        background-color: #edf2f7;
      }
      
      .section-content tr:last-child td {
        border-bottom: none;
      }
      
      .section-image {
        margin: 0.8cm 0 1cm 0;
        text-align: center;
        page-break-inside: avoid;
        background: #f8fafc;
        padding: 0.5cm;
        border-radius: 8px;
        border: 1px solid #e2e8f0;
      }
      
      .section-image img {
        max-width: 100%;
        max-height: 13cm;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        border: 2px solid white;
      }
      
      .section-image-caption {
        font-size: 9pt;
        color: #4a5568;
        margin-top: 0.4cm;
        font-style: italic;
        font-weight: 500;
        background: white;
        padding: 0.2cm 0.4cm;
        border-radius: 4px;
        display: inline-block;
      }
      
      .warning-box {
        background: linear-gradient(to right, #fff5f5 0%, #ffe5e5 100%);
        border-left: 5px solid #fc8181;
        padding: 0.5cm;
        margin: 0.6cm 0;
        border-radius: 0 6px 6px 0;
        box-shadow: 0 2px 4px rgba(252, 129, 129, 0.1);
        page-break-inside: avoid;
      }
      
      .warning-box strong {
        color: #c53030;
      }
      
      .info-box {
        background: linear-gradient(to right, #ebf8ff 0%, #bee3f8 100%);
        border-left: 5px solid #4299e1;
        padding: 0.5cm;
        margin: 0.6cm 0;
        border-radius: 0 6px 6px 0;
        box-shadow: 0 2px 4px rgba(66, 153, 225, 0.1);
        page-break-inside: avoid;
      }
      
      .info-box strong {
        color: #2c5282;
      }
      
      .success-box {
        background: linear-gradient(to right, #f0fff4 0%, #c6f6d5 100%);
        border-left: 5px solid #48bb78;
        padding: 0.5cm;
        margin: 0.6cm 0;
        border-radius: 0 6px 6px 0;
        box-shadow: 0 2px 4px rgba(72, 187, 120, 0.1);
        page-break-inside: avoid;
      }
      
      .success-box strong {
        color: #22543d;
      }
      
      hr {
        border: none;
        height: 2px;
        background: linear-gradient(to right, transparent, #cbd5e0, transparent);
        margin: 0.8cm 0;
      }
      
      .footer {
        position: fixed;
        bottom: 1.5cm;
        left: 0;
        right: 0;
        text-align: center;
        font-size: 8.5pt;
        color: #a0aec0;
        padding-top: 0.3cm;
        border-top: 1px solid #e2e8f0;
      }
      
      a {
        color: #4299e1;
        text-decoration: none;
        border-bottom: 1px solid rgba(66, 153, 225, 0.3);
      }
      
      a:hover {
        color: #2c5282;
        border-bottom-color: #2c5282;
      }
      
      @media print {
        .section {
          page-break-before: always;
        }
        
        .section-image,
        .warning-box,
        .info-box,
        .success-box,
        table,
        pre {
          page-break-inside: avoid;
        }
        
        h1, h2, h3, h4 {
          page-break-after: avoid;
          page-break-inside: avoid;
        }
        
        ul, ol {
          page-break-inside: avoid;
        }
      }
    </style>
  `;

  // Función para convertir Markdown a HTML básico
  function markdownToHTML(text) {
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
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');
    
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
      </div>
  `;

  // Generar secciones
  sections.forEach((section, index) => {
    html += `
      <div class="section">
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
          ${markdownToHTML(section.content)}
        </div>
      </div>
    `;
  });

  html += `
      <div class="footer">
        © 2025 Turismo Bajo Sogamoso - Manual de Usuario v1.0
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
  const sections = manualSections.map((section) => {
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
  console.log('   2. Ejecuta: npm run generate-pdf');
  console.log('   3. O abre manual-temp.html en Chrome y usa Ctrl+P para imprimir a PDF');
  console.log('\n💡 El HTML está optimizado para impresión con alta calidad.\n');
}

// Ejecutar
exportToPDF().catch(console.error);
