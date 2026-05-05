import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"sunrise" | "text" | "ready">("sunrise");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(100, p + 2));
    }, 30);

    const completeTimeout = setTimeout(() => {
      setPhase("ready");
      onComplete();
    }, 1600);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  useEffect(() => {
    if (progress > 15) setPhase("text");
  }, [progress]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-1000 ${
        phase === "ready" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(180deg, hsl(220 30% 12%) 0%, hsl(25 40% 18%) 40%, hsl(42 60% 30%) 70%, hsl(42 80% 50%) 100%)",
      }}
    >
      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              background: "hsl(40 30% 90%)",
              opacity: Math.max(0, 1 - progress / 40),
              transition: "opacity 2s",
            }}
          />
        ))}
      </div>

      {/* Sun */}
      <div
        className="absolute rounded-full"
        style={{
          width: 120,
          height: 120,
          background:
            "radial-gradient(circle, hsl(42 100% 70%) 0%, hsl(25 90% 55%) 50%, transparent 70%)",
          left: "50%",
          bottom: `${20 + progress * 0.3}%`,
          transform: "translateX(-50%)",
          boxShadow: "0 0 100px 40px hsla(42, 90%, 50%, 0.3)",
          transition: "bottom 0.5s ease-out",
        }}
      />

      {/* Fog */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 50%, hsla(30, 20%, 60%, 0.4) 100%)",
          opacity: Math.max(0, 1 - progress / 60),
          transition: "opacity 1s",
        }}
      />

      {/* Landscape silhouette */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%]">
        <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0,200 L0,120 Q100,80 200,110 Q300,60 400,90 Q500,40 600,80 Q700,50 800,100 Q900,70 1000,90 Q1100,60 1200,100 L1200,200 Z"
            fill="hsl(30 15% 10%)"
          />
          <path
            d="M0,200 L0,150 Q150,120 300,140 Q450,110 600,130 Q750,100 900,140 Q1050,120 1200,135 L1200,200 Z"
            fill="hsl(30 15% 8%)"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="relative z-10 text-center px-8">
        {phase !== "sunrise" && (
          <div className="animate-sunrise">
            <h1
              className="font-serif text-5xl md:text-7xl mb-4 tracking-tight"
              style={{ color: "hsl(40 30% 90%)" }}
            >
              Rural SkillVerse
            </h1>
            <p
              className="text-lg md:text-xl font-sans tracking-wide"
              style={{ color: "hsl(40 20% 70%)" }}
            >
              Walk towards your future
            </p>
          </div>
        )}
      </div>

      {/* Road progress bar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[60%] max-w-md">
        <div className="relative h-2 rounded-full overflow-hidden" style={{ background: "hsl(30 15% 15%)" }}>
          <div
            className="absolute inset-y-0 left-0 loading-road rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
          {/* Dashed road markings */}
          <div className="absolute inset-0 flex items-center gap-2 px-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="h-[2px] w-3 rounded-full flex-shrink-0"
                style={{
                  background: "hsl(42 60% 60%)",
                  opacity: (i / 20) * 100 < progress ? 0.6 : 0.1,
                }}
              />
            ))}
          </div>
        </div>
        <p
          className="text-center text-sm mt-3 font-sans tracking-widest uppercase"
          style={{ color: "hsl(40 20% 50%)" }}
        >
          {progress < 100 ? "Preparing your journey..." : "Welcome"}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
