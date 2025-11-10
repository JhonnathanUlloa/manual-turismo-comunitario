# 🎯 INSTRUCCIONES DE INSTALACIÓN Y EJECUCIÓN

## ✅ PASO 1: Verificar Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

### Node.js (versión 18 o superior)

Verifica tu versión:
```powershell
node --version
```

Si no tienes Node.js o tienes una versión antigua:
1. Ve a: https://nodejs.org/
2. Descarga la versión LTS (Long Term Support)
3. Instala siguiendo el asistente
4. Reinicia tu terminal

### npm (viene con Node.js)

Verifica:
```powershell
npm --version
```

## 📦 PASO 2: Instalar Dependencias

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
cd manual-interactivo-3d
npm install
```

**⏱️ Tiempo estimado:** 2-5 minutos (depende de tu conexión a internet)

**✅ Proceso exitoso si ves:**
```
added 1234 packages in 2m
```

**❌ Si hay errores:**

### Error: "npm ERR! code ENOENT"
```powershell
# Asegúrate de estar en la carpeta correcta
cd c:\Users\jhonn\OneDrive\Documentos\manualdeuso\manual-turismo-comunitario\manual-interactivo-3d
npm install
```

### Error: "EACCES: permission denied"
```powershell
# Ejecuta PowerShell como Administrador
# Luego:
npm install
```

### Error: "gyp ERR! stack Error: spawn"
```powershell
# Instala las herramientas de build de Windows
npm install --global windows-build-tools
# Luego intenta de nuevo
npm install
```

## 📝 PASO 3: Procesar el Manual

Este paso divide el manual en secciones:

```powershell
npm run split-manual
```

**✅ Proceso exitoso si ves:**
```
🔍 Leyendo manual desde: ...
✅ Encontradas 15 secciones
📝 Archivo generado en: src/data/manualData.ts
✨ Proceso completado exitosamente
```

**❌ Si hay error: "No se encontró el archivo"**

Verifica que el archivo `MANUAL_USUARIO_TURISMO_COMUNITARIO.txt` esté en la carpeta raíz del proyecto:

```
manual-turismo-comunitario/
├─ MANUAL_USUARIO_TURISMO_COMUNITARIO.txt  ← Debe estar aquí
└─ manual-interactivo-3d/
    └─ (proyecto)
```

Si está en otro lugar, cópialo a la ubicación correcta.

## 🎵 PASO 4: Agregar Sonido (Opcional)

### 4.1 Descargar Sonido

Ve a uno de estos sitios:
- https://freesound.org (busca "page turn")
- https://pixabay.com/sound-effects/ (busca "page flip")

### 4.2 Preparar el Archivo

1. Descarga el sonido en formato MP3
2. Renómbralo a: `flip.mp3`
3. Cópialo a: `manual-interactivo-3d\public\sounds\flip.mp3`

**Estructura esperada:**
```
manual-interactivo-3d/
└─ public/
    └─ sounds/
        └─ flip.mp3  ← Tu archivo aquí
```

**Nota:** Si no agregas sonido, la app funcionará igual pero sin efectos de audio.

## 🚀 PASO 5: Iniciar el Servidor de Desarrollo

```powershell
npm run dev
```

**✅ Proceso exitoso si ves:**
```
▲ Next.js 15.0.0
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 3.2s
```

## 🌐 PASO 6: Abrir en el Navegador

1. Abre tu navegador (Chrome, Edge, Firefox)
2. Ve a: **http://localhost:3000**
3. ¡Deberías ver la página de inicio del manual!

### Navegación

- **Página de inicio:** http://localhost:3000
- **Manual interactivo:** http://localhost:3000/manual

## 🎮 PASO 7: Probar la Aplicación

### En la Página de Inicio:
1. Verás el título "Manual Interactivo 3D"
2. Haz clic en "🚀 Iniciar Manual Interactivo"

### En el Manual:
1. **Navegación:**
   - Usa las flechas ◀️ ▶️ en pantalla
   - O teclas ← → del teclado
   - O barra espaciadora para avanzar

2. **Índice:**
   - Clic en el botón 📑 (esquina superior izquierda en móvil)
   - O en el icono de menú hamburguesa ☰
   - Selecciona cualquier sección

3. **Controles:**
   - 🏠 Ir al inicio
   - 🔊 Activar/desactivar sonido
   - Vista 3D con el ratón (arrastra para rotar)

## 🛑 PASO 8: Detener el Servidor

Cuando termines de trabajar:

1. Ve a la terminal donde está corriendo
2. Presiona: **Ctrl + C**
3. Confirma con: **Y** (si pregunta)

## 🔄 Volver a Ejecutar Después

La próxima vez que quieras trabajar:

```powershell
cd manual-interactivo-3d
npm run dev
```

Ya no necesitas instalar dependencias ni procesar el manual (a menos que lo hayas actualizado).

## 🏗️ PASO 9: Compilar para Producción (Opcional)

Cuando estés listo para desplegar:

```powershell
npm run build
```

Esto genera una versión optimizada en la carpeta `.next/`

Para probar la versión de producción:

```powershell
npm run start
```

## 🌍 PASO 10: Desplegar en Vercel (Opcional)

### 10.1 Crear Cuenta en Vercel

1. Ve a: https://vercel.com
2. Registra con tu cuenta de GitHub, GitLab o Email

### 10.2 Subir a GitHub (si aún no lo has hecho)

```powershell
git init
git add .
git commit -m "Initial commit - Manual Interactivo 3D"
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

### 10.3 Importar en Vercel

1. En Vercel, clic en "New Project"
2. Selecciona tu repositorio
3. Vercel detectará automáticamente Next.js
4. Clic en "Deploy"
5. ¡Espera 2-3 minutos y listo!

Tu sitio estará en: `https://tu-proyecto.vercel.app`

## 📋 RESUMEN DE COMANDOS

```powershell
# Primera vez
cd manual-interactivo-3d
npm install
npm run split-manual
npm run dev

# Día a día
npm run dev

# Producción
npm run build
npm run start

# Utilidades
npm run lint          # Revisar código
npm run format        # Formatear código
npm run split-manual  # Reprocesar manual
```

## 🆘 SOLUCIÓN DE PROBLEMAS COMUNES

### Problema 1: "Puerto 3000 ya en uso"

**Solución:**
```powershell
# Opción A: Usa otro puerto
$env:PORT=3001; npm run dev

# Opción B: Cierra el proceso en el puerto 3000
npx kill-port 3000
npm run dev
```

### Problema 2: "Module not found"

**Solución:**
```powershell
# Limpia y reinstala
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Problema 3: "La vista 3D no se ve"

**Posibles causas:**
1. **Navegador antiguo** - Actualiza a la última versión
2. **WebGL deshabilitado** - Ve a `chrome://flags` y habilita WebGL
3. **Drivers de gráficos** - Actualiza tus drivers

**Prueba:**
- Ve a: https://get.webgl.org/
- Deberías ver un cubo rotando

### Problema 4: "Error de TypeScript"

**Solución:**
```powershell
# Los errores son normales hasta que instales dependencias
npm install

# Si persisten:
npx tsc --noEmit
```

### Problema 5: "Cannot find module '@/...' "

**Solución:**
Verifica que el archivo `tsconfig.json` tenga:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📞 CONTACTO Y SOPORTE

Si tienes problemas:

1. **Revisa los logs** en la terminal
2. **Abre las DevTools** del navegador (F12) y revisa la consola
3. **Consulta** `GETTING_STARTED.md` para guía detallada
4. **Revisa** `ARCHITECTURE.md` para detalles técnicos

## ✨ ¡LISTO!

Ahora deberías tener tu Manual Interactivo 3D funcionando perfectamente.

**Próximos pasos sugeridos:**

1. 📝 Personaliza los colores en `tailwind.config.js`
2. 🎨 Ajusta las animaciones en `src/styles/animations.css`
3. 💡 Modifica la iluminación 3D en `src/components/3D/Lighting.tsx`
4. 🚀 Despliega en Vercel para compartir con el mundo

**¡Disfruta tu manual interactivo!** 🎉📖✨
