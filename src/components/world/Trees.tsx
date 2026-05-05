import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

interface TreeProps {
  position: [number, number, number];
  scale?: number;
  leafColor?: string;
  isMobile?: boolean;
}

const Tree = ({ position, scale = 1, leafColor = "#228B22", isMobile = false }: TreeProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current && !isMobile) {
      // Subtle wind animation - disabled on mobile for performance
      groupRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.01;
      groupRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.3) * 0.005;
    }
  });

  return (
    <group position={position} scale={scale} ref={groupRef}>
      {/* Trunk with mobile-optimized geometry */}
      <mesh position={[0, 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.25, 0.4, 4, isMobile ? 8 : 24, 1]} />
        <meshStandardMaterial
          color="#8FBC8F" // Muted dark sea green
          roughness={0.4}
          metalness={0.1}
          emissive="#2F4F2F"
          emissiveIntensity={0.02}
        />
      </mesh>

      {/* Main foliage sphere with mobile-optimized detail */}
      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <sphereGeometry args={[2.2, isMobile ? 8 : 16, isMobile ? 8 : 16]} />
        <meshStandardMaterial
          color="#556B2F" // Muted olive drab
          roughness={0.3} // More rough for muted look
          metalness={0.05}
          emissive="#2F4F2F" // Dark green glow, much dimmer
          emissiveIntensity={0.03}
          clearcoat={0.1}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Secondary foliage for shape */}
      <mesh position={[0.9, 4.5, 0.6]} castShadow receiveShadow>
        <sphereGeometry args={[1.6, 12, 12]} />
        <meshStandardMaterial
          color="#556B2F" // Muted olive drab
          roughness={0.3}
          metalness={0.05}
          emissive="#2F4F2F"
          emissiveIntensity={0.03}
          clearcoat={0.1}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Tertiary foliage */}
      <mesh position={[-0.7, 4.8, -0.9]} castShadow receiveShadow>
        <sphereGeometry args={[1.4, 12, 12]} />
        <meshStandardMaterial
          color="#556B2F" // Muted olive drab
          roughness={0.3}
          metalness={0.05}
          emissive="#2F4F2F"
          emissiveIntensity={0.03}
          clearcoat={0.1}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Small detail foliage */}
      <mesh position={[0.3, 6.2, -0.5]} castShadow>
        <sphereGeometry args={[0.8, 8, 8]} />
        <meshStandardMaterial
          color="#556B2F" // Muted olive drab
          roughness={0.3}
          metalness={0.05}
          emissive="#2F4F2F"
          emissiveIntensity={0.03}
          clearcoat={0.1}
          clearcoatRoughness={0.2}
        />
      </mesh>
    </group>
  );
};

const Trees = () => {
  // Mobile detection for performance optimization
  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768 ||
           'ontouchstart' in window;
  }, []);

  const trees = useMemo(() => {
    const result: { pos: [number, number, number]; scale: number; color: string }[] = [];
    const treeCount = isMobile ? 40 : 80; // Reduce tree count on mobile
    for (let i = 0; i < treeCount; i++) { // Reduced from 150 to 80 trees for better performance
      const angle = Math.random() * Math.PI * 2;
      const radius = 35 + Math.random() * 180;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      result.push({
        pos: [x, 0, z],
        scale: 0.5 + Math.random() * 1,
        // More vibrant cartoon tree colors
        color: ["#00FF00", "#32CD32", "#228B22", "#006400", "#008000", "#00FF7F", "#3CB371"][Math.floor(Math.random() * 7)],
      });
    }
    return result;
  }, [isMobile]);

  return (
    <group>
      {trees.map((t, i) => (
        <Tree key={i} position={t.pos} scale={t.scale} leafColor={t.color} isMobile={isMobile} />
      ))}
    </group>
  );
};

export default Trees;
