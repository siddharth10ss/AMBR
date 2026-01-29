import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingAvatars = ({ count = 5 }) => {

    // Generate random users (simulated)
    const users = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            initials: String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26)),
            color: `hsl(${Math.random() * 360}, 70%, 70%)`,
            x: Math.random() * 80 + 10, // 10-90%
            y: Math.random() * 60 + 20, // 20-80%
            delay: Math.random() * 5,
            duration: 3 + Math.random() * 4
        }));
    }, [count]);

    return (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            {users.map((user) => (
                <motion.div
                    key={user.id}
                    className="absolute pointer-events-auto"
                    style={{
                        left: `${user.x}%`,
                        top: `${user.y}%`
                    }}
                    animate={{
                        y: [-15, 15, -15],
                        rotate: [-5, 5, -5]
                    }}
                    transition={{
                        duration: user.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: user.delay
                    }}
                >
                    <motion.div
                        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg cursor-pointer transition-all duration-300 hover:scale-125 hover:z-50 hover:bg-white/20 hover:border-white/40"
                        whileHover={{ y: -5 }}
                    >
                        {/* User Initials */}
                        <span className="text-sm font-bold text-white/90 drop-shadow-sm select-none" style={{ color: user.color }}>{user.initials}</span>

                        {/* Pulse Ring (on hover) */}
                        <div className="absolute inset-0 rounded-full border border-white/50 opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 pointer-events-none" />

                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-xs text-white">
                                User {user.id + 1}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

export default React.memo(FloatingAvatars);
