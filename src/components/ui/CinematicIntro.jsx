import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, ArrowRight } from 'lucide-react';

const CinematicIntro = ({ onComplete }) => {
    const [isExiting, setIsExiting] = useState(false);

    const handleEnter = () => {
        setIsExiting(true);
        // Wait for animation to finish before unmounting
        setTimeout(onComplete, 1500);
    };

    return (
        <motion.div
            className="fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{
                opacity: isExiting ? 0 : 1,
                scale: isExiting ? 1.5 : 1,
                filter: isExiting ? "blur(20px)" : "blur(0px)"
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stichTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")` }}
            />

            <AnimatePresence>
                {!isExiting && (
                    <motion.div
                        className="relative z-10 flex flex-col items-center text-center px-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <motion.div
                            className="mb-8 p-4 rounded-full bg-white/5 border border-white/10"
                            animate={{
                                boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.1)", "0 0 0px rgba(255,255,255,0)"]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Headphones size={32} className="text-white/80" />
                        </motion.div>

                        <h1 className="heading-md font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/40 mb-4 tracking-tighter">
                            AMBR
                        </h1>

                        <p className="text-white/50 font-mono text-sm tracking-widest uppercase mb-12">
                            Headphones Recommended
                        </p>

                        <motion.button
                            onClick={handleEnter}
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300"
                        >
                            <span className="flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-white">
                                Enter Experience <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </span>

                            {/* Button Glow */}
                            <div className="absolute inset-0 rounded-full blur-md bg-white/20 opacity-0 group-hover:opacity-50 transition-opacity" />
                        </motion.button>

                        <div className="mt-8 text-xs text-white/20 font-mono">
                            Vibe Code Hackathon 2026
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CinematicIntro;
