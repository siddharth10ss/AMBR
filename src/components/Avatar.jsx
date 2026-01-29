import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { floatingAnimation, pulseGlow } from '../utils/animations';

const Avatar = ({ userId, position, color, initial, size = 50 }) => {
    // Random delay for the float animation to make them feel organic and independent
    const randomDelay = useMemo(() => Math.random() * 2, []);

    // Combine random delay with the base floating animation
    const floatVariant = {
        animate: {
            ...floatingAnimation.animate,
            transition: {
                ...floatingAnimation.animate.transition,
                delay: randomDelay,
                duration: 3 + Math.random() * 2 // Randomize duration slightly
            }
        }
    };

    return (
        <motion.div
            className="absolute flex items-center justify-center rounded-full backdrop-blur-sm border border-white/20 shadow-lg cursor-pointer z-20"
            style={{
                left: position.x,
                top: position.y,
                width: size,
                height: size,
                background: color || 'rgba(255, 255, 255, 0.2)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={["animate"]} // animate prop can take array of variant names if needed, or just object
            variants={floatVariant}
            whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(255,255,255,0.3)"
            }}
            exit={{ opacity: 0, scale: 0 }}
        >
            <span className="text-white font-bold text-sm select-none drop-shadow-md">
                {initial || '👤'}
            </span>
        </motion.div>
    );
};

export default React.memo(Avatar);
