import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileAudio, Youtube, Music, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import audioManager from '../../utils/audioManager';
import BackgroundLayers from '../effects/BackgroundLayers';
import ParticleEffect from '../effects/ParticleEffect';
import MyFilesView from './MyFilesView';
import SpotifyView from './SpotifyView';
import YouTubeView from './YouTubeView';
import PrivacyModal from './PrivacyModal';
import LegalFooter from './LegalFooter';

const PersonalLounge = ({ roomData }) => {
    const navigate = useNavigate();
    const [activeMode, setActiveMode] = useState('files'); // files, spotify, youtube

    const handleLeave = () => {
        audioManager.stopAll();
        navigate('/');
    };

    const modes = [
        { id: 'files', label: 'My Files', icon: FileAudio },
        { id: 'spotify', label: 'Spotify', icon: Music },
        { id: 'youtube', label: 'YouTube', icon: Youtube }
    ];

    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-violet-900 via-fuchsia-900 to-purple-900 selection:bg-fuchsia-500/30">
            {/* Background Ambience */}
            <BackgroundLayers theme="neonLounge" />
            <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
                <ParticleEffect color={roomData?.colors?.accent || '#d8b4fe'} />
            </div>

            {/* Main Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-5xl h-[85vh] flex flex-col rounded-3xl overflow-hidden glass-dark border border-white/10 shadow-2xl"
            >
                {/* Header / Mode Selector */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/20">
                    <div className="flex items-center gap-4">
                        <h2 className="heading-md text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                            Personal Lounge
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 p-1 rounded-full bg-black/40 border border-white/5">
                        {modes.map((mode) => (
                            <button
                                key={mode.id}
                                onClick={() => setActiveMode(mode.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${activeMode === mode.id
                                    ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-500/20'
                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <mode.icon size={16} />
                                <span className="text-sm font-medium">{mode.label}</span>
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={handleLeave}
                        className="flex items-center gap-2 group px-4 py-2 rounded-full hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20"
                    >
                        <span className="text-sm font-medium text-white/50 group-hover:text-red-400 transition-colors">Leave</span>
                        <LogOut size={16} className="text-white/50 group-hover:text-red-400 transition-colors" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden relative p-8">
                    <AnimatePresence mode="wait">
                        {activeMode === 'files' && (
                            <motion.div
                                key="files"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="w-full h-full"
                            >
                                <MyFilesView />
                            </motion.div>
                        )}
                        {/* Spotify View */}
                        {activeMode === 'spotify' && (
                            <motion.div
                                key="spotify"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="w-full h-full"
                            >
                                <SpotifyView />
                            </motion.div>
                        )}

                        {/* YouTube View */}
                        {activeMode === 'youtube' && (
                            <motion.div
                                key="youtube"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="w-full h-full"
                            >
                                <YouTubeView />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Unified Player Controls Implementation here or reused */}
            </motion.div>

            <PrivacyModal />
            <LegalFooter />
        </div>
    );
};

export default PersonalLounge;
