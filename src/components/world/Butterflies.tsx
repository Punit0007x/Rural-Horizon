import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ButterfliesProps {
  count?: number;
}

const Butterflies: React.FC<ButterfliesProps> = ({ count = 10 }) => {
  // Reduce count on mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                  window.innerWidth < 768 ||
                  'ontouchstart' in window;
  const actualCount = isMobile ? 3 : count;
  const groupRef = useRef<THREE.Group>(null);

  const butterflies = useMemo(() => {
    const temp = [];
    for (let i = 0; i < actualCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 100,
          Math.random() * 20 + 5,
          (Math.random() - 0.5) * 100,
        ] as [number, number, number],
        rotation: [0, Math.random() * Math.PI * 2, 0] as [number, number, number],
        speed: Math.random() * 0.02 + 0.01,
        wingSpeed: Math.random() * 0.3 + 0.2,
        color: new THREE.Color().setHSL(0.1 + Math.random() * 0.1, 0.8, 0.6),
      });
    }
    return temp;
  }, [count]);

  const frameRef = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;

    frameRef.current += 1;
    // More aggressive frame-skipping on mobile
    const skipFrames = isMobile ? 6 : 2;
    if (frameRef.current % skipFrames !== 0) return;

    const time = state.clock.getElapsedTime();

    groupRef.current.children.forEach((butterfly, i) => {
      const data = butterflies[i];

      // Gentle floating motion
      butterfly.position.y = data.position[1] + Math.sin(time * data.speed + i) * 2;
      butterfly.position.x = data.position[0] + Math.sin(time * data.speed * 0.5 + i) * 3;
      butterfly.position.z = data.position[2] + Math.cos(time * data.speed * 0.3 + i) * 3;

      // Wing flapping animation
      butterfly.rotation.z = Math.sin(time * data.wingSpeed + i * 0.5) * 0.3;
      butterfly.rotation.y = data.rotation[1] + Math.sin(time * data.speed * 0.2 + i) * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      {butterflies.map((butterfly, i) => (
        <group key={i} position={butterfly.position} rotation={butterfly.rotation}>
          {/* Butterfly body */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.3]} />
            <meshStandardMaterial color={butterfly.color} />
          </mesh>

          {/* Left wing */}
          <mesh position={[-0.15, 0.05, 0]} rotation={[0, 0, Math.PI / 6]}>
            <planeGeometry args={[0.2, 0.15]} />
            <meshStandardMaterial
              color={butterfly.color}
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Right wing */}
          <mesh position={[0.15, 0.05, 0]} rotation={[0, 0, -Math.PI / 6]}>
            <planeGeometry args={[0.2, 0.15]} />
            <meshStandardMaterial
              color={butterfly.color}
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* Antennae */}
          <mesh position={[-0.02, 0.15, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.1]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          <mesh position={[0.02, 0.15, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.1]} />
            <meshStandardMaterial color="#000" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default Butterflies;