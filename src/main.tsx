import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("main.tsx loaded");

const rootElement = document.getElementById("root");

// Global error overlay (useful when WebGL fails or other runtime exceptions occur)
window.addEventListener("error", (event) => {
  const existing = document.getElementById("global-error-overlay");
  if (existing) return;

  const overlay = document.createElement("div");
  overlay.id = "global-error-overlay";
  overlay.style.position = "fixed";
  overlay.style.zIndex = "9999";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.85)";
  overlay.style.color = "white";
  overlay.style.fontFamily = "system-ui, sans-serif";
  overlay.style.padding = "2rem";
  overlay.innerHTML = `
    <h1 style="font-size: 22px; margin-bottom: 1rem;">Runtime Error</h1>
    <pre style="white-space: pre-wrap; font-size: 12px;">${event.message}</pre>
    <pre style="white-space: pre-wrap; font-size: 12px; margin-top: 1rem;">${event.filename}:${event.lineno}:${event.colno}</pre>
  `;
  document.body.appendChild(overlay);
});

if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found");
}

