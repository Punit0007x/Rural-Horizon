import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, DepthOfField, Vignette, BrightnessContrast, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

interface PostProcessingEffectsProps {
  bloomIntensity?: number;
  dofFocusDistance?: number;
  dofFocusRange?: number;
  vignetteIntensity?: number;
  brightness?: number;
  contrast?: number;
  enableBloom?: boolean;
  enableDOF?: boolean;
  enableVignette?: boolean;
  enableChromaticAberration?: boolean;
  chromaticAberrationOffset?: [number, number];
  enableFilmGrain?: boolean;
  filmGrainOpacity?: number;
  multisampling?: number;
}

/**
 * Advanced post-processing effects component
 * Provides bloom, depth of field, vignette, and color correction
 */
export const PostProcessingEffects = ({
  bloomIntensity = 1.5,
  dofFocusDistance = 50,
  dofFocusRange = 100,
  vignetteIntensity = 0.3,
  brightness = 0.1,
  contrast = 0.1,
  enableBloom = true,
  enableDOF = false,
  enableVignette = true,
  enableChromaticAberration = true,
  chromaticAberrationOffset = [0.002, 0.002],
  enableFilmGrain = true,
  filmGrainOpacity = 0.1,
  multisampling = 4,
}: PostProcessingEffectsProps) => {
  const { camera } = useThree();

  return (
    <EffectComposer multisampling={multisampling}>
      {enableBloom && (
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.9}
          height={300}
          opacity={1}
          blendFunction={BlendFunction.SCREEN}
        />
      )}

      {enableVignette && (
        <Vignette
          offset={0.5}
          darkness={vignetteIntensity}
          blendFunction={BlendFunction.NORMAL}
        />
      )}

      {enableDOF && (
        <DepthOfField
          focusDistance={dofFocusDistance}
          focalLength={24}
          bokehScale={6}
          height={480}
        />
      )}

      {enableChromaticAberration && (
        <ChromaticAberration
          offset={chromaticAberrationOffset}
          blendFunction={BlendFunction.NORMAL}
        />
      )}

      {enableFilmGrain && (
        <Noise
          premultiply
          blendFunction={BlendFunction.OVERLAY}
          opacity={filmGrainOpacity}
        />
      )}

      <BrightnessContrast
        brightness={brightness}
        contrast={contrast}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
};

export default PostProcessingEffects;
