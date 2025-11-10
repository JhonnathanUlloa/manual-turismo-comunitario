# 📖 Manual Interactivo 3D - Arquitectura y Documentación Técnica

## 🏗️ Arquitectura del Sistema

### Stack Tecnológico Completo

```
Frontend Framework
├─ Next.js 15 (App Router)
├─ React 19
└─ TypeScript 5.3+

Renderizado 3D
├─ Three.js
├─ React Three Fiber (R3F)
├─ @react-three/drei
└─ postprocessing

Animaciones y UI
├─ Framer Motion
├─ Tailwind CSS
└─ Heroicons

Estado y Datos
├─ Zustand (estado global)
├─ react-markdown
└─ remark-gfm

Audio
└─ use-sound
```

### Flujo de Datos

```
┌─────────────────┐
│  MANUAL.txt     │
│  (Fuente)       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ splitManual.ts  │
│ (Procesador)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ manualData.ts   │
│ (Datos)         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Zustand Store   │
│ (Estado Global) │
└────────┬────────┘
         │
         ├─────────────┬──────────────┐
         ▼             ▼              ▼
   ┌─────────┐  ┌──────────┐  ┌──────────┐
   │Flipbook │  │ Sidebar  │  │ Controls │
   │  3D     │  │   UI     │  │   UI     │
   └─────────┘  └──────────┘  └──────────┘
```

## 🧩 Componentes Principales

### 1. Flipbook (Motor 3D)

**Ubicación:** `src/components/3D/Flipbook.tsx`

**Responsabilidades:**
- Renderizar el canvas 3D
- Gestionar todas las páginas
- Controlar la cámara
- Aplicar iluminación y sombras

**Tecnologías:**
- `@react-three/fiber` - Wrapper React para Three.js
- `@react-three/drei` - Helpers y componentes útiles
- `Canvas` - Contenedor del escenario 3D

**Props y Estado:**
```typescript
- currentPage: number
- totalPages: number
- isFlipping: boolean
- direction: 'forward' | 'backward' | null
```

### 2. Page3D (Página Individual)

**Ubicación:** `src/components/3D/Page3D.tsx`

**Responsabilidades:**
- Renderizar una hoja del libro
- Animar la rotación al pasar página
- Gestionar textura y material
- Calcular sombras dinámicas

**Tecnologías:**
- `@react-spring/three` - Animaciones suaves
- `PlaneGeometry` - Geometría de la página
- `MeshStandardMaterial` - Material con iluminación

**Animaciones:**
```typescript
// Rotación animada con React Spring
const { rotation } = useSpring({
  rotation: isPastPage ? Math.PI : 0,
  config: { tension: 120, friction: 26 }
});
```

### 3. Lighting (Sistema de Luces)

**Ubicación:** `src/components/3D/Lighting.tsx`

**Responsabilidades:**
- Iluminación ambiental
- Luces direccionales y puntuales
- Sombras realistas
- Ambiente de lectura

**Tipos de Luces:**
```typescript
- AmbientLight: Luz general suave
- HemisphereLight: Luz natural superior/inferior
- DirectionalLight: Luz principal con sombras
- PointLight: Luces de acento
- SpotLight: Luz focal dramática
```

### 4. Estado Global (Zustand)

**Ubicación:** `src/store/manualStore.ts`

**Estado:**
```typescript
interface ManualState {
  // Navegación
  currentPage: number;
  totalPages: number;
  isFlipping: boolean;
  direction: 'forward' | 'backward' | null;
  
  // UI
  sidebarOpen: boolean;
  soundEnabled: boolean;
  zoomLevel: number;
  showControls: boolean;
  viewMode: ViewMode;
}
```

**Acciones:**
```typescript
- setPage(page: number)
- nextPage()
- prevPage()
- goToSection(index: number)
- toggleSidebar()
- toggleSound()
- setZoomLevel(level: number)
```

### 5. Hooks Personalizados

#### useFlipControl

**Ubicación:** `src/hooks/useFlipControl.ts`

**Funcionalidad:**
- Navegación entre páginas
- Validación de límites
- Atajos de teclado
- Integración con estado global

**API:**
```typescript
const {
  currentPage,
  canGoNext,
  canGoPrev,
  handleNext,
  handlePrev,
  handleGoToPage,
  handleKeyDown
} = useFlipControl();
```

#### useSoundFx

**Ubicación:** `src/hooks/useSoundFx.ts`

**Funcionalidad:**
- Reproducir sonido de página
- Control de volumen
- Velocidad dinámica
- Activar/desactivar

**API:**
```typescript
const {
  playPageFlip,
  playDirectionalFlip,
  soundEnabled
} = useSoundFx();
```

## 🎨 Sistema de Estilos

### Tailwind CSS

**Configuración:** `tailwind.config.js`

**Colores Personalizados:**
```javascript
primary: {
  500: '#3b82f6', // Azul principal
  600: '#2563eb',
}
```

**Animaciones:**
```javascript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.5s ease-out',
  'flip': 'flip 0.6s ease-in-out',
}
```

### Estilos Globales

**Ubicación:** `src/styles/globals.css`

**Clases Reutilizables:**
```css
.btn-primary - Botón principal
.card - Tarjeta con efecto glass
.glass-effect - Efecto vidrio esmerilado
.gradient-text - Texto con degradado
.icon-button - Botón de icono flotante
.markdown-content - Estilos para Markdown
```

### Animaciones CSS

**Ubicación:** `src/styles/animations.css`

**Animaciones Disponibles:**
- `fadeIn` - Aparecer gradual
- `slideUp/Down` - Deslizar vertical
- `slideInLeft/Right` - Deslizar horizontal
- `scaleIn` - Escalar desde centro
- `flip` - Voltear página
- `bounce` - Rebote
- `shimmer` - Brillo parpadeante
- `float` - Flotar suavemente

## 📊 Procesamiento de Datos

### splitManual.ts

**Ubicación:** `src/utils/splitManual.ts`

**Proceso:**

1. **Lectura** - Lee `MANUAL_USUARIO_TURISMO_COMUNITARIO.txt`
2. **Parsing** - Busca secciones con regex `## Título`
3. **Extracción** - Separa título, emoji y contenido
4. **Estructuración** - Crea objetos `ManualSection`
5. **Generación** - Escribe `manualData.ts`

**Regex Principal:**
```typescript
const sectionRegex = /^##\s+(\d+\.?\s+)?(.+?)$/gm;
```

**Output:**
```typescript
export const manualSections: ManualSection[] = [
  {
    id: 0,
    title: "Introducción",
    emoji: "👥",
    content: "..."
  },
  // ...
];
```

## 🚀 Optimizaciones

### Rendimiento 3D

1. **Geometrías Compartidas** - Reutilizar `PlaneGeometry`
2. **Texturas Optimizadas** - Compresión y tamaño adecuado
3. **Frustum Culling** - Three.js lo maneja automáticamente
4. **Shadow Maps** - Resolución balanceada (2048x2048)

### Carga de Componentes

```typescript
// Carga dinámica del 3D (evitar SSR)
const Flipbook = dynamic(
  () => import('@/components/3D/Flipbook'),
  { ssr: false }
);
```

### Lazy Loading

- Componentes 3D: Carga diferida
- Imágenes: `next/image` con lazy loading
- Sonidos: Carga bajo demanda

## 🔧 Mantenimiento

### Actualizar Contenido

```powershell
# 1. Editar el manual original
notepad MANUAL_USUARIO_TURISMO_COMUNITARIO.txt

# 2. Reprocesar
npm run split-manual

# 3. Verificar cambios
npm run dev
```

### Agregar Nueva Sección

En el manual TXT:
```markdown
## 16. Nueva Sección 🆕

Contenido de la nueva sección...
```

Ejecutar: `npm run split-manual`

### Cambiar Estilos

1. **Colores:** `tailwind.config.js`
2. **Animaciones:** `src/styles/animations.css`
3. **Componentes:** Archivos individuales

## 🐛 Debug y Testing

### Herramientas de Debug

```typescript
// En cualquier componente
console.log('Current page:', currentPage);

// Zustand DevTools
import { devtools } from 'zustand/middleware';
```

### Verificar Estado 3D

```typescript
// En Flipbook.tsx
useFrame(() => {
  console.log('Camera position:', camera.position);
});
```

### Testing Manual

1. **Navegación** - Probar todas las páginas
2. **Responsive** - Desktop, tablet, móvil
3. **Teclado** - Todos los atajos
4. **Sonido** - Activar/desactivar
5. **Rendimiento** - FPS con dev tools

## 📚 Referencias

### Documentación Oficial

- [Next.js](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Three.js](https://threejs.org/docs/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

### Recursos de Aprendizaje

- [Three.js Journey](https://threejs-journey.com/)
- [React Three Fiber Examples](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)
- [Next.js Learn](https://nextjs.org/learn)

## 🎯 Roadmap Futuro

### Funcionalidades Planeadas

- [ ] Búsqueda full-text en el manual
- [ ] Marcadores personales
- [ ] Modo oscuro/claro
- [ ] Exportar a PDF
- [ ] Notas y anotaciones
- [ ] Compartir secciones específicas
- [ ] Modo presentación
- [ ] Soporte multiidioma
- [ ] Progressive Web App (PWA)
- [ ] Modo offline

### Mejoras Técnicas

- [ ] Tests unitarios (Jest)
- [ ] Tests E2E (Playwright)
- [ ] CI/CD con GitHub Actions
- [ ] Monitoreo con Sentry
- [ ] Analytics con Google Analytics
- [ ] Lighthouse score 100
- [ ] Accesibilidad WCAG 2.1 AA

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025  
**Mantenedor:** Proyecto Turismo Comunitario
