import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls, useMotionValue, useTransform } from 'framer-motion';
import { Sliders, Zap, Palette, RefreshCcw } from 'lucide-react';

const EmotionController = ({ onEnergyChange, onMoodChange }) => {
    const constraintsRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Bounds in pixels (approximate for calculation)
    const RANGE = 100;

    const handleDrag = () => {
        const xVal = x.get();
        const yVal = y.get();

        // Normalize -1 to 1
        const normX = xVal / RANGE;
        const normY = yVal / RANGE; // -1 (Top/High Energy) to 1 (Bottom/Low Energy)? 
        // Wait, Y is positive down. So -100 is Up.
        // Let's map: 
        // Y: -100 (Up) = High Energy (1.5x speed)
        // Y: 100 (Down) = Low Energy (0.8x speed)

        // X: -100 (Left) = Cool Mood (Blue/Purple)
        // X: 100 (Right) = Warm Mood (Orange/Red)

        onEnergyChange(normY);
        onMoodChange(normX);
    };

    // Reset function
    const reset = () => {
        x.set(0);
        y.set(0);
        onEnergyChange(0);
        onMoodChange(0);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-center gap-4">
            {/* Label */}
            <div className="text-white/30 text-[10px] font-mono tracking-widest uppercase mb-2 pointer-events-none">
                Atmosphere Control
            </div>

            {/* Controller Area */}
            <div
                ref={constraintsRef}
                className="relative w-48 h-48 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm"
            >
                {/* Axis Labels */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] text-white/30 uppercase tracking-widest pointer-events-none">High Energy</div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-white/30 uppercase tracking-widest pointer-events-none">Low Energy</div>
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] text-white/30 -rotate-90 uppercase tracking-widest pointer-events-none">Cool</div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-white/30 rotate-90 uppercase tracking-widest pointer-events-none">Warm</div>

                {/* Center Point */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />

                {/* The Draggable Orb */}
                <motion.div
                    drag
                    dragConstraints={constraintsRef}
                    dragElastic={0.1}
                    dragMomentum={false}
                    onDrag={handleDrag}
                    style={{ x, y }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full cursor-grab active:cursor-grabbing shadow-lg shadow-white/10 group"
                >
                    {/* Orb Visual */}
                    <motion.div
                        className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/30 backdrop-blur-md flex items-center justify-center"
                        whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.6)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Sliders size={18} className="text-white/70" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Quick Reset */}
            <button
                onClick={reset}
                className="p-2 rounded-full text-white/20 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset Atmosphere"
            >
                <RefreshCcw size={14} />
            </button>
        </div>
    );
};

export default EmotionController;
