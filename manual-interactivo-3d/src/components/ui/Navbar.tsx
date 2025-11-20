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
          {/* Botones de navegación simples */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors lg:hidden"
              aria-label="Toggle menu"
            >
              <Bars3Icon className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Espacio flexible */}
          <div className="flex-1"></div>

          {/* Botón de inicio */}
          <div className="flex items-center">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              title="Volver al inicio"
            >
              <span className="text-2xl">🏠</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
