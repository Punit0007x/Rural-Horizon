import { useMemo } from "react";
import * as THREE from "three";

const Bench = ({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 0.4, 0]} castShadow>
      <boxGeometry args={[2, 0.1, 0.6]} />
      <meshStandardMaterial color="#6B4226" roughness={0.9} />
    </mesh>
    {[[-0.8, 0, 0], [0.8, 0, 0]].map((p, i) => (
      <mesh key={i} position={[p[0], 0.2, 0]} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.5]} />
        <meshStandardMaterial color="#5A3520" roughness={0.95} />
      </mesh>
    ))}
  </group>
);

const StreetLamp = ({ position, lightColor = "#FFE4B0" }: { position: [number, number, number]; lightColor?: string }) => (
  <group position={position}>
    <mesh position={[0, 2.5, 0]} castShadow>
      <cylinderGeometry args={[0.08, 0.1, 5, 8]} />
      <meshStandardMaterial color="#4A4A4A" roughness={0.5} metalness={0.7} />
    </mesh>
    <mesh position={[0, 5.2, 0]}>
      <sphereGeometry args={[0.25, 8, 8]} />
      <meshStandardMaterial color={lightColor} emissive={lightColor} emissiveIntensity={0.5} transparent opacity={0.9} />
    </mesh>
    <pointLight position={[0, 5, 0]} color={lightColor} intensity={3} distance={20} castShadow />
  </group>
);

const DirectionBoard = ({ position, rotation = [0, 0, 0], text }: { position: [number, number, number]; rotation?: [number, number, number]; text: string }) => (
  <group position={position} rotation={rotation}>
    <mesh position={[0, 1.5, 0]} castShadow>
      <cylinderGeometry args={[0.06, 0.08, 3, 6]} />
      <meshStandardMaterial color="#5C3A1E" roughness={0.95} />
    </mesh>
    <mesh position={[0.8, 2.8, 0]}>
      <boxGeometry args={[1.8, 0.5, 0.1]} />
      <meshStandardMaterial color="#7A5A3A" roughness={0.85} />
    </mesh>
  </group>
);

const WaterTank = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh position={[0, 1.5, 0]} castShadow>
      <cylinderGeometry args={[1, 1, 3, 16]} />
      <meshStandardMaterial color="#4A6A7A" roughness={0.6} metalness={0.3} />
    </mesh>
    <mesh position={[0, 3.1, 0]}>
      <cylinderGeometry args={[1.05, 1.05, 0.2, 16]} />
      <meshStandardMaterial color="#3A5A6A" roughness={0.5} metalness={0.4} />
    </mesh>
  </group>
);

const EnvironmentProps = () => {
  // Mobile detection for performance optimization
  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768 ||
           'ontouchstart' in window;
  }, []);

  return (
    <group>
      {/* Benches along paths - disabled on mobile */}
      {!isMobile && <Bench position={[10, 0, -30]} rotation={[0, 0.3, 0]} />}
      {!isMobile && <Bench position={[-10, 0, -30]} rotation={[0, -0.3, 0]} />}
      {!isMobile && <Bench position={[25, 0, 10]} rotation={[0, 1.2, 0]} />}
      {!isMobile && <Bench position={[-25, 0, 10]} rotation={[0, -1.2, 0]} />}
      {!isMobile && <Bench position={[0, 0, 20]} rotation={[0, 0, 0]} />}

      {/* Street lamps - reduced on mobile */}
      {!isMobile && <StreetLamp position={[5, 0, -25]} />}
      <StreetLamp position={[-5, 0, -25]} />
      {!isMobile && <StreetLamp position={[20, 0, -10]} />}
      {!isMobile && <StreetLamp position={[-20, 0, -10]} />}
      {!isMobile && <StreetLamp position={[15, 0, 25]} />}
      {!isMobile && <StreetLamp position={[-15, 0, 25]} />}
      {!isMobile && <StreetLamp position={[0, 0, -45]} lightColor="#00F5FF" />}
      {!isMobile && <StreetLamp position={[48, 0, -15]} lightColor="#FFB0B0" />}

      {/* Direction boards - disabled on mobile */}
      {!isMobile && <DirectionBoard position={[3, 0, -15]} rotation={[0, -0.5, 0]} text="Technology →" />}
      {!isMobile && <DirectionBoard position={[-3, 0, -15]} rotation={[0, 0.5, 0]} text="← Business" />}
      {!isMobile && <DirectionBoard position={[12, 0, 5]} rotation={[0, -1, 0]} text="Healthcare →" />}
      {!isMobile && <DirectionBoard position={[-12, 0, 5]} rotation={[0, 1, 0]} text="← Trades" />}
      {!isMobile && <DirectionBoard position={[0, 0, 15]} rotation={[0, 0, 0]} text="Agriculture ↑" />}

      {/* Water tanks - disabled on mobile */}
      {!isMobile && <WaterTank position={[45, 0, 48]} />}
      {!isMobile && <WaterTank position={[-42, 0, 55]} />}
      {!isMobile && <WaterTank position={[62, 0, -28]} />}

      {/* Banyan tree at center - simplified on mobile */}
      <group position={[-6, 0, -6]}>
        <mesh position={[0, 3, 0]} castShadow>
          <cylinderGeometry args={[0.6, 0.8, 6, isMobile ? 6 : 12]} />
          <meshStandardMaterial color="#3A2A1A" roughness={0.95} />
        </mesh>
        <mesh position={[0, 7, 0]} castShadow>
          <sphereGeometry args={[4, isMobile ? 8 : 12, isMobile ? 8 : 12]} />
          <meshStandardMaterial color="#1E4D1A" roughness={0.8} />
        </mesh>
        {!isMobile && <mesh position={[2, 6, 1]} castShadow>
          <sphereGeometry args={[3, 10, 10]} />
          <meshStandardMaterial color="#2A5A22" roughness={0.8} />
        </mesh>}
        {/* Stone bench around tree - disabled on mobile */}
        {!isMobile && <mesh position={[0, 0.3, 0]} receiveShadow>
          <cylinderGeometry args={[2.5, 2.5, 0.5, 16]} />
          <meshStandardMaterial color="#8A8A7A" roughness={0.9} />
        </mesh>}
      </group>
    </group>
  );
};

export default EnvironmentProps;
