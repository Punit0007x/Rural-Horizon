import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import World3D from "../components/World3D";

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden" style={{ background: "hsl(var(--deep-charcoal))" }}>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      {loaded && <World3D />}
    </div>
  );
};

export default Index;
