'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Text } from '@react-three/drei';
import { useManualStore } from '@/store/manualStore';
import { manualSections } from '@/data/manualData';
import { useSoundFx } from '@/hooks/useSoundFx';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

// Componente de página individual
function Page({ 
  content,
  position,
  rotation = [0, 0, 0],
  isFlipping = false
}: { 
  content: any;
  position: [number, number, number];
  rotation?: [number, number, number];
  isFlipping?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  
  useEffect(() => {
    // Crear canvas para la textura
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Fondo blanco
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const padding = 80;
      
      // Emoji
      ctx.font = '120px Arial';
      ctx.fillText(content.emoji, padding, padding + 100);
      
      // Título
      ctx.font = 'bold 56px Arial';
      ctx.fillStyle = '#1e40af';
      const words = content.title.split(' ');
      let line = '';
      let y = padding + 100;
      
      for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > canvas.width - 200 && line !== '') {
          ctx.fillText(line, padding + 140, y);
          line = word + ' ';
          y += 70;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, padding + 140, y);
      
      // Línea decorativa
      y += 30;
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
      
      // Contenido
      ctx.font = '32px Georgia';
      ctx.fillStyle = '#1f2937';
      const text = content.content
        .replace(/[#*_`]/g, '')
        .replace(/\n+/g, ' ')
        .substring(0, 2000);
      
      const lines: string[] = [];
      line = '';
      const maxWidth = canvas.width - (padding * 2);
      
      for (let word of text.split(' ')) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== '') {
          lines.push(line);
          line = word + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);
      
      y += 80;
      for (let i = 0; i < Math.min(lines.length, 25); i++) {
        ctx.fillText(lines[i], padding, y);
        y += 48;
      }
      
      // Número de página
      ctx.font = 'italic 28px Georgia';
      ctx.fillStyle = '#9ca3af';
      ctx.textAlign = 'center';
      ctx.fillText(
        `— ${content.id} —`,
        canvas.width / 2,
        canvas.height - 50
      );
      
      // Crear textura
      const tex = new THREE.CanvasTexture(canvas);
      tex.needsUpdate = true;
      setTexture(tex);
    }
    
    return () => {
      if (texture) texture.dispose();
    };
  }, [content]);
  
  return (
    <mesh ref={meshRef} position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={[4.5, 6, 0.03]} />
      <meshStandardMaterial 
        map={texture}
        color="#ffffff"
        roughness={0.65}
        metalness={0.05}
      />
    </mesh>
  );
}

// Componente del libro completo
function Book() {
  const { currentPage } = useManualStore();
  
  // Animación para páginas pasadas
  const leftPageSpring = useSpring({
    rotationY: currentPage > 0 ? 0 : -Math.PI,
    config: { mass: 1, tension: 120, friction: 26 }
  });
  
  const rightPageSpring = useSpring({
    rotationY: 0,
    config: { mass: 1, tension: 120, friction: 26 }
  });
  
  return (
    <group>
      {/* Página IZQUIERDA */}
      {currentPage > 0 && manualSections[currentPage - 1] && (
        <animated.group position={[-2.3, 0, 0]} rotation-y={leftPageSpring.rotationY}>
          <Page 
            content={manualSections[currentPage - 1]}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          />
        </animated.group>
      )}
      
      {/* Página DERECHA */}
      {currentPage < manualSections.length && manualSections[currentPage] && (
        <animated.group position={[2.3, 0, 0]} rotation-y={rightPageSpring.rotationY}>
          <Page 
            content={manualSections[currentPage]}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          />
        </animated.group>
      )}
      
      {/* LOMO del libro */}
      <mesh position={[0, 0, -0.02]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 6, 20]} />
        <meshStandardMaterial 
          color="#7c2d12"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </group>
  );
}

export const Flipbook: React.FC = () => {
  const { currentPage, isFlipping, setTotalPages } = useManualStore();
  const { playPageFlip } = useSoundFx();

  useEffect(() => {
    setTotalPages(manualSections.length);
  }, [setTotalPages]);

  useEffect(() => {
    if (isFlipping) {
      playPageFlip('normal');
    }
  }, [isFlipping, playPageFlip]);

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        camera={{
          position: [0, 1, 9],
          fov: 50,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          {/* Luces */}
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <spotLight
            position={[0, 10, 0]}
            angle={0.6}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
          
          {/* Entorno */}
          <Environment preset="apartment" />
          
          {/* Sombra del libro */}
          <ContactShadows
            position={[0, -3.1, 0]}
            opacity={0.3}
            scale={12}
            blur={2}
            far={4}
          />
          
          {/* El libro */}
          <Book />
          
          {/* Controles */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={5}
            maxDistance={15}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
