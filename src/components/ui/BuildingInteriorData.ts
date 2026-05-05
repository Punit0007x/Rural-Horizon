interface InteriorData {
  title: string;
  description: string;
  highlights: { icon: string; title: string; desc: string }[];
  salary: string;
  growth: string;
  roadmap: { title: string; duration: string; desc: string; skills: string[] }[];
  opportunities: { title: string; location: string; type: string; status: string }[];
  demandData: { label: string; value: number }[];
  stats: { value: string; label: string }[];
  quote: string;
  quoteAuthor: string;
}

const DEFAULT_INTERIOR: InteriorData = {
  title: "Career Exploration",
  description: "Discover exciting career opportunities and build your path to success.",
  highlights: [
    { icon: "💡", title: "High Demand", desc: "Growing industry with increasing opportunities" },
    { icon: "📈", title: "Great Growth", desc: "Strong career progression and salary growth" },
    { icon: "🌍", title: "Global Scope", desc: "Work opportunities across India and worldwide" },
  ],
  salary: "₹3-6 LPA",
  growth: "+25%",
  roadmap: [
    { title: "Foundation Skills", duration: "2-3 months", desc: "Learn the basics and build a strong foundation.", skills: ["Basics", "Theory", "Practice"] },
    { title: "Intermediate Training", duration: "3-6 months", desc: "Develop specialized skills through hands-on projects.", skills: ["Projects", "Specialization"] },
    { title: "Advanced Practice", duration: "6-12 months", desc: "Master advanced techniques and build your portfolio.", skills: ["Advanced", "Portfolio"] },
    { title: "Professional Entry", duration: "Ongoing", desc: "Start your career with internships and entry-level positions.", skills: ["Internship", "Certification"] },
  ],
  opportunities: [
    { title: "Training Program - District Center", location: "Your District", type: "Free Training", status: "Open" },
    { title: "Apprenticeship Program", location: "State Level", type: "Paid Training", status: "Enrolling" },
    { title: "Government Skill Center", location: "Nearby City", type: "Subsidized", status: "Open" },
  ],
  demandData: [
    { label: "Entry Level Jobs", value: 75 },
    { label: "Mid-Career Growth", value: 60 },
    { label: "Senior Positions", value: 45 },
    { label: "Freelance Demand", value: 55 },
  ],
  stats: [
    { value: "50K+", label: "Jobs Available" },
    { value: "₹4.5L", label: "Avg Salary" },
    { value: "89%", label: "Placement Rate" },
    { value: "12K", label: "Students Enrolled" },
  ],
  quote: "Your village is the starting line, not the finish.",
  quoteAuthor: "Rural SkillVerse",
};

export const BUILDING_INTERIORS: Record<string, InteriorData> = {
  default: DEFAULT_INTERIOR,

  "tech-1": {
    title: "Software Development",
    description: "Software developers build the apps, websites, and systems that power modern India. From e-governance portals to fintech apps, coders are transforming rural and urban life alike.",
    highlights: [
      { icon: "💻", title: "Remote Work", desc: "Code from anywhere — your village, a café, or a city office" },
      { icon: "🚀", title: "Startup Culture", desc: "Build your own product or join India's booming startup ecosystem" },
      { icon: "💰", title: "High Income", desc: "Among the highest-paying career paths for freshers" },
    ],
    salary: "₹4-12 LPA",
    growth: "+32%",
    roadmap: [
      { title: "Learn Programming Basics", duration: "2-3 months", desc: "Start with HTML, CSS, JavaScript. Build your first webpage.", skills: ["HTML", "CSS", "JavaScript", "Git"] },
      { title: "Pick a Specialization", duration: "3-4 months", desc: "Choose frontend, backend, or mobile development.", skills: ["React", "Node.js", "Python", "Databases"] },
      { title: "Build Real Projects", duration: "3-6 months", desc: "Create portfolio projects. Contribute to open source.", skills: ["APIs", "Deployment", "Testing", "GitHub"] },
      { title: "Get Your First Job", duration: "1-2 months", desc: "Apply to internships, freelance gigs, or full-time roles.", skills: ["Resume", "Interview", "DSA", "System Design"] },
    ],
    opportunities: [
      { title: "NSDC Coding Bootcamp", location: "Online", type: "Free", status: "Open" },
      { title: "Google Developer Program", location: "Online", type: "Free Certification", status: "Enrolling" },
      { title: "TCS iON Digital Hub", location: "Multiple Cities", type: "Training + Job", status: "Open" },
      { title: "Infosys Springboard", location: "Online", type: "Free Learning", status: "Open" },
    ],
    demandData: [
      { label: "Web Development", value: 85 },
      { label: "Mobile Apps", value: 78 },
      { label: "Cloud & DevOps", value: 72 },
      { label: "AI/ML Integration", value: 68 },
    ],
    stats: [
      { value: "5M+", label: "Developers in India" },
      { value: "₹8L", label: "Avg Salary" },
      { value: "95%", label: "Placement Rate" },
      { value: "32%", label: "Annual Growth" },
    ],
    quote: "The best time to learn coding was yesterday. The next best time is now.",
    quoteAuthor: "Tech Community India",
  },

  "tech-2": {
    title: "Data Analytics & AI",
    description: "Data is the new oil. Analysts and AI engineers turn raw data into insights that drive decisions across healthcare, agriculture, finance, and governance.",
    highlights: [
      { icon: "📊", title: "Data-Driven India", desc: "Every industry needs people who can read and interpret data" },
      { icon: "🤖", title: "AI Revolution", desc: "India's AI market is expected to reach $17B by 2027" },
      { icon: "🎯", title: "Problem Solving", desc: "Use math and logic to solve real-world problems" },
    ],
    salary: "₹5-15 LPA",
    growth: "+45%",
    roadmap: [
      { title: "Mathematics & Statistics", duration: "2 months", desc: "Strengthen your foundation in math, probability, and statistics.", skills: ["Statistics", "Probability", "Linear Algebra"] },
      { title: "Learn Python & SQL", duration: "2-3 months", desc: "Master the essential tools for data work.", skills: ["Python", "SQL", "Pandas", "Excel"] },
      { title: "Data Visualization & ML", duration: "3-4 months", desc: "Learn to create insights and build predictive models.", skills: ["Tableau", "ML Basics", "Scikit-learn", "TensorFlow"] },
      { title: "Specialize & Certify", duration: "2-3 months", desc: "Pick a domain and get certified.", skills: ["Certification", "Portfolio", "Kaggle", "Domain Knowledge"] },
    ],
    opportunities: [
      { title: "Google Data Analytics Certificate", location: "Online", type: "Free", status: "Open" },
      { title: "NASSCOM AI Skilling", location: "Multiple Cities", type: "Subsidized", status: "Enrolling" },
      { title: "IBM Data Science Program", location: "Online", type: "Free Certification", status: "Open" },
    ],
    demandData: [
      { label: "Business Analytics", value: 82 },
      { label: "Machine Learning", value: 75 },
      { label: "Data Engineering", value: 70 },
      { label: "AI Research", value: 58 },
    ],
    stats: [
      { value: "97K+", label: "Open Positions" },
      { value: "₹10L", label: "Avg Salary" },
      { value: "45%", label: "Yearly Growth" },
      { value: "3x", label: "Salary Growth in 5yr" },
    ],
    quote: "In God we trust; all others must bring data.",
    quoteAuthor: "W. Edwards Deming",
  },

  "health-1": {
    title: "Medical Careers",
    description: "Healthcare is one of the most noble and secure career paths. India needs 2 million more healthcare workers — your service can literally save lives.",
    highlights: [
      { icon: "🏥", title: "Job Security", desc: "Healthcare workers are always in demand, recession-proof" },
      { icon: "❤️", title: "Save Lives", desc: "Direct impact on people's health and wellbeing" },
      { icon: "🌐", title: "Global Demand", desc: "Indian healthcare professionals are valued worldwide" },
    ],
    salary: "₹5-25 LPA",
    growth: "+28%",
    roadmap: [
      { title: "Science Foundation (10+2)", duration: "2 years", desc: "Focus on Biology, Chemistry, Physics in school.", skills: ["Biology", "Chemistry", "Physics", "NEET Prep"] },
      { title: "Medical Degree / Diploma", duration: "3-5 years", desc: "MBBS, BDS, BAMS, or nursing diploma programs.", skills: ["Anatomy", "Pharmacology", "Pathology", "Clinical"] },
      { title: "Specialization & Residency", duration: "2-3 years", desc: "Choose your specialty and gain hands-on experience.", skills: ["Surgery", "Medicine", "Pediatrics", "Radiology"] },
      { title: "Practice & Serve", duration: "Lifelong", desc: "Start your practice or join a hospital. Serve your community.", skills: ["Patient Care", "Research", "Community Health"] },
    ],
    opportunities: [
      { title: "AIIMS Distance Learning", location: "Online", type: "Government", status: "Open" },
      { title: "State Nursing Programs", location: "District Hospital", type: "Free Training", status: "Enrolling" },
      { title: "Rural Health Fellowship", location: "Multiple States", type: "Stipend + Training", status: "Open" },
    ],
    demandData: [
      { label: "General Medicine", value: 90 },
      { label: "Nursing", value: 85 },
      { label: "Lab Technology", value: 72 },
      { label: "Telemedicine", value: 65 },
    ],
    stats: [
      { value: "2M+", label: "Workers Needed" },
      { value: "₹8L", label: "Avg Salary" },
      { value: "98%", label: "Job Security" },
      { value: "28%", label: "Annual Growth" },
    ],
    quote: "The good physician treats the disease; the great physician treats the patient.",
    quoteAuthor: "William Osler",
  },

  "agri-1": {
    title: "Smart Farming & AgriTech",
    description: "The future of farming is high-tech. Drones, AI-powered soil analysis, precision irrigation — modern agriculture combines centuries of wisdom with cutting-edge technology.",
    highlights: [
      { icon: "🌾", title: "Feed the Nation", desc: "Agriculture employs 42% of India and feeds 1.4 billion" },
      { icon: "🛸", title: "Tech + Tradition", desc: "Drones, IoT sensors, and AI meet traditional farming wisdom" },
      { icon: "📈", title: "AgriTech Boom", desc: "India's AgriTech market growing at 25% annually" },
    ],
    salary: "₹3-10 LPA",
    growth: "+25%",
    roadmap: [
      { title: "Agriculture Basics", duration: "2-3 months", desc: "Understand soil science, crop cycles, and sustainable practices.", skills: ["Soil Science", "Crop Management", "Organic Methods"] },
      { title: "Technology Integration", duration: "2-3 months", desc: "Learn drone operation, sensor technology, and data collection.", skills: ["Drones", "IoT", "GPS Mapping", "Sensors"] },
      { title: "Business & Marketing", duration: "2 months", desc: "Direct-to-consumer selling, FPO management, export basics.", skills: ["FPO Management", "E-Commerce", "Supply Chain"] },
      { title: "Advanced AgriTech", duration: "3 months", desc: "AI-based crop prediction, hydroponics, vertical farming.", skills: ["AI in Agriculture", "Hydroponics", "Data Analytics"] },
    ],
    opportunities: [
      { title: "Kisan Drone Training", location: "District Level", type: "Government Subsidized", status: "Open" },
      { title: "AgriTech Startup Incubator", location: "State Capital", type: "Funding + Mentorship", status: "Enrolling" },
      { title: "Organic Certification Course", location: "Online", type: "Free", status: "Open" },
    ],
    demandData: [
      { label: "Drone Operators", value: 80 },
      { label: "Precision Farming", value: 70 },
      { label: "Organic Certification", value: 65 },
      { label: "AgriTech Startups", value: 60 },
    ],
    stats: [
      { value: "₹1.5Cr", label: "AgriTech Funding" },
      { value: "25%", label: "Market Growth" },
      { value: "42%", label: "Workforce Share" },
      { value: "1200+", label: "AgriTech Startups" },
    ],
    quote: "The farmer is the only man in our economy who buys everything at retail, sells everything at wholesale, and pays the freight both ways.",
    quoteAuthor: "John F. Kennedy",
  },

  "trade-1": {
    title: "Automobile & Mechanical",
    description: "India's automotive industry is the 3rd largest in the world. Skilled mechanics and technicians are the backbone — from two-wheelers to EVs, demand never stops.",
    highlights: [
      { icon: "🔧", title: "Hands-On Work", desc: "Fix, build, and maintain vehicles and machinery" },
      { icon: "⚡", title: "EV Revolution", desc: "Electric vehicles creating massive new demand for technicians" },
      { icon: "💪", title: "Own Your Shop", desc: "High potential for self-employment and business ownership" },
    ],
    salary: "₹2.5-8 LPA",
    growth: "+20%",
    roadmap: [
      { title: "Basic Mechanical Skills", duration: "3 months", desc: "Learn tools, engine basics, and safety protocols.", skills: ["Hand Tools", "Engine Basics", "Safety", "Measurements"] },
      { title: "Specialization", duration: "3-4 months", desc: "Choose automotive, industrial, or EV specialization.", skills: ["Diagnostics", "Electrical Systems", "EV Technology"] },
      { title: "Certification & Practice", duration: "3 months", desc: "Get industry-recognized certifications.", skills: ["ITI Certificate", "OEM Training", "Practical Exam"] },
      { title: "Start Your Business", duration: "Ongoing", desc: "Open your own garage or join a service center.", skills: ["Business Plan", "MUDRA Loan", "Customer Service"] },
    ],
    opportunities: [
      { title: "ITI Mechanic Course", location: "District ITI", type: "Government", status: "Open" },
      { title: "Maruti Suzuki Training", location: "Multiple Centers", type: "Certified Training", status: "Enrolling" },
      { title: "EV Technician Program", location: "Online + Offline", type: "New Program", status: "Open" },
    ],
    demandData: [
      { label: "EV Technicians", value: 85 },
      { label: "Auto Mechanics", value: 75 },
      { label: "Industrial Machines", value: 65 },
      { label: "Two-Wheeler Service", value: 80 },
    ],
    stats: [
      { value: "3rd", label: "Largest Auto Market" },
      { value: "₹5L", label: "Avg Salary" },
      { value: "20%", label: "EV Growth Rate" },
      { value: "35M", label: "Jobs in Sector" },
    ],
    quote: "The expert in anything was once a beginner.",
    quoteAuthor: "Helen Hayes",
  },

  "biz-1": {
    title: "Startup & Entrepreneurship",
    description: "India is the world's 3rd largest startup ecosystem. Startup India has recognized 1 lakh+ startups. Your business idea could be the next big thing — and it can start right from your village.",
    highlights: [
      { icon: "🚀", title: "Be Your Own Boss", desc: "Create jobs, not just seek them" },
      { icon: "🏘️", title: "Rural Innovation", desc: "Some of India's best startups solve rural problems" },
      { icon: "💸", title: "Government Support", desc: "Mudra loans, Startup India benefits, tax exemptions" },
    ],
    salary: "Variable",
    growth: "+40%",
    roadmap: [
      { title: "Find Your Idea", duration: "1 month", desc: "Identify problems in your community that need solutions.", skills: ["Market Research", "Problem Identification", "Validation"] },
      { title: "Business Planning", duration: "1-2 months", desc: "Create a business plan, financial projections.", skills: ["Business Model", "Financial Plan", "Legal Setup"] },
      { title: "Build & Launch", duration: "2-4 months", desc: "Create your MVP, test with real customers.", skills: ["MVP", "Marketing", "Sales", "Digital Presence"] },
      { title: "Scale & Grow", duration: "Ongoing", desc: "Grow your customer base, seek funding if needed.", skills: ["Scaling", "Team Building", "Funding", "Operations"] },
    ],
    opportunities: [
      { title: "Startup India Registration", location: "Online", type: "Free", status: "Open" },
      { title: "MUDRA Loan Scheme", location: "Any Bank", type: "Up to ₹10L", status: "Open" },
      { title: "District Innovation Hub", location: "District HQ", type: "Mentorship + Space", status: "Enrolling" },
    ],
    demandData: [
      { label: "D2C Brands", value: 80 },
      { label: "AgriTech", value: 72 },
      { label: "EdTech", value: 68 },
      { label: "HealthTech", value: 65 },
    ],
    stats: [
      { value: "1L+", label: "Recognized Startups" },
      { value: "40%", label: "Rural Ideas" },
      { value: "₹10L", label: "MUDRA Loan Limit" },
      { value: "3yr", label: "Tax Holiday" },
    ],
    quote: "Don't find customers for your products, find products for your customers.",
    quoteAuthor: "Seth Godin",
  },

  panchayat: {
    title: "Government Support & Schemes",
    description: "The Panchayat Center connects you to India's extensive network of scholarships, training subsidies, and entrepreneurship programs designed specifically for rural youth.",
    highlights: [
      { icon: "🎓", title: "Scholarships", desc: "Central & State scholarships for skill development" },
      { icon: "🏛️", title: "Skill India Mission", desc: "Free training and certification in 300+ trades" },
      { icon: "👩‍💼", title: "Women Empowerment", desc: "Special schemes for women entrepreneurs" },
    ],
    salary: "Various Benefits",
    growth: "Expanding",
    roadmap: [
      { title: "Identify Your Goal", duration: "1 week", desc: "Decide what you want to learn or build.", skills: ["Self-Assessment", "Career Interest", "Goal Setting"] },
      { title: "Find Relevant Schemes", duration: "1 week", desc: "Match your goals with available government programs.", skills: ["Research", "Eligibility Check", "Documentation"] },
      { title: "Apply & Enroll", duration: "2-4 weeks", desc: "Submit applications, gather documents, get enrolled.", skills: ["Application", "Verification", "Enrollment"] },
      { title: "Complete & Certify", duration: "Varies", desc: "Finish training, get certified, find placement.", skills: ["Training", "Certification", "Placement"] },
    ],
    opportunities: [
      { title: "PM Kaushal Vikas Yojana", location: "Pan India", type: "Free Skill Training", status: "Open" },
      { title: "Startup India Seed Fund", location: "Online Application", type: "Up to ₹50L", status: "Open" },
      { title: "National Apprenticeship Scheme", location: "Multiple Industries", type: "Earn While Learn", status: "Enrolling" },
      { title: "Stand-Up India", location: "Any Bank", type: "₹10L - ₹1Cr Loan", status: "Open" },
    ],
    demandData: [
      { label: "Skill India Enrollments", value: 90 },
      { label: "Startup India Growth", value: 82 },
      { label: "Digital Literacy", value: 75 },
      { label: "Women Entrepreneurs", value: 68 },
    ],
    stats: [
      { value: "10M+", label: "Trained Under PMKVY" },
      { value: "1L+", label: "Startups Recognized" },
      { value: "300+", label: "Trade Courses" },
      { value: "Free", label: "Certification" },
    ],
    quote: "A nation's culture resides in the hearts and in the soul of its people.",
    quoteAuthor: "Mahatma Gandhi",
  },
};
