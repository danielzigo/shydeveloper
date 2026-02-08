"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useState } from "react";
import type * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

/**
 * Configuration for 3D cube animation and appearance
 */
const CUBE_CONFIG = {
	/** Cube dimensions (all sides) */
	SIZE: 2.5,
	/** Rotation speed multiplier */
	ROTATION_SPEED: 0.1,
	/** Time multiplier for floating animation */
	FLOAT_TIME_MULTIPLIER: 0.2,
	/** Amplitude of floating movement */
	FLOAT_AMPLITUDE: 0.5,
	/** Y-axis speed multiplier for floating */
	FLOAT_Y_SPEED: 1.5,
	/** Texture path */
	TEXTURE_PATH: "/assets/abstract-texture.jpg",
} as const;

/**
 * Configuration for Three.js canvas and controls
 */
const CANVAS_CONFIG = {
	/** Disable zoom controls */
	ENABLE_ZOOM: false,
	/** Disable pan controls */
	ENABLE_PAN: false,
	/** Ambient light intensity */
	AMBIENT_INTENSITY: 1,
	/** Directional light intensity */
	DIRECTIONAL_INTENSITY: 1,
	/** Directional light position [x, y, z] */
	DIRECTIONAL_POSITION: [2, 1, 1] as const,
} as const;

interface CubeProps {
	setHovered: (hovered: boolean) => void;
}

const Cube = ({ setHovered }: CubeProps) => {
	const mesh = useRef<THREE.Mesh | null>(null);
	// Load texture for the cube
	const texture = useLoader(TextureLoader, CUBE_CONFIG.TEXTURE_PATH);

	// UseFrame to add both rotation and floating movement to the cube
	useFrame((state, delta) => {
		const m = mesh.current;
		if (m) {
			// Continuous rotation
			m.rotation.x += delta * CUBE_CONFIG.ROTATION_SPEED;
			m.rotation.y += delta * CUBE_CONFIG.ROTATION_SPEED;

			// Floating movement
			const t = state.clock.getElapsedTime() * CUBE_CONFIG.FLOAT_TIME_MULTIPLIER; // Slow down the movement
			m.position.x = Math.sin(t) * CUBE_CONFIG.FLOAT_AMPLITUDE;
			m.position.y = Math.sin(t * CUBE_CONFIG.FLOAT_Y_SPEED) * CUBE_CONFIG.FLOAT_AMPLITUDE;
			m.position.z = Math.cos(t) * CUBE_CONFIG.FLOAT_AMPLITUDE;
		}
	});

	return (
		<mesh ref={mesh} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
			{/* Geometry for the cube */}
			<boxGeometry args={[CUBE_CONFIG.SIZE, CUBE_CONFIG.SIZE, CUBE_CONFIG.SIZE]} />
			<meshStandardMaterial map={texture} />
		</mesh>
	);
};

/**
 * Interactive 3D cube component with orbit controls
 * Displays a textured cube that floats and rotates continuously
 */
const AnimatedCube = () => {
	const [hovered, setHovered] = useState(false);

	return (
		// Wrapper for the canvas with dynamic cursor style
		<div className="h-[250px] w-full xl:h-[350px] xl:w-[500px]" style={{ cursor: hovered ? "grab" : "auto" }}>
			<Canvas>
				{/* Enable controls for user interaction */}
				<OrbitControls enableZoom={CANVAS_CONFIG.ENABLE_ZOOM} enablePan={CANVAS_CONFIG.ENABLE_PAN} />
				<ambientLight intensity={CANVAS_CONFIG.AMBIENT_INTENSITY} />
				<directionalLight
					position={CANVAS_CONFIG.DIRECTIONAL_POSITION}
					intensity={CANVAS_CONFIG.DIRECTIONAL_INTENSITY}
				/>
				{/* Render the floating and rotating cube */}
				<Cube setHovered={setHovered} />
			</Canvas>
		</div>
	);
};

export default AnimatedCube;
