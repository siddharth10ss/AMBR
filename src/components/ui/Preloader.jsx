import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Stars, Zap } from 'lucide-react';

const LOADING_PHRASES = [
    "Aligning Stardust...",
    "Calibrating Vibe Frequencies...",
    "Rendering Dreams...",
    "Connecting to the Ether...",
    "Syncing Heartbeats...",
];

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [phraseIndex, setPhraseIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                // Randomize progress increment for organic feel
                return prev + Math.random() * 2;
            });
        }, 50);

        const phraseTimer = setInterval(() => {
            setPhraseIndex(prev => (prev + 1) % LOADING_PHRASES.length);
        }, 1500);

        // Ensure minimum display time of 3s for the visuals
        const minTimeTimeout = setTimeout(() => {
            if (progress < 100) setProgress(100);
        }, 3000);

        return () => {
            clearInterval(timer);
            clearInterval(phraseTimer);
            clearTimeout(minTimeTimeout);
        };
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            // Add slight delay before completing to show 100%
            const timeout = setTimeout(() => {
                onComplete();
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [progress, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
        >
            {/* Ethereal Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-900/20 to-black animate-pulse" style={{ animationDuration: '4s' }} />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"
                />
            </div>

            {/* Central Magical Core */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
                    {/* Glowing Orbs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5],
                            rotate: 360
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 rounded-full border border-purple-500/30 blur-sm"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.6, 0.3],
                            rotate: -180
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-2 rounded-full border border-cyan-500/30 blur-md"
                    />

                    {/* Core Light */}
                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 0 20px rgba(168,85,247,0.2)",
                                "0 0 60px rgba(168,85,247,0.6)",
                                "0 0 20px rgba(168,85,247,0.2)"
                            ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                    />

                    {/* Orbiting Particles */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-full h-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                        >
                            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] mx-auto mt-[-4px]" />
                        </motion.div>
                    ))}
                </div>

                {/* Typography */}
                <div className="flex flex-col items-center gap-4">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white/50"
                    >
                        AMBR
                    </motion.h1>

                    <div className="h-6 overflow-hidden flex flex-col items-center">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={phraseIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-sm font-mono text-cyan-300/80 tracking-widest uppercase"
                            >
                                {LOADING_PHRASES[phraseIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* Minimal Progress Bar */}
                    <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", stiffness: 50 }}
                        />
                    </div>
                </div>
            </div>

            {/* Floating Sparkles Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            scale: 0
                        }}
                        animate={{
                            y: [null, Math.random() * -100],
                            opacity: [0, 1, 0],
                            scale: [0, Math.random() * 1.5, 0]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                        className="absolute w-1 h-1 rounded-full bg-white shadow-[0_0_5px_white]"
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default Preloader;
