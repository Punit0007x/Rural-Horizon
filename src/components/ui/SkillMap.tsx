import { useState } from "react";
import { SKILL_DOMAINS } from "../world/VillageData";

interface SkillMapProps {
  onClose: () => void;
}

const SkillMap = ({ onClose }: SkillMapProps) => {
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        style={{ background: "hsla(225, 12%, 4%, 0.85)", backdropFilter: "blur(8px)" }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-4 animate-sunrise">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2 text-glow-gold">
            Skill Constellation
          </h1>
          <p className="text-muted-foreground font-sans">Your roadmap to the future</p>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 text-muted-foreground hover:text-foreground text-2xl p-2"
        >
          ✕
        </button>

        {/* Constellation */}
        <div className="relative flex justify-center">
          <svg viewBox="0 0 600 400" className="w-full max-h-[50vh]">
            {/* Connection lines */}
            {SKILL_DOMAINS.map((domain, i) => {
              const angle = (i / SKILL_DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
              const cx = 300 + Math.cos(angle) * 150;
              const cy = 200 + Math.sin(angle) * 120;
              return (
                <line
                  key={`line-${i}`}
                  x1={300} y1={200}
                  x2={cx} y2={cy}
                  stroke={domain.color}
                  strokeWidth="1"
                  opacity="0.3"
                />
              );
            })}

            {/* Center hub */}
            <circle cx={300} cy={200} r={20} fill="#F2BB05" opacity={0.3} />
            <circle cx={300} cy={200} r={8} fill="#F2BB05" />
            <text x={300} y={235} textAnchor="middle" fill="#F2BB05" fontSize="10" fontFamily="Geist, sans-serif">
              SkillVerse
            </text>

            {/* Domain nodes */}
            {SKILL_DOMAINS.map((domain, i) => {
              const angle = (i / SKILL_DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
              const cx = 300 + Math.cos(angle) * 150;
              const cy = 200 + Math.sin(angle) * 120;
              const isSelected = selectedDomain === i;

              return (
                <g
                  key={i}
                  onClick={() => { setSelectedDomain(isSelected ? null : i); setSelectedSkill(null); }}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={cx} cy={cy}
                    r={isSelected ? 30 : 18}
                    fill={`${domain.color}33`}
                    stroke={domain.color}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                  <circle cx={cx} cy={cy} r={6} fill={domain.color} />
                  <text
                    x={cx} y={cy + (isSelected ? 45 : 30)}
                    textAnchor="middle"
                    fill={domain.color}
                    fontSize="11"
                    fontFamily="Geist, sans-serif"
                  >
                    {domain.name}
                  </text>

                  {/* Skill sub-nodes */}
                  {isSelected && domain.skills.map((skill, j) => {
                    const subAngle = angle + ((j - 1.5) / 4) * 1.2;
                    const sx = cx + Math.cos(subAngle) * 60;
                    const sy = cy + Math.sin(subAngle) * 50;
                    return (
                      <g key={j} onClick={(e) => { e.stopPropagation(); setSelectedSkill(selectedSkill === j ? null : j); }} style={{ cursor: "pointer" }}>
                        <line x1={cx} y1={cy} x2={sx} y2={sy} stroke={domain.color} strokeWidth="0.5" opacity="0.5" />
                        <circle cx={sx} cy={sy} r={selectedSkill === j ? 12 : 8} fill={`${domain.color}44`} stroke={domain.color} strokeWidth="1" />
                        <circle cx={sx} cy={sy} r={3} fill={domain.color} />
                        <text x={sx} y={sy + 20} textAnchor="middle" fill="hsl(40, 30%, 80%)" fontSize="8" fontFamily="Geist, sans-serif">
                          {skill.name}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Skill detail panel */}
        {selectedDomain !== null && selectedSkill !== null && (
          <div className="holographic-panel rounded-lg p-6 mt-4 animate-sunrise">
            {(() => {
              const skill = SKILL_DOMAINS[selectedDomain].skills[selectedSkill];
              const domain = SKILL_DOMAINS[selectedDomain];
              return (
                <div>
                  <h3 className="font-serif text-2xl mb-1" style={{ color: domain.color }}>{skill.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Estimated duration: <span style={{ color: domain.color }}>{skill.duration}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Recommended Resources</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.resources.map((r, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{ background: `${domain.color}22`, border: `1px solid ${domain.color}44`, color: domain.color }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillMap;
