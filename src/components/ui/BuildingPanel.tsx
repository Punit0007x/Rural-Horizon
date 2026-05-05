import { BuildingData } from "../world/Building";
import HolographicPanel from "./HolographicPanel";

interface BuildingPanelProps {
  building: BuildingData;
  onClose: () => void;
}

const LEARNING_RESOURCES = [
  { name: "Skill India Digital Hub", url: "https://www.skillindiadigital.gov.in/" },
  { name: "NSDC eSkill India", url: "https://eskillindia.org/" },
  { name: "freeCodeCamp", url: "https://www.freecodecamp.org/" },
  { name: "Google Digital Garage", url: "https://learndigital.withgoogle.com/" },
  { name: "Khan Academy", url: "https://www.khanacademy.org/" },
  { name: "Coursera", url: "https://www.coursera.org/" },
];

const ROOMS = [
  { name: "Career Introduction", icon: "🎯", desc: "Learn about this career path, job roles, and daily responsibilities." },
  { name: "Skill Roadmap", icon: "🗺️", desc: "Step-by-step guide from beginner to professional." },
  { name: "Free Learning Resources", icon: "📚", desc: "Access free courses and training materials." },
  { name: "Local Opportunities", icon: "📍", desc: "Find nearby training centers and job openings." },
  { name: "Future Demand Board", icon: "📊", desc: "See career growth trends and salary expectations." },
];

const BuildingPanel = ({ building, onClose }: BuildingPanelProps) => {
  return (
    <HolographicPanel
      title={building.name}
      subtitle={`${building.village} Village`}
      onClose={onClose}
      accentColor={building.glowColor}
    >
      {/* Description */}
      <p className="text-sm text-muted-foreground">{building.description}</p>

      {/* Rooms */}
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">Explore Rooms</p>
        <div className="space-y-2">
          {ROOMS.map((room, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-md transition-all hover:scale-[1.01] cursor-pointer"
              style={{
                background: "hsla(30, 12%, 15%, 0.5)",
                border: `1px solid ${building.glowColor}22`,
              }}
            >
              <span className="text-xl">{room.icon}</span>
              <div>
                <p className="text-sm font-medium" style={{ color: building.glowColor }}>{room.name}</p>
                <p className="text-xs text-muted-foreground">{room.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">Free Resources</p>
        <div className="grid grid-cols-2 gap-2">
          {LEARNING_RESOURCES.map((r, i) => (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-2 rounded-md text-center transition-all hover:scale-[1.02]"
              style={{
                background: `${building.glowColor}15`,
                border: `1px solid ${building.glowColor}33`,
                color: building.glowColor,
              }}
            >
              {r.name}
            </a>
          ))}
        </div>
      </div>
    </HolographicPanel>
  );
};

export default BuildingPanel;
