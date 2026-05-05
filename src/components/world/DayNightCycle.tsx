import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

interface DayNightCycleProps {
  cycleSpeed?: number; // Speed multiplier (default 1)
  onTimeChange?: (time: number) => void;
}

/**
 * Dynamic day-night cycle with realistic lighting transitions
 * Time goes from 0-1 (full 24-hour cycle)
 */
export const DayNightCycle = ({
  cycleSpeed = 0.1,
  onTimeChange,
}: DayNightCycleProps) => {
  const { scene } = useThree();
  const timeRef = useRef(0);
  const sunLightRef = useRef<THREE.DirectionalLight | null>(null);
  const ambientLightRef = useRef<THREE.Light | null>(null);

  // Find lights and sky in the scene if they exist
  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.DirectionalLight) {
        sunLightRef.current = child;
      }
      if (child instanceof THREE.AmbientLight) {
        ambientLightRef.current = child;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    // Update cycle time (0-1, where 0.5 is noon)
    timeRef.current = ((clock.getElapsedTime() * cycleSpeed) % 1);
    
    if (onTimeChange) {
      onTimeChange(timeRef.current);
    }

    // Convert time to angle (-PI to PI) for sun position
    const sunAngle = (timeRef.current - 0.5) * Math.PI;

    // Update lighting based on time
    if (sunLightRef.current) {
      const sunHeight = Math.sin(sunAngle);
      const sunDistance = 100;
      
      // Position sun
      sunLightRef.current.position.set(
        Math.cos(sunAngle) * sunDistance,
        Math.max(5, sunHeight * 80), // Keep minimum height
        Math.sin(sunAngle) * sunDistance
      );

      // Adjust sun intensity based on height
      const sunIntensity = Math.max(0.1, sunHeight * 1.8);
      sunLightRef.current.intensity = sunIntensity;

      // Color shift for sunrise/sunset
      if (sunHeight < 0.3 && sunHeight > 0) {
        // Sunset/sunrise colors
        const transitionFactor = sunHeight / 0.3;
        const sunsetColor = new THREE.Color().lerpColors(
          new THREE.Color("#FF6B35"),
          new THREE.Color("#FFEAD0"),
          transitionFactor
        );
        sunLightRef.current.color.copy(sunsetColor);
      } else if (sunHeight >= 0.3) {
        // Noon color
        sunLightRef.current.color.set("#FFEAD0");
      } else {
        // Night - very dim
        sunLightRef.current.color.set("#4466BB");
      }

      // Update shadows for sun position
      sunLightRef.current.shadow.camera.position.copy(sunLightRef.current.position);
    }

    // Update ambient light
    if (ambientLightRef.current) {
      const ambientIntensity = 0.3 + Math.max(0, Math.sin(sunAngle)) * 0.3;
      ambientLightRef.current.intensity = ambientIntensity;

      // Shift ambient color based on time of day
      if (Math.sin(sunAngle) > 0) {
        ambientLightRef.current.color.set("#FFE4B0");
      } else {
        ambientLightRef.current.color.set("#4466BB");
      }
    }

    // Update fog color based on time
    if (scene.fog) {
      const sunHeight = Math.sin(sunAngle);
      if (sunHeight > 0.3) {
        scene.fog.color.set("#C4A882");
      } else if (sunHeight > -0.3) {
        // Twilight
        const factor = (sunHeight + 0.3) / 0.6;
        scene.fog.color.lerpColors(
          new THREE.Color("#2B1B3D"),
          new THREE.Color("#C4A882"),
          factor
        );
      } else {
        scene.fog.color.set("#1a1a2e");
      }
    }

    // Update scene background
    if (scene.background && scene.background instanceof THREE.Color) {
      const sunHeight = Math.sin(sunAngle);
      if (sunHeight > 0.3) {
        scene.background.set("#87CEEB");
      } else if (sunHeight > -0.3) {
        const factor = (sunHeight + 0.3) / 0.6;
        scene.background.lerpColors(
          new THREE.Color("#0a0a1a"),
          new THREE.Color("#87CEEB"),
          factor
        );
      } else {
        scene.background.set("#0a0a1a");
      }
    }
  });

  return null;
};

export default DayNightCycle;
