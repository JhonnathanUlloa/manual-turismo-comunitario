# 📖 Manual Interactivo 3D - Sistema de Turismo Comunitario

## 🎯 Descripción General

Manual de usuario interactivo en formato **flipbook 3D** desarrollado con Next.js 15, React Three Fiber y TypeScript. Diseñado específicamente para usuarios no técnicos del Sistema de Gestión de Turismo Comunitario basado en Strapi CMS.

### ✨ Características Principales

- 🔮 **Experiencia 3D inmersiva** con animaciones realistas de volteo de páginas
- 📱 **Diseño responsive** optimizado para móviles, tablets y escritorio
- 🎨 **Interfaz futurista** con glassmorphism, efectos neon y gradientes animados
- 🖼️ **Soporte completo de imágenes** con placeholders adaptativos
- 🎵 **Efectos de sonido** al pasar páginas (opcional)
- ♿ **Accesible** con soporte para lectores de pantalla y teclado
- 🌍 **Contenido en español** con 26 secciones del manual

---

## 📦 Tecnologías Utilizadas

### Frontend Core
- **Next.js 15.0** - Framework React con App Router
- **React 19.0** - Biblioteca UI con Concurrent Features
- **TypeScript 5.3** - Tipado estático y seguridad de tipos

### 3D & Animaciones
- **Three.js 0.160** - Motor de renderizado 3D
- **React Three Fiber 8.15** - Integración React con Three.js
- **@react-three/drei 9.92** - Helpers 3D (luces, controles, sombras)
- **@react-spring/three 9.7** - Animaciones físicas suaves

### UI & Estilos
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11.0** - Animaciones de UI declarativas
- **Heroicons 2.1** - Iconos SVG optimizados

### Estado & Datos
- **Zustand 4.4** - State management ligero
- **react-markdown 9.0** - Renderizado de Markdown
- **remark-gfm 4.0** - Soporte para tablas y código

### Audio
- **use-sound 4.0** - Efectos de sonido al pasar páginas

---

## 🚀 Instalación y Configuración

### Prerrequisitos

```bash
Node.js >= 18.0.0
npm >= 9.0.0
```

### Pasos de Instalación

1. **Clonar el repositorio** (o ya tienes los archivos)

2. **Instalar dependencias**
```bash
cd manual-interactivo-3d
npm install --legacy-peer-deps
```

⚠️ **Importante**: Se requiere el flag `--legacy-peer-deps` debido a dependencias entre React 19 y React Three Fiber 8.15.

3. **Procesar el manual** (si el archivo `MANUAL_USUARIO_TURISMO_COMUNITARIO.txt` ha cambiado)
```bash
npm run split-manual
```

Este comando:
- Lee `MANUAL_USUARIO_TURISMO_COMUNITARIO.txt` del directorio padre
- Extrae secciones marcadas con `##`
- Genera `src/data/manualData.ts` con las 26 secciones procesadas

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

El servidor estará disponible en:
- 🌐 Local: http://localhost:3001
- 📡 Red: http://[tu-ip]:3001

---

## 📂 Estructura del Proyecto

```
manual-interactivo-3d/
├── public/
│   └── assets/
│       ├── placeholder.svg         # Imagen placeholder para el manual
│       └── sounds/                 # Efectos de sonido (opcional)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout raíz con fuentes y meta
│   │   ├── page.tsx                # Página de inicio (landing)
│   │   └── manual/
│   │       └── page.tsx            # Página del flipbook 3D
│   │
│   ├── components/
│   │   ├── 3D/
│   │   │   ├── Flipbook.tsx        # Componente Canvas 3D principal
│   │   │   ├── Page3D.tsx          # Página 3D individual
│   │   │   └── Lighting.tsx        # Configuración de luces
│   │   ├── ui/
│   │   │   ├── Navbar.tsx          # Barra de navegación superior
│   │   │   ├── Sidebar.tsx         # Menú lateral con índice
│   │   │   ├── UIControls.tsx      # Controles de navegación
│   │   │   └── BackgroundFX.tsx    # Efectos de fondo (partículas)
│   │   ├── TextPage.tsx            # Renderizador de contenido Markdown
│   │   └── ImagePlaceholder.tsx    # Componente de imágenes con skeleton
│   │
│   ├── hooks/
│   │   ├── useFlipControl.ts       # Lógica de control de páginas
│   │   └── useSoundFx.ts           # Efectos de sonido
│   │
│   ├── store/
│   │   └── manualStore.ts          # Estado global (Zustand)
│   │
│   ├── data/
│   │   └── manualData.ts           # Datos procesados del manual
│   │
│   ├── types/
│   │   └── page.ts                 # Tipos TypeScript
│   │
│   ├── styles/
│   │   ├── globals.css             # Estilos globales con efectos futuristas
│   │   └── animations.css          # Animaciones CSS personalizadas
│   │
│   └── utils/
│       └── splitManual.js          # Script para procesar el manual
│
├── next.config.js                  # Configuración de Next.js
├── tailwind.config.ts              # Configuración de Tailwind
├── tsconfig.json                   # Configuración de TypeScript
└── package.json                    # Dependencias y scripts
```

---

## 🎨 Características de Diseño

### Efectos Futuristas

1. **Glassmorphism**
   - Fondos con `backdrop-filter: blur()`
   - Bordes semi-transparentes
   - Sombras suaves y profundas

2. **Neon Glow**
   - Brillos en botones y elementos interactivos
   - Gradientes animados en textos
   - Efectos de hover con intensidad variable

3. **Animaciones Suaves**
   - Transiciones con `cubic-bezier` personalizado
   - Micro-interacciones en todos los botones
   - Escalado y traslación al hover

### Responsive Design

| Breakpoint | Dispositivo | Optimizaciones |
|------------|-------------|----------------|
| < 640px | Móviles | Sidebar 85vw, controles táctiles, texto compacto |
| 640-1024px | Tablets | Sidebar 80vw, UI adaptada |
| > 1024px | Escritorio | Sidebar fijo, controles de teclado, UI completa |

### Temas de Color

- **Primario**: `#3b82f6` (Azul)
- **Secundario**: `#8b5cf6` (Púrpura)
- **Acento**: `#06b6d4` (Cyan)
- **Fondo**: Gradiente `#0f172a` → `#1e293b`

---

## ⌨️ Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| `→` | Página siguiente |
| `←` | Página anterior |
| `Home` | Primera página |
| `End` | Última página |
| `Esc` | Cerrar sidebar |

---

## 📱 Compatibilidad

### Navegadores Soportados
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Dispositivos
- ✅ iOS 14+ (Safari, Chrome)
- ✅ Android 8+ (Chrome, Firefox)
- ✅ Windows 10+ (Todos los navegadores)
- ✅ macOS 11+ (Todos los navegadores)
- ✅ Linux (Chrome, Firefox)

---

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor en puerto 3001

# Producción
npm run build        # Genera build optimizado
npm run start        # Inicia servidor de producción

# Utilidades
npm run lint         # Ejecuta ESLint
npm run format       # Formatea código con Prettier
npm run split-manual # Procesa manual de usuario
```

---

## 📝 Actualizar el Contenido del Manual

### Método 1: Editar el archivo de texto

1. Abrir `../MANUAL_USUARIO_TURISMO_COMUNITARIO.txt`
2. Editar el contenido manteniendo el formato Markdown
3. Asegurarse de que cada sección comience con `##`
4. Ejecutar: `npm run split-manual`
5. Reiniciar el servidor: `npm run dev`

### Método 2: Editar directamente el código

1. Abrir `src/data/manualData.ts`
2. Editar el array `manualSections`
3. Guardar y el hot-reload actualizará automáticamente

---

## 🖼️ Agregar Imágenes

### Placeholder predeterminado

El sistema usa `/assets/placeholder.svg` por defecto. Para personalizar:

1. Crear imágenes en `public/assets/images/`
2. Editar el contenido Markdown en el manual:

```markdown
![Descripción de la imagen](/assets/images/mi-imagen.png)
```

3. Las imágenes se optimizan automáticamente con Next.js Image

### Formatos recomendados

- **WebP** o **AVIF** para mejor compresión
- Dimensiones: 1200x675px (16:9) para mejor visualización
- Peso máximo: 200KB por imagen

---

## 🐛 Solución de Problemas

### El servidor no inicia

**Error**: `npm error Missing script: "dev"`

**Solución**:
```bash
# Asegurarse de estar en el directorio correcto
cd manual-interactivo-3d
npm run dev
```

### Errores de dependencias

**Error**: `ERESOLVE unable to resolve dependency tree`

**Solución**:
```bash
npm install --legacy-peer-deps
```

### El manual no muestra contenido

**Solución**:
```bash
# Regenerar manualData.ts
npm run split-manual
```

### La página 3D no se renderiza

**Causas comunes**:
1. **WebGL no soportado**: Verificar compatibilidad del navegador
2. **GPU deshabilitada**: Habilitar aceleración por hardware
3. **Memoria insuficiente**: Cerrar otras pestañas

---

## 🚀 Despliegue en Producción

### Vercel (Recomendado)

1. **Conectar repositorio**
   - Ir a https://vercel.com
   - Importar proyecto desde Git

2. **Configurar build**
   ```
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install --legacy-peer-deps
   ```

3. **Variables de entorno** (opcional)
   ```
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://tu-api.com
   ```

### Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Build y deploy
npm run build
netlify deploy --prod --dir=.next
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3001
CMD ["npm", "start"]
```

---

## 📊 Rendimiento

### Métricas Objetivo

- **FCP** (First Contentful Paint): < 1.5s
- **LCP** (Largest Contentful Paint): < 2.5s
- **TTI** (Time to Interactive): < 3.5s
- **CLS** (Cumulative Layout Shift): < 0.1

### Optimizaciones Implementadas

✅ **Next.js Image** con lazy loading  
✅ **Code splitting** automático por ruta  
✅ **Tree shaking** de Three.js  
✅ **Compresión Gzip/Brotli**  
✅ **Font optimization** con Google Fonts  
✅ **CSS-in-JS** con Tailwind purge  

---

## 🤝 Contribución

### Guía de Estilo

- **TypeScript strict mode** habilitado
- **ESLint + Prettier** para formateo
- **Commits semánticos**: `feat:`, `fix:`, `docs:`, `style:`
- **Pull requests** con descripción detallada

---

## 📄 Licencia

Este proyecto es privado y de uso exclusivo para el Sistema de Turismo Comunitario.

---

## 👥 Soporte

Para preguntas o problemas:

1. **Revisar esta documentación**
2. **Consultar logs del servidor**: `npm run dev`
3. **Verificar errores del navegador**: DevTools Console

---

## 🎉 ¡Listo!

Tu manual interactivo 3D está completo y listo para usar. Disfruta de la experiencia inmersiva y futurista diseñada para facilitar el aprendizaje del sistema de turismo comunitario.

**Servidor activo**: http://localhost:3001

**Creado con** ❤️ **para comunidades turísticas**
