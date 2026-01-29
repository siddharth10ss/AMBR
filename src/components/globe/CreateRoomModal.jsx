import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Music, Lock, Globe, Droplets, Trees, Zap, Flame } from 'lucide-react';

const VIBE_PRESETS = [
    { id: 'rain-cafe', name: 'Rain Cafe', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-900/50' },
    { id: 'forest-focus', name: 'Forest Focus', icon: Trees, color: 'text-green-400', bg: 'bg-green-900/50' },
    { id: 'neon-lounge', name: 'Neon Lounge', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-900/50' },
    { id: 'cozy-cabin', name: 'Cozy Cabin', icon: Flame, color: 'text-orange-400', bg: 'bg-orange-900/50' },
];

const CreateRoomModal = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [selectedVibe, setSelectedVibe] = useState(VIBE_PRESETS[0]);
    const [isPrivate, setIsPrivate] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({
            name,
            vibe: selectedVibe.id,
            private: isPrivate,
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto"
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-gradient-to-r from-white/5 to-transparent">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Globe size={20} className="text-cyan-400" />
                                Create Vibe Room
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">

                            {/* Room Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Room Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Late Night Study 🌙"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors pointer-events-auto select-text"
                                    autoFocus
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onKeyDown={(e) => e.stopPropagation()} // Prevent OrbitControls from interfering
                                />
                            </div>

                            {/* Vibe Selection */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-white/60 uppercase tracking-wider">Choose Atmosphere</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {VIBE_PRESETS.map((preset) => (
                                        <button
                                            key={preset.id}
                                            type="button"
                                            onClick={() => setSelectedVibe(preset)}
                                            className={`
                                                flex items-center gap-3 p-3 rounded-lg border transition-all duration-200
                                                ${selectedVibe.id === preset.id
                                                    ? 'bg-white/10 border-cyan-500/50 text-white'
                                                    : 'bg-white/5 border-transparent text-white/50 hover:bg-white/10 hover:text-white'}
                                            `}
                                        >
                                            <div className={`p-2 rounded-md ${preset.bg} ${preset.color}`}>
                                                <preset.icon size={16} />
                                            </div>
                                            <span className="text-sm font-medium">{preset.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Settings */}
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-md bg-white/5 ${isPrivate ? 'text-rose-400' : 'text-blue-400'}`}>
                                        {isPrivate ? <Lock size={18} /> : <Globe size={18} />}
                                    </div>
                                    <div className="text-left">
                                        <div className="text-sm font-bold text-white">
                                            {isPrivate ? 'Private Room' : 'Public Room'}
                                        </div>
                                        <div className="text-xs text-white/40">
                                            {isPrivate ? 'Invite only' : 'Anyone can join'}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsPrivate(!isPrivate)}
                                    className={`
                                        relative w-12 h-6 rounded-full transition-colors duration-200
                                        ${isPrivate ? 'bg-rose-500/20' : 'bg-blue-500/20'}
                                    `}
                                >
                                    <div className={`
                                        absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-200
                                        ${isPrivate ? 'bg-rose-500 translate-x-6' : 'bg-blue-500 translate-x-0'}
                                    `} />
                                </button>
                            </div>

                            {/* Action */}
                            <button
                                type="submit"
                                disabled={!name.trim()}
                                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl text-white font-bold text-sm tracking-widest uppercase hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Launch Vibe Room
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CreateRoomModal;
