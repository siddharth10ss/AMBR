import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Pause, Play, LogOut, Users, SkipBack, SkipForward, Music, ListMusic, X, Youtube, FileAudio, Sparkles } from 'lucide-react';
import audioManager from '../../utils/audioManager';

// Import Personal Lounge Views
import SpotifyView from '../personal-lounge/SpotifyView';
import YouTubeView from '../personal-lounge/YouTubeView';
import MyFilesView from '../personal-lounge/MyFilesView';

const AudioWaveform = ({ isPlaying }) => {
    return (
        <div className="flex items-center gap-1 h-12">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1.5 rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500"
                    animate={{
                        height: isPlaying ? [8, 4 + Math.random() * 32, 8] : 4,
                        opacity: isPlaying ? [0.6, 1, 0.6] : 0.4
                    }}
                    transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        repeatType: "mirror",
                        delay: i * 0.05,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

const MediaBrowser = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState('spotify');

    const tabs = [
        { id: 'spotify', label: 'Spotify', icon: Music },
        { id: 'youtube', label: 'YouTube', icon: Youtube },
        { id: 'local', label: 'My Files', icon: FileAudio },
    ];

    return (
        <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute bottom-full left-0 w-full h-[60vh] bg-black/90 backdrop-blur-3xl border-t border-white/10 rounded-t-2xl shadow-2xl flex flex-col z-50 mb-2"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                    <ListMusic size={20} className="text-fuchsia-400" />
                    <h3 className="font-bold text-white tracking-wide">Media Browser</h3>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-black/40 p-1 rounded-full border border-white/5">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === tab.id
                                ? 'bg-white/20 text-white shadow-sm'
                                : 'text-white/40 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden p-4 relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'spotify' && (
                        <motion.div key="spotify" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full h-full">
                            <SpotifyView />
                        </motion.div>
                    )}
                    {activeTab === 'youtube' && (
                        <motion.div key="youtube" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full h-full">
                            <YouTubeView />
                        </motion.div>
                    )}
                    {activeTab === 'local' && (
                        <motion.div key="local" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full h-full">
                            <MyFilesView />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const AudioControlPanel = ({ roomName, currentUsers, onLeave, isMediaBrowserOpen, setIsMediaBrowserOpen }) => {
    const [volume, setVolume] = useState(audioManager.getCurrentVolume());
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(audioManager.getCurrentTrackInfo());

    // Sync with audio manager state & updates
    useEffect(() => {
        // Initial state
        setCurrentTrack(audioManager.getCurrentTrackInfo());

        // Subscribe to track changes
        const unsubscribe = audioManager.subscribe(({ track }) => {
            setCurrentTrack(track);
        });

        // Poll volume (or add volume to subscription if refactored further)
        const interval = setInterval(() => {
            setVolume(audioManager.getCurrentVolume());
        }, 100);

        return () => {
            unsubscribe();
            clearInterval(interval);
        };
    }, []);

    const handleVolumeChange = (e) => {
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        audioManager.setVolume(newVol);
        if (newVol > 0 && isMuted) setIsMuted(false);
    };

    const toggleMute = () => {
        if (isMuted) {
            audioManager.setVolume(volume || 0.5);
            setIsMuted(false);
        } else {
            audioManager.setVolume(0);
            setIsMuted(true);
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioManager.setVolume(0);
            setIsPlaying(false);
        } else {
            audioManager.setVolume(volume);
            setIsPlaying(true);
        }
    };

    const handleNextTrack = () => audioManager.nextTrack();
    const handlePrevTrack = () => audioManager.prevTrack();

    return (
        <div className="relative w-full h-full">
            {/* Media Browser Overlay */}
            <AnimatePresence>
                {isMediaBrowserOpen && <MediaBrowser onClose={() => setIsMediaBrowserOpen(false)} />}
            </AnimatePresence>

            <div className="flex items-center justify-between px-6 py-4 w-full h-full relative z-20 bg-black/20 backdrop-blur-sm">

                {/* Left: Playback & Track Info */}
                <div className="flex items-center gap-6">

                    {/* Controls */}
                    <div className="flex items-center gap-2">
                        <button onClick={handlePrevTrack} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <SkipBack size={18} className="text-white/80" />
                        </button>

                        <button
                            onClick={togglePlay}
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/10 hover:bg-white/20 transition-all active:scale-95 group"
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? (
                                <Pause size={20} className="fill-white/80 text-white/80" />
                            ) : (
                                <Play size={20} className="fill-white/80 text-white/80 ml-1" />
                            )}
                        </button>

                        <button onClick={handleNextTrack} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <SkipForward size={18} className="text-white/80" />
                        </button>
                    </div>

                    <div className="flex flex-col min-w-[200px]">
                        <div className="flex items-center gap-2 mb-1">
                            <Music size={12} className="text-indigo-400" />
                            <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">Now Playing</span>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentTrack?.title}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                id="now-playing-text"
                                className="font-bold text-white tracking-wide truncate max-w-[250px]"
                            >
                                {currentTrack?.title || "Loading..."}
                            </motion.span>
                        </AnimatePresence>

                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-white/40">{roomName}</span>
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <div className="flex items-center gap-1">
                                <Users size={10} className="text-gray-400" />
                                <span className="text-xs text-gray-400 font-mono">{currentUsers}</span>
                            </div>
                        </div>
                    </div>

                    {/* Visualizer */}
                    <div className="hidden md:block opacity-50 scale-75 origin-left">
                        <AudioWaveform isPlaying={isPlaying} />
                    </div>
                </div>

                {/* Right: Volume & Actions */}
                <div className="ml-auto flex-shrink-0 flex items-center justify-end gap-4 md:gap-6 pr-8">

                    {/* AI Generation Button */}
                    <button
                        onClick={() => {
                            // Demo Simulation
                            const originalText = document.getElementById('now-playing-text')?.innerText;
                            // Show Toast (Simple alert for now or we build a proper toast system)
                            // Let's us use window.alert ? No, too ugly.
                            // Just console log and maybe shake the UI?
                            // Or better: Update the "Now Playing" text temporarily

                            const nowPlayingEl = document.getElementById('now-playing-text');
                            if (nowPlayingEl) {
                                nowPlayingEl.innerText = "✨ Analytic Vibe Check...";
                                setTimeout(() => {
                                    nowPlayingEl.innerText = "🔮 Synthesizing Stream...";
                                    setTimeout(() => {
                                        const result = audioManager.generateSmartMix(audioManager.currentRoomId);
                                        if (result) {
                                            nowPlayingEl.innerText = result.trackName;
                                        }
                                    }, 1500);
                                }, 1500);
                            }
                        }}
                        className="p-2 rounded-full text-indigo-400 hover:text-indigo-200 hover:bg-indigo-500/10 transition-all flex items-center justify-center group relative"
                        title="Generate AI Soundscape"
                    >
                        <Sparkles size={20} className="animate-pulse" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            AI Remix
                        </span>
                    </button>

                    {/* Media Browser Toggle */}
                    <button
                        onClick={() => setIsMediaBrowserOpen(!isMediaBrowserOpen)}
                        className={`p-2 rounded-full transition-all ${isMediaBrowserOpen ? 'bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(232,121,249,0.5)]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                        title="Media Browser"
                    >
                        <ListMusic size={20} />
                    </button>

                    <div className="h-8 w-[1px] bg-white/10" />

                    {/* Volume Slider */}
                    <div className="hidden md:flex items-center gap-3 group">
                        <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors" aria-label={isMuted ? "Unmute" : "Mute"}>
                            {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>

                        <div className="relative w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-400 to-purple-400"
                                style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={isMuted ? 0 : volume}
                                onChange={handleVolumeChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                aria-label="Volume"
                            />
                        </div>
                    </div>

                    <div className="h-8 w-[1px] bg-white/10" />

                    <button
                        onClick={onLeave}
                        className="flex items-center gap-2 group px-3 py-2 rounded-full hover:bg-red-500/10 transition-colors"
                    >
                        <span className="text-sm font-medium text-gray-400 group-hover:text-red-400 transition-colors">Leave</span>
                        <LogOut size={16} className="text-gray-500 group-hover:text-red-400 transition-colors" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AudioControlPanel);
