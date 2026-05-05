import { useState } from "react";
import { BuildingData } from "../world/Building";
import { BUILDING_INTERIORS } from "./BuildingInteriorData";

interface BuildingInteriorProps {
  building: BuildingData;
  onClose: () => void;
}

const LEARNING_RESOURCES = [
  { name: "Skill India Digital Hub", url: "https://www.skillindiadigital.gov.in/", icon: "🇮🇳" },
  { name: "NSDC eSkill India", url: "https://eskillindia.org/", icon: "📜" },
  { name: "freeCodeCamp", url: "https://www.freecodecamp.org/", icon: "💻" },
  { name: "Google Digital Garage", url: "https://learndigital.withgoogle.com/", icon: "🔍" },
  { name: "Khan Academy", url: "https://www.khanacademy.org/", icon: "🎓" },
  { name: "Coursera", url: "https://www.coursera.org/", icon: "📖" },
  { name: "Startup India", url: "https://www.startupindia.gov.in/", icon: "🚀" },
  { name: "YouTube Tutorials", url: "https://youtube.com", icon: "▶️" },
];

const BuildingInterior = ({ building, onClose }: BuildingInteriorProps) => {
  const [activeRoom, setActiveRoom] = useState(0);
  const interior = BUILDING_INTERIORS[building.id] || BUILDING_INTERIORS.default;

  const rooms = [
    { name: "Career Introduction", icon: "🎯" },
    { name: "Skill Roadmap", icon: "🗺️" },
    { name: "Learning Resources", icon: "📚" },
    { name: "Opportunities", icon: "📍" },
    { name: "Future Demand", icon: "📊" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" style={{ background: "hsla(225, 12%, 4%, 0.92)", backdropFilter: "blur(12px)" }} />

      {/* Header bar */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b"
        style={{ borderColor: `${building.glowColor}33`, background: "hsla(30, 12%, 8%, 0.95)" }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-sans flex items-center gap-2"
          >
            ← Exit Building
          </button>
          <div className="h-6 w-px" style={{ background: `${building.glowColor}33` }} />
          <div>
            <h1 className="font-serif text-xl" style={{ color: building.glowColor }}>{building.name}</h1>
            <p className="text-[10px] text-muted-foreground font-sans uppercase tracking-widest">{building.village} Village</p>
          </div>
        </div>
      </div>

      {/* Room tabs */}
      <div className="flex gap-1 px-6 py-3 overflow-x-auto" style={{ background: "hsla(30, 12%, 6%, 0.95)" }}>
        {rooms.map((room, i) => (
          <button
            key={i}
            onClick={() => setActiveRoom(i)}
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-sans whitespace-nowrap transition-all"
            style={{
              background: activeRoom === i ? `${building.glowColor}22` : "transparent",
              border: `1px solid ${activeRoom === i ? building.glowColor + "55" : "transparent"}`,
              color: activeRoom === i ? building.glowColor : "hsl(40, 20%, 60%)",
            }}
          >
            <span>{room.icon}</span>
            {room.name}
          </button>
        ))}
      </div>

      {/* Room content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {activeRoom === 0 && <CareerIntroRoom building={building} interior={interior} />}
        {activeRoom === 1 && <SkillRoadmapRoom building={building} interior={interior} />}
        {activeRoom === 2 && <LearningResourcesRoom building={building} resources={LEARNING_RESOURCES} />}
        {activeRoom === 3 && <OpportunitiesRoom building={building} interior={interior} />}
        {activeRoom === 4 && <FutureDemandRoom building={building} interior={interior} />}
      </div>
    </div>
  );
};

/* Room 1: Career Introduction */
const CareerIntroRoom = ({ building, interior }: { building: BuildingData; interior: any }) => (
  <div className="max-w-3xl mx-auto space-y-6 animate-sunrise">
    {/* Animated wall panel */}
    <div
      className="rounded-xl p-8 relative overflow-hidden"
      style={{ background: "hsla(30, 12%, 12%, 0.8)", border: `1px solid ${building.glowColor}22` }}
    >
      {/* Animated glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{
          background: `linear-gradient(90deg, transparent, ${building.glowColor}, transparent)`,
          animation: "shimmer 3s ease-in-out infinite",
        }}
      />
      <h2 className="font-serif text-3xl mb-4" style={{ color: building.glowColor }}>{interior.title}</h2>
      <p className="text-muted-foreground font-sans leading-relaxed">{interior.description}</p>
    </div>

    {/* Info cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {interior.highlights.map((h: any, i: number) => (
        <div
          key={i}
          className="rounded-lg p-5 transition-all hover:scale-[1.02] cursor-default"
          style={{
            background: "hsla(30, 12%, 12%, 0.6)",
            border: `1px solid ${building.glowColor}22`,
            animationDelay: `${i * 150}ms`,
          }}
        >
          <div className="text-3xl mb-3">{h.icon}</div>
          <p className="font-serif text-lg mb-1" style={{ color: building.glowColor }}>{h.title}</p>
          <p className="text-xs text-muted-foreground font-sans">{h.desc}</p>
        </div>
      ))}
    </div>

    {/* Salary info panel */}
    <div
      className="rounded-lg p-6 flex items-center justify-between"
      style={{ background: `${building.glowColor}11`, border: `1px solid ${building.glowColor}22` }}
    >
      <div>
        <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest mb-1">Average Starting Salary</p>
        <p className="font-serif text-2xl" style={{ color: building.glowColor }}>{interior.salary}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest mb-1">Job Growth</p>
        <p className="font-serif text-2xl" style={{ color: "#4ADE80" }}>{interior.growth}</p>
      </div>
    </div>
  </div>
);

/* Room 2: Skill Roadmap */
const SkillRoadmapRoom = ({ building, interior }: { building: BuildingData; interior: any }) => (
  <div className="max-w-3xl mx-auto animate-sunrise">
    <h2 className="font-serif text-2xl mb-6 text-center" style={{ color: building.glowColor }}>
      Your Journey: {interior.title}
    </h2>

    {/* Glowing pathway */}
    <div className="relative">
      {/* Vertical glow line */}
      <div
        className="absolute left-6 top-0 bottom-0 w-0.5"
        style={{
          background: `linear-gradient(180deg, ${building.glowColor}88, ${building.glowColor}22)`,
          boxShadow: `0 0 15px ${building.glowColor}44`,
        }}
      />

      <div className="space-y-6 pl-16">
        {interior.roadmap.map((step: any, i: number) => (
          <div
            key={i}
            className="relative rounded-lg p-5 transition-all hover:translate-x-1"
            style={{
              background: "hsla(30, 12%, 12%, 0.7)",
              border: `1px solid ${building.glowColor}22`,
              animation: `sunrise-glow 0.5s ease-out ${i * 200}ms both`,
            }}
          >
            {/* Node dot */}
            <div
              className="absolute -left-[2.85rem] top-6 w-4 h-4 rounded-full border-2"
              style={{
                borderColor: building.glowColor,
                background: i === 0 ? building.glowColor : "hsla(30, 12%, 8%, 1)",
                boxShadow: `0 0 10px ${building.glowColor}66`,
              }}
            />
            {/* Step number */}
            <div className="flex items-start gap-3">
              <span
                className="text-xs font-sans font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ background: `${building.glowColor}22`, color: building.glowColor }}
              >
                Step {i + 1}
              </span>
              <span className="text-xs text-muted-foreground font-sans">{step.duration}</span>
            </div>
            <h3 className="font-serif text-lg mt-2" style={{ color: "hsl(40, 30%, 90%)" }}>{step.title}</h3>
            <p className="text-xs text-muted-foreground font-sans mt-1">{step.desc}</p>
            {/* Skills tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {step.skills.map((skill: string, j: number) => (
                <span
                  key={j}
                  className="text-[10px] px-2 py-0.5 rounded-full font-sans"
                  style={{ background: `${building.glowColor}15`, border: `1px solid ${building.glowColor}33`, color: building.glowColor }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* Room 3: Learning Resources */
const LearningResourcesRoom = ({ building, resources }: { building: BuildingData; resources: any[] }) => (
  <div className="max-w-3xl mx-auto animate-sunrise">
    <h2 className="font-serif text-2xl mb-2 text-center" style={{ color: building.glowColor }}>Free Learning Resources</h2>
    <p className="text-center text-sm text-muted-foreground mb-8 font-sans">All resources are completely free to access</p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {resources.map((r, i) => (
        <a
          key={i}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl p-5 flex items-center gap-4 transition-all hover:scale-[1.02] hover:translate-y-[-2px]"
          style={{
            background: "hsla(30, 12%, 12%, 0.7)",
            border: `1px solid ${building.glowColor}22`,
            animation: `sunrise-glow 0.4s ease-out ${i * 100}ms both`,
          }}
        >
          <span className="text-3xl">{r.icon}</span>
          <div className="flex-1">
            <p className="font-serif text-base group-hover:text-foreground transition-colors" style={{ color: building.glowColor }}>
              {r.name}
            </p>
            <p className="text-[10px] text-muted-foreground font-sans mt-0.5">Free • Open Access</p>
          </div>
          <span className="text-muted-foreground group-hover:text-foreground transition-colors text-lg">→</span>
        </a>
      ))}
    </div>
  </div>
);

/* Room 4: Opportunities */
const OpportunitiesRoom = ({ building, interior }: { building: BuildingData; interior: any }) => (
  <div className="max-w-3xl mx-auto animate-sunrise space-y-6">
    <h2 className="font-serif text-2xl text-center" style={{ color: building.glowColor }}>Nearby Opportunities</h2>

    {/* Map placeholder */}
    <div
      className="rounded-xl h-48 flex items-center justify-center relative overflow-hidden"
      style={{ background: "hsla(30, 12%, 10%, 0.8)", border: `1px solid ${building.glowColor}22` }}
    >
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 30% 40%, ${building.glowColor} 1px, transparent 1px), radial-gradient(circle at 70% 60%, ${building.glowColor} 1px, transparent 1px), radial-gradient(circle at 50% 30%, ${building.glowColor} 1px, transparent 1px)`,
        backgroundSize: "60px 60px, 80px 80px, 100px 100px",
      }} />
      <div className="text-center z-10">
        <p className="font-serif text-lg" style={{ color: building.glowColor }}>📍 Training Centers Near You</p>
        <p className="text-xs text-muted-foreground font-sans mt-1">Connecting to local opportunities database...</p>
      </div>
    </div>

    {/* Opportunity cards */}
    <div className="space-y-3">
      {interior.opportunities.map((opp: any, i: number) => (
        <div
          key={i}
          className="rounded-lg p-4 flex items-center justify-between"
          style={{ background: "hsla(30, 12%, 12%, 0.6)", border: `1px solid ${building.glowColor}15` }}
        >
          <div>
            <p className="font-serif text-sm" style={{ color: "hsl(40, 30%, 90%)" }}>{opp.title}</p>
            <p className="text-[10px] text-muted-foreground font-sans">{opp.location} • {opp.type}</p>
          </div>
          <span
            className="text-[10px] px-3 py-1 rounded-full font-sans"
            style={{ background: `${building.glowColor}22`, color: building.glowColor }}
          >
            {opp.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

/* Room 5: Future Demand */
const FutureDemandRoom = ({ building, interior }: { building: BuildingData; interior: any }) => (
  <div className="max-w-3xl mx-auto animate-sunrise space-y-6">
    <h2 className="font-serif text-2xl text-center" style={{ color: building.glowColor }}>Future Demand & Growth</h2>

    {/* Animated bar chart */}
    <div
      className="rounded-xl p-6"
      style={{ background: "hsla(30, 12%, 12%, 0.8)", border: `1px solid ${building.glowColor}22` }}
    >
      <p className="text-xs text-muted-foreground font-sans uppercase tracking-widest mb-4">Projected Job Growth (Next 5 Years)</p>
      <div className="space-y-4">
        {interior.demandData.map((d: any, i: number) => (
          <div key={i}>
            <div className="flex justify-between text-xs font-sans mb-1">
              <span style={{ color: "hsl(40, 30%, 80%)" }}>{d.label}</span>
              <span style={{ color: building.glowColor }}>{d.value}%</span>
            </div>
            <div className="h-3 rounded-full overflow-hidden" style={{ background: "hsla(30, 12%, 18%, 0.8)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${d.value}%`,
                  background: `linear-gradient(90deg, ${building.glowColor}88, ${building.glowColor})`,
                  boxShadow: `0 0 10px ${building.glowColor}44`,
                  animation: `road-form 1.5s cubic-bezier(0.23, 1, 0.32, 1) ${i * 200}ms both`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {interior.stats.map((stat: any, i: number) => (
        <div
          key={i}
          className="rounded-lg p-4 text-center"
          style={{ background: "hsla(30, 12%, 12%, 0.6)", border: `1px solid ${building.glowColor}15` }}
        >
          <p className="font-serif text-2xl mb-1" style={{ color: building.glowColor }}>{stat.value}</p>
          <p className="text-[10px] text-muted-foreground font-sans">{stat.label}</p>
        </div>
      ))}
    </div>

    {/* Motivational quote */}
    <div
      className="rounded-xl p-6 text-center"
      style={{ background: `${building.glowColor}08`, border: `1px solid ${building.glowColor}22` }}
    >
      <p className="font-serif text-lg italic" style={{ color: "hsl(40, 30%, 85%)" }}>
        "{interior.quote}"
      </p>
      <p className="text-xs text-muted-foreground font-sans mt-2">— {interior.quoteAuthor}</p>
    </div>
  </div>
);

export default BuildingInterior;
