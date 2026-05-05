import { ReactNode } from "react";

interface HolographicPanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onClose: () => void;
  accentColor?: string;
}

const HolographicPanel = ({ title, subtitle, children, onClose, accentColor = "hsl(var(--accent))" }: HolographicPanelProps) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div
        className="holographic-panel rounded-lg p-8 max-w-lg w-full mx-4 pointer-events-auto animate-sunrise"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2
              className="font-serif text-3xl mb-1"
              style={{ color: accentColor }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-muted-foreground font-sans">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors text-2xl leading-none p-2"
          >
            ✕
          </button>
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

        {/* Content */}
        <div className="font-sans text-foreground space-y-4">
          {children}
        </div>
      </div>

      {/* Backdrop */}
      <div
        className="fixed inset-0 -z-10 pointer-events-auto"
        onClick={onClose}
        style={{ background: "hsla(225, 12%, 8%, 0.5)", backdropFilter: "blur(4px)" }}
      />
    </div>
  );
};

export default HolographicPanel;
