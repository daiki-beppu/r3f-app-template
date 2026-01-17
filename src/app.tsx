import type { Mesh } from "three";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const App = () => (
  <div className="fixed top-0 left-0  w-dvw h-dvh overflow-hidden">
    <Canvas>
      <Scene />
    </Canvas>
  </div>
);

export const Scene = () => {
  const spherRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (spherRef.current) {
      spherRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={spherRef}>
      <sphereGeometry />
      <meshNormalMaterial wireframe />
    </mesh>
  );
};
