import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 2000 }) {
  const mesh = useRef<THREE.Points>(null);
  const light = useRef<THREE.PointLight>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a wide volume
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 12;
      positions[i3 + 2] = (Math.random() - 0.5) * 10 - 2;

      // Ocean-themed colors: cyan, teal, blue
      const colorChoice = Math.random();
      if (colorChoice < 0.4) {
        // Cyan
        colors[i3] = 0.086;
        colors[i3 + 1] = 0.714;
        colors[i3 + 2] = 0.831;
      } else if (colorChoice < 0.7) {
        // Teal
        colors[i3] = 0.055;
        colors[i3 + 1] = 0.569;
        colors[i3 + 2] = 0.698;
      } else {
        // Light blue
        colors[i3] = 0.4;
        colors[i3 + 1] = 0.91;
        colors[i3 + 2] = 0.976;
      }
    }

    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle rotation
    mesh.current.rotation.y = time * 0.03;
    mesh.current.rotation.x = Math.sin(time * 0.05) * 0.1;

    // Animate individual particles (wave motion)
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = particles.positions[i3];
      const z = particles.positions[i3 + 2];
      positions[i3 + 1] = particles.positions[i3 + 1] + Math.sin(time * 0.5 + x * 0.5 + z * 0.3) * 0.3;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Animate light
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.3) * 5;
      light.current.position.y = Math.cos(time * 0.2) * 3 + 2;
    }
  });

  return (
    <>
      <pointLight ref={light} color="#22d3ee" intensity={2} distance={15} />
      <ambientLight intensity={0.1} />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particles.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}

// Floating mesh rings to evoke ocean/data visualization
function FloatingRings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    group.current.rotation.z = t * 0.05;
  });

  return (
    <group ref={group} position={[2, 0, -3]}>
      {[1.5, 2.2, 3.0].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, i * 0.5, 0]}>
          <torusGeometry args={[radius, 0.01, 16, 100]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.2 - i * 0.05} />
        </mesh>
      ))}
    </group>
  );
}

export default function OceanScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles count={1500} />
        <FloatingRings />
      </Canvas>
    </div>
  );
}
