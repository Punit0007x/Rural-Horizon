import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export interface NPCData {
  id: string;
  name: string;
  role: string;
  village: string;
  position: [number, number, number];
  color: string;
  greeting: string;
}

interface NPCProps {
  data: NPCData;
  onInteract: (data: NPCData) => void;
}

/**
 * Advanced NPC component with realistic animations and movement patterns
 */
const NPC = ({ data, onInteract }: NPCProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Mobile detection for performance optimization
  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768 ||
           'ontouchstart' in window;
  }, []);

  // Generate walking path around NPC
  const walkingPath = useMemo(() => {
    const path: [number, number][] = [];
    const radius = 3;
    for (let i = 0; i <= 360; i += 30) {
      const angle = (i * Math.PI) / 180;
      path.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
    }
    return path;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || !bodyRef.current || !headRef.current) return;

    const t = clock.elapsedTime;

    // Walking animation - subtle movement around village
    const speed = 0.3;
    const pathProgress = (t * speed) % walkingPath.length;
    const currentPathIndex = Math.floor(pathProgress);
    const nextPathIndex = (currentPathIndex + 1) % walkingPath.length;
    const lerpFactor = pathProgress - currentPathIndex;

    const currentPos = walkingPath[currentPathIndex];
    const nextPos = walkingPath[nextPathIndex];
    const posX = currentPos[0] + (nextPos[0] - currentPos[0]) * lerpFactor;
    const posZ = currentPos[1] + (nextPos[1] - currentPos[1]) * lerpFactor;

    groupRef.current.position.x = posX;
    groupRef.current.position.z = posZ;

    // Vertical bobbing while walking
    groupRef.current.position.y = Math.sin(t * 2) * 0.1;

    // Look towards next position
    const nextTarget = walkingPath[(currentPathIndex + 1) % walkingPath.length];
    const direction = Math.atan2(nextTarget[0] - posX, nextTarget[1] - posZ);
    groupRef.current.rotation.y = direction;

    // Arm swinging animation
    const armSwing = Math.sin(t * 2) * 0.5;

    // Head bobbing
    headRef.current.position.y = 2.3 + Math.sin(t * 2) * 0.05;

    // Body lean while walking
    bodyRef.current.rotation.z = Math.sin(t * 2) * 0.1;
  });

  return (
    <group position={data.position}>
      {/* Glow ring - enhanced */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[1.4, 1.9, 32]} />
        <meshBasicMaterial
          color={data.color}
          transparent
          opacity={hovered ? 0.8 : 0.3}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Animated pulse ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[2.2, 2.4, 32]} />
        <meshBasicMaterial
          color={data.color}
          transparent
          opacity={Math.abs(Math.sin(Date.now() * 0.005)) * 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      <group
        ref={groupRef}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onInteract(data);
        }}
        onPointerDown={(e) => {
          // For better mobile touch support
          e.stopPropagation();
          onInteract(data);
        }}
        onTouchStart={(e) => {
          // Provide haptic feedback on mobile if available
          if ('vibrate' in navigator) {
            navigator.vibrate(50);
          }
        }}
      >
        {/* Body with better material */}
        <mesh ref={bodyRef} position={[0, 1.2, 0]} castShadow receiveShadow>
          <capsuleGeometry args={[0.38, 1.2, isMobile ? 4 : 8, isMobile ? 8 : 16]} />
          <meshStandardMaterial
            color={data.color}
            roughness={0.5}
            metalness={0.1}
            emissive={hovered ? data.color : "#000000"}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </mesh>

        {/* Head with better proportions */}
        <mesh ref={headRef} position={[0, 2.3, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.35, isMobile ? 8 : 16, isMobile ? 8 : 16]} />
          <meshStandardMaterial
            color="#C89968"
            roughness={0.6}
            metalness={0}
          />
        </mesh>

        {/* Eyes - animated */}
        <mesh position={[0.12, 2.38, 0.28]} castShadow>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.12, 2.38, 0.32]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>

        <mesh position={[-0.12, 2.38, 0.28]} castShadow>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.12, 2.38, 0.32]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#1a1a1a" />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, 2.15, 0.33]}>
          <boxGeometry args={[0.15, 0.05, 0.02]} />
          <meshBasicMaterial color="#8B6F47" />
        </mesh>

        {/* Left arm */}
        <mesh position={[-0.45, 1.3, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
          <meshStandardMaterial
            color={data.color}
            roughness={0.5}
          />
        </mesh>

        {/* Right arm */}
        <mesh position={[0.45, 1.3, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 8]} />
          <meshStandardMaterial
            color={data.color}
            roughness={0.5}
          />
        </mesh>

        {/* Hover indicator above head */}
        {hovered && (
          <mesh position={[0, 3.2, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={0.9}
              toneMapped={false}
            />
          </mesh>
        )}
      </group>
    </group>
  );
};

export default NPC;
