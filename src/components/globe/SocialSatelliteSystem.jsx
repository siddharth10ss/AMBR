import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Lock, Globe, Sparkles } from 'lucide-react';
import { SOCIAL_ROOMS_DATA } from '../../data/socialRooms';

const SatelliteModel = ({ color, hovered }) => {
    return (
        <group>
            {/* Main Body (Gold/Foil Box) */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.2, 0.4, 0.2]} />
                <meshStandardMaterial
                    color={color === '#ffffff' ? '#e2e8f0' : '#ffd700'} // Gold for active, White for empty
                    roughness={0.3}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={hovered ? 0.5 : 0.1}
                />
            </mesh>

            {/* Upper Sensor Array (Cylinder on top) */}
            <mesh position={[0, 0.25, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
                <meshStandardMaterial color="#333" roughness={0.5} metalness={0.5} />
            </mesh>

            {/* Communication Dish (Cone pointing down/out) */}
            <group position={[0, -0.2, 0.1]} rotation={[0.5, 0, 0]}>
                <mesh position={[0, -0.05, 0]}>
                    <coneGeometry args={[0.15, 0.1, 32, 1, true]} />
                    <meshStandardMaterial color="#ccc" side={THREE.DoubleSide} metalness={0.9} roughness={0.2} />
                </mesh>
                <mesh position={[0, -0.1, 0]}>
                    <sphereGeometry args={[0.03, 16, 16]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                </mesh>
            </group>

            {/* Solar Panels (Left & Right) */}
            <group>
                {/* Left Arm */}
                <mesh position={[-0.3, 0, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[0.4, 0.3, 0.02]} />
                    <meshStandardMaterial
                        color="#1e3a8a" // Dark Blue
                        roughness={0.2}
                        metalness={0.6}
                        emissive="#1d4ed8" // Blue glow
                        emissiveIntensity={0.2}
                    />
                    {/* Grid Lines Texture simulation via bump map or second mesh? detailed enough for now */}
                </mesh>
                <mesh position={[-0.1, 0, 0]} rotation={[0, 0, 1.57]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.2]} />
                    <meshStandardMaterial color="#666" />
                </mesh>

                {/* Right Arm */}
                <mesh position={[0.3, 0, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[0.4, 0.3, 0.02]} />
                    <meshStandardMaterial
                        color="#1e3a8a"
                        roughness={0.2}
                        metalness={0.6}
                        emissive="#1d4ed8"
                        emissiveIntensity={0.2}
                    />
                </mesh>
                <mesh position={[0.1, 0, 0]} rotation={[0, 0, 1.57]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.2]} />
                    <meshStandardMaterial color="#666" />
                </mesh>
            </group>
        </group>
    );
};

const Satellite = ({ data, onClick }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.elapsedTime;

        // Orbit Logic
        const angle = data.orbit.angle + time * data.orbit.speed;
        const radius = data.orbit.radius;

        meshRef.current.position.x = Math.sin(angle) * radius;
        meshRef.current.position.z = Math.cos(angle) * radius;
        meshRef.current.position.y = data.orbit.height + Math.sin(time * 0.5) * 0.1;

        // Look at center (Earth), then adjust rotation to align panels
        meshRef.current.lookAt(0, 0, 0);
        // Correct orientation: Panels should roughly face sun or perpendicular to orbit?
        // lookAt makes Z axis point to Earth.
        // We want the panels (X axis) to be tangent to orbit?
        // Let's keep it simple: Face Earth is good for the "Dish" pointing down.
    });

    // Color based on type (for the lights/dish)
    const getColor = () => {
        switch (data.type) {
            case 'friend': return '#4ade80'; // Green
            case 'public': return '#60a5fa'; // Blue
            case 'special': return '#fbbf24'; // Amber/Gold
            case 'private': return '#f87171'; // Red
            default: return '#ffffff'; // White/Empty
        }
    };

    const color = getColor();

    return (
        <group ref={meshRef}>

            <group
                onClick={(e) => {
                    e.stopPropagation(); // Critical: Prevent click from passing to Earth
                    onClick(data);
                }}
                onPointerOver={(e) => {
                    e.stopPropagation(); // Prevent hover passing
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={(e) => {
                    e.stopPropagation(); // Prevent hover passing
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
                scale={hovered ? 0.35 : 0.3}
            >
                {/* Invisible Hitbox for easier clicking */}
                <mesh visible={false}>
                    <sphereGeometry args={[1.5, 8, 8]} />
                </mesh>
                <SatelliteModel color={color} hovered={hovered} />
            </group>

            {/* Hover Tooltip */}
            {hovered && (
                <Html position={[0, 0.6, 0]} center distanceFactor={15} style={{ pointerEvents: 'none' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="bg-black/90 backdrop-blur-md border border-white/20 p-2 rounded-lg flex flex-col items-start min-w-[120px]"
                    >
                        <div className="flex items-center gap-1.5 mb-0.5">
                            {data.type === 'friend' && <Lock size={10} className="text-green-400" />}
                            {data.type === 'public' && <Globe size={10} className="text-blue-400" />}
                            {data.type === 'special' && <Sparkles size={10} className="text-amber-400" />}
                            {data.type === 'empty' && <Plus size={10} className="text-white" />}
                            <span className="text-[10px] font-bold text-white whitespace-nowrap">{data.name}</span>
                        </div>
                        {data.type !== 'empty' && (
                            <div className="flex items-center gap-1 text-white/50 text-[8px]">
                                <Users size={8} />
                                <span>{data.users}/{data.maxUsers} Vibing</span>
                            </div>
                        )}
                        <div className={`mt-1 text-[8px] font-bold uppercase tracking-widest ${data.type === 'empty' ? 'text-white' : 'text-cyan-400'}`}>
                            {data.type === 'empty' ? 'Create' : 'Join'}
                        </div>
                    </motion.div>
                </Html>
            )}
        </group>
    );
};

const SocialSatelliteSystem = ({ onRoomSelect }) => {
    return (
        <group>
            {SOCIAL_ROOMS_DATA.map((room) => (
                <Satellite key={room.id} data={room} onClick={onRoomSelect} />
            ))}
        </group>
    );
};

export default SocialSatelliteSystem;
