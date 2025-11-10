# 📚 Índice de Documentación

Bienvenido al Manual Interactivo 3D. Aquí encontrarás toda la documentación necesaria.

## 📖 Documentos Disponibles

### 1️⃣ [README.md](./README.md)
**Descripción general del proyecto**
- Stack tecnológico
- Características principales
- Scripts disponibles
- Despliegue

### 2️⃣ [INSTALL.md](./INSTALL.md) ⭐ **EMPIEZA AQUÍ**
**Guía de instalación paso a paso**
- Requisitos previos
- Instalación de dependencias
- Procesamiento del manual
- Solución de problemas comunes
- Comandos esenciales

### 3️⃣ [GETTING_STARTED.md](./GETTING_STARTED.md)
**Guía de inicio rápido**
- Uso de la aplicación
- Atajos de teclado
- Estructura de archivos
- Personalización
- Recursos adicionales

### 4️⃣ [ARCHITECTURE.md](./ARCHITECTURE.md)
**Documentación técnica completa**
- Arquitectura del sistema
- Componentes principales
- Flujo de datos
- Sistema de estilos
- Optimizaciones
- Roadmap futuro

## 🚀 Inicio Rápido

### Windows PowerShell

Ejecuta el script de ayuda:

```powershell
.\start.ps1
```

Este script te permite:
- ✅ Instalación completa automatizada
- ✅ Iniciar servidor de desarrollo
- ✅ Procesar el manual
- ✅ Compilar para producción
- ✅ Limpiar y reinstalar

### Comandos Manuales

```powershell
# Primera vez
npm install
npm run split-manual
npm run dev

# Desarrollo
npm run dev

# Producción
npm run build
npm run start
```

## 📂 Estructura del Proyecto

```
manual-interactivo-3d/
├── 📄 README.md              # Descripción general
├── 📄 INSTALL.md            # Instalación detallada ⭐
├── 📄 GETTING_STARTED.md    # Guía de inicio
├── 📄 ARCHITECTURE.md       # Documentación técnica
├── 📄 DOCS.md               # Este archivo
│
├── 🗂️ src/                   # Código fuente
│   ├── app/                 # Páginas Next.js
│   ├── components/          # Componentes React
│   ├── store/               # Estado global
│   ├── hooks/               # Hooks personalizados
│   ├── data/                # Datos del manual
│   ├── styles/              # Estilos CSS
│   ├── types/               # Tipos TypeScript
│   └── utils/               # Utilidades
│
├── 🗂️ public/                # Recursos estáticos
│   ├── assets/              # Imágenes
│   └── sounds/              # Efectos de audio
│
└── 🔧 Archivos de config     # Configuración
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── next.config.js
    └── ...
```

## 🎯 Rutas de Navegación

### Por Nivel de Experiencia

#### **Principiante** 👶
1. Lee: [INSTALL.md](./INSTALL.md)
2. Ejecuta: `.\start.ps1` (opción 1)
3. Abre: http://localhost:3000

#### **Intermedio** 💼
1. Lee: [GETTING_STARTED.md](./GETTING_STARTED.md)
2. Explora: `src/components/`
3. Personaliza: Colores y estilos

#### **Avanzado** 🚀
1. Lee: [ARCHITECTURE.md](./ARCHITECTURE.md)
2. Modifica: Lógica 3D
3. Contribuye: Nuevas funcionalidades

## 🔍 Encuentra Información Rápidamente

### ¿Cómo instalar el proyecto?
👉 [INSTALL.md](./INSTALL.md) - Sección "Instalación"

### ¿Cómo usar la aplicación?
👉 [GETTING_STARTED.md](./GETTING_STARTED.md) - Sección "Uso"

### ¿Qué tecnologías se usan?
👉 [README.md](./README.md) - Sección "Stack Tecnológico"

### ¿Cómo funciona el 3D?
👉 [ARCHITECTURE.md](./ARCHITECTURE.md) - Sección "Componentes 3D"

### ¿Cómo personalizar estilos?
👉 [GETTING_STARTED.md](./GETTING_STARTED.md) - Sección "Personalización"

### ¿Cómo agregar sonido?
👉 [INSTALL.md](./INSTALL.md) - Paso 4

### ¿Cómo desplegar?
👉 [INSTALL.md](./INSTALL.md) - Paso 10
👉 [README.md](./README.md) - Sección "Despliegue"

### ¿Problemas comunes?
👉 [INSTALL.md](./INSTALL.md) - Sección "Solución de Problemas"

## 💡 Tips y Mejores Prácticas

### Desarrollo
```powershell
# Siempre usa npm run dev en desarrollo
npm run dev

# Revisa la consola del navegador (F12) para errores
# Usa React DevTools para debuggear componentes
```

### Actualizar Contenido
```powershell
# 1. Edita: MANUAL_USUARIO_TURISMO_COMUNITARIO.txt
# 2. Ejecuta:
npm run split-manual
# 3. Recarga el navegador
```

### Antes de Desplegar
```powershell
# 1. Compila
npm run build

# 2. Prueba localmente
npm run start

# 3. Verifica que todo funcione
# 4. Despliega en Vercel
```

## 🎨 Recursos Adicionales

### Iconos y Emojis
- [Heroicons](https://heroicons.com/)
- [Emoji Copy](https://www.emojicopy.com/)

### Colores
- [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)
- [Coolors](https://coolors.co/)

### 3D
- [Three.js Examples](https://threejs.org/examples/)
- [R3F Examples](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)

### Animaciones
- [Framer Motion](https://www.framer.com/motion/)
- [Animista](https://animista.net/)

### Sonidos
- [Freesound](https://freesound.org/)
- [Pixabay](https://pixabay.com/sound-effects/)

## 📞 Ayuda

### Orden de Consulta

1. **Documentación** (esta carpeta de docs)
2. **Código** (comentarios en el código fuente)
3. **Logs** (terminal y consola del navegador)
4. **Issues** (si hay repositorio GitHub)

### Reportar Problemas

Si encuentras un bug:

1. ✅ Describe el problema claramente
2. ✅ Incluye pasos para reproducirlo
3. ✅ Adjunta captura de pantalla
4. ✅ Copia el mensaje de error completo
5. ✅ Indica tu sistema operativo y navegador

## 🎉 ¡Listo para Empezar!

**Siguiente paso recomendado:**

👉 Ve a [INSTALL.md](./INSTALL.md) y sigue las instrucciones paso a paso.

O ejecuta:
```powershell
.\start.ps1
```

---

**Versión:** 1.0.0  
**Última actualización:** Octubre 2025  
**Proyecto:** Sistema de Turismo Comunitario
