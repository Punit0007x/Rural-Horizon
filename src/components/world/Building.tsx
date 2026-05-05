import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { sharedTerrainGenerator } from "./TerrainGenerator";

export interface BuildingData {
  id: string;
  name: string;
  village: string;
  position: [number, number, number];
  color: string;
  glowColor: string;
  width?: number;
  height?: number;
  depth?: number;
  description?: string;
}

interface BuildingProps {
  data: BuildingData;
  onHover: (data: BuildingData | null) => void;
  onClick: (data: BuildingData) => void;
  /** When true, the building name label is shown. Useful to hide labels during modal/overlay views. */
  showLabel?: boolean;
}

const Building = ({ data, onHover, onClick, showLabel }: BuildingProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const w = data.width || 4;
  const h = data.height || 6;
  const d = data.depth || 4;

  const { gl } = useThree();
  const maxAnisotropy = gl?.capabilities?.getMaxAnisotropy ? gl.capabilities.getMaxAnisotropy() : 1;

  // Mobile detection for performance optimization
  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768 ||
           'ontouchstart' in window;
  }, []);

  const { diffuseMap, bumpMap, roughnessMap } = useMemo(() => {
    // Reduce texture size on mobile for better performance
    const size = isMobile ? 512 : 2048; // Reduced from 2048 to 512 on mobile

    const buildTexture = (baseColor: string, noiseStrength: number) => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      // Cartoon-style base with vibrant colors
      ctx.fillStyle = baseColor;
      ctx.fillRect(0, 0, size, size);

      // Add cartoon panel lines with thicker, bolder strokes
      ctx.strokeStyle = "rgba(0,0,0,0.8)";
      ctx.lineWidth = 12;
      const gridSize = 6; // Fewer, bolder panels for cartoon style
      for (let yi = 1; yi < gridSize; yi++) {
        const y = (size / gridSize) * yi;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(size, y);
        ctx.stroke();
      }
      for (let xi = 1; xi < gridSize; xi++) {
        const x = (size / gridSize) * xi;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, size);
        ctx.stroke();
      }

      // Add cartoon highlights and shadows
      ctx.globalCompositeOperation = 'overlay';

      // Bright highlights
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      for (let i = 0; i < 20; i++) {
        const x = Math.random() * size * 0.3; // Left side highlights
        const y = Math.random() * size;
        const w = 20 + Math.random() * 40;
        const h = 10 + Math.random() * 20;
        ctx.fillRect(x, y, w, h);
      }

      // Dark shadows
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      for (let i = 0; i < 15; i++) {
        const x = size * 0.7 + Math.random() * size * 0.3; // Right side shadows
        const y = Math.random() * size;
        const w = 15 + Math.random() * 30;
        const h = 8 + Math.random() * 15;
        ctx.fillRect(x, y, w, h);
      }

      ctx.globalCompositeOperation = 'source-over';

      // Add cartoon sparkle effects
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        const sparkleSize = 1 + Math.random() * 3;
        ctx.beginPath();
        ctx.arc(x, y, sparkleSize, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1.5, 1.5); // Slightly different repeat for cartoon style
      texture.anisotropy = maxAnisotropy;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.needsUpdate = true;
      return texture;
    };

    const diffuse = buildTexture(data.color, 0.18);
    const roughness = buildTexture("#ffffff", 0.35);
    const bump = buildTexture("#ffffff", 0.6);

    return {
      diffuseMap: diffuse,
      roughnessMap: roughness,
      bumpMap: bump,
    };
  }, [data.color, maxAnisotropy]);

  const [groundHeight, setGroundHeight] = useState(data.position[1] || 0);

  useEffect(() => {
    // Align building with terrain height so it sits naturally on slopes
    const sampleCount = 5;
    const halfW = w / 2;
    const halfD = d / 2;

    let maxHeight = -Infinity;
    for (let ix = 0; ix < sampleCount; ix++) {
      for (let iz = 0; iz < sampleCount; iz++) {
        const xOffset = -halfW + (ix / (sampleCount - 1)) * w;
        const zOffset = -halfD + (iz / (sampleCount - 1)) * d;
        const worldX = data.position[0] + xOffset;
        const worldZ = data.position[2] + zOffset;
        const h = sharedTerrainGenerator.getTerrainHeight(worldX, worldZ);
        maxHeight = Math.max(maxHeight, h);
      }
    }

    // Keep minimal padding so buildings sit perfectly on the ground
    setGroundHeight(maxHeight + 0.05);
  }, [data.position, w, d]);

  const glowGeometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(w * 1.2, d * 1.2);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, [w, d]);

  const frameRef = useRef(0);

  useFrame(({ clock }) => {
    if (!glowRef.current || !hovered) return;

    frameRef.current++;
    // Skip frames for performance
    if (frameRef.current % 2 !== 0) return;

    const t = clock.getElapsedTime();
    glowRef.current.visible = true;
    glowRef.current.scale.setScalar(1 + Math.sin(t * 3) * 0.05);
    glowRef.current.material.opacity = 0.5 + Math.sin(t * 2) * 0.1;
  });

  return (
    <group position={[data.position[0], groundHeight, data.position[2]]} ref={groupRef}>
      {/* Glowing ground base */}
      <mesh
        ref={glowRef}
        geometry={glowGeometry}
        position={[0, 0.02, 0]}
        renderOrder={-1}
      >
        <meshBasicMaterial
          color={data.glowColor}
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>

      {/* Foundation with better detail */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[w + 0.5, 0.3, d + 0.5]} />
        <meshStandardMaterial
          color="#2D1810" // Darker, more cartoon-like foundation
          roughness={0.4}
          metalness={0.2}
          envMapIntensity={0.3}
        />
      </mesh>

      {/* Main structure with enhanced material */}
      <mesh
        ref={meshRef}
        position={[0, h / 2 + 0.3, 0]}
        castShadow
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(data);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick(data);
        }}
        onPointerDown={(e) => {
          // For better mobile touch support
          e.stopPropagation();
          onClick(data);
        }}
        onTouchStart={(e) => {
          // Provide haptic feedback on mobile if available
          if ('vibrate' in navigator) {
            navigator.vibrate(50);
          }
        }}
      >
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={data.color}
          map={diffuseMap}
          bumpMap={bumpMap}
          bumpScale={0.05} // Reduced for cartoon style
          roughnessMap={roughnessMap}
          roughness={0.3} // Smoother for cartoon look
          metalness={0.1} // Slight metallic for cartoon shine
          emissive={hovered ? data.glowColor : "#000000"}
          emissiveIntensity={hovered ? 0.5 : 0.05} // More emissive for cartoon glow
          envMapIntensity={0.4} // Higher for cartoon reflections
        >
          {diffuseMap && <primitive attach="map" object={diffuseMap} />}
          {bumpMap && <primitive attach="bumpMap" object={bumpMap} />}
          {roughnessMap && <primitive attach="roughnessMap" object={roughnessMap} />}
        </meshStandardMaterial>
      </mesh>

      {/* Roof with better material */}
      <mesh position={[0, h + 0.3, 0]} castShadow>
        <boxGeometry args={[w + 0.3, 0.3, d + 0.3]} />
        <meshStandardMaterial
          color="#8B4513" // More vibrant brown for cartoon roof
          roughness={0.6}
          metalness={0.1}
          envMapIntensity={0.2}
        />
      </mesh>

      {/* Door with detail */}
      <mesh position={[0, 1.5, d / 2 + 0.02]} castShadow>
        <boxGeometry args={[1.2, 2.5, 0.1]} />
        <meshStandardMaterial
          color="#654321" // Richer wood color
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>

      {/* Door handle */}
      <mesh position={[0.5, 1.5, d / 2 + 0.08]} castShadow>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          color="#FFD700" // Bright gold for cartoon handle
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Windows with glow based on village */}
      {[-1.2, 1.2].map((wx, i) => (
        <group key={i} position={[wx, h * 0.6, d / 2 + 0.015]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 1, 0.05]} />
            <meshStandardMaterial
              color={data.village === "Technology" ? "#00BFFF" : "#87CEEB"} // Brighter blues for cartoon windows
              emissive={data.glowColor}
              emissiveIntensity={0.6} // More emissive for cartoon glow
              transparent
              opacity={0.9}
              metalness={0.1}
              roughness={0.1}
            />
          </mesh>
          {/* Window glow effect */}
          <mesh position={[0, 0, 0.08]}>
            <boxGeometry args={[0.9, 1.1, 0.01]} />
            <meshBasicMaterial
              color={data.glowColor}
              transparent
              opacity={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* Additional detail windows on sides */}
      {[0.5, -0.5].map((wy, i) => (
        <mesh key={`side-${i}`} position={[w / 2 + 0.02, h * 0.5 + wy, 0]} castShadow>
          <boxGeometry args={[0.05, 0.6, 0.6]} />
          <meshStandardMaterial
            color={data.village === "Technology" ? "#001a4d" : "#1a3d5c"}
            emissive={data.glowColor}
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Signboard */}
      <group position={[w / 2 + 0.8, 3, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 3.5, 0.1]} />
          <meshStandardMaterial
            color="#453020"
            roughness={0.95}
            metalness={0}
          />
        </mesh>
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[2.5, 0.8, 0.2]} />
          <meshStandardMaterial
            color="#5C4033"
            emissive={data.glowColor}
            emissiveIntensity={0.15}
            roughness={0.85}
            metalness={0.1}
          />
        </mesh>
      </group>

      {/* Building name label above building */}
      {showLabel !== false && (
        <Html
          position={[0, h + 1.5, 0]}
          center
          distanceFactor={12}
          occlude={false}
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            className="text-white font-bold text-lg px-3 py-2 rounded shadow-lg"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: `2px solid ${data.glowColor}`,
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              transform: 'translateY(-50%)',
              minWidth: '120px',
              maxWidth: '200px',
              textAlign: 'center',
              wordWrap: 'break-word',
              whiteSpace: 'normal',
            }}
          >
            {data.name}
          </div>
        </Html>
      )}
    </group>
  );
};

export default Building;
