import fs from 'fs';
import path from 'path';
import { ManualSection } from '@/types/page';

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

function extractEmoji(title: string): { emoji: string; cleanTitle: string } {
  const emojiRegex = /([\u{1F300}-\u{1F9FF}])/u;
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

function splitManual(): void {
  try {
    console.log('🔍 Leyendo manual desde:', MANUAL_PATH);

    if (!fs.existsSync(MANUAL_PATH)) {
      console.error('❌ No se encontró el archivo del manual en:', MANUAL_PATH);
      process.exit(1);
    }

    const content = fs.readFileSync(MANUAL_PATH, 'utf8');

    // Dividir por secciones principales (## Título)
    const sectionRegex = /^##\s+(\d+\.?\s+)?(.+?)$/gm;
    const sections: ManualSection[] = [];
    let lastIndex = 0;
    let match;
    let sectionIndex = 0;

    while ((match = sectionRegex.exec(content)) !== null) {
      if (lastIndex > 0) {
        // Extraer contenido de la sección anterior
        const sectionContent = content.substring(lastIndex, match.index).trim();
        if (sectionContent) {
          const previousMatch = content.substring(0, lastIndex).match(/^##\s+(\d+\.?\s+)?(.+?)$/m);
          if (previousMatch) {
            const fullTitle = previousMatch[2];
            const { emoji, cleanTitle } = extractEmoji(fullTitle);

            sections.push({
              id: sectionIndex,
              title: cleanTitle,
              content: sectionContent,
              emoji: emoji,
            });
            sectionIndex++;
          }
        }
      }
      lastIndex = match.index;
    }

    // Agregar la última sección
    if (lastIndex > 0) {
      const finalContent = content.substring(lastIndex).trim();
      const finalMatch = finalContent.match(/^##\s+(\d+\.?\s+)?(.+?)$/m);
      if (finalMatch) {
        const fullTitle = finalMatch[2];
        const { emoji, cleanTitle } = extractEmoji(fullTitle);
        const contentAfterTitle = finalContent.substring(finalMatch[0].length).trim();

        sections.push({
          id: sectionIndex,
          title: cleanTitle,
          content: contentAfterTitle,
          emoji: emoji,
        });
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
