import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { sharedTerrainGenerator } from "./TerrainGenerator";

const Terrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Mobile detection for performance optimization
  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth < 768 ||
           'ontouchstart' in window;
  }, []);

  const { geometry, material } = useMemo(() => {
    // Generate geometry with mobile-optimized segments
    const segments = isMobile ? 64 : 256; // Reduce from 256x256 to 64x64 on mobile
    const geo = new THREE.PlaneGeometry(500, 500, segments, segments);
    const positions = geo.attributes.position as THREE.BufferAttribute;

    // Apply height map to the terrain geometry
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getY(i);
      const height = sharedTerrainGenerator.getTerrainHeight(x, z);
      positions.setZ(i, height);
    }

    positions.needsUpdate = true;
    geo.computeVertexNormals();

    // Generate vertex colors based on terrain type
    const colors = new Float32Array(positions.count * 3);
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getY(i);
      const height = positions.getZ(i);
      const terrain = sharedTerrainGenerator.getTerrainType(height, x, z);

      // Blend colors based on terrain type - Muted cartoon style
      let r = 0,
        g = 0,
        b = 0;

      // Grass (muted, cartoon green)
      r += terrain.grass * (45 / 255);   // #2D5A2D - muted green
      g += terrain.grass * (90 / 255);
      b += terrain.grass * (45 / 255);

      // Dirt (warm, muted brown)
      r += terrain.dirt * (139 / 255);   // #8B4513 - saddle brown
      g += terrain.dirt * (69 / 255);
      b += terrain.dirt * (19 / 255);

      // Stone (cool, muted gray with blue tint)
      r += terrain.stone * (105 / 255);   // #696969 - dim gray
      g += terrain.stone * (105 / 255);
      b += terrain.stone * (105 / 255);

      // Sand (muted, cartoon yellow)
      r += terrain.sand * (210 / 255);   // #D2B48C - tan
      g += terrain.sand * (180 / 255);
      b += terrain.sand * (140 / 255);

      // Add subtle cartoon tint
      const cartoonBoost = 0.05;
      r = Math.min(1, r + cartoonBoost);
      g = Math.min(1, g + cartoonBoost);
      b = Math.min(1, b + cartoonBoost);

      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Create a procedural roughness map for fine detail
    const textureSize = isMobile ? 256 : 512;
    const noiseCanvas = document.createElement("canvas");
    noiseCanvas.width = textureSize;
    noiseCanvas.height = textureSize;
    const ctx = noiseCanvas.getContext("2d");
    if (ctx) {
      const imageData = ctx.createImageData(textureSize, textureSize);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = Math.floor(Math.random() * 80 + 120);
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 255;
      }
      ctx.putImageData(imageData, 0, 0);
    }
    const roughnessTexture = new THREE.CanvasTexture(noiseCanvas);
    roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;
    roughnessTexture.repeat.set(isMobile ? 4 : 8, isMobile ? 4 : 8);

    const mat = new THREE.MeshPhysicalMaterial({
      color: "#556B2F", // Muted olive drab base for natural look
      roughness: 0.7, // More rough for muted appearance
      metalness: 0.02, // Less metallic
      side: THREE.FrontSide,
      flatShading: false,
      clearcoat: 0.1, // Less clearcoat
      clearcoatRoughness: 0.4,
      reflectivity: 0.2, // Less reflective
      envMapIntensity: 0.3, // Less intense
      roughnessMap: roughnessTexture,
      vertexColors: true,
    });

    return { geometry: geo, material: mat };
  }, []);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      castShadow
    />
  );
};

export default Terrain;
