# 🚀 GUÍA DE INICIO RÁPIDO

## 📦 Instalación

### 1. Instalar dependencias

```powershell
cd manual-interactivo-3d
npm install
```

Este comando instalará todas las librerías necesarias:
- Next.js 15 & React 19
- Three.js & React Three Fiber
- Framer Motion
- Tailwind CSS
- Zustand
- Y más...

### 2. Procesar el manual

Antes de iniciar, debes procesar el archivo del manual para dividirlo en secciones:

```powershell
npm run split-manual
```

Este script:
- Lee el archivo `MANUAL_USUARIO_TURISMO_COMUNITARIO.txt`
- Lo divide en secciones
- Genera el archivo `src/data/manualData.ts` con el contenido estructurado

### 3. Agregar archivo de sonido (opcional)

Para los efectos de sonido al pasar páginas:

1. Crea la carpeta: `public/sounds/`
2. Agrega un archivo de sonido llamado: `flip.mp3`
3. Puedes encontrar sonidos gratuitos en:
   - [Freesound.org](https://freesound.org)
   - [Zapsplat.com](https://www.zapsplat.com)

### 4. Iniciar el servidor de desarrollo

```powershell
npm run dev
```

Abre tu navegador en: http://localhost:3000

## 🎮 Uso de la Aplicación

### Página de Inicio (/)
- Presentación del manual
- Botón para iniciar la experiencia interactiva

### Manual Interactivo (/manual)
- Vista 3D del flipbook
- Navegación con ratón y teclado
- Controles visuales en pantalla

### Atajos de Teclado

| Tecla | Acción |
|-------|--------|
| `→` o `Espacio` | Siguiente página |
| `←` | Página anterior |
| `Inicio` | Primera página |
| `Fin` | Última página |

### Controles en Pantalla

- **🔘 Menú lateral izquierdo**: Abrir índice de secciones
- **🏠 Botón home**: Volver a la primera página
- **🔊 Botón sonido**: Activar/desactivar efectos de audio
- **◀️ ▶️ Flechas**: Navegar entre páginas
- **📄 Indicador**: Muestra página actual / total

## 📁 Estructura de Archivos Importantes

```
manual-interactivo-3d/
├─ src/
│   ├─ app/
│   │   ├─ layout.tsx        ← Layout principal
│   │   ├─ page.tsx          ← Página de inicio
│   │   └─ manual/
│   │       └─ page.tsx      ← Vista del flipbook
│   │
│   ├─ components/
│   │   ├─ 3D/
│   │   │   ├─ Flipbook.tsx  ← Motor del libro 3D
│   │   │   ├─ Page3D.tsx    ← Página individual
│   │   │   └─ Lighting.tsx  ← Iluminación 3D
│   │   │
│   │   └─ ui/
│   │       ├─ Navbar.tsx    ← Barra superior
│   │       ├─ Sidebar.tsx   ← Menú lateral
│   │       └─ UIControls.tsx← Controles de navegación
│   │
│   ├─ data/
│   │   └─ manualData.ts     ← Contenido del manual
│   │
│   ├─ store/
│   │   └─ manualStore.ts    ← Estado global (Zustand)
│   │
│   └─ hooks/
│       ├─ useFlipControl.ts ← Lógica de navegación
│       └─ useSoundFx.ts     ← Efectos de sonido
│
├─ public/
│   ├─ sounds/
│   │   └─ flip.mp3          ← Sonido de página
│   └─ assets/
│       └─ (imágenes)
│
└─ MANUAL_USUARIO_TURISMO_COMUNITARIO.txt  ← Manual original
```

## 🛠️ Scripts Disponibles

```powershell
# Desarrollo
npm run dev              # Inicia servidor de desarrollo

# Producción
npm run build            # Construye para producción
npm run start            # Inicia servidor de producción

# Utilidades
npm run split-manual     # Procesa el manual y divide en secciones
npm run lint             # Ejecuta el linter
npm run format           # Formatea el código con Prettier
```

## 🎨 Personalización

### Cambiar Colores

Edita `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Tus colores personalizados
        500: '#tu-color',
      },
    },
  },
}
```

### Modificar Animaciones

Edita `src/styles/animations.css` para agregar o modificar animaciones.

### Ajustar Iluminación 3D

Modifica `src/components/3D/Lighting.tsx` para cambiar:
- Intensidad de luces
- Posiciones
- Colores
- Sombras

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado)

1. Sube tu proyecto a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Conecta tu repositorio
4. Vercel detectará automáticamente Next.js
5. ¡Despliega!

### Opción 2: Build Manual

```powershell
npm run build
npm run start
```

El sitio estará disponible en `http://localhost:3000`

## 🐛 Solución de Problemas

### Error: "Cannot find module"

```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

### Error: "manualData not found"

```powershell
npm run split-manual
```

### El 3D no se ve

1. Verifica que tienes un navegador moderno (Chrome, Firefox, Edge)
2. Habilita WebGL en tu navegador
3. Actualiza tus drivers de gráficos

### Las imágenes no cargan

1. Verifica que el archivo de manual esté en la ruta correcta
2. Revisa la consola del navegador (F12) para errores
3. Asegúrate de que el formato sea UTF-8

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Three.js](https://threejs.org/docs/)

## 💬 Soporte

Si encuentras problemas o tienes preguntas:

1. Revisa la documentación en `README.md`
2. Consulta esta guía de inicio
3. Verifica los issues en el repositorio (si aplica)

## ✨ Próximos Pasos

1. ✅ Instala las dependencias
2. ✅ Procesa el manual
3. ✅ Inicia el servidor
4. 🎨 Personaliza los estilos
5. 📝 Agrega más contenido
6. 🚀 Despliega tu aplicación

¡Disfruta creando tu manual interactivo 3D! 🎉
