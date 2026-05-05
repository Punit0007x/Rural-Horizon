# 🌾 Rural Horizon: Virtual Career Discovery World

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/three.js-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Rural Horizon** is an immersive 3D interactive world designed to bridge the opportunity gap for rural communities. In this "Virtual Skill Village," users can explore diverse career paths, interact with professional mentors (NPCs), and discover educational resources through a gamified experience.

---

## ✨ Key Features

- **🎮 Immersive 3D Environment**: A lush, interactive world built with **React Three Fiber** and **Three.js**, featuring dynamic terrain, vegetation, and atmospheric effects.
- **🏘️ Thematic Villages**: Five distinct zones representing high-growth sectors:
  - **Technology**: Coding, Data Science, and Robotics.
  - **Healthcare**: Nursing, Pharmacy, and Diagnostics.
  - **Agriculture**: Smart Farming, Drones, and Organic Cultivation.
  - **Skilled Trades**: Electrical, Welding, and Solar Installation.
  - **Business**: Entrepreneurship, E-Commerce, and Finance.
- **🗣️ NPC Mentors**: Interact with village experts like Priya (Software Engineer) or Sarpanch Ji (Village Leader) for career guidance.
- **📜 Interactive Skill Tree**: Explore structured learning paths for 20+ specialized skills with direct links to resources like **Skill India**, **NSDC**, and **Google Digital Garage**.
- **📱 Mobile Optimized**: Experience the 3D world smoothly on any device with adaptive performance scaling and touch-friendly controls.
- **🌈 High-End Visuals**: Real-time lighting, post-processing (Bloom, Depth of Field), and smooth animations powered by **GSAP**.

---

## 🛠️ Tech Stack

- **Core**: React 18, TypeScript, Vite
- **3D Engine**: Three.js, @react-three/fiber, @react-three/drei
- **UI Components**: Shadcn UI, Radix UI, Tailwind CSS
- **Animation**: GSAP, Framer Motion
- **State & Data**: TanStack Query, Zod
- **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [bun](https://bun.sh/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/rural-horizon.git
   cd rural-horizon
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 🗺️ Project Structure

```text
src/
├── components/
│   ├── ui/             # Reusable UI components (Shandcn)
│   ├── world/          # 3D primitives (Trees, Grass, Buildings, etc.)
│   ├── World3D.tsx     # Main 3D Scene Controller
│   └── HUD.tsx         # Heads-up Display
├── pages/
│   └── Index.tsx       # Main landing page
└── lib/                # Utility functions and configuration
```

---

## 🌟 Mission

The goal of **Rural Horizon** is to democratize career information. By transforming boring career lists into an engaging 3D exploration, we aim to inspire the next generation of professionals from every corner of the country.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ for a better future.</p>
