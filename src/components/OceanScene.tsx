import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function useIsDark() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return isDark;
}

// Simplified water ripple effect
function WaterRipples({ isDark }: { isDark: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(isDark ? '#0e7490' : '#0c4a6e') },
      uColor2: { value: new THREE.Color(isDark ? '#22d3ee' : '#0891b2') },
      uColor3: { value: new THREE.Color(isDark ? '#67e8f9' : '#06b6d4') },
      uOpacity: { value: isDark ? 0.15 : 0.35 },
    }),
    [isDark]
  );

  useEffect(() => {
    uniforms.uColor1.value.set(isDark ? '#0e7490' : '#0c4a6e');
    uniforms.uColor2.value.set(isDark ? '#22d3ee' : '#0891b2');
    uniforms.uColor3.value.set(isDark ? '#67e8f9' : '#06b6d4');
    uniforms.uOpacity.value = isDark ? 0.15 : 0.35;
  }, [isDark, uniforms]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();

    const material = mesh.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = time;

    mesh.current.rotation.z = time * 0.02;

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
    uniform float uOpacity;
    
    void main() {
      float mixStrength = (vElevation + 0.3) * 1.5;
      mixStrength += sin(vUv.x * 10.0 + uTime) * 0.05;
      
      vec3 color = mix(uColor1, uColor2, mixStrength);
      color = mix(color, uColor3, sin(vUv.y * 8.0 + uTime * 0.5) * 0.3 + 0.3);
      
      float shimmer = sin(vUv.x * 50.0 + vUv.y * 50.0 + uTime * 2.0) * 0.02;
      color += shimmer;
      
      gl_FragColor = vec4(color, uOpacity + vElevation * 0.25);
    }
  `;

  return (
    <>
      <pointLight
        ref={light}
        color={isDark ? '#22d3ee' : '#0891b2'}
        intensity={isDark ? 1.5 : 2}
        distance={12}
        position={[0, 2, 3]}
      />
      <ambientLight intensity={isDark ? 0.15 : 0.25} />
      <mesh ref={mesh} position={[0, -1, -2]} rotation={[-Math.PI / 4, 0, 0]}>
        <planeGeometry args={[15, 10, 32, 32]} />
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

function FloatingParticles({ count = 300, isDark }: { count?: number; isDark: boolean }) {
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

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(isDark ? '#67e8f9' : '#0e7490') },
      uOpacity: { value: isDark ? 0.5 : 0.85 },
      uSize: { value: isDark ? 16 : 24 },
    }),
    // Colors are updated in the effect below so the material keeps one uniform object.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uColor.value.set(isDark ? '#67e8f9' : '#0e7490');
    uniforms.uOpacity.value = isDark ? 0.5 : 0.85;
    uniforms.uSize.value = isDark ? 16 : 24;
  }, [isDark, uniforms]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    if (mesh.current) mesh.current.rotation.y = uniforms.uTime.value * 0.02;
  });

  const vertexShader = `
    uniform float uTime;
    uniform float uSize;
    void main() {
      vec3 pos = position;
      pos.y += sin(uTime * 0.6 + position.x * 3.0 + position.z) * 0.08;
      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = uSize * (1.0 / max(-mv.z, 0.1));
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor;
    uniform float uOpacity;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      gl_FragColor = vec4(uColor, uOpacity);
    }
  `;

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles.positions, 3]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

function SceneContent({ isDark }: { isDark: boolean }) {
  return (
    <>
      <WaterRipples isDark={isDark} />
      <FloatingParticles count={isDark ? 300 : 350} isDark={isDark} />
    </>
  );
}

export default function OceanScene() {
  const isDark = useIsDark();
  const [allowMotion, setAllowMotion] = useState(false);
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always');

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setAllowMotion(!media.matches);
    const syncVisibility = () => setFrameloop(document.hidden ? 'never' : 'always');
    syncMotion();
    syncVisibility();
    media.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      media.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {/* Light-mode contrast veil so particles read against the bright hero */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 dark:opacity-0 opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(8, 145, 178, 0.12) 0%, transparent 70%), linear-gradient(180deg, rgba(207, 250, 254, 0.5) 0%, rgba(241, 245, 249, 0.3) 100%)',
        }}
        aria-hidden
      />
      {allowMotion && (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 50 }}
          dpr={[1, 1.5]}
          frameloop={frameloop}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <SceneContent isDark={isDark} />
        </Canvas>
      )}
    </div>
  );
}
