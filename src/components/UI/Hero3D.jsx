// src/components/UI/Hero3D.jsx
import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * A 3D "brain" made of a rotating low-poly sphere with an organic
 * offset texture. Reads as an abstract brain. No model file.
 *
 * To use a real .glb brain model, see the useGLTF section at the
 * bottom of this file — swap the <BrainSphere /> for <BrainModel />.
 */
function BrainSphere({ reduced }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current || reduced) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <mesh ref={meshRef}>
      {/* A sphere with slight vertex displacement reads as organic */}
      <icosahedronGeometry args={[1, 12]} />
      <meshStandardMaterial
        color="#9A9AA6"
        roughness={0.35}
        metalness={0.6}
        flatShading
      />
    </mesh>
  );
}

function Scene({ reduced }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 3, 5]}
        intensity={1.3}
        color="#F2F2F5"
      />
      <directionalLight
        position={[-3, -2, -3]}
        intensity={0.5}
        color="#63636E"
      />
      <BrainSphere reduced={reduced} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!reduced}
        autoRotate={!reduced}
        autoRotateSpeed={0.6}
      />
    </>
  );
}

export default function Hero3D({ className = '' }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-3xl bg-[#0E0E10] ${className}`}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 3], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: '#0E0E10' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene reduced={reduced} />
        </Suspense>
      </Canvas>

      {/* Soft radial glow layered on top for atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, transparent 55%, rgba(14,14,16,0.55) 100%)',
        }}
      />
    </div>
  );
}