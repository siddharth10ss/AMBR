import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, ExternalLink, Check } from 'lucide-react';

const PrivacyModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasAccepted = localStorage.getItem('ambr_privacy_accepted');
        if (!hasAccepted) {
            setIsOpen(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('ambr_privacy_accepted', 'true');
        setIsOpen(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-400">
                                    <Shield size={24} />
                                </div>
                                <h2 className="text-xl font-bold text-white">Your Privacy Matters</h2>
                            </div>

                            <div className="space-y-4 text-white/70 text-sm leading-relaxed mb-8">
                                <p>
                                    Welcome to the Personal Lounge. Before you proceed, please understand how your data is handled in each mode:
                                </p>

                                <ul className="space-y-3">
                                    <li className="flex gap-3">
                                        <div className="mt-0.5 min-w-[20px]"><Lock size={16} className="text-indigo-400" /></div>
                                        <div>
                                            <strong className="text-white block mb-0.5">My Files Mode</strong>
                                            Files are processed locally in your browser. They are never uploaded to any server.
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="mt-0.5 min-w-[20px]"><ExternalLink size={16} className="text-green-400" /></div>
                                        <div>
                                            <strong className="text-white block mb-0.5">Spotify Integration</strong>
                                            We link to your Spotify account only to control playback. We do not store your credentials.
                                        </div>
                                    </li>
                                    <li className="flex gap-3">
                                        <div className="mt-0.5 min-w-[20px]"><ExternalLink size={16} className="text-red-400" /></div>
                                        <div>
                                            <strong className="text-white block mb-0.5">YouTube Integration</strong>
                                            Content is streamed directly from YouTube, subject to Google's Privacy Policy.
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <button
                                onClick={handleAccept}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                            >
                                <Check size={18} />
                                I Understand & Accept
                            </button>
                        </div>
                        <div className="bg-white/5 p-4 text-center">
                            <a href="#" className="text-xs text-white/30 hover:text-white/50 transition-colors">Read full Privacy Policy</a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PrivacyModal;
