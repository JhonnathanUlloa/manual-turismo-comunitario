## Propósito
Este archivo ayuda a agentes de codificación (Copilot / IA) a ser productivos rápidamente en este repositorio Next.js + Three.js.

Sigue las convenciones reales del proyecto — no sugerir cambios globales sin confirmar. Usa los archivos listados abajo como fuente de verdad.

## Resumen rápido del proyecto
- Framework: Next.js (App Router). Ver `src/app/` y `next.config.js`.
- Lenguaje: TypeScript. Tipos en `src/types/`.
- 3D: Three.js + React Three Fiber y utilidades en `src/components/3D/` (ej. `Flipbook.tsx`, `Page3D.tsx`).
- Estado: Zustand (`src/store/manualStore.ts`).
- Contenido del manual: procesado por `src/utils/splitManual.js` -> datos finales en `src/data/manualData.ts` y recursos en `public/assets/manual/`.

## Comandos y flujos de desarrollo (fuente: `package.json`, `server.js`, `start.ps1`)
- Instalar dependencias: `npm install`
- Procesar el manual (genera `src/data/manualData.ts`): `npm run split-manual` (ejecuta `src/utils/splitManual.js`).
- Desarrollo (recomendado): `npm run dev`
  - Nota: `dev` ejecuta `node server.js`. Ese script inicia `next dev` en el puerto 3001 y muestra URLs accesibles en la red local (útil para probar en móvil).
- Desarrollo directo de Next: `npm run dev:next` (ejecuta `next dev --port 3001 --hostname 0.0.0.0`).
- Compilar: `npm run build` → Producción: `npm run start` (serve `.next`).
- Linter/format: `npm run lint`, `npm run format`.

Importante: el README menciona `localhost:3000` y Next.js v15, pero la fuente de verdad es `package.json` + `server.js` (usa Next 14.x y puerto 3001). Preferir lo que aparece en `package.json` y `server.js`.

## Patrones y convenciones específicas del repo
- Preprocesado: el contenido del manual se divide antes de correr la app. Siempre ejecutar `npm run split-manual` cuando se actualiza el contenido original.
- 3D y cliente: los componentes en `src/components/3D/` usan renderizado cliente (React Three Fiber); revisa `page.tsx` en `src/app/manual/` para ver cómo se monta.
- Markdown: se renderiza con `react-markdown` y `remark-gfm`; las transformaciones y utilidades están en `src/utils/markdownUtils.ts`.
- Sonido: usa `use-sound` y está envuelto en `src/hooks/useSoundFx.ts`.
- Estado compartido: `src/store/manualStore.ts` (Zustand). Evitar introducir Redux u otro global store sin discusión.

## Puntos de integración / archivos clave a consultar
- `server.js` — Arranque de desarrollo; muestra URLs de red y ejecuta `next dev` con `0.0.0.0`.
- `package.json` — scripts reales y dependencias (Node >=18, npm >=9).
- `src/utils/splitManual.js` y `src/utils/splitManual.ts` — cómo se transforma el manual.
- `src/data/manualData.ts` — producto del split; fuente de datos consumida por componentes.
- `src/components/3D/Flipbook.tsx`, `src/components/3D/Page3D.tsx` — lógica 3D central.
- `src/hooks/useFlipControl.ts`, `src/hooks/useSoundFx.ts` — hooks UX/sonido.
- `src/store/manualStore.ts` — estado global del manual.
- `public/assets/manual/` — imágenes y recursos que acompañan al manual.

## Reglas para cambios sugeridos por IA
- No cambies el puerto predeterminado ni el comportamiento de `server.js` sin comentar impacto (acceso móvil, CI/CD).
- Si agregas dependencias, actualiza `package.json` y menciona por qué; evita grandes upgrades de Next/React sin approval.
- Para cambios que afectan el contenido del manual, describe cómo volver a ejecutar `npm run split-manual` y dónde aparecen los cambios (`src/data/manualData.ts`).

## Qué pedir al humano si algo no está claro
- Confirmar si hay una intención de actualizar Next.js (README vs package.json).
- Confirmar el puerto a usar en despliegues locales y si el comportamiento de `server.js` debe preservarse.

---
Si quieres, aplico y ejecuto una comprobación rápida de lint/build o ajusto/expando secciones concretas. ¿Hay algo que quieras que añada o acorte?
