import React from 'react';
import * as THREE from 'three';

const OrbitalPath = ({ radius }) => {
    return (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
            <meshBasicMaterial
                color="#ffffff"
                opacity={0.1}
                transparent
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
};

export default React.memo(OrbitalPath);
