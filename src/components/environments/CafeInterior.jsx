import React from 'react';
import { motion } from 'framer-motion';

const CafeInterior = () => {
    return (
        <div className="relative w-full h-full max-w-7xl mx-auto flex items-end justify-center pb-20 opacity-60">
            {/* Silhouette of tables/chairs - simplified shapes */}

            {/* Left Table */}
            <div className="absolute bottom-20 left-[10%] w-64 h-4 bg-[#1a1008] rounded-full blur-[2px]" />
            <div className="absolute bottom-0 left-[15%] w-4 h-24 bg-[#1a1008] blur-[1px]" />

            {/* Coffee Cup with Steam */}
            <div className="absolute bottom-24 left-[14%] flex flex-col items-center">
                {/* Steam */}
                <div className="relative mb-2">
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            className="absolute bottom-0 left-0 w-2 h-8 bg-white/20 rounded-full blur-sm"
                            animate={{
                                y: [-5, -20],
                                opacity: [0, 0.4, 0],
                                scale: [0.8, 1.2]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.6,
                                ease: "linear"
                            }}
                        />
                    ))}
                </div>
                <div className="w-6 h-5 bg-[#3e2c1c] rounded-sm relative shadow-lg">
                    <div className="absolute -right-2 top-1 w-3 h-3 rounded-full border-2 border-[#3e2c1c]" />
                </div>
            </div>

            {/* Hanging Lamps - Swaying */}
            <div className="absolute top-0 left-[20%] origin-top">
                <motion.div
                    animate={{ rotate: [2, -2, 2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center origin-top-center"
                >
                    <div className="w-[1px] h-32 bg-black/50" />
                    <div className="w-16 h-12 bg-gradient-to-b from-[#3e2c1c] to-[#5c4033] rounded-t-full relative shadow-lg">
                        <div className="absolute bottom-[-10px] inset-x-2 h-4 bg-[#ffbf69]/20 blur-md rounded-full" />
                    </div>
                </motion.div>
            </div>

            <div className="absolute top-[-20px] right-[25%] origin-top">
                <motion.div
                    animate={{ rotate: [-1, 1, -1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="flex flex-col items-center origin-top-center"
                >
                    <div className="w-[1px] h-48 bg-black/50" />
                    <div className="w-12 h-10 bg-gradient-to-b from-[#3e2c1c] to-[#5c4033] rounded-t-full relative shadow-lg">
                        <div className="absolute bottom-[-8px] inset-x-2 h-4 bg-[#ffbf69]/20 blur-md rounded-full" />
                    </div>
                </motion.div>
            </div>

            {/* Window Frames (Interior Reflection) */}
            <div className="absolute inset-0 pointer-events-none border-[40px] border-[#0f0a06]/80 blur-sm rounded-[30px]" />
            <div className="absolute top-1/2 w-full h-4 bg-[#0f0a06]/80 blur-[1px]" />
            <div className="absolute left-1/3 h-full w-4 bg-[#0f0a06]/80 blur-[1px]" />
            <div className="absolute right-1/3 h-full w-4 bg-[#0f0a06]/80 blur-[1px]" />
        </div>
    );
};

export default CafeInterior;
