'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useManualStore } from '@/store/manualStore';

export const Navbar: React.FC = () => {
  const { toggleSidebar } = useManualStore();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y título */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              <Bars3Icon className="h-6 w-6 text-white" />
            </button>

            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-hover rounded-lg flex items-center justify-center shadow-lg shadow-brand/30">
                <span className="text-2xl">📖</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white">Manual Interactivo 3D</h1>
                <p className="text-xs text-gray-400">Sistema de Turismo Comunitario</p>
              </div>
            </Link>
          </div>

          {/* Indicador de página actual */}
          <div className="hidden md:block">
            <div className="glass-effect px-4 py-2 rounded-lg">
              <span className="text-sm text-gray-300">Navegación interactiva</span>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Inicio
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
