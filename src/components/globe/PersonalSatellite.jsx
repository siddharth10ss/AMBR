import React, { useRef, useState, useImperativeHandle, forwardRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import PortalWindow from './PortalWindow';

// --- High-Fidelity Materials ---
const hullMat = new THREE.MeshStandardMaterial({
    color: "#d0d5db", // Slightly darker white/grey
    roughness: 0.2,
    metalness: 0.5
});

const techMat = new THREE.MeshStandardMaterial({
    color: "#151515", // Almost black
    roughness: 0.6,
    metalness: 0.8
});

const goldMat = new THREE.MeshStandardMaterial({
    color: "#ffaa00",
    roughness: 0.1,
    metalness: 1.0,
    emissive: "#aa6600",
    emissiveIntensity: 0.1,
    side: THREE.DoubleSide
});

const blueGlow = new THREE.MeshBasicMaterial({ color: "#00aaff" });

const PersonalSatellite = forwardRef(({ onHover, onSatelliteClick, isViewActive }, ref) => {
    const groupRef = useRef();
    const ringRef = useRef();
    const panelRef = useRef();
    const [isHovered, setIsHovered] = useState(false);

    useImperativeHandle(ref, () => groupRef.current);

    const orbitRadius = 4.2;
    const orbitSpeed = 0.002;
    const orbitAngle = useRef(Math.PI * 0.2);

    const satelliteData = {
        id: 'personal-lounge',
        name: 'Orbital Lounge',
        icon: '🛰️',
        backgroundGradient: 'from-violet-900 via-fuchsia-900 to-purple-900'
    };

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        orbitAngle.current += orbitSpeed;
        const angle = orbitAngle.current;

        groupRef.current.position.x = Math.cos(angle) * orbitRadius;
        groupRef.current.position.z = Math.sin(angle) * orbitRadius;

        // Tangent look
        const targetLook = new THREE.Vector3(
            Math.cos(angle + 0.1) * orbitRadius,
            0,
            Math.sin(angle + 0.1) * orbitRadius
        );
        groupRef.current.lookAt(targetLook);

        // Animations
        if (ringRef.current) ringRef.current.rotation.z -= 0.005;
        if (panelRef.current) panelRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    });

    return (
        <group ref={groupRef}>
            <group
                onClick={(e) => {
                    e.stopPropagation();
                    onSatelliteClick();
                }}
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
                scale={0.35} // SIGNIFICANTLY SMALLER
                rotation={[0, 0, Math.PI / 2]}
            >

                {/* --- CENTRAL SPINE (Truss) --- */}
                <mesh material={techMat} rotation={[0, 0, 1.57]}>
                    {/* Long thin spine */}
                    <boxGeometry args={[0.1, 0.1, 3.0]} />
                </mesh>

                {/* --- GRAVITY RING (Delicate) --- */}
                <group ref={ringRef}>
                    {/* The Ring */}
                    <mesh material={hullMat}>
                        <torusGeometry args={[1.2, 0.08, 12, 48]} />
                    </mesh>

                    {/* Spokes (Thin) */}
                    <mesh rotation={[0, 0, 0]} material={techMat}>
                        <cylinderGeometry args={[0.02, 0.02, 2.4, 8]} />
                    </mesh>
                    <mesh rotation={[0, 0, 1.57]} material={techMat}>
                        <cylinderGeometry args={[0.02, 0.02, 2.4, 8]} />
                    </mesh>

                    {/* Modules on Ring (Habitation) */}
                    {[0, 1.57, 3.14, 4.71].map((rot, i) => (
                        <group key={i} rotation={[0, 0, rot]}>
                            <mesh position={[1.2, 0, 0]} material={hullMat}>
                                <cylinderGeometry args={[0.15, 0.15, 0.6, 8]} />
                            </mesh>
                            {/* Tiny Light */}
                            <mesh position={[1.2, 0.08, 0]}>
                                <planeGeometry args={[0.05, 0.2]} />
                                <meshBasicMaterial color={i % 2 === 0 ? "#00ffff" : "#ffaa00"} side={THREE.DoubleSide} />
                            </mesh>
                        </group>
                    ))}
                </group>

                {/* --- SOLAR ARRAYS (Thin & Wide) --- */}
                <group ref={panelRef} position={[0, 0, 0]}>
                    {/* Offset Mast */}
                    <mesh position={[0, 1.8, 0]} material={techMat}>
                        {/* Vertical Mast */}
                        <cylinderGeometry args={[0.04, 0.04, 1.5, 8]} />
                    </mesh>

                    {/* Array Box */}
                    <group position={[0, 2.4, 0]}>
                        <mesh material={goldMat}>
                            <boxGeometry args={[4.0, 1.0, 0.01]} />
                        </mesh>
                        {/* Detail Strips */}
                        <mesh position={[0, 0, 0.01]}>
                            <boxGeometry args={[4.0, 0.05, 0.01]} />
                            <meshBasicMaterial color="#111" />
                        </mesh>
                    </group>
                </group>

                {/* --- COMMS / SENSORS (Greebles) --- */}
                <group position={[0, -1.0, 0]}>
                    <mesh material={techMat}>
                        <boxGeometry args={[0.4, 0.4, 0.4]} />
                    </mesh>
                    {/* Dish */}
                    <mesh position={[0, -0.3, 0.2]} rotation={[0.5, 0, 0]} material={hullMat}>
                        <coneGeometry args={[0.2, 0.1, 16, 1, true]} />
                    </mesh>
                    {/* Antennas */}
                    <mesh position={[0.1, -0.3, -0.1]}>
                        <cylinderGeometry args={[0.01, 0.01, 0.8, 4]} />
                        <meshBasicMaterial color="#888" />
                    </mesh>
                    <mesh position={[-0.1, -0.3, -0.1]}>
                        <cylinderGeometry args={[0.01, 0.01, 0.8, 4]} />
                        <meshBasicMaterial color="#888" />
                    </mesh>
                </group>

                {/* --- ENGINE (Blue Ion) --- */}
                <mesh position={[-0.1, 0, 1.5]} rotation={[1.57, 0, 0]}>
                    {/* At the back of the spine */}
                    <cylinderGeometry args={[0.05, 0.1, 0.2, 8]} />
                    <meshStandardMaterial color="#333" />
                </mesh>
                <mesh position={[-0.1, 0, 1.7]} rotation={[1.57, 0, 0]}>
                    <sphereGeometry args={[0.08]} />
                    <meshBasicMaterial color="#44aaff" transparent opacity={0.5} />
                </mesh>

            </group>

            {/* Portal Window - Adjusted position for small scale */}
            {isHovered && !isViewActive && (
                <PortalWindow
                    room={satelliteData}
                    position={[0, 1.5, 0]}
                    onClick={onSatelliteClick}
                    isSatellite={true}
                />
            )}
        </group>
    );
});

export default PersonalSatellite;
