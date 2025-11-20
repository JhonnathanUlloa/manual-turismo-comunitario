# 📸 IMÁGENES NECESARIAS PARA EL MANUAL INTERACTIVO

## 📁 Ubicación de las imágenes
Todas las imágenes deben guardarse en:
```
manual-interactivo-3d/public/images/manual/
```

---

## 🖼️ Lista de imágenes necesarias

### 1. **Acceso al Sistema** (Sección 4)

#### `login-strapi.png` o `login-strapi.jpg`
**Descripción:** Captura de pantalla de la página de inicio de sesión de Strapi
**Contenido debe mostrar:**
- URL: http://192.168.9.101:1337/admin
- Formulario de login con campos de email y contraseña
- Botón "Sign in"
- Logo de Strapi si es visible

**Cómo obtenerla:**
1. Abrir http://192.168.9.101:1337/admin en navegador
2. Tomar captura de pantalla (tecla Impr Pant o F12)
3. Recortar solo el área del formulario de login
4. Guardar como `login-strapi.png`

---

### 2. **Panel de Administración** (Sección 5)

#### `panel-principal.png`
**Descripción:** Vista completa del panel de administración de Strapi
**Contenido debe mostrar:**
- Menú lateral con todas las opciones (Content Manager, Alojamiento, Restaurante, etc.)
- Área central con estadísticas o dashboard
- Barra superior con usuario

**Cómo obtenerla:**
1. Iniciar sesión en Strapi
2. Ir al dashboard principal
3. Tomar captura de pantalla completa
4. Guardar como `panel-principal.png`

---

### 3. **Gestión de Alojamientos** (Sección 6)

#### `alojamientos-lista.png`
**Descripción:** Lista de alojamientos en el Content Manager
**Contenido debe mostrar:**
- Tabla con listado de alojamientos
- Columnas: Nombre, Tipo, Estado (Published/Draft)
- Botón "+ Create new entry" visible

**Cómo obtenerla:**
1. Clic en "Alojamiento" en menú lateral
2. Captura de la lista completa
3. Guardar como `alojamientos-lista.png`

#### `alojamiento-formulario.png`
**Descripción:** Formulario de creación/edición de alojamiento
**Contenido debe mostrar:**
- Campos: Nombre, Tipo, Descripción
- Sección de subida de imagen principal
- Campos opcionales: WiFi, Parking, Camas, Baños
- Botones Save y Publish

**Cómo obtenerla:**
1. Clic en "+ Create new entry" en Alojamientos
2. Captura del formulario (puede ser en partes si es largo)
3. Guardar como `alojamiento-formulario.png`

---

### 4. **Gestión de Restaurantes** (Sección 7)

#### `restaurantes-lista.png`
**Descripción:** Lista de restaurantes
**Similar a alojamientos-lista.png pero para restaurantes**

#### `restaurante-formulario.png`
**Descripción:** Formulario de restaurante
**Contenido debe mostrar:**
- Campos específicos de restaurante: Horario, Especialidad, Ubicación
- Sección de galería de imágenes

---

### 5. **Gestión de Experiencias** (Sección 8)

#### `experiencias-lista.png`
**Descripción:** Lista de experiencias y rutas

#### `experiencia-formulario-basico.png`
**Descripción:** Parte básica del formulario de experiencia
**Contenido debe mostrar:**
- Nombre, Categoría, Descripción
- Editor de texto enriquecido
- Campo de Galería (imagen principal)

#### `experiencia-tarifas.png`
**Descripción:** Sección de configuración de tarifas
**Contenido debe mostrar:**
- Tipo de Tarifa (dropdown: Fija/Variable)
- Campo Valor (para tarifa fija)
- Componente repetible "Tarifas" para tarifa variable
- Ejemplo de tarifa agregada (Número de pasajeros, Precio)

#### `experiencia-relaciones.png`
**Descripción:** Sección de relaciones con otros contenidos
**Contenido debe mostrar:**
- Campo "Alojamientos" con botón "+ Add relation"
- Campo "Restaurantes" con botón "+ Add relation"
- Campo "Productos" con botón "+ Add relation"
- Ejemplo de relación ya agregada (con X para eliminar)

#### `modal-agregar-relacion.png`
**Descripción:** Modal que aparece al hacer clic en "+ Add relation"
**Contenido debe mostrar:**
- Lista con checkboxes
- Barra de búsqueda
- Elementos seleccionables
- Botones Save y Cancel

---

### 6. **Gestión de Productos** (Sección 9)

#### `productos-lista.png`
**Descripción:** Lista de productos artesanales

#### `producto-formulario.png`
**Descripción:** Formulario de producto
**Contenido debe mostrar:**
- Nombre, Descripción, Precio, Stock
- Campo Destacado (checkbox)
- Categoría (dropdown)

---

### 7. **Gestión de Platos** (Sección 10)

#### `platos-lista.png`
**Descripción:** Lista de platos típicos

#### `plato-formulario.png`
**Descripción:** Formulario de plato
**Contenido debe mostrar:**
- Campos específicos: Ingredientes, Preparación, Tiempo de Preparación
- Editor de texto enriquecido

---

### 8. **Manejo de Imágenes** (Sección 11)

#### `media-library.png`
**Descripción:** Vista de la biblioteca de medios
**Contenido debe mostrar:**
- Grid con miniaturas de imágenes subidas
- Barra de búsqueda
- Opciones de filtrado
- Información de cada imagen (tamaño, formato)

#### `subir-imagen.png`
**Descripción:** Modal o sección de subida de imágenes
**Contenido debe mostrar:**
- Botón "Browse files" o área de arrastrar y soltar
- Barra de progreso de carga
- Lista de archivos subidos

---

### 9. **Publicación de Contenido** (Sección 12)

#### `estados-contenido.png`
**Descripción:** Vista de los diferentes estados en la lista
**Contenido debe mostrar:**
- Elementos con estado "Published" (🟢 verde)
- Elementos con estado "Draft" (🟡 amarillo/gris)
- Elementos "Modified" (🔴 rojo)

#### `botones-save-publish.png`
**Descripción:** Botones de guardar y publicar
**Contenido debe mostrar:**
- Botón "Save" en la esquina superior derecha
- Botón "Publish" en la esquina superior derecha
- Menú con opciones (tres puntos ...)

---

### 10. **Relaciones entre Contenidos** (Sección 13)

#### `relaciones-visualizacion.png`
**Descripción:** Relaciones ya agregadas
**Contenido debe mostrar:**
- Lista de alojamientos vinculados a una experiencia
- Lista de restaurantes vinculados
- Lista de productos vinculados
- Botón X para eliminar relación

---

### 11. **Solución de Problemas** (Sección 14)

#### `error-ejemplo.png`
**Descripción:** Ejemplo de mensaje de error (cualquier error común)
**Contenido debe mostrar:**
- Mensaje de error típico (por ejemplo: "Upload failed", "Invalid credentials", etc.)

---

### 12. **Screenshots Generales**

#### `strapi-logo.png`
**Descripción:** Logo de Strapi (opcional, para decoración)

#### `menu-content-manager.png`
**Descripción:** Menú lateral expandido mostrando Collection Types
**Contenido debe mostrar:**
- Content Manager expandido
- Collection Types con: Alojamiento, Experiencias y ruta, Plato, Producto, Restaurante

---

## 📐 Especificaciones técnicas de las imágenes

### Formato
- **Preferido:** PNG (para capturas de pantalla con texto nítido)
- **Alternativo:** JPG (para fotos con menor tamaño)

### Tamaño
- **Ancho recomendado:** 1280px - 1920px
- **Máximo:** 2MB por imagen
- **Resolución:** 72-96 DPI (para web)

### Calidad
- Imágenes nítidas, sin blur
- Texto legible
- Buen contraste
- Sin información sensible (contraseñas, datos personales)

### Nomenclatura
- Usar minúsculas
- Separar palabras con guion `-`
- Sin espacios ni caracteres especiales
- Extensión explícita (.png o .jpg)

**Ejemplos:**
- ✅ `login-strapi.png`
- ✅ `alojamientos-lista.png`
- ✅ `experiencia-tarifas.png`
- ❌ `Login Strapi.PNG`
- ❌ `Alojamiento_Lista.jpg`

---

## 🎨 Recomendaciones para capturar pantallas

### Herramientas recomendadas

**Windows:**
- Recortes (Win + Shift + S)
- Snipping Tool
- PrtScn + Paint

**Mac:**
- Cmd + Shift + 4 (selección)
- Cmd + Shift + 3 (pantalla completa)

**Linux:**
- Gnome Screenshot
- Flameshot
- Spectacle

### Preparación antes de capturar

1. **Limpiar la interfaz:**
   - Cerrar pestañas innecesarias
   - Ocultar información sensible
   - Zoom al 100%

2. **Usar datos de ejemplo:**
   - Nombres ficticios pero realistas
   - Precios ejemplo
   - Descripciones de muestra

3. **Iluminar bien:**
   - Tema claro de Strapi si es posible
   - Sin reflejos en pantalla

### Post-procesamiento

1. **Recortar:**
   - Solo el área relevante
   - Sin barras de Windows/Mac innecesarias

2. **Anotar (opcional):**
   - Flechas rojas para señalar elementos importantes
   - Números para pasos secuenciales
   - Círculos o resaltados

3. **Comprimir:**
   - Usar TinyPNG.com
   - O ImageOptim (Mac)
   - Objetivo: menos de 500KB por imagen

---

## 📋 Checklist de imágenes

Marque las imágenes que ya tiene listas:

### Esenciales (obligatorias)
- [ ] `login-strapi.png`
- [ ] `panel-principal.png`
- [ ] `alojamientos-lista.png`
- [ ] `alojamiento-formulario.png`
- [ ] `experiencia-formulario-basico.png`
- [ ] `experiencia-tarifas.png`
- [ ] `experiencia-relaciones.png`
- [ ] `modal-agregar-relacion.png`

### Importantes (recomendadas)
- [ ] `restaurantes-lista.png`
- [ ] `restaurante-formulario.png`
- [ ] `productos-lista.png`
- [ ] `producto-formulario.png`
- [ ] `platos-lista.png`
- [ ] `plato-formulario.png`
- [ ] `media-library.png`
- [ ] `estados-contenido.png`

### Opcionales (mejoran la experiencia)
- [ ] `subir-imagen.png`
- [ ] `botones-save-publish.png`
- [ ] `relaciones-visualizacion.png`
- [ ] `error-ejemplo.png`
- [ ] `menu-content-manager.png`

---

## 💡 Ejemplo de estructura de carpeta final

```
manual-interactivo-3d/
└── public/
    └── images/
        └── manual/
            ├── login-strapi.png
            ├── panel-principal.png
            ├── alojamientos-lista.png
            ├── alojamiento-formulario.png
            ├── restaurantes-lista.png
            ├── restaurante-formulario.png
            ├── experiencias-lista.png
            ├── experiencia-formulario-basico.png
            ├── experiencia-tarifas.png
            ├── experiencia-relaciones.png
            ├── modal-agregar-relacion.png
            ├── productos-lista.png
            ├── producto-formulario.png
            ├── platos-lista.png
            ├── plato-formulario.png
            ├── media-library.png
            ├── subir-imagen.png
            ├── estados-contenido.png
            ├── botones-save-publish.png
            ├── relaciones-visualizacion.png
            ├── error-ejemplo.png
            └── menu-content-manager.png
```

---

## 🚀 ¿Cómo usar este documento?

1. **Lee cada sección** para entender qué imagen necesitas
2. **Abre Strapi** y navega a la sección correspondiente
3. **Captura la pantalla** siguiendo las recomendaciones
4. **Guarda con el nombre exacto** especificado
5. **Coloca en la carpeta** `public/images/manual/`
6. **Marca el checkbox** en la lista cuando esté lista

---

## ❓ ¿Necesitas ayuda?

Si tienes dudas sobre alguna imagen específica o no entiendes qué debe contener, pregunta antes de capturar. Es mejor aclarar primero que tener que volver a tomar la captura.

---

**Última actualización:** Noviembre 2025
**Proyecto:** Manual Interactivo Turismo Bajo Sogamoso
