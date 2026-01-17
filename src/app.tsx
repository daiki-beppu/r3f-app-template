import { Canvas } from "@react-three/fiber";

export const App = () => (
  <div className="w-dvw h-dvh overflow-hidden">
    <Canvas>
      <mesh>
        <sphereGeometry />
        <meshNormalMaterial wireframe />
      </mesh>
    </Canvas>
  </div>
);
