import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock } from 'lucide-react';

const PortalWindow = ({ room, position, onClick, isSatellite = false, scale = 1 }) => {
    // Portal is an HTML overlay anchored to 3D position
    // Using Drei Html for easier DOM/CSS management inside Canvas

    return (
        <Html
            position={position}
            center
            distanceFactor={10} // Scales based on distance
            zIndexRange={[100, 0]}
            style={{
                pointerEvents: 'none',
                transform: `scale(${scale})` // Apply global scale
            }}
        >
            <AnimatePresence>
                <div
                    className="relative flex flex-col items-center justify-center pointer-events-auto cursor-pointer group"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick();
                    }}
                >
                    {/* The "Portal" Circle */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className={`
                            relative overflow-hidden rounded-lg border-2 border-white/50 backdrop-blur-md bg-black/80
                            ${isSatellite ? 'w-20 h-20' : 'w-40 h-24'}
                            shadow-[0_0_50px_rgba(255,255,255,0.3)]
                            group-hover:border-white group-hover:scale-105 transition-all duration-300
                        `}
                        style={{ transform: `scale(${scale})` }}
                    >
                        {/* Video Preview or Fallback */}
                        <div className="absolute inset-0 w-full h-full">
                            {room.video ? (
                                <video
                                    src={room.video}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${room.backgroundGradient || 'from-gray-900 to-black'} flex items-center justify-center`}>
                                    {room.id === 'personal-lounge' && (
                                        <div className="flex flex-col items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity">
                                            <Lock size={isSatellite ? 16 : 24} className="text-white" />
                                            {!isSatellite && <div className="text-[10px] font-mono uppercase tracking-widest text-white/50">Private</div>}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Scanline Overlay */}
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-50 pointing-events-none" />

                        {/* Room Name Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-white text-xs font-bold tracking-widest uppercase">
                                Enter
                            </span>
                        </div>
                    </motion.div>

                    {/* Connecting Line (Decor) */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 40 }}
                        className="w-px bg-gradient-to-b from-white/50 to-transparent mt-2"
                    />

                    {/* Text Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                        className="absolute top-full mt-12 bg-black/60 backdrop-blur px-3 py-1 rounded text-white font-mono text-xs tracking-wider border border-white/10 whitespace-nowrap"
                    >
                        {room.icon} {room.name}
                    </motion.div>
                </div>
            </AnimatePresence>
        </Html>
    );
};

export default PortalWindow;
