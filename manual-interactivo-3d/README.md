# 📖 Manual Interactivo 3D - Sistema de Turismo Comunitario

Manual de usuario interactivo en formato flipbook 3D con animaciones realistas y navegación fluida.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 15 (App Router + React 19)
- **Lenguaje:** TypeScript
- **3D Engine:** Three.js + React Three Fiber
- **Animaciones:** Framer Motion
- **Estilos:** Tailwind CSS
- **Estado:** Zustand
- **Markdown:** react-markdown + remark-gfm
- **Sonido:** use-sound

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Procesar el manual (dividir en secciones)
npm run split-manual

# Iniciar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
manual-interactivo-3d/
├─ public/                  # Recursos estáticos
│   ├─ assets/              # Imágenes del manual
│   └─ sounds/              # Efectos de sonido
├─ src/
│   ├─ app/                 # Rutas Next.js
│   ├─ components/          # Componentes React
│   │   ├─ 3D/              # Componentes Three.js
│   │   └─ ui/              # Componentes de interfaz
│   ├─ data/                # Contenido del manual
│   ├─ hooks/               # Custom hooks
│   ├─ store/               # Estado global (Zustand)
│   ├─ styles/              # Estilos CSS
│   ├─ types/               # Tipos TypeScript
│   └─ utils/               # Utilidades
└─ ...archivos de configuración
```

## 🎮 Funcionalidades

- ✅ Flipbook 3D con física realista
- ✅ Navegación fluida entre páginas
- ✅ Renderizado de Markdown con tablas y código
- ✅ Efectos de sonido al pasar páginas
- ✅ Iluminación dinámica y sombras
- ✅ Sidebar con índice interactivo
- ✅ Controles de navegación intuitivos
- ✅ Responsive (desktop, tablet, móvil)

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run format       # Formatear código
npm run split-manual # Procesar manual
```

## 🌐 Despliegue

Despliega fácilmente en Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📄 Licencia

MIT © 2025 Proyecto Turismo Comunitario
