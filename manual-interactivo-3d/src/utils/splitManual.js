const fs = require('fs');
const path = require('path');

/**
 * Script para dividir el manual de texto en secciones procesables
 * Uso: npm run split-manual
 */

const MANUAL_PATH = path.join(
  process.cwd(),
  '..',
  'MANUAL_USUARIO_TURISMO_COMUNITARIO.txt'
);
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'manualData.ts');

function extractEmoji(title) {
  // Regex para detectar emojis comunes
  const emojiRegex = /([\u{1F300}-\u{1F9FF}]|📘|👥|🔐|🏠|🏨|🍽️|🎯|🛍️|🍲|🖼️|⭐|🔧|🖥️|📚|📑|🆕|✏️|🗑️)/u;
  const match = title.match(emojiRegex);

  if (match) {
    return {
      emoji: match[1],
      cleanTitle: title.replace(emojiRegex, '').trim(),
    };
  }

  return {
    emoji: '📄',
    cleanTitle: title,
  };
}

function splitManual() {
  try {
    console.log('🔍 Leyendo manual desde:', MANUAL_PATH);

    if (!fs.existsSync(MANUAL_PATH)) {
      console.error('❌ No se encontró el archivo del manual en:', MANUAL_PATH);
      process.exit(1);
    }

    const content = fs.readFileSync(MANUAL_PATH, 'utf8');

    // Dividir por secciones principales (## Título)
    const sectionRegex = /^##\s+(\d+\.?\s+)?(.+?)$/gm;
    const sections = [];
    let lastIndex = 0;
    let match;
    let sectionIndex = 0;

    // Buscar todas las coincidencias
    const matches = [];
    while ((match = sectionRegex.exec(content)) !== null) {
      matches.push({
        index: match.index,
        title: match[2],
        fullMatch: match[0]
      });
    }

    // Procesar cada sección
    for (let i = 0; i < matches.length; i++) {
      const currentMatch = matches[i];
      const nextMatch = matches[i + 1];
      
      // Extraer contenido entre esta sección y la siguiente
      const startIndex = currentMatch.index + currentMatch.fullMatch.length;
      const endIndex = nextMatch ? nextMatch.index : content.length;
      const sectionContent = content.substring(startIndex, endIndex).trim();
      
      if (sectionContent) {
        const { emoji, cleanTitle } = extractEmoji(currentMatch.title);
        
        sections.push({
          id: sectionIndex,
          title: cleanTitle,
          content: sectionContent,
          emoji: emoji,
        });
        sectionIndex++;
      }
    }

    console.log(`✅ Encontradas ${sections.length} secciones`);

    // Generar archivo TypeScript
    const output = `// Archivo generado automáticamente por splitManual.ts
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
    const outputDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, output, 'utf8');
    console.log('📝 Archivo generado en:', OUTPUT_PATH);

    // Mostrar resumen
    console.log('\n📊 Resumen de secciones:');
    sections.forEach((section, index) => {
      console.log(`  ${index + 1}. ${section.emoji} ${section.title}`);
    });

    console.log('\n✨ Proceso completado exitosamente');
  } catch (error) {
    console.error('❌ Error al procesar el manual:', error);
    process.exit(1);
  }
}

// Ejecutar
splitManual();
