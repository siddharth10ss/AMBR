import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sparkles } from '@react-three/drei';
import PortalWindow from './PortalWindow';

const GlobeCore = ({ onHover, onCoreClick, isHoveredOuter }) => {
    const coreRef = useRef();
    const lightRef = useRef();
    const ringsRef = useRef(); // For the chains
    const [isHovered, setIsHovered] = useState(false);

    // Core pulsing animation
    useFrame((state) => {
        const time = state.clock.elapsedTime;

        if (coreRef.current) {
            // Pulse Scale
            const scale = 1 + Math.sin(time * 2) * 0.05;
            const targetScale = isHovered ? 1.2 : scale;
            coreRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

            // Animated color shifting (Hue rotation)
            const hue = (Math.sin(time * 0.5) + 1) * 0.1 + 0.8;
            const color = new THREE.Color().setHSL(hue, 1.0, 0.5);

            coreRef.current.material.emissive.copy(color);
            if (lightRef.current) lightRef.current.color.copy(color);
        }

        // Animate Chains/Rings
        if (ringsRef.current) {
            ringsRef.current.rotation.x = time * 0.2;
            ringsRef.current.rotation.y = time * 0.15;
        }
    });

    const coreData = {
        id: 'personal-lounge',
        name: 'The Core',
        icon: '🔒', // Locked/Private icon
        backgroundGradient: 'from-fuchsia-900 via-purple-900 to-indigo-900',
        video: null
    };

    return (
        <group>
            {/* The Glowing Core Sphere */}
            <mesh
                ref={coreRef}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setIsHovered(true);
                    onHover(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    setIsHovered(false);
                    onHover(false);
                    document.body.style.cursor = 'auto';
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onCoreClick();
                }}
            >
                <sphereGeometry args={[0.5, 64, 64]} />
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ff00ff"
                    emissiveIntensity={2.0}
                    toneMapped={false}
                />
            </mesh>

            {/* Privacy Chains / Cage */}
            <group ref={ringsRef}>
                {/* Ring 1 */}
                <mesh rotation={[1.57, 0, 0]}>
                    <torusGeometry args={[0.7, 0.02, 32, 100]} />
                    <meshStandardMaterial color="#333" roughness={0.4} metalness={0.9} />
                </mesh>
                {/* Ring 2 */}
                <mesh rotation={[0, 1.57, 0]}>
                    <torusGeometry args={[0.8, 0.02, 32, 100]} />
                    <meshStandardMaterial color="#333" roughness={0.4} metalness={0.9} />
                </mesh>
                {/* Ring 3 (Diagonal) */}
                <mesh rotation={[0.78, 0.78, 0]}>
                    <torusGeometry args={[0.9, 0.02, 32, 100]} />
                    <meshStandardMaterial color="#333" roughness={0.4} metalness={0.9} />
                </mesh>
            </group>

            {/* Core Light */}
            <pointLight
                ref={lightRef}
                intensity={3.0}
                distance={5}
                decay={2}
            />

            {/* Inner Particles */}
            <Sparkles
                count={50}
                scale={1.2}
                size={2}
                speed={0.4}
                opacity={0.5}
                color="#ff00ff"
            />

            {/* Core Portal - Scaled Down */}
            {isHovered && (
                <PortalWindow
                    room={coreData}
                    position={[0, 0.8, 0]}
                    onClick={onCoreClick}
                    isSatellite={false}
                    scale={0.5} // Resize as requested
                />
            )}
        </group>
    );
};

export default GlobeCore;
