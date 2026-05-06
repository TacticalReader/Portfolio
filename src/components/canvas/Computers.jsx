import React, { Suspense, useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

// ─── Error Boundary ────────────────────────────────────────────────────────────
class GLTFErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#915eff" wireframe />
        </mesh>
      );
    }
    return this.props.children;
  }
}

// ─── Lighting ──────────────────────────────────────────────────────────────────
// Extracted into its own component so it never re-renders with Computers.
const Lights = () => (
  <>
    {/* Ambient base — prevents pitch-black shadows */}
    <ambientLight intensity={0.18} color="#e8d5c4" />

    {/*
      FIX: hemisphereLight uses `args` for constructor params (skyColor, groundColor, intensity).
      The original used `skyColor` / `groundColor` as direct props which don't exist on
      THREE.HemisphereLight — the correct property names are `.color` (sky) and `.groundColor`.
      Using `args` is the idiomatic R3F fix.
    */}
    <hemisphereLight args={["#b0cde8", "#d4956a", 0.55]} />

    {/* Key light — warm afternoon sun, upper-left */}
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

    {/* Fill light — cool sky-bounce from the right */}
    <directionalLight position={[10, 8, -4]} intensity={0.65} color="#cce0ff" />

    {/* Rim / back light — cool blue edge */}
    <directionalLight position={[2, -4, -12]} intensity={0.85} color="#6ea8d6" />

    {/* Screen/desk glow */}
    <pointLight position={[0, -1, 2.5]} intensity={0.9} color="#ffe8b0" distance={8} decay={2} />

    {/* Brand accent — #915eff purple */}
    <pointLight position={[-4, 2, 3]} intensity={0.35} color="#915eff" distance={12} decay={2} />
  </>
);

// ─── Computers ─────────────────────────────────────────────────────────────────
const Computers = ({ isMobile }) => {
  const { scene } = useGLTF("./desktop_pc/scene.gltf");
  const meshRef = useRef();

  // Memoised so position/scale objects aren't recreated every render
  const [scale, position] = useMemo(
    () =>
      isMobile
        ? [0.7, [0, -3, -2.2]]
        : [0.75, [0, -3.25, -1.5]],
    [isMobile]
  );

  /*
   * FIX: frameloop="demand" (set on <Canvas>) means R3F only renders on
   * explicit invalidation — useFrame callbacks never fire in demand mode.
   * We switch to frameloop="always" on the Canvas, enabling this subtle
   * floating animation without any extra invalidate() plumbing.
   */
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Gentle vertical bob — ±0.08 units over ~4 s cycle
    meshRef.current.position.y =
      position[1] + Math.sin(Date.now() * 0.0008) * 0.08;
  });

  // Dispose GLTF resources when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
    };
  }, [scene]);

  return (
    <mesh ref={meshRef}>
      <Lights />
      <primitive
        object={scene}
        scale={scale}
        position={position}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

// ─── ComputersCanvas ───────────────────────────────────────────────────────────
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  // FIX: useCallback so the handler reference is stable and the listener
  // can actually be removed on cleanup (same reference required for removeEventListener)
  const handleMediaQueryChange = useCallback((event) => {
    setIsMobile(event.matches);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, [handleMediaQueryChange]);

  return (
    /*
     * FIX: Changed frameloop from "demand" to "always".
     * "demand" suppresses useFrame which broke the floating animation.
     * If you want demand-mode back, remove useFrame and call invalidate()
     * manually wherever state changes (e.g. on OrbitControls onChange).
     */
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enableDamping          // FIX: smooth, inertial rotation instead of snapping
          dampingFactor={0.08}
          autoRotate             // subtle idle spin when user isn't interacting
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* FIX: Error boundary so a missing/corrupt GLTF doesn't crash the page */}
        <GLTFErrorBoundary>
          <Computers isMobile={isMobile} />
        </GLTFErrorBoundary>
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
