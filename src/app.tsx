import type { Mesh } from "three";

import {
  Float,
  Html,
  MeshReflectorMaterial,
  OrbitControls,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRef } from "react";

export const App = () => (
  <div className="fixed top-0 left-0  w-dvw h-dvh overflow-hidden bg-sky-300/50">
    <Leva collapsed />
    <Canvas>
      <Scene />
    </Canvas>
  </div>
);

export const Scene = () => {
  const spherRef = useRef<Mesh>(null);

  const { floatAnimation, spinAnimation, visible, scale, position } =
    useControls("sphere", {
      floatAnimation: true,
      position: {
        joystick: "invertY",
        max: 5,
        min: -5,
        step: 0.01,
        value: { x: 0, y: -1 },
      },
      scale: {
        max: 5,
        min: 0,
        step: 0.1,
        value: 1,
      },
      spinAnimation: true,
      visible: true,
    });

  useFrame((_state, delta) => {
    if (spherRef.current && spinAnimation) {
      spherRef.current.rotation.y += delta;
    }
  });

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <Text
        font="./font/bangers-v25-latin-regular.woff"
        fontSize={1}
        textAlign="center"
        position={[0, 2, -2]}
      >
        Wellcome My GitHub Template Project
        <meshNormalMaterial />
      </Text>

      <Float speed={10} enabled={floatAnimation}>
        <mesh
          ref={spherRef}
          position={[position.x, position.y, -2]}
          scale={scale}
          visible={visible}
        >
          <sphereGeometry />
          <meshNormalMaterial wireframe />
          <Html
            className="p-2 text-nowrap text-white bg-amber-300/80 rounded-2xl"
            center
            position={[1, 1, 0]}
          >
            template mesh
          </Html>
        </mesh>
      </Float>

      <mesh position-y={-2.5} rotation-x={-Math.PI * 0.5} scale={100}>
        <planeGeometry />
        <MeshReflectorMaterial resolution={1024} color="orange" />
      </mesh>
    </>
  );
};
