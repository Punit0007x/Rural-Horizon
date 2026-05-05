import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sharedTerrainGenerator } from "./TerrainGenerator";

// Dynamic grass count based on device performance
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                window.innerWidth < 768 ||
                'ontouchstart' in window;
const GRASS_COUNT = isMobile ? 800 : 3200;

const Grass = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, scales, phases, colors } = useMemo(() => {
    const p: number[] = [];
    const s: number[] = [];
    const ph: number[] = [];
    const c: number[] = [];
    for (let i = 0; i < GRASS_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 200;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = sharedTerrainGenerator.getTerrainHeight(x, z) + 0.04;
      p.push(x, y, z);
      s.push(0.25 + Math.random() * 0.75);
      ph.push(Math.random() * Math.PI * 2);

      // Randomized green shading for variance
      const base = 0.3 + Math.random() * 0.35;
      const green = Math.min(1, base + (Math.random() * 0.15));
      c.push(0.1, green, 0.05);
    }
    return { positions: p, scales: s, phases: ph, colors: c };
  }, []);

  useMemo(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < GRASS_COUNT; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.setScalar(scales[i]);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, new THREE.Color(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]));
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor?.needsUpdate && (meshRef.current.instanceColor.needsUpdate = true);
  }, [positions, scales, dummy, colors]);

  const frameRef = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;

    frameRef.current += 1;
    // More aggressive frame-skipping on mobile
    const skipFrames = isMobile ? 4 : 2;
    if (frameRef.current % skipFrames !== 0) return;

    const t = state.clock.elapsedTime;
    // Update fewer instances on mobile
    const maxInstances = isMobile ? 400 : Math.min(GRASS_COUNT, 2000);
    for (let i = 0; i < maxInstances; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.setScalar(scales[i]);
      dummy.rotation.y = phases[i];
      dummy.rotation.z = Math.sin(t * 2 + phases[i]) * 0.1;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, GRASS_COUNT]} castShadow>
      <coneGeometry args={[0.05, 0.6, 4]} />
      <meshStandardMaterial vertexColors roughness={0.85} metalness={0} />
    </instancedMesh>
  );
};

export default Grass;
