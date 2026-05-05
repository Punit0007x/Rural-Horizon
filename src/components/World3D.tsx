import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Stars, PerspectiveCamera, Html, Environment } from "@react-three/drei";
import * as THREE from "three";

import Terrain from "./world/Terrain";
import Grass from "./world/Grass";
import Trees from "./world/Trees";
import Rocks from "./world/Rocks";
import Flowers from "./world/Flowers";
import Butterflies from "./world/Butterflies";
import Roads from "./world/Roads";
import Building, { BuildingData } from "./world/Building";
import NPC, { NPCData } from "./world/NPC";
import EnvironmentProps from "./world/EnvironmentProps";
import CameraController from "./world/CameraController";
import PostProcessingEffects from "./world/PostProcessingEffects";
// import AtmosphericParticles from "./world/AtmosphericParticles";
import { BUILDINGS, NPCS, VILLAGES } from "./world/VillageData";

import HUD from "./ui/HUD";
import BuildingInterior from "./ui/BuildingInterior";
import NPCChat from "./ui/NPCChat";
import SkillMap from "./ui/SkillMap";

const World3D = () => {
  const [hoveredBuilding, setHoveredBuilding] = useState<BuildingData | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingData | null>(null);
  const [selectedNPC, setSelectedNPC] = useState<NPCData | null>(null);
  const [showSkillMap, setShowSkillMap] = useState(false);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number] | null>(null);
  const [villageView, setVillageView] = useState<{
    buildings: Array<{ position: [number, number, number] }>;
    npcPosition?: [number, number, number];
  } | null>(null);

  // Mobile detection and performance settings
  const [isMobile, setIsMobile] = useState(false);
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                    window.innerWidth < 768 ||
                    'ontouchstart' in window;
      setIsMobile(mobile);

      // Lower pixel ratio on mobile for better performance
      const dpr = mobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
      setDevicePixelRatio(dpr);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hasOverlay = !!selectedBuilding || !!selectedNPC || showSkillMap;

  const handleBuildingClick = (data: BuildingData) => {
    // Find all buildings in this village
    const villageBuildings = BUILDINGS.filter(b => b.village === data.village);
    // Find NPC for this village
    const villageNPC = NPCS.find(n => n.village === data.village);

    setVillageView({
      buildings: villageBuildings.map(b => ({ position: b.position })),
      npcPosition: villageNPC ? villageNPC.position : undefined,
    });

    setTimeout(() => setSelectedBuilding(data), 1200);
  };

  const handleVillageClick = (villageName: string) => {
    // Find all buildings in this village
    const villageBuildings = BUILDINGS.filter(b => b.village === villageName);
    // Find NPC for this village
    const villageNPC = NPCS.find(n => n.village === villageName);

    setVillageView({
      buildings: villageBuildings.map(b => ({ position: b.position })),
      npcPosition: villageNPC ? villageNPC.position : undefined,
    });
  };

  const handleNPCInteract = (data: NPCData) => {
    setSelectedNPC(data);
  };

  const handleClosePanel = () => {
    setSelectedBuilding(null);
    setSelectedNPC(null);
    setCameraTarget(null);
    setVillageView(null);
  };

  return (
    <div className="w-screen h-screen" style={{ background: "hsl(var(--deep-charcoal))" }}>
      <Canvas
        shadows={isMobile ? false : { type: "basic", mapSize: [512, 512], radius: 1 }}
        style={{ touchAction: 'none' }} // Enable touch events on mobile
        onCreated={(state) => {
          console.log("Canvas created", state);
          // Ensure WebGL is available
          if (!state.gl) {
            console.error("WebGL context not available");
          }
        }}
        onContextLost={(e) => {
          console.error("WebGL context lost", e);
        }}
        gl={{
          antialias: !isMobile, // Disable antialiasing on mobile for performance
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [50, 40, 60], fov: 60, near: 0.1, far: 1000 }}
        dpr={devicePixelRatio}
      >
        <Suspense fallback={<Html center><div className="text-white">Loading 3D scene...</div></Html>}>
          {/* Enhanced Lighting Setup */}
          <PerspectiveCamera makeDefault position={[50, 40, 60]} fov={60} near={0.1} far={1000} />

          <Sky
            distance={450000}
            sunPosition={[120, 12, -80]}
            inclination={0.18}
            azimuth={0.22}
            rayleigh={0.35}
            turbidity={0.35}
            mieCoefficient={0.005}
            mieDirectionalG={0.75}
          />

          <Environment preset="sunset" background={false} blur={0.3} />

          <Stars
            radius={300}
            depth={100}
            count={isMobile ? 200 : 3000}
            factor={4}
            saturation={0.45}
            fade
          />

          {/* Warm golden-hour fog - disabled on mobile for performance */}
          {!isMobile && <fog attach="fog" args={["#FFE5B0", 120, 420]} />}

          {/* Golden-hour sun light - CARTOON STYLE */}
          <directionalLight
            position={[120, 12, -80]}
            intensity={isMobile ? 0.8 : 1.2} // Reduced intensity on mobile
            color="#FFE4B5" // Warmer, more saturated light
            castShadow={!isMobile} // Disable shadows on mobile
            shadow-mapSize={isMobile ? [256, 256] : [1024, 1024]} // Smaller shadow maps on mobile
            shadow-camera-left={-80}
            shadow-camera-right={80}
            shadow-camera-top={80}
            shadow-camera-bottom={-80}
            shadow-camera-far={250}
            shadow-bias={-0.0001}
          />

          {/* Warm cartoon ambient fill */}
          <ambientLight intensity={isMobile ? 0.4 : 0.6} color="#FFF8DC" />

          {/* Cartoon hemisphere light - disabled on mobile */}
          {!isMobile && <hemisphereLight
            args={["#FFE4B5", "#98FB98", 0.4]} // Warmer sky, greener ground
            position={[0, 50, 0]}
          />}

          {/* Point lights for building glow - disabled on mobile for performance */}
          {!isMobile && <pointLight
            position={[0, 30, 0]}
            intensity={0.15}
            color="#FFFF99"
            distance={400}
          />}

          <Terrain />
          <Grass />
          <Trees />
          <Rocks />
          {!isMobile && <Flowers />}
          {!isMobile && <Butterflies />}
          <Roads />
          <EnvironmentProps />

          {BUILDINGS.map((b) => (
            <Building
              key={b.id}
              data={b}
              onHover={setHoveredBuilding}
              onClick={handleBuildingClick}
              showLabel={!hasOverlay}
            />
          ))}

          {NPCS.map((n) => (
            <NPC key={n.id} data={n} onInteract={handleNPCInteract} />
          ))}

          {/* Huge floating village labels */}
          {VILLAGES.map((village) => (
            <Html
              key={village.name}
              position={[village.center[0], 25, village.center[2]]}
              center
              distanceFactor={20}
              occlude={false}
              style={{
                pointerEvents: 'auto',
                userSelect: 'none',
              }}
            >
              <div
                className="text-white font-black text-8xl px-8 py-4 rounded-2xl shadow-2xl cursor-pointer select-none animate-pulse"
                style={{
                  background: `linear-gradient(135deg, ${village.color}20, ${village.color}40)`,
                  border: `4px solid ${village.color}`,
                  textShadow: `0 0 20px ${village.color}, 0 0 40px ${village.color}, 0 0 60px ${village.color}`,
                  transform: 'translateY(-50%)',
                  animation: 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate',
                  minWidth: '400px',
                  textAlign: 'center',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
                onClick={() => handleVillageClick(village.name)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                  e.currentTarget.style.textShadow = `0 0 30px ${village.color}, 0 0 60px ${village.color}, 0 0 90px ${village.color}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                  e.currentTarget.style.textShadow = `0 0 20px ${village.color}, 0 0 40px ${village.color}, 0 0 60px ${village.color}`;
                }}
              >
                {village.name}
              </div>
            </Html>
          ))}

          <CameraController
            targetPosition={cameraTarget}
            villageView={villageView}
            onArrived={() => {}}
            enabled={!hasOverlay}
          />

          {/* Post-processing effects for enhanced visuals - Mobile optimized */}
          <PostProcessingEffects
            bloomIntensity={isMobile ? 0.1 : 0.8}
            dofFocusDistance={80}
            dofFocusRange={150}
            vignetteIntensity={isMobile ? 0.05 : 0.15}
            brightness={-0.05}
            contrast={0.05}
            enableBloom={false} // Disable bloom on mobile for performance
            enableDOF={false}
            enableVignette={false} // Disable vignette on mobile
            enableChromaticAberration={false} // Disable chromatic aberration on mobile
            chromaticAberrationOffset={[0.001, 0.001]}
            enableFilmGrain={false} // Disable film grain on mobile
            filmGrainOpacity={0.05}
            multisampling={0} // Disable multisampling on mobile
          />

          {/* Atmospheric particles for magical ambiance */}
          {/* <AtmosphericParticles /> */}
        </Suspense>
      </Canvas>

      {!hasOverlay && (
        <HUD
          hoveredBuilding={hoveredBuilding}
          onOpenSkillMap={() => setShowSkillMap(true)}
        />
      )}

      {selectedBuilding && (
        <BuildingInterior building={selectedBuilding} onClose={handleClosePanel} />
      )}

      {selectedNPC && (
        <NPCChat npc={selectedNPC} onClose={handleClosePanel} />
      )}

      {showSkillMap && (
        <SkillMap onClose={() => setShowSkillMap(false)} />
      )}
    </div>
  );
};

export default World3D;
