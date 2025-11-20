/**
 * Script para generar PDF usando Puppeteer
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
  console.log('🚀 Generando PDF con Puppeteer...\n');

  const htmlPath = path.join(process.cwd(), 'output', 'manual-temp.html');
  const pdfPath = path.join(process.cwd(), 'output', 'Manual-Usuario-Turismo-Comunitario.pdf');

  if (!fs.existsSync(htmlPath)) {
    console.error('❌ Error: No se encontró manual-temp.html');
    console.log('   Ejecuta primero: npm run generate-html\n');
    process.exit(1);
  }

  try {
    // Iniciar navegador
    console.log('📖 Abriendo navegador...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Cargar HTML
    console.log('📄 Cargando contenido...');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0',
    });

    // Generar PDF con alta calidad
    console.log('🎨 Generando PDF...');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '2cm',
        right: '2cm',
        bottom: '2cm',
        left: '2cm',
      },
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });

    await browser.close();

    console.log(`\n✅ ¡PDF generado exitosamente!`);
    console.log(`   📁 ${pdfPath}`);
    
    const stats = fs.statSync(pdfPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   📊 Tamaño: ${fileSizeMB} MB`);
    console.log(`   📄 Páginas: Ver el PDF para confirmar`);
    console.log('\n🎉 ¡Listo! Tu manual está disponible en formato PDF.\n');
    
  } catch (error) {
    console.error('❌ Error al generar PDF:', error);
    process.exit(1);
  }
}

generatePDF();
