import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Simplified water ripple effect
function WaterRipples() {
  const mesh = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#0e7490') },
      uColor2: { value: new THREE.Color('#22d3ee') },
      uColor3: { value: new THREE.Color('#67e8f9') },
    }),
    []
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    // Update shader uniforms
    const material = mesh.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = time;

    // Gentle rotation
    mesh.current.rotation.z = time * 0.02;

    // Light movement
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.3) * 3;
      light.current.position.y = Math.cos(time * 0.2) * 2;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      
      vec3 pos = position;
      
      // Create wave patterns
      float wave1 = sin(pos.x * 2.0 + uTime * 0.5) * 0.15;
      float wave2 = sin(pos.y * 1.5 + uTime * 0.3) * 0.15;
      float wave3 = cos(pos.x * 1.0 + pos.y * 1.0 + uTime * 0.4) * 0.1;
      
      pos.z += wave1 + wave2 + wave3;
      vElevation = pos.z;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uTime;
    
    void main() {
      // Mix colors based on elevation and UV
      float mixStrength = (vElevation + 0.3) * 1.5;
      mixStrength += sin(vUv.x * 10.0 + uTime) * 0.05;
      
      vec3 color = mix(uColor1, uColor2, mixStrength);
      color = mix(color, uColor3, sin(vUv.y * 8.0 + uTime * 0.5) * 0.3 + 0.3);
      
      // Add subtle shimmer
      float shimmer = sin(vUv.x * 50.0 + vUv.y * 50.0 + uTime * 2.0) * 0.02;
      color += shimmer;
      
      gl_FragColor = vec4(color, 0.15 + vElevation * 0.2);
    }
  `;

  return (
    <>
      <pointLight ref={light} color="#22d3ee" intensity={1.5} distance={12} position={[0, 2, 3]} />
      <ambientLight intensity={0.15} />
      <mesh ref={mesh} position={[0, -1, -2]} rotation={[-Math.PI / 4, 0, 0]}>
        <planeGeometry args={[15, 10, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

// Floating particles (simplified, less busy)
function FloatingParticles({ count = 300 }) {
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 12;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    return { positions };
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    // Gentle drift
    mesh.current.rotation.y = time * 0.02;

    // Subtle position animation
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(time + i) * 0.0005;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#67e8f9"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function OceanScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <WaterRipples />
        <FloatingParticles count={300} />
      </Canvas>
    </div>
  );
}
