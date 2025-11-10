# Directorio de recursos

Coloca aquí las imágenes y recursos estáticos del manual.

## Estructura recomendada

```
public/
└── assets/
    ├── portada.png
    ├── logo.png
    └── paginas/
        ├── 01-introduccion.png
        ├── 02-que-es-strapi.png
        ├── 03-acceso-al-sistema.png
        └── ...
```

## Formatos recomendados

- **Imágenes:** PNG, JPG, WebP
- **Iconos:** SVG
- **Tamaño máximo:** 2MB por imagen
- **Resolución:** 1920x1080px (Full HD)

## Optimización

Para optimizar las imágenes antes de usarlas:

1. **TinyPNG** - https://tinypng.com
2. **Squoosh** - https://squoosh.app
3. **ImageOptim** (Mac) - https://imageoptim.com

## Uso en el código

```typescript
import Image from 'next/image';

<Image 
  src="/assets/portada.png" 
  alt="Portada"
  width={1920}
  height={1080}
/>
```
