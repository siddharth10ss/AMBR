import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, X } from 'lucide-react';

const BreathingExercise = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale, pause

    useEffect(() => {
        if (!isOpen) return;

        const cycle = [
            { phase: 'inhale', duration: 4000 },
            { phase: 'hold', duration: 4000 },
            { phase: 'exhale', duration: 4000 },
            { phase: 'pause', duration: 4000 },
        ];

        let currentIndex = 0;

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cycle.length;
            setPhase(cycle[currentIndex].phase);
        }, 4000);

        return () => clearInterval(interval);
    }, [isOpen]);

    const getInstruction = () => {
        switch (phase) {
            case 'inhale': return 'Breathe In...';
            case 'hold': return 'Hold...';
            case 'exhale': return 'Breathe Out...';
            case 'pause': return 'Relax...';
            default: return '';
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white/50 hover:text-cyan-300 transition-all group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Anxiety Relief (Box Breathing)"
            >
                <Wind size={20} />
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/50 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    Breathe
                </span>
            </motion.button>

            {/* Full Screen Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-xl"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-8 right-8 text-white/50 hover:text-white p-2"
                        >
                            <X size={32} />
                        </button>

                        <div className="relative flex items-center justify-center mb-12">
                            {/* Outer Rings */}
                            <motion.div
                                className="absolute inset-0 rounded-full border border-cyan-500/30"
                                animate={{ scale: phase === 'inhale' ? 1.5 : (phase === 'exhale' ? 1 : 1.5) }}
                                transition={{ duration: 4, ease: "easeInOut" }}
                                style={{ width: 300, height: 300 }}
                            />
                            <motion.div
                                className="absolute inset-0 rounded-full border border-purple-500/20"
                                animate={{ scale: phase === 'inhale' ? 2 : (phase === 'exhale' ? 1 : 2) }}
                                transition={{ duration: 4, ease: "easeInOut" }}
                                style={{ width: 300, height: 300 }}
                            />

                            {/* Main Breathing Circle */}
                            <motion.div
                                className="rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-sm border border-white/10"
                                animate={{
                                    scale: phase === 'inhale' ? 1.5 : (phase === 'exhale' ? 0.8 : 1.5),
                                    opacity: phase === 'hold' || phase === 'pause' ? 0.8 : 1
                                }}
                                transition={{ duration: 4, ease: "easeInOut" }}
                                style={{ width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <motion.span
                                    key={phase}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-2xl font-light tracking-widest text-white/90"
                                >
                                    {getInstruction()}
                                </motion.span>
                            </motion.div>
                        </div>

                        <p className="text-white/40 font-mono text-sm tracking-widest mt-8">
                            4-4-4-4 BOX BREATHING
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default BreathingExercise;
