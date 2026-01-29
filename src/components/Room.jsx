import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import audioManager from '../utils/audioManager';
import useAutoHide from '../hooks/useAutoHide';

// Components
import AudioControlPanel from './ui/AudioControlPanel';
import RoomVideoBackground from './RoomVideoBackground';
import RoomEnhancements from './effects/RoomEnhancements';
import BreathingExercise from './ui/BreathingExercise';
import EmotionController from './ui/EmotionController';
import ChatSidebar from './ui/ChatSidebar';
import SharedAudioPlayer from './ui/SharedAudioPlayer';
import FloatingAvatars from './effects/FloatingAvatars';

const Room = ({ roomData: propRoomData }) => { // Rename prop to avoid conflict if we merge
    const navigate = useNavigate();
    const location = useLocation();

    // UI State
    const [isMediaBrowserOpen, setIsMediaBrowserOpen] = useState(false);
    // Pause auto-hide if media browser is open
    const [uiVisible] = useAutoHide(3000, !isMediaBrowserOpen);

    const [zenMode, setZenMode] = useState(false);
    const [showZenToast, setShowZenToast] = useState(false);

    // Merge Prop data with Location State (Custom Room Data)
    const customData = location.state || {};
    const roomData = {
        ...propRoomData,
        name: customData.customName || propRoomData?.name || "Vibe Room",
        // If it's a social mode room, ensure we flag it?
    };

    // Emotion Controls
    const [energy, setEnergy] = useState(0); // -1 to 1
    const [mood, setMood] = useState(0);     // -1 to 1
    const [isSocialMode] = useState(customData.isSocialMode || true); // Use passed state or default to true for demo

    // Audio lifecycle management
    useEffect(() => {
        let mounted = true;
        let playTimeout;

        const initAudio = () => {
            // Stop everything first to ensure clean slate
            audioManager.stopAll(false);

            // Resume Audio Context on interaction
            audioManager.resumeContext();

            if (roomData?.id && mounted) {
                // Short delay to allow previous cleanup to finish effectively if rapid switching
                playTimeout = setTimeout(() => {
                    if (mounted) audioManager.playRoom(roomData.id);
                }, 100);
            }
        };

        initAudio();

        return () => {
            mounted = false;
            clearTimeout(playTimeout);
            audioManager.stopAll();
        };
    }, [roomData?.id]); // Only re-run if ID changes

    // Handle Emotion Changes
    const handleEnergyChange = useCallback((val) => {
        setEnergy(val);
        // Map Y (-1 High to 1 Low) -> Rate
        // -1 -> 1.5x
        // 1 -> 0.8x
        const rate = 1.15 - (val * 0.35);
        audioManager.setRate(rate);
    }, []);

    const handleMoodChange = useCallback((val) => {
        setMood(val);
    }, []);

    // Zen Mode Shortcut
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'z' || e.key === 'Z') {
                setZenMode(prev => {
                    const next = !prev;
                    if (next) {
                        setShowZenToast(true);
                        setTimeout(() => setShowZenToast(false), 3000);
                    }
                    return next;
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleLeave = () => {
        audioManager.stopAll();
        navigate('/');
    };

    // Configuration map for room specific settings
    const getRoomConfig = (id) => {
        switch (id) {
            case 'rain-cafe': return { parallax: true, opacity: 0.2 };
            case 'forest-focus': return { parallax: true, opacity: 0.25 };
            case 'neon-lounge': return { parallax: false, opacity: 0.3 };
            case 'cozy-cabin': return { parallax: true, opacity: 0.2 };
            default: return { parallax: true, opacity: 0.3 };
        }
    };

    const config = getRoomConfig(roomData?.id);

    return (
        <RoomVideoBackground
            roomId={roomData?.id}
            enableParallax={config.parallax && !zenMode}
            overlayOpacity={zenMode ? 0 : config.opacity}
            energy={-energy} // Invert so controller UP (-1) = High Energy
            mood={mood}
        >
            <div className="relative w-full h-full flex flex-col items-center justify-center selection:bg-purple-500/30 cursor-none">

                {/* Room Specific CSS Enhancements */}
                <RoomEnhancements roomId={roomData?.id} />

                {/* Zen Mode Guide Toast */}
                <AnimatePresence>
                    {showZenToast && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/70 text-sm font-mono tracking-widest pointer-events-none z-[100]"
                        >
                            ZEN MODE ACTIVE (PRESS Z TO EXIT)
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* UI Elements (Hidden in Zen Mode) */}
                <AnimatePresence>
                    {!zenMode && (
                        <>
                            {/* Breathing Exercise Button */}
                            <BreathingExercise />

                            {/* Emotion Controller (Bottom Right) */}
                            <EmotionController
                                onEnergyChange={handleEnergyChange}
                                onMoodChange={handleMoodChange}
                            />

                            {/* Social: Floating Avatars & Chat */}
                            {isSocialMode && !zenMode && (
                                <>
                                    <FloatingAvatars count={5} />
                                    <ChatSidebar />
                                </>
                            )}

                            {/* Bottom Control Panel - UNIFIED */}
                            {uiVisible && (
                                <motion.div
                                    initial={{ y: 200, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 200, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl"
                                >
                                    <div className="w-full rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl">
                                        <AudioControlPanel
                                            roomName={roomData?.name}
                                            currentUsers={roomData?.currentUsers}
                                            onLeave={handleLeave}
                                            isSocialMode={isSocialMode}
                                            isMediaBrowserOpen={isMediaBrowserOpen}
                                            setIsMediaBrowserOpen={setIsMediaBrowserOpen}
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Explicit Start Audio Button */}
                            {!audioManager.getCurrentTrackInfo() && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => {
                                        audioManager.resumeContext();
                                        if (roomData?.id) audioManager.playRoom(roomData.id);
                                    }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full border border-white/30 text-white font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
                                >
                                    Click to Start Audio
                                </motion.button>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>
        </RoomVideoBackground>
    );
};

export default React.memo(Room);
