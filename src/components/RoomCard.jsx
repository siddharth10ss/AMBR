import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { User, Music, Sparkles, ArrowRight } from 'lucide-react';
import { glassShine } from '../utils/animations';
import audioManager from '../utils/audioManager';

const EnterButton = ({ onClick }) => {
    return (
        <motion.button
            whileHover="hover"
            whileTap="tap"
            onClick={(e) => {
                e.stopPropagation();
                // CRITICAL: Unlock AudioContext on user interaction
                audioManager.resumeContext();
                onClick();
            }}
            variants={{
                hover: { scale: 1.05 },
                tap: { scale: 0.95 }
            }}
            className="relative group/btn overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 flex items-center gap-3 transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
            <span className="relative z-10 font-medium tracking-wide text-sm">Enter Space</span>
            <motion.div
                variants={{
                    hover: { x: 5 }
                }}
            >
                <ArrowRight size={16} className="relative z-10" />
            </motion.div>

            {/* Button Shine */}
            <motion.div
                variants={{
                    hover: { x: ['100%', '-100%'] }
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-[100%]"
            />
        </motion.button>
    );
};

const RoomCard = ({ name, description, currentUsers, mood, backgroundGradient, icon, onClick }) => {
    // 3D Tilt Logic
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
    const bgX = useTransform(mouseX, [-0.5, 0.5], ["0%", "20%"]);
    const bgY = useTransform(mouseY, [-0.5, 0.5], ["0%", "20%"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                perspective: 1000,
            }}
            className="w-full h-[400px] md:h-[500px]"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full rounded-3xl group cursor-pointer"
                onClick={onClick}
            >
                {/* Dynamic Background */}
                <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${backgroundGradient}`}
                    style={{
                        backgroundSize: "120% 120%",
                        backgroundPositionX: bgX,
                        backgroundPositionY: bgY,
                    }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 rounded-3xl transition-opacity group-hover:opacity-20" />

                {/* Glass Border/Glow */}
                <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/30 transition-colors duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]" />

                {/* Content Container (Lifted off surface) */}
                <motion.div
                    style={{ transform: "translateZ(40px)" }}
                    className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <motion.div
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs font-medium tracking-wider uppercase text-white/80"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Sparkles size={12} className="text-yellow-300" />
                                {mood}
                            </motion.div>
                            <h3 className="heading-md font-bold text-white drop-shadow-md">{name}</h3>
                        </div>
                        <motion.div
                            className="p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                        >
                            {icon ? (
                                <span className="text-2xl leading-none">{icon}</span>
                            ) : (
                                <Music size={20} className="text-white/80" />
                            )}
                        </motion.div>
                    </div>

                    {/* Middle: Description (Fades on hover) */}
                    <div className="flex-1 flex items-center">
                        <p className="body-lg text-white/70 font-light max-w-lg transition-opacity duration-300 group-hover:text-white/90">
                            {description}
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-end justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-white/60 bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                                <User size={16} />
                                <span className="font-mono text-sm">{currentUsers}</span>
                            </div>
                        </div>

                        <EnterButton onClick={onClick} />
                    </div>
                </motion.div>

                {/* Floating Particles (Decor) */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    <motion.div
                        animate={{ y: [0, -100] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-10 left-10 w-2 h-2 rounded-full bg-white/20 blur-[1px] opacity-0 group-hover:opacity-100"
                    />
                    <motion.div
                        animate={{ y: [0, -150] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
                        className="absolute bottom-20 right-20 w-1 h-1 rounded-full bg-white/30 blur-[1px] opacity-0 group-hover:opacity-100"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default React.memo(RoomCard);

