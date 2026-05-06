import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      {/* === NATURAL LIGHTING RIG === */}

      {/* Ambient base — very soft, keeps shadows from going pitch black */}
      <ambientLight intensity={0.18} color="#e8d5c4" />

      {/* Hemisphere light — sky (cool blue) above, warm earth bounce below */}
      <hemisphereLight
        skyColor="#b0cde8"
        groundColor="#d4956a"
        intensity={0.55}
      />

      {/* Key light — warm afternoon sunlight coming from upper-left */}
      <directionalLight
        position={[-8, 14, 6]}
        intensity={2.2}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={60}
        shadow-bias={-0.0004}
      />

      {/* Fill light — cool sky-bounce from the right to soften key shadows */}
      <directionalLight
        position={[10, 8, -4]}
        intensity={0.65}
        color="#cce0ff"
      />

      {/* Rim / back light — cool blue edge to separate model from background */}
      <directionalLight
        position={[2, -4, -12]}
        intensity={0.85}
        color="#6ea8d6"
      />

      {/* Desk/screen glow — subtle warm point near the monitor */}
      <pointLight
        position={[0, -1, 2.5]}
        intensity={0.9}
        color="#ffe8b0"
        distance={8}
        decay={2}
      />

      {/* Subtle purple accent — matches the site's #915eff brand colour */}
      <pointLight
        position={[-4, 2, 3]}
        intensity={0.35}
        color="#915eff"
        distance={12}
        decay={2}
      />

      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;


