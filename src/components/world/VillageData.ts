import { BuildingData } from "./Building";
import { NPCData } from "./NPC";

export const VILLAGES = [
  { name: "Technology", center: [0, 0, -60] as [number, number, number], color: "#00F5FF" },
  { name: "Healthcare", center: [55, 0, -20] as [number, number, number], color: "#E11D48" },
  { name: "Agriculture", center: [35, 0, 50] as [number, number, number], color: "#F2BB05" },
  { name: "Skilled Trades", center: [- 35, 0, 50] as [number, number, number], color: "#F97316" },
  { name: "Business", center: [-55, 0, -20] as [number, number, number], color: "#8B5CF6" },
];

export const BUILDINGS: BuildingData[] = [
  // Technology Village - Bright cyan/blue theme
  { id: "tech-1", name: "Software Development Center", village: "Technology", position: [-6, 0, -62], color: "#00FFFF", glowColor: "#00F5FF", width: 5, height: 8, depth: 5, description: "Learn coding, web development, mobile apps, and software engineering." },
  { id: "tech-2", name: "Data Analytics Office", village: "Technology", position: [6, 0, -62], color: "#0080FF", glowColor: "#00F5FF", width: 4, height: 7, depth: 4, description: "Master data science, machine learning, and business intelligence." },
  { id: "tech-3", name: "Robotics Innovation Lab", village: "Technology", position: [0, 0, -70], color: "#00BFFF", glowColor: "#00F5FF", width: 6, height: 6, depth: 5, description: "Explore robotics, IoT, and automation technologies." },
  { id: "tech-4", name: "Cybersecurity Command", village: "Technology", position: [0, 0, -54], color: "#1E90FF", glowColor: "#00F5FF", width: 4, height: 7, depth: 4, description: "Protect digital systems and learn ethical hacking." },

  // Healthcare Village - Bright pink/red theme
  { id: "health-1", name: "Multi-Speciality Hospital", village: "Healthcare", position: [52, 0, -24], color: "#FF1493", glowColor: "#E11D48", width: 6, height: 9, depth: 6, description: "Train as a doctor, nurse, or medical specialist." },
  { id: "health-2", name: "Medical Shop", village: "Healthcare", position: [60, 0, -18], color: "#FF69B4", glowColor: "#E11D48", width: 3, height: 5, depth: 3, description: "Learn pharmacy and pharmaceutical sciences." },
  { id: "health-3", name: "Diagnostic Laboratory", village: "Healthcare", position: [52, 0, -14], color: "#FF6B9D", glowColor: "#E11D48", width: 4, height: 6, depth: 4, description: "Master lab techniques and medical diagnostics." },
  { id: "health-4", name: "Nursing Institute", village: "Healthcare", position: [60, 0, -26], color: "#FFB6C1", glowColor: "#E11D48", width: 5, height: 7, depth: 4, description: "Build a career in nursing and patient care." },

  // Agriculture Village - Bright yellow/green theme
  { id: "agri-1", name: "Smart Farming Center", village: "Agriculture", position: [32, 0, 46], color: "#FFD700", glowColor: "#F2BB05", width: 5, height: 5, depth: 5, description: "Learn modern farming techniques with technology." },
  { id: "agri-2", name: "Greenhouse Complex", village: "Agriculture", position: [40, 0, 52], color: "#32CD32", glowColor: "#F2BB05", width: 6, height: 4, depth: 6, description: "Master greenhouse cultivation and hydroponics." },
  { id: "agri-3", name: "Drone Monitoring Station", village: "Agriculture", position: [32, 0, 56], color: "#ADFF2F", glowColor: "#F2BB05", width: 4, height: 6, depth: 4, description: "Operate agricultural drones for crop monitoring." },
  { id: "agri-4", name: "Organic Farming Hall", village: "Agriculture", position: [40, 0, 44], color: "#00FF00", glowColor: "#F2BB05", width: 5, height: 5, depth: 4, description: "Explore organic and sustainable agriculture." },

  // Skilled Trades Village - Bright orange theme
  { id: "trade-1", name: "Auto Mechanic Garage", village: "Skilled Trades", position: [-38, 0, 46], color: "#FF4500", glowColor: "#F97316", width: 5, height: 5, depth: 6, description: "Learn automobile repair and maintenance." },
  { id: "trade-2", name: "Electrical Workshop", village: "Skilled Trades", position: [-30, 0, 52], color: "#FF6347", glowColor: "#F97316", width: 4, height: 5, depth: 4, description: "Master electrical wiring and installation." },
  { id: "trade-3", name: "Solar Training Shed", village: "Skilled Trades", position: [-38, 0, 56], color: "#FFA500", glowColor: "#F97316", width: 5, height: 4, depth: 5, description: "Install and maintain solar energy systems." },
  { id: "trade-4", name: "Welding Fabrication Unit", village: "Skilled Trades", position: [-30, 0, 44], color: "#FF8C00", glowColor: "#F97316", width: 4, height: 5, depth: 5, description: "Professional welding and metal fabrication." },

  // Business Village - Bright purple theme
  { id: "biz-1", name: "Startup Incubation Office", village: "Business", position: [-58, 0, -24], color: "#DA70D6", glowColor: "#8B5CF6", width: 5, height: 7, depth: 5, description: "Launch your own startup with mentorship." },
  { id: "biz-2", name: "Local Marketplace", village: "Business", position: [-50, 0, -18], color: "#BA55D3", glowColor: "#8B5CF6", width: 6, height: 4, depth: 5, description: "Learn retail, marketing, and customer service." },
  { id: "biz-3", name: "E-Commerce Warehouse", village: "Business", position: [-58, 0, -14], color: "#9932CC", glowColor: "#8B5CF6", width: 5, height: 5, depth: 6, description: "Master online selling and logistics." },
  { id: "biz-4", name: "Financial Literacy Center", village: "Business", position: [-50, 0, -26], color: "#8A2BE2", glowColor: "#8B5CF6", width: 4, height: 6, depth: 4, description: "Understand banking, investments, and finance." },

  // Panchayat Center (Hub) - Bright central building
  { id: "panchayat", name: "Panchayat Center", village: "Hub", position: [0, 0, 0], color: "#FFDAB9", glowColor: "#F2BB05", width: 8, height: 7, depth: 8, description: "Government support: scholarships, Skill India schemes, training subsidies, education loans." },
];

export const NPCS: NPCData[] = [
  { id: "npc-tech", name: "Priya Sharma", role: "Software Engineer", village: "Technology", position: [0, 0, -58], color: "#00F5FF", greeting: "Namaste! I'm Priya, a software engineer. Technology can transform your village and your future. Want to learn about coding careers?" },
  { id: "npc-health", name: "Dr. Rajesh Kumar", role: "Doctor", village: "Healthcare", position: [56, 0, -20], color: "#E11D48", greeting: "Welcome! I'm Dr. Rajesh. Healthcare is one of the most rewarding careers. Let me guide you through medical career paths." },
  { id: "npc-agri", name: "Sunita Devi", role: "Agricultural Scientist", village: "Agriculture", position: [36, 0, 50], color: "#F2BB05", greeting: "Jai Kisan! I'm Sunita. Modern agriculture combines tradition with technology. Shall I show you the future of farming?" },
  { id: "npc-trade", name: "Ramesh Yadav", role: "Master Electrician", village: "Skilled Trades", position: [-34, 0, 50], color: "#F97316", greeting: "Hello! I'm Ramesh. Skilled trades are the backbone of India. Let me show you high-demand technical careers." },
  { id: "npc-biz", name: "Anita Patel", role: "Entrepreneur", village: "Business", position: [-54, 0, -20], color: "#8B5CF6", greeting: "Namaste! I'm Anita, I started my business from a small village. Your entrepreneurial journey can start right here!" },
  { id: "npc-panch", name: "Sarpanch Ji", role: "Village Leader", village: "Hub", position: [4, 0, 4], color: "#F2BB05", greeting: "Welcome to the Panchayat Center! Here you'll find government schemes, scholarships, and support programs for your career journey." },
];

export const SKILL_DOMAINS = [
  {
    name: "Technology",
    color: "#00F5FF",
    skills: [
      { name: "Web Development", duration: "6 months", resources: ["freeCodeCamp", "Google Digital Garage"] },
      { name: "Data Science", duration: "8 months", resources: ["Khan Academy", "Coursera"] },
      { name: "Cybersecurity", duration: "10 months", resources: ["Coursera", "YouTube"] },
      { name: "Mobile App Dev", duration: "6 months", resources: ["freeCodeCamp", "YouTube"] },
    ],
  },
  {
    name: "Healthcare",
    color: "#E11D48",
    skills: [
      { name: "Nursing", duration: "3 years", resources: ["Skill India", "NSDC"] },
      { name: "Pharmacy", duration: "4 years", resources: ["NSDC", "Coursera"] },
      { name: "Lab Technician", duration: "2 years", resources: ["Skill India", "YouTube"] },
      { name: "Paramedic", duration: "1 year", resources: ["NSDC", "Skill India"] },
    ],
  },
  {
    name: "Agriculture",
    color: "#F2BB05",
    skills: [
      { name: "Organic Farming", duration: "3 months", resources: ["Skill India", "YouTube"] },
      { name: "Drone Operation", duration: "2 months", resources: ["NSDC", "YouTube"] },
      { name: "Agri-Business", duration: "6 months", resources: ["Startup India", "Coursera"] },
      { name: "Hydroponics", duration: "3 months", resources: ["YouTube", "Google Digital Garage"] },
    ],
  },
  {
    name: "Skilled Trades",
    color: "#F97316",
    skills: [
      { name: "Electrical Work", duration: "6 months", resources: ["Skill India", "NSDC"] },
      { name: "Solar Installation", duration: "3 months", resources: ["NSDC", "YouTube"] },
      { name: "Welding", duration: "4 months", resources: ["Skill India", "NSDC"] },
      { name: "Auto Mechanics", duration: "6 months", resources: ["NSDC", "YouTube"] },
    ],
  },
  {
    name: "Business",
    color: "#8B5CF6",
    skills: [
      { name: "Entrepreneurship", duration: "4 months", resources: ["Startup India", "Coursera"] },
      { name: "Digital Marketing", duration: "3 months", resources: ["Google Digital Garage", "freeCodeCamp"] },
      { name: "Financial Literacy", duration: "2 months", resources: ["Khan Academy", "YouTube"] },
      { name: "E-Commerce", duration: "3 months", resources: ["Coursera", "Google Digital Garage"] },
    ],
  },
];
