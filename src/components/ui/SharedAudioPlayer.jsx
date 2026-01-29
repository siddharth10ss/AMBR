import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, Users, Mic2, Heart, ListMusic } from 'lucide-react';
import { motion } from 'framer-motion';

const SharedAudioPlayer = ({ isPlaying, onTogglePlay }) => {
    const [progress, setProgress] = useState(30);
    const [votes, setVotes] = useState(3);
    const [hasVoted, setHasVoted] = useState(false);

    // Simulate progress
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setProgress(p => (p >= 100 ? 0 : p + 0.1));
        }, 100);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleVote = () => {
        if (!hasVoted) {
            setVotes(v => v + 1);
            setHasVoted(true);
        } else {
            setVotes(v => v - 1);
            setHasVoted(false);
        }
    };

    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl mb-8 px-4 z-40">
            {/* Main Player Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative"
            >
                {/* Progress Bar (Top) */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
                    <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex items-center justify-between p-4">

                    {/* Track Info */}
                    <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden relative group">
                            <img
                                src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop"
                                alt="Album Art"
                                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm leading-tight">Midnight City</h3>
                            <p className="text-white/40 text-xs">M83 • Synced Playback</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 px-4">
                        <button className="text-white/40 hover:text-white transition-colors">
                            <Mic2 size={18} />
                        </button>

                        <button
                            onClick={onTogglePlay}
                            className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                            {isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" className="ml-0.5" />}
                        </button>

                        <button className="text-white/40 hover:text-white transition-colors">
                            <SkipForward size={18} />
                        </button>
                    </div>

                    {/* Social / Queue */}
                    <div className="flex items-center gap-3 flex-1 justify-end pl-4 border-l border-white/5">
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1.5 mb-1">
                                <Users size={12} className="text-cyan-400" />
                                <span className="text-[10px] font-bold text-white/90">4 LISTENING</span>
                            </div>
                            <div className="flex -space-x-1.5">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-4 h-4 rounded-full border border-black bg-white/20" />
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleVote}
                            className={`flex flex-col items-center gap-0.5 group ${hasVoted ? 'text-rose-500' : 'text-white/20 hover:text-rose-400'}`}
                        >
                            <Heart size={18} className={`transition-all ${hasVoted ? 'fill-rose-500 scale-110' : ''}`} />
                            <span className="text-[9px] font-mono">{votes}</span>
                        </button>

                        <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">
                            <ListMusic size={20} />
                        </button>
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default SharedAudioPlayer;
