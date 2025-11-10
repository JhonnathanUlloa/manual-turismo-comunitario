'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BackgroundFX } from '@/components/BackgroundFX';
import { BookOpenIcon, RocketLaunchIcon, SparklesIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800">
      {/* Efectos de fondo */}
      <BackgroundFX />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo animado */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          className="mb-8"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <BookOpenIcon className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            Manual Interactivo 3D
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            Sistema de Gestión de Turismo Comunitario
          </p>
          <p className="text-lg text-gray-400 mb-12">
            Explora el manual de usuario en un formato flipbook 3D con animaciones realistas
          </p>
        </motion.div>

        {/* Características */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl"
        >
          <div className="card-hover text-center">
            <SparklesIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Experiencia 3D</h3>
            <p className="text-gray-400 text-sm">
              Navegación inmersiva con efectos de página realistas
            </p>
          </div>

          <div className="card-hover text-center">
            <BookOpenIcon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Contenido Completo</h3>
            <p className="text-gray-400 text-sm">15 secciones detalladas del manual de usuario</p>
          </div>

          <div className="card-hover text-center">
            <RocketLaunchIcon className="w-12 h-12 text-pink-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Tecnología Moderna</h3>
            <p className="text-gray-400 text-sm">Next.js 15, Three.js y React 19</p>
          </div>
        </motion.div>

        {/* Botón principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/manual" className="btn-primary text-lg px-8 py-4 inline-block">
            🚀 Iniciar Manual Interactivo
          </Link>
        </motion.div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            Powered by <span className="text-blue-400 font-semibold">Strapi CMS</span>
          </p>
          <p className="text-gray-600 text-xs mt-2">Versión 1.0 - Octubre 2025</p>
        </motion.div>
      </div>
    </main>
  );
}
