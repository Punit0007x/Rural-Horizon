import { BuildingData } from "../world/Building";
import { useState } from "react";

interface HUDProps {
  hoveredBuilding: BuildingData | null;
  onOpenSkillMap: () => void;
  onVillageClick: (village: string) => void;
}

const HUD = ({ hoveredBuilding, onOpenSkillMap, onVillageClick }: HUDProps) => {
  const [showControls, setShowControls] = useState(true);

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Building hover label - Enhanced and Mobile Responsive */}
      {hoveredBuilding && (
        <div className="absolute top-1/2 left-1/2 sm:translate-x-8 -translate-x-1/2 -translate-y-1/2 animate-sunrise">
          <div className="wooden-board px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg backdrop-blur-sm border border-yellow-600/20 max-w-[200px] sm:max-w-none">
            <p className="font-serif text-sm sm:text-base font-bold" style={{ color: hoveredBuilding.glowColor }}>
              {hoveredBuilding.name}
            </p>
            <p className="text-xs text-muted-foreground font-sans mt-1">
              {hoveredBuilding.village} Village
            </p>
            <p className="text-xs text-muted-foreground/70 font-sans mt-1 sm:mt-2">
              ✦ Tap to explore
            </p>
          </div>
        </div>
      )}

      {/* Top Right Controls - Mobile Responsive */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-auto flex gap-2 sm:gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowControls(!showControls);
          }}
          className="wooden-board px-2 sm:px-3 py-1 sm:py-2 rounded-md font-sans text-xs text-foreground hover:scale-105 transition-transform"
          title="Toggle controls"
        >
          ?
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenSkillMap();
          }}
          className="wooden-board px-3 sm:px-4 py-1 sm:py-2 rounded-md font-sans text-xs sm:text-sm text-foreground hover:scale-105 transition-transform shadow-lg"
        >
          ✦ Skill Map
        </button>
      </div>

      {/* Top Left - Title and Info - Mobile Responsive */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <h1 className="font-serif text-xl sm:text-3xl font-bold text-glow-gold drop-shadow-lg">
          Rural SkillVerse
        </h1>
        <p className="text-xs text-muted-foreground font-sans tracking-widest uppercase mt-1 hidden sm:block">
          🌾 Welcome to Rural SkillVerse
        </p>
        <p className="text-xs text-muted-foreground/60 font-sans mt-1 sm:mt-2 hidden sm:block">
          Navigate the world and unlock your skills
        </p>
      </div>


      {/* Controls Help - Bottom Center - Mobile Responsive */}
      {showControls && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto max-w-[90vw] sm:max-w-none">
          <div className="wooden-board px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-xl backdrop-blur-sm border border-yellow-600/20">
            <p className="text-xs font-bold text-foreground mb-2 sm:mb-3 text-center">Controls</p>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs text-muted-foreground font-mono">
              <div className="hidden sm:block">
                <span className="text-foreground font-bold">🖱️ Drag</span><br />
                Orbit around point
              </div>
              <div className="hidden sm:block">
                <span className="text-foreground font-bold">🖱️ Right Drag</span><br />
                Pan view
              </div>
              <div className="hidden sm:block">
                <span className="text-foreground font-bold">⌨️ WASD</span><br />
                Move around
              </div>
              <div className="hidden sm:block">
                <span className="text-foreground font-bold">🖱️ Scroll</span><br />
                Zoom in/out
              </div>
              {/* Mobile Controls */}
              <div className="sm:hidden">
                <span className="text-foreground font-bold">👆 Drag</span><br />
                Orbit around point
              </div>
              <div className="sm:hidden">
                <span className="text-foreground font-bold">🤏 Pinch</span><br />
                Zoom in/out
              </div>
              <div className="sm:hidden">
                <span className="text-foreground font-bold">👆 Tap</span><br />
                Select buildings
              </div>
              <div className="sm:hidden">
                <span className="text-foreground font-bold">🎯 Touch</span><br />
                Explore villages
              </div>
            </div>
            <p className="text-xs text-muted-foreground/50 mt-2 sm:mt-3 text-center cursor-pointer underline" onClick={() => setShowControls(false)}>
              Hide
            </p>
          </div>
        </div>
      )}

      {/* Quick Stats - Bottom Left - Removed */}
      {/* Achievement Indicator - Bottom Right - Removed */}
    </div>
  );
};

export default HUD;
