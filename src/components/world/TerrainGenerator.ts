import { createNoise2D } from 'simplex-noise';
import * as THREE from 'three';

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class AdvancedTerrainGenerator {
  private noise2D: ReturnType<typeof createNoise2D>;
  private seed: number;

  constructor(seed: number = 12345) {
    this.seed = seed;
    this.noise2D = createNoise2D(mulberry32(seed));
  }

  /**
   * Generates terrain height using layered Perlin noise for natural-looking features
   * Uses Fractional Brownian Motion (FBM) for multi-scale variation
   */
  getHeight(x: number, z: number): number {
    let height = 0;
    let amplitude = 1;
    let frequency = 0.01;
    let maxAmplitude = 0;

    // FBM: multiple octaves of noise
    for (let i = 0; i < 6; i++) {
      height +=
        this.noise2D(x * frequency + this.seed, z * frequency + this.seed) * amplitude;

      maxAmplitude += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }

    // Normalize height
    height = height / maxAmplitude;

    // Add ridge noise for mountain peaks
    const ridgeNoise = this.getRidgeNoise(x * 0.005, z * 0.005);
    height += ridgeNoise * 0.5;

    // Smooth hills and valleys (flattened for better building settlement)
    height *= 3; // Reduced from 10 to 3 for flatter terrain

    // Add some low-frequency variation
    const baseHeight = this.noise2D(x * 0.002, z * 0.002) * 1; // Reduced from 4 to 1
    height += baseHeight;

    return Math.max(0, height);
  }

  getTerrainHeight(x: number, z: number) {
    return this.getHeight(x, z);
  }

  /**
   * Ridge noise creates mountain-like formations
   */
  private getRidgeNoise(x: number, z: number): number {
    const n1 = this.noise2D(x, z);
    const n2 = this.noise2D(x + 100, z + 100);

    // Create ridges by using absolute value
    const ridge = Math.abs(n1) + Math.abs(n2);
    return Math.pow(ridge, 2) - 1;
  }

  /**
   * Determines terrain type based on height and features
   * Returns blend factors for different terrain textures
   */
  getTerrainType(height: number, x: number, z: number): {
    grass: number;
    dirt: number;
    stone: number;
    sand: number;
  } {
    let grass = 0,
      dirt = 0,
      stone = 0,
      sand = 0;

    if (height < 0.5) {
      // Lowlands - mostly lush green grass with a little sand near water
      grass = 0.8;
      sand = 0.2;
    } else if (height < 2) {
      // Rolling hills - rich grass with some dirt paths
      grass = 0.9;
      dirt = 0.1;
    } else if (height < 4) {
      // Higher terrain - grass gives way to dirt and stone
      grass = 0.2;
      dirt = 0.5;
      stone = 0.3;
    } else {
      // Mountains - mostly stone, with specks of dirt
      grass = 0.05;
      stone = 0.8;
      dirt = 0.15;
    }

    // Add variation
    const variation = this.noise2D(x * 0.1, z * 0.1);
    if (variation > 0.3) {
      grass = Math.max(0, grass - 0.1);
      dirt = Math.min(0.5, dirt + 0.1);
    }

    return { grass, dirt, stone, sand };
  }

  /**
   * Get water level threshold
   */
  getWaterLevel(): number {
    return 0.8;
  }

  /**
   * Determine if a position should have vegetation
   */
  shouldHaveVegetation(height: number, x: number, z: number): boolean {
    if (height < 1 || height > 5) return false; // Too low or too high

    const noise = this.noise2D(x * 0.05, z * 0.05);
    return noise > 0.2; // Random distribution
  }
}

export const sharedTerrainGenerator = new AdvancedTerrainGenerator(12345);

/**
 * Generate optimized terrain geometry with proper normals and details
 */
export function generateTerrainGeometry(
  width: number,
  height: number,
  segments: number = 256,
  terrainGen: AdvancedTerrainGenerator
): THREE.BufferGeometry {
  const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
  const positions = geometry.attributes.position as THREE.BufferAttribute;
  
  // Generate heights using terrain generator
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getY(i);
    const terrainHeight = terrainGen.getHeight(x, z);
    positions.setZ(i, terrainHeight);
  }

  positions.needsUpdate = true;
  geometry.computeVertexNormals();

  return geometry;
}
