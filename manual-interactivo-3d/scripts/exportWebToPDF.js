/**
 * Script para exportar el manual generando HTML con todos los estilos de Tailwind CSS
 * Captura el contenido renderizado con React, TypeScript, Markdown, imágenes y emojis
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function exportWebToPDF() {
  console.log('🚀 Exportando manual con estilos Tailwind CSS completos...\n');

  const pdfPath = path.join(process.cwd(), 'output', 'Manual-Usuario-Turismo-Comunitario.pdf');
  const webUrl = 'http://localhost:3001/manual';

  try {
    console.log('📖 Iniciando navegador...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 1980 });
    
    console.log('🌐 Conectando a:', webUrl);
    await page.goto(webUrl, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });

    console.log('⏳ Esperando carga completa...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Extraer TODO el CSS compilado de Tailwind
    console.log('🎨 Extrayendo estilos Tailwind CSS...');
    const compiledCSS = await page.evaluate(() => {
      let allCSS = '';
      
      // Obtener todas las hojas de estilo
      const styleSheets = Array.from(document.styleSheets);
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || sheet.rules || []);
          rules.forEach(rule => {
            allCSS += rule.cssText + '\n';
          });
        } catch (e) {
          // CORS puede bloquear algunas hojas
        }
      });
      
      // Estilos inline
      const styleElements = Array.from(document.querySelectorAll('style'));
      styleElements.forEach(style => {
        allCSS += style.innerHTML + '\n';
      });
      
      return allCSS;
    });

    const totalPages = await page.evaluate(() => {
      return document.querySelectorAll('.page').length;
    });

    console.log(`📄 Total de páginas: ${totalPages}\n`);

    // Extraer el contenido HTML de cada página con sus clases Tailwind
    const pagesHTML = [];
    
    for (let i = 0; i < totalPages; i++) {
      console.log(`📑 Procesando página ${i + 1}/${totalPages}...`);
      
      const pageHTML = await page.evaluate((pageIndex) => {
        const pages = document.querySelectorAll('.page');
        const currentPage = pages[pageIndex];
        
        if (!currentPage) return '';
        
        // Obtener el HTML completo con todas las clases de Tailwind
        return currentPage.outerHTML;
      }, i);
      
      pagesHTML.push(pageHTML);
    }

    await browser.close();

    console.log('\n📝 Generando HTML con todos los estilos...');

    // Crear documento HTML completo
    const fullHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Manual de Usuario - Turismo Comunitario</title>
  
  <!-- Fuente Inter de Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <style>
    /* Reset y base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    html, body {
      width: 100%;
      height: 100%;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    body {
      background: white;
      color: #1f2937;
    }
    
    /* Todos los estilos de Tailwind CSS compilados */
    ${compiledCSS}
    
    /* Estilos para páginas del PDF */
    .pdf-page-wrapper {
      page-break-after: always;
      page-break-inside: avoid;
      width: 210mm;
      height: 297mm;
      background: white;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    
    .pdf-page-wrapper:last-child {
      page-break-after: auto;
    }
    
    /* Asegurar que las páginas mantengan su estilo */
    .page {
      width: 100% !important;
      height: 100% !important;
      max-width: 210mm !important;
      max-height: 297mm !important;
      background: white !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      box-shadow: none !important;
    }
    
    /* Asegurar imágenes */
    img {
      max-width: 100%;
      height: auto;
      display: block;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    
    /* Soporte para emojis */
    .emoji {
      font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    }
    
    /* Configuración de impresión */
    @page {
      size: A4;
      margin: 0;
    }
    
    @media print {
      html, body {
        width: 210mm;
        height: 297mm;
      }
      
      .pdf-page-wrapper {
        page-break-after: always;
        page-break-inside: avoid;
      }
      
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
    
    /* Ocultar elementos de navegación 3D */
    .stf__wrapper,
    .stf__parent,
    canvas,
    button,
    nav,
    .sidebar,
    .navbar,
    .controls {
      display: none !important;
    }
  </style>
</head>
<body>
  ${pagesHTML.map(html => `
    <div class="pdf-page-wrapper">
      ${html}
    </div>
  `).join('\n')}
</body>
</html>`;

    // Guardar HTML temporal
    const tempHtmlPath = path.join(process.cwd(), 'output', 'manual-temp.html');
    fs.writeFileSync(tempHtmlPath, fullHTML, 'utf-8');
    console.log(`   ✓ HTML generado: ${tempHtmlPath}`);

    console.log('\n🖨️  Generando PDF...');

    // Crear nueva página de Puppeteer para generar el PDF
    const browser2 = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const pdfPage = await browser2.newPage();
    
    await pdfPage.goto(`file://${tempHtmlPath}`, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });

    // Esperar a que carguen las fuentes e imágenes
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generar PDF
    await pdfPage.pdf({
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
      displayHeaderFooter: false,
    });

    await browser2.close();

    console.log(`\n✅ PDF generado exitosamente:`);
    console.log(`   📁 ${pdfPath}`);
    
    const stats = fs.statSync(pdfPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   📊 Tamaño: ${fileSizeMB} MB`);
    console.log(`   📄 Páginas: ${totalPages}`);
    console.log('\n🎉 El PDF incluye:');
    console.log('   ✓ Todos los estilos Tailwind CSS');
    console.log('   ✓ Contenido Markdown renderizado');
    console.log('   ✓ Imágenes del proyecto');
    console.log('   ✓ Emojis y símbolos');
    console.log('   ✓ Colores y gradientes exactos\n');
    
    // Limpiar archivo temporal (opcional, comentar si quieres revisarlo)
    // fs.unlinkSync(tempHtmlPath);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️  Asegúrate de que:');
    console.log('   1. El servidor esté corriendo: npm run dev');
    console.log('   2. La página esté accesible en http://localhost:3001/manual\n');
    process.exit(1);
  }
}

exportWebToPDF();
