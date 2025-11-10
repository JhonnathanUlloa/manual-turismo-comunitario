import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import '@/styles/animations.css';

export const metadata: Metadata = {
  title: 'Manual Interactivo 3D - Sistema de Turismo Comunitario',
  description:
    'Manual de usuario interactivo en formato flipbook 3D para el Sistema de Gestión de Turismo Comunitario con Strapi CMS',
  keywords: ['manual', 'turismo', 'strapi', '3d', 'flipbook', 'interactivo'],
  authors: [{ name: 'Proyecto Turismo Comunitario' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
