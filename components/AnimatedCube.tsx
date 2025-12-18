"use client";

import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import * as THREE from "three";

const Cube = ({ setHovered }: { setHovered: (hovered: boolean) => void }) => {
  // Use a loosely-typed ref for compatibility with motion.mesh, and cast when using it
  const mesh = useRef<any>(null);

  // UseFrame to add both rotation and floating movement to the cube
  useFrame((state, delta) => {
    const m = mesh.current as THREE.Mesh | null;
    if (m) {
      // Continuous rotation
      m.rotation.x += delta * 0.1;
      m.rotation.y += delta * 0.1;

      // Floating movement
      const t = state.clock.getElapsedTime() * 0.2; // Slow down the movement
      m.position.x = Math.sin(t) * 0.5; 
      m.position.y = Math.sin(t * 1.5) * 0.5; 
      m.position.z = Math.cos(t) * 0.5; 
    }
  });

  // Load texture for the cube
  const texture_1 = useLoader(TextureLoader, "/assets/abstract-texture.jpg");

  return (
    <motion.mesh
      ref={mesh}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial map={texture_1} />
    </motion.mesh>
  );
};

const AnimatedCube = () => {
  const [hovered, setHovered] = useState(false);

  return (
    // Wrapper for the canvas with dynamic cursor style
    <div
      className="w-full xl:w-[500px] h-[250px] xl:h-[350px]"
      style={{ cursor: hovered ? "grab" : "auto" }}
    >
      <Canvas>
        {/* Enable controls for user interaction */}
        <OrbitControls enableZoom={false} enablePan={false} />
        <ambientLight intensity={1} />
        <directionalLight position={[2, 1, 1]} intensity={1} />
        {/* Render the floating and rotating cube */}
        <Cube setHovered={setHovered} />
      </Canvas>
    </div>
  );
};

export default AnimatedCube;
