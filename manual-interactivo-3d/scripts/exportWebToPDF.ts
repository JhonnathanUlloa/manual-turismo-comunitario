/**
 * Script para exportar la página web real a PDF
 * Captura directamente desde localhost:3001/manual
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';

async function exportWebToPDF() {
  console.log('🚀 Exportando página web a PDF...\n');

  const pdfPath = path.join(process.cwd(), 'output', 'Manual-Usuario-Turismo-Comunitario.pdf');
  const webUrl = 'http://localhost:3001/manual';

  try {
    // Iniciar navegador
    console.log('📖 Abriendo navegador...');
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ],
    });

    const page = await browser.newPage();
    
    // Configurar viewport grande para capturar bien
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2, // Alta resolución
    });

    // Cargar la página web
    console.log('📄 Cargando página web...');
    console.log(`   🌐 ${webUrl}\n`);
    
    await page.goto(webUrl, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });

    // Esperar a que se cargue completamente
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generar PDF
    console.log('🎨 Generando PDF desde la web...');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
        left: '10mm',
      },
      preferCSSPageSize: false,
      displayHeaderFooter: false,
    });

    await browser.close();

    console.log(`\n✅ PDF generado exitosamente:`);
    console.log(`   📁 ${pdfPath}`);
    
    const stats = fs.statSync(pdfPath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`   📊 Tamaño: ${fileSizeMB} MB`);
    console.log('\n🎉 ¡Listo! El PDF captura exactamente lo que ves en la web.\n');
    console.log('💡 Asegúrate de que el servidor esté corriendo en localhost:3001\n');
    
  } catch (error: any) {
    console.error('❌ Error al generar PDF:', error.message);
    console.log('\n⚠️  Asegúrate de que:');
    console.log('   1. El servidor esté corriendo: npm run dev');
    console.log('   2. La página esté accesible en http://localhost:3001/manual\n');
    process.exit(1);
  }
}

exportWebToPDF();
