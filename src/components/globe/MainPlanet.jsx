import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import PortalWindow from './PortalWindow';
import { ROOMS_DATA } from '../../data/rooms';

const MainPlanet = ({ onHover, onRoomClick }) => {
    const meshRef = useRef();
    const cloudsRef = useRef();
    const [hoveredData, setHoveredData] = useState(null); // { room, point }

    // Load local high-fidelity textures
    const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
        '/textures/earth/map.jpg',
        '/textures/earth/normal.jpg',
        '/textures/earth/spec.jpg',
        '/textures/earth/clouds.png'
    ]);

    const rooms = useMemo(() => {
        // Local UV mapping data
        const uvData = [
            { id: 'rain-cafe', uRange: [0, 0.5], vRange: [0.5, 1], center: [0.25, 0.75] },
            { id: 'forest-focus', uRange: [0.5, 1], vRange: [0.5, 1], center: [0.75, 0.75] },
            { id: 'neon-lounge', uRange: [0, 0.5], vRange: [0, 0.5], center: [0.25, 0.25] },
            { id: 'cozy-cabin', uRange: [0.5, 1], vRange: [0, 0.5], center: [0.75, 0.25] },
        ];

        // Merge with central ROOMS_DATA to get video, colors, etc.
        return uvData.map(uv => {
            const roomData = ROOMS_DATA.find(r => r.id === uv.id);
            return { ...roomData, ...uv }; // internal UV data overrides if conflict, but IDs match
        });
    }, []);

    // Helper to find room from UV on hover
    const getRoomFromUV = (uv) => {
        const u = uv.x;
        const v = uv.y;
        if (u < 0.5 && v >= 0.5) return rooms[0];
        if (u >= 0.5 && v >= 0.5) return rooms[1];
        if (u < 0.5 && v < 0.5) return rooms[2];
        if (u >= 0.5 && v < 0.5) return rooms[3];
        return null;
    };

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.0005;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += 0.0007; // Clouds move slightly faster
        }
    });

    return (
        <group>
            {/* Transparent Glass Earth with Textures */}
            <mesh
                ref={meshRef}
                onPointerMove={(e) => {
                    e.stopPropagation();
                    const room = getRoomFromUV(e.uv);
                    if (room) {
                        if (hoveredData?.room?.id !== room.id) {
                            setHoveredData({ room, point: e.point });
                            onHover(room.id);
                        }
                        document.body.style.cursor = 'pointer';
                    }
                }}
                onPointerOut={(e) => {
                    setHoveredData(null);
                    onHover(null);
                    document.body.style.cursor = 'auto';
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    if (hoveredData?.room) {
                        onRoomClick(hoveredData.room.id);
                    }
                }}
            >
                <sphereGeometry args={[2, 64, 64]} />
                <meshStandardMaterial
                    map={colorMap}
                    normalMap={normalMap}
                    roughness={0.4}
                    metalness={0.6}
                    emissive="#1e1e3f"
                    emissiveIntensity={0.2}
                    transparent={true}
                    opacity={0.9}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Cloud Layer - Made more subtle/ghostly */}
            <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
                <sphereGeometry args={[2, 64, 64]} />
                <meshStandardMaterial
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.3} // Reduced for visibility of Core
                    blending={THREE.AdditiveBlending}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {/* Portal Window Logic */}
            {hoveredData && (
                <PortalWindow
                    room={hoveredData.room}
                    position={[hoveredData.point.x, hoveredData.point.y, hoveredData.point.z]}
                    onClick={() => onRoomClick(hoveredData.room.id)}
                    scale={0.6}
                />
            )}
        </group>
    );
};

export default MainPlanet;
