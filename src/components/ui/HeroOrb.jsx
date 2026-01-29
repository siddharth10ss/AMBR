import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const HeroOrb = () => {
    // Parallax Logic
    const ref = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { innerWidth, innerHeight } = window;
            const xPct = (e.clientX - innerWidth / 2) / (innerWidth / 2);
            const yPct = (e.clientY - innerHeight / 2) / (innerHeight / 2);

            mouseX.set(xPct * 20); // Max 20px movement
            mouseY.set(yPct * 20);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Independent rotation for layers
    const rotate1 = useTransform(x, [-20, 20], [-10, 10]);
    const rotate2 = useTransform(y, [-20, 20], [10, -10]);

    return (
        <motion.div
            ref={ref}
            className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center pointer-events-none"
            style={{ x, y, rotateX: rotate2, rotateY: rotate1 }}
        >
            {/* Core Glow */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 blur-[60px]"
            />

            {/* Inner Sphere */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full mix-blend-screen opacity-70"
                style={{
                    background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,0,255,0.2) 50%, transparent 100%)',
                    filter: 'blur(20px)'
                }}
            />

            {/* Structured Rings */}
            <svg viewBox="0 0 100 100" className="absolute w-full h-full opacity-50 overflow-visible">
                <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="0.5"
                    strokeDasharray="40 20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="origin-center"
                />

                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="0.2"
                    strokeDasharray="60 60"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="origin-center"
                />

                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#d8b4fe" />
                        <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f472b6" />
                        <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Glass Outer Shell */}
            <div className="absolute inset-10 rounded-full border border-white/10 glass-dark shadow-2xl backdrop-blur-[2px] opacity-40" />

            {/* Floating Particles Orbiting */}
            {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"
                    animate={{
                        x: [Math.cos(i) * 100, Math.sin(i * 1.5) * 120, Math.cos(i) * 100],
                        y: [Math.sin(i) * 100, Math.cos(i * 1.5) * 120, Math.sin(i) * 100],
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{
                        duration: 5 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.5
                    }}
                />
            ))}
        </motion.div>
    );
};

export default HeroOrb;
