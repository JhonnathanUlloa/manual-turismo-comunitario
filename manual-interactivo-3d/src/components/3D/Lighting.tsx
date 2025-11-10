'use client';

import { useRef } from 'react';
import * as THREE from 'three';

export const Lighting: React.FC = () => {
  const spotLightRef = useRef<THREE.SpotLight>(null);

  return (
    <>
      {/* Luz ambiental suave */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Luz hemisférica para simular luz natural */}
      <hemisphereLight intensity={0.3} color="#ffffff" groundColor="#444444" />

      {/* Luz direccional principal (simula luz de lectura) */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
        color="#fff5e6"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Luz puntual detrás del libro para resaltar bordes */}
      <pointLight position={[0, 5, -5]} intensity={0.3} color="#4a90e2" distance={20} />

      {/* Luz focal para efecto dramático */}
      <spotLight
        ref={spotLightRef}
        position={[0, 8, 3]}
        angle={0.3}
        penumbra={0.5}
        intensity={0.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Luz de relleno lateral */}
      <pointLight position={[-5, 3, 2]} intensity={0.2} color="#a78bfa" distance={15} />
      <pointLight position={[5, 3, 2]} intensity={0.2} color="#60a5fa" distance={15} />
    </>
  );
};
