import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sharedTerrainGenerator } from "./TerrainGenerator";

// Dynamic flower count based on device performance
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                window.innerWidth < 768 ||
                'ontouchstart' in window;
const FLOWER_COUNT = isMobile ? 40 : 160;

const Flowers = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { positions, colors } = useMemo(() => {
    const p: number[] = [];
    const c: number[] = [];
    for (let i = 0; i < FLOWER_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.random() * 160;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = sharedTerrainGenerator.getTerrainHeight(x, z) + 0.02;
      p.push(x, y, z);

      // Muted cartoon flower colors
      const flowerColors = [
        [0.8, 0.5, 0.7], // Muted pink
        [0.9, 0.8, 0.4], // Muted yellow
        [0.5, 0.8, 0.5], // Muted green
        [0.8, 0.6, 0.8], // Muted magenta
        [0.9, 0.7, 0.4], // Muted orange
        [0.6, 0.7, 0.9], // Muted blue
        [0.8, 0.6, 0.5], // Muted coral
      ];
      const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
      c.push(color[0], color[1], color[2]);
    }
    return { positions: p, colors: c };
  }, []);

  useMemo(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < FLOWER_COUNT; i++) {
      dummy.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      dummy.scale.setScalar(0.1 + Math.random() * 0.2);
      dummy.rotation.y = Math.random() * Math.PI;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, new THREE.Color(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2]));
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor?.needsUpdate && (meshRef.current.instanceColor.needsUpdate = true);
  }, [positions, colors, dummy]);

  const frameRef = useRef(0);

  useFrame((state) => {
    if (!meshRef.current) return;
    frameRef.current += 1;
    // More aggressive frame-skipping on mobile
    const skipFrames = isMobile ? 4 : 2;
    if (frameRef.current % skipFrames !== 0) return;

    const t = state.clock.elapsedTime;
    // Update fewer instances on mobile
    const maxInstances = isMobile ? 20 : FLOWER_COUNT;
    for (let i = 0; i < maxInstances; i++) {
      // Gentle swaying
      dummy.position.set(
        positions[i * 3],
        positions[i * 3 + 1] + Math.sin(t * 0.8 + i * 0.1) * 0.05,
        positions[i * 3 + 2]
      );
      dummy.rotation.z = Math.sin(t * 0.5 + i * 0.1) * 0.1;
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, FLOWER_COUNT]} castShadow receiveShadow>
      <coneGeometry args={[0.3, 0.8, 6]} />
      <meshStandardMaterial
        vertexColors
        roughness={0.3}
        metalness={0.1}
        emissive="#ffffff"
        emissiveIntensity={0.1}
      />
    </instancedMesh>
  );
};

export default Flowers;