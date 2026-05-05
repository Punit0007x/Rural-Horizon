import * as THREE from "three";
import { useMemo } from "react";
import { sharedTerrainGenerator } from "./TerrainGenerator";
import { VILLAGES } from "./VillageData";

interface RoadSegment {
  start: [number, number, number];
  end: [number, number, number];
  width?: number;
}

const Road = ({ start, end, width = 4 }: RoadSegment) => {
  const { position, rotation, length, averageHeight } = useMemo(() => {
    const dx = end[0] - start[0];
    const dz = end[2] - start[2];
    const len = Math.sqrt(dx * dx + dz * dz);
    const angle = Math.atan2(dx, dz);

    // Calculate average height along the path
    const samples = 5;
    let totalHeight = 0;
    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const x = start[0] + dx * t;
      const z = start[2] + dz * t;
      totalHeight += sharedTerrainGenerator.getTerrainHeight(x, z);
    }
    const avgHeight = totalHeight / (samples + 1) + 0.05;

    return {
      position: [(start[0] + end[0]) / 2, avgHeight, (start[2] + end[2]) / 2] as [number, number, number],
      rotation: [0, angle, 0] as [number, number, number],
      length: len,
      averageHeight: avgHeight,
    };
  }, [start, end]);

  return (
    <group position={position} rotation={rotation}>
      {/* Main road surface - flat plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#6B5E4F" roughness={0.95} metalness={0} />
      </mesh>
      {/* Center line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[0.15, length]} />
        <meshStandardMaterial color="#A89070" roughness={0.9} />
      </mesh>
      {/* Edge markings */}
      {[-width / 2 + 0.2, width / 2 - 0.2].map((x, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.01, 0]} receiveShadow>
          <planeGeometry args={[0.1, length]} />
          <meshStandardMaterial color="#8B7E6F" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
};

const Roads = () => {
  const center: [number, number, number] = [0, 0, 0];
  const villageCenters = VILLAGES.map(v => v.center);

  return (
    <group>
      {villageCenters.map((v, i) => (
        <Road key={`hub-${i}`} start={center} end={v} width={3} />
      ))}
      {/* Connecting ring road */}
      {villageCenters.map((v, i) => (
        <Road key={`ring-${i}`} start={v} end={villageCenters[(i + 1) % villageCenters.length]} width={2.5} />
      ))}
    </group>
  );
};

export default Roads;
