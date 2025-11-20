# 📄 Exportación del Manual a PDF

Este proyecto incluye herramientas para exportar el manual a formato PDF de alta calidad, manteniendo las imágenes y el formato.

## 🚀 Método Rápido (Recomendado) ✅

### Paso 1: Generar HTML

```powershell
npm run generate-html
```

**Resultado**: Se genera `output/manual-temp.html` con todas las imágenes embebidas.

### Paso 2: Convertir a PDF

**Opción A: Manual (sin instalar nada)**
1. Abre `output/manual-temp.html` en Chrome o Edge (doble clic)
2. Presiona `Ctrl + P`
3. Selecciona "Guardar como PDF"
4. **IMPORTANTE**: Activa "Gráficos de fondo" ✅
5. Guarda como `Manual-Usuario-Turismo-Comunitario.pdf`

**Opción B: Automático (requiere Puppeteer)**
```powershell
# Instalar (solo primera vez)
npm install --save-dev puppeteer

# Generar PDF automáticamente
npm run export-pdf
```

El PDF se guardará en: `output/Manual-Usuario-Turismo-Comunitario.pdf`

## 📋 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run generate-html` | Genera el HTML del manual con imágenes embebidas |
| `npm run generate-pdf` | Convierte el HTML a PDF (requiere HTML generado) |
| `npm run export-pdf` | Ejecuta ambos pasos automáticamente |

## ✨ Características del PDF

- ✅ **Alta calidad**: Mantiene la resolución de las imágenes
- ✅ **Formato profesional**: Diseño limpio y legible
- ✅ **Portada personalizada**: Con gradiente y branding
- ✅ **Separación de páginas**: Cada sección en página nueva
- ✅ **Imágenes embebidas**: Todas las imágenes incluidas en base64
- ✅ **Estilos preservados**: Código, tablas, listas con formato
- ✅ **Tamaño A4**: Estándar internacional

## 📊 Estructura del PDF

```
📖 Manual de Usuario
├─ 🎨 Portada (con gradiente)
├─ 📑 Índice
├─ 📘 Introducción
├─ 🔐 Acceso al Sistema
├─ 🧭 Navegación Básica
├─ 🏠 Gestión de Alojamientos (con imagen)
├─ 🏞️ Experiencias y Rutas (con imagen)
├─ 🍽️ Gestión de Platos (con imagen)
├─ 🛍️ Gestión de Productos (con imagen)
├─ 🍴 Gestión de Restaurantes (con imagen)
├─ ❓ Preguntas Frecuentes (con imagen)
├─ 🖥️ Soporte Técnico (con imagen)
└─ 📌 Consejos Finales (con imagen)
```

## 🛠️ Solución de Problemas

### Error: "No se encuentra el módulo puppeteer"
```powershell
npm install --save-dev puppeteer
```

### Error: "No se encontró manual-temp.html"
```powershell
npm run generate-html
```

### Las imágenes no aparecen
1. Verifica que existan en `public/images/manual/seccion-X.png`
2. Ejecuta de nuevo: `npm run generate-html`

### El PDF está en blanco
- Usa la Opción 2 (Manual) con Chrome
- Asegúrate de activar "Gráficos de fondo"

## 📦 Archivos Generados

```
output/
├─ manual-temp.html          # HTML temporal con imágenes embebidas
└─ Manual-Usuario-Turismo-Comunitario.pdf   # PDF final
```

## 💡 Tips

- **Calidad óptima**: Usa `npm run export-pdf` con Puppeteer instalado
- **Sin instalar nada**: Usa la Opción 2 (Manual) con Chrome
- **Compartir**: El PDF es completamente portable (imágenes incluidas)
- **Tamaño**: El PDF puede pesar 5-15 MB dependiendo de las imágenes

## 🔄 Actualizar el PDF

Cuando actualices el contenido del manual:

1. Ejecuta `npm run split-manual` (si cambiaste el contenido original)
2. Ejecuta `npm run export-pdf`
3. ¡Listo! Nuevo PDF generado

---

**Versión:** 1.0  
**Última actualización:** Noviembre 2025  
**Formato de salida:** PDF/A4  
**Calidad:** Alta resolución
