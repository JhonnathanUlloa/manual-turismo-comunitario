'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import * as THREE from 'three';
import { useManualStore } from '@/store/manualStore';

interface Page3DProps {
  index: number;
  texture?: THREE.Texture;
  position: [number, number, number];
  isFlipping: boolean;
  direction: 'forward' | 'backward' | null;
}

export const Page3D: React.FC<Page3DProps> = ({
  index,
  texture,
  position,
  isFlipping,
  direction,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { currentPage } = useManualStore();

  // Determinar el estado de la página
  const isCurrentPage = index === currentPage;
  const isNextPage = index === currentPage + 1;
  const isPastPage = index < currentPage;

  // Animación de rotación con React Spring
  const { rotation } = useSpring({
    rotation:
      isFlipping && isCurrentPage
        ? direction === 'forward'
          ? Math.PI
          : 0
        : isPastPage
        ? Math.PI
        : 0,
    config: { mass: 1, tension: 120, friction: 26 },
  });

  // Material de la página con textura
  const materialProps = {
    map: texture,
    side: THREE.DoubleSide,
    transparent: false,
    color: '#f5f5f0',
  };

  // Sombra dinámica
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.castShadow = true;
      meshRef.current.receiveShadow = true;
    }
  }, []);

  // Animación de brillo al pasar
  useFrame(({ clock }) => {
    if (meshRef.current && isFlipping && isCurrentPage) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissive = new THREE.Color(0xffffff);
      material.emissiveIntensity = Math.sin(clock.elapsedTime * 5) * 0.1;
    }
  });

  return (
    <animated.mesh
      ref={meshRef}
      position={position}
      rotation-y={rotation}
      castShadow
      receiveShadow
    >
      {/* Geometría de la página */}
      <planeGeometry args={[2, 3, 32, 32]} />

      {/* Material con textura */}
      <meshStandardMaterial {...materialProps} />

      {/* Borde de la página */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(2, 3)]} />
        <lineBasicMaterial color="#999" linewidth={1} />
      </lineSegments>
    </animated.mesh>
  );
};
