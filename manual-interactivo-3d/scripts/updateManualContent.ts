/**
 * Script para actualizar el contenido del manual usando MANUAL_STRAPI.md
 * Este script reemplaza el contenido actual con el del manual de referencia
 */

import * as fs from 'fs';
import * as path from 'path';

interface ManualSection {
  id: number;
  title: string;
  content: string;
  emoji: string;
}

// Mapeo de secciones con emojis apropiados
const sectionEmojiMap: { [key: string]: string } = {
  'introducción': '📖',
  'acceso al sistema': '🔐',
  'navegación básica': '🧭',
  'gestión de alojamientos': '🏠',
  'gestión de experiencias y rutas': '🏞️',
  'gestión de platos': '🍽️',
  'gestión de productos': '🛍️',
  'gestión de restaurantes': '🍴',
  'preguntas frecuentes': '❓',
  'índice': '📑',
  'portada': '📄',
};

// Función para obtener el emoji basado en el título
function getEmojiForSection(title: string): string {
  const lowerTitle = title.toLowerCase();
  
  for (const [key, emoji] of Object.entries(sectionEmojiMap)) {
    if (lowerTitle.includes(key)) {
      return emoji;
    }
  }
  
  // Emojis por palabras clave
  if (lowerTitle.includes('tabla') || lowerTitle.includes('índice') || lowerTitle.includes('contenido')) {
    return '📑';
  }
  if (lowerTitle.includes('imagen') || lowerTitle.includes('foto')) {
    return '🖼️';
  }
  if (lowerTitle.includes('panel') || lowerTitle.includes('dashboard')) {
    return '🎛️';
  }
  if (lowerTitle.includes('problema') || lowerTitle.includes('solución') || lowerTitle.includes('error')) {
    return '🔧';
  }
  if (lowerTitle.includes('mejor') || lowerTitle.includes('práctica') || lowerTitle.includes('recomend')) {
    return '⭐';
  }
  if (lowerTitle.includes('técnic') || lowerTitle.includes('sistema')) {
    return '🖥️';
  }
  if (lowerTitle.includes('soporte') || lowerTitle.includes('ayuda')) {
    return '💬';
  }
  
  return '📄'; // Emoji por defecto
}

// Función para procesar referencias de imágenes en el contenido
function processImageReferences(content: string): string {
  // Reemplazar imágenes placeholder de via.placeholder.com con rutas locales
  content = content.replace(
    /!\[([^\]]+)\]\(https?:\/\/via\.placeholder\.com[^)]*\)/g,
    (match, altText) => {
      // Generar nombre de archivo basado en el alt text
      const fileName = altText
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') + '.png';
      
      return `![${altText}](/images/manual/${fileName})\n\n> 📸 **Imagen:** ${altText}`;
    }
  );
  
  // Agregar nota sobre imágenes que faltan
  if (content.includes('/images/manual/')) {
    content += '\n\n---\n\n> ⚠️ **Nota:** Si alguna imagen no se muestra, verifique que el archivo esté en la carpeta `public/images/manual/`. Consulte `IMAGENES_NECESARIAS.md` para más información.';
  }
  
  return content;
}

// Función principal
function updateManualContent() {
  try {
    // Leer el archivo MANUAL_STRAPI.md
    const manualPath = path.join(__dirname, '..', '..', 'MANUAL_STRAPI.md');
    console.log('📖 Leyendo archivo:', manualPath);
    
    if (!fs.existsSync(manualPath)) {
      console.error('❌ Error: No se encontró MANUAL_STRAPI.md');
      process.exit(1);
    }
    
    const manualContent = fs.readFileSync(manualPath, 'utf-8');
    
    // Dividir el contenido por secciones principales (##)
    const sections: ManualSection[] = [];
    const sectionRegex = /^##\s+(.+)$/gm;
    let lastIndex = 0;
    let match;
    let sectionIndex = 0;
    
    // Agregar sección de portada
    const introMatch = manualContent.match(/^#\s+(.+)$/m);
    if (introMatch) {
      const portadaContent = manualContent.substring(0, manualContent.indexOf('\n##'));
      sections.push({
        id: 0,
        title: 'Manual de Usuario - Sistema de Gestión de Contenidos',
        content: portadaContent.replace(/^#\s+.+$/m, ''),
        emoji: '📄'
      });
      sectionIndex = 1;
    }
    
    // Procesar secciones
    while ((match = sectionRegex.exec(manualContent)) !== null) {
      const title = match[1].trim();
      const startPos = match.index + match[0].length;
      
      // Encontrar el final de esta sección (inicio de la siguiente o final del archivo)
      sectionRegex.lastIndex = startPos;
      const nextMatch = sectionRegex.exec(manualContent);
      const endPos = nextMatch ? nextMatch.index : manualContent.length;
      
      let content = manualContent.substring(startPos, endPos).trim();
      
      // Procesar referencias de imágenes
      content = processImageReferences(content);
      
      // Determinar emoji
      const emoji = getEmojiForSection(title);
      
      sections.push({
        id: sectionIndex++,
        title,
        content,
        emoji
      });
      
      sectionRegex.lastIndex = endPos;
    }
    
    console.log(`✅ Se procesaron ${sections.length} secciones`);
    
    // Generar el archivo TypeScript
    const outputPath = path.join(__dirname, '..', 'src', 'data', 'manualData.ts');
    
    const tsContent = `// Archivo generado automáticamente por updateManualContent.ts
// Basado en MANUAL_STRAPI.md
// NO EDITAR MANUALMENTE - Los cambios se perderán

import { ManualSection } from '@/types/page';

export const manualSections: ManualSection[] = ${JSON.stringify(sections, null, 2)};

export const sectionTitles = manualSections.map(s => s.title);

export const getSectionByIndex = (index: number): ManualSection | undefined => {
  return manualSections[index];
};

export const getSectionById = (id: number): ManualSection | undefined => {
  return manualSections.find(s => s.id === id);
};

export const getTotalSections = (): number => {
  return manualSections.length;
};
`;
    
    // Crear directorio si no existe
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Escribir archivo
    fs.writeFileSync(outputPath, tsContent, 'utf-8');
    console.log('✅ Archivo generado:', outputPath);
    
    // Crear carpeta de imágenes si no existe
    const imagesDir = path.join(__dirname, '..', 'public', 'images', 'manual');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
      console.log('✅ Carpeta de imágenes creada:', imagesDir);
    }
    
    // Crear archivo .gitkeep en la carpeta de imágenes
    const gitkeepPath = path.join(imagesDir, '.gitkeep');
    if (!fs.existsSync(gitkeepPath)) {
      fs.writeFileSync(gitkeepPath, '', 'utf-8');
    }
    
    console.log('\n🎉 ¡Actualización completada!');
    console.log('\n📋 Próximos pasos:');
    console.log('1. Revise el archivo generado: src/data/manualData.ts');
    console.log('2. Agregue las imágenes necesarias en: public/images/manual/');
    console.log('3. Consulte IMAGENES_NECESARIAS.md para la lista completa de imágenes');
    console.log('4. Ejecute: npm run dev');
    
  } catch (error) {
    console.error('❌ Error al actualizar el manual:', error);
    process.exit(1);
  }
}

// Ejecutar
updateManualContent();
