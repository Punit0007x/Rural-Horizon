import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 1200;

const DustParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const initialPositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 250;
      arr[i * 3 + 1] = Math.random() * 40 + 1;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 250;
    }
    return arr;
  }, []);

  const sizes = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i] = Math.random() * 0.15 + 0.05;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();

    // Wind wave effect
    const windStrength = Math.sin(t * 0.3) * 0.02;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = initialPositions[i * 3];
      const y = initialPositions[i * 3 + 1];
      const z = initialPositions[i * 3 + 2];

      // Vertical drift down slowly
      pos[i * 3 + 1] = y - (t * 0.3) % 50;

      // Horizontal wind movement with wave
      pos[i * 3] = x + Math.sin(t * 0.5 + i) * 5 + Math.sin(t * 0.3 + i * 0.01) * 15;
      pos[i * 3 + 2] = z + Math.cos(t * 0.4 + i) * 3 + windStrength * 30;

      // Reset particles that drift too low
      if (pos[i * 3 + 1] < 0) {
        pos[i * 3 + 1] = 40 + Math.random() * 10;
      }

      // Keep particles within bounds
      if (Math.abs(pos[i * 3]) > 250) {
        pos[i * 3] = -pos[i * 3];
      }
      if (Math.abs(pos[i * 3 + 2]) > 250) {
        pos[i * 3 + 2] = -pos[i * 3 + 2];
      }
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={initialPositions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1}
        color="#E8D4B8"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

export default DustParticles;
