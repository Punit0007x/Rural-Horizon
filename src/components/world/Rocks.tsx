import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sharedTerrainGenerator } from "./TerrainGenerator";

const Rocks = () => {
  // Mobile detection for performance optimization
  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768 ||
           'ontouchstart' in window;
  }, []);

  const ROCK_COUNT = isMobile ? 30 : 100; // Reduce rock count on mobile

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, scales, rotations } = useMemo(() => {
    const p: number[] = [];
    const s: number[] = [];
    const r: number[] = [];

    for (let i = 0; i < ROCK_COUNT; i++) {

      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * 180;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = sharedTerrainGenerator.getTerrainHeight(x, z);

      p.push(x, y, z);
      s.push(0.6 + Math.random() * 1.2);
      r.push(Math.random() * Math.PI * 2);
    }

    return { positions: p, scales: s, rotations: r };
  }, [ROCK_COUNT]);

  useMemo(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < ROCK_COUNT; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.setScalar(scales[i]);
      dummy.rotation.set(0, rotations[i], 0);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, scales, rotations, dummy]);

  useFrame(() => {
    if (!meshRef.current || isMobile) return; // Disable animation on mobile

    for (let i = 0; i < ROCK_COUNT; i++) {
      // Slight random wobble to add life (very subtle)
      const wobble = Math.sin(performance.now() * 0.0002 + i) * 0.002;
      dummy.position.set(positions[i * 3], positions[i * 3 + 1] + wobble, positions[i * 3 + 2]);
      dummy.scale.setScalar(scales[i]);
      dummy.rotation.y = rotations[i] + wobble;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, ROCK_COUNT]} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#8B7355" // Warmer, more cartoon-like rock color
        roughness={0.7}
        metalness={0.1}
        emissive="#2F2F2F"
        emissiveIntensity={0.05}
      />
    </instancedMesh>
  );
};

export default Rocks;
