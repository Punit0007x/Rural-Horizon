import { useState } from "react";
import { NPCData } from "../world/NPC";
import HolographicPanel from "./HolographicPanel";

interface NPCChatProps {
  npc: NPCData;
  onClose: () => void;
}

const RESPONSES: Record<string, string[]> = {
  Technology: [
    "The tech industry is booming! India has over 5 million software developers. You could be next.",
    "Start with free resources like freeCodeCamp. Many successful developers are self-taught from villages like yours.",
    "Data science, AI, cybersecurity — these fields have huge demand and great salaries.",
  ],
  Healthcare: [
    "India needs 2 million more healthcare workers. Your service can save lives.",
    "Nursing, pharmacy, lab technology — all have excellent job security and growth.",
    "Many government schemes provide free or subsidized medical training. Check the Panchayat center!",
  ],
  Agriculture: [
    "Modern farming with drones and AI can increase yields by 30%. The future farmer is a tech farmer.",
    "Organic farming is growing at 25% per year. There's huge export demand.",
    "Agri-entrepreneurs are building billion-rupee businesses from villages. You can too!",
  ],
  "Skilled Trades": [
    "Electricians and solar technicians earn ₹30,000-60,000 per month. High demand, great income!",
    "The solar industry alone will create 1 million jobs in the next 5 years.",
    "Skilled trade workers are the backbone of India's infrastructure growth.",
  ],
  Business: [
    "Startup India has funded over 50,000 startups. Many started in small towns!",
    "E-commerce is making rural entrepreneurs reach customers across India.",
    "Financial literacy is the key to building wealth. Start learning today!",
  ],
  Hub: [
    "The Panchayat center connects you to government scholarships and training programs.",
    "Skill India has trained over 10 million youth. Free certifications are available.",
    "Education loans, subsidies, and women entrepreneurship schemes — all accessible from here.",
  ],
};

const NPCChat = ({ npc, onClose }: NPCChatProps) => {
  const [messages, setMessages] = useState<{ role: "npc" | "user"; text: string }[]>([
    { role: "npc", text: npc.greeting },
  ]);

  const quickQuestions = [
    "What careers can I explore?",
    "How do I get started?",
    "What free resources are available?",
    "Tell me about job opportunities",
  ];

  const handleQuestion = (question: string) => {
    const responses = RESPONSES[npc.village] || RESPONSES.Hub;
    const response = responses[Math.floor(Math.random() * responses.length)];
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "npc", text: response },
    ]);
  };

  return (
    <HolographicPanel
      title={npc.name}
      subtitle={`${npc.role} • ${npc.village} Village`}
      onClose={onClose}
      accentColor={npc.color}
    >
      {/* Chat messages */}
      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className="px-4 py-2 rounded-lg max-w-[85%] text-sm"
              style={{
                background:
                  msg.role === "npc"
                    ? "hsla(30, 12%, 18%, 0.8)"
                    : `${npc.color}22`,
                border: msg.role === "npc" ? "1px solid hsla(30, 12%, 25%, 0.5)" : `1px solid ${npc.color}44`,
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick questions */}
      <div className="mt-4">
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">Ask a question</p>
        <div className="grid grid-cols-2 gap-2">
          {quickQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleQuestion(q)}
              className="text-left text-xs px-3 py-2 rounded-md transition-all hover:scale-[1.02]"
              style={{
                background: "hsla(30, 12%, 15%, 0.6)",
                border: `1px solid ${npc.color}33`,
                color: "hsl(40, 30%, 80%)",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </HolographicPanel>
  );
};

export default NPCChat;
