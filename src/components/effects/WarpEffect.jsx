import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WarpEffect = ({ active }) => {
    const meshRef = useRef();
    const count = 400;

    // Create particles data
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const z = (Math.random() - 0.5) * 50;
            temp.push({ x, y, z, speed: Math.random() * 0.5 + 0.1 });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        // If active, everything moves towards camera (positive Z) or camera moves negative Z?
        // Let's make stars move towards camera +Z to simulate moving forward -Z
        const speedMultiplier = active ? 2.0 : 0.05;

        particles.forEach((particle, i) => {
            // Update Z
            particle.z += particle.speed * speedMultiplier;

            // Loop back if too close
            if (particle.z > 20) {
                particle.z = -50;
                particle.x = (Math.random() - 0.5) * 50;
                particle.y = (Math.random() - 0.5) * 50;
            }

            // Stretch effect when active
            const scale = active ? 5 : 1;

            dummy.position.set(particle.x, particle.y, particle.z);
            dummy.scale.set(1, 1, scale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <boxGeometry args={[0.05, 0.05, 0.5]} />
            <meshBasicMaterial color={active ? "cyan" : "#888"} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    );
};

export default WarpEffect;
