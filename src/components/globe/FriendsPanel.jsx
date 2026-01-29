import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, X, LogOut, MessageSquare, Play } from 'lucide-react';

const MOCK_FRIENDS = [
    { id: 1, name: 'Alex', status: 'online', activity: 'In Rain Cafe 🌧️', avatar: 'bg-green-500' },
    { id: 2, name: 'Sarah', status: 'online', activity: 'In Neon Lounge ⚡', avatar: 'bg-purple-500' },
    { id: 3, name: 'Mike', status: 'offline', activity: 'Last seen 2h ago', avatar: 'bg-blue-500' },
    { id: 4, name: 'Emma', status: 'online', activity: 'Creating Room...', avatar: 'bg-pink-500' },
];

const FriendItem = ({ friend }) => (
    <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg group transition-colors">
        <div className="flex items-center gap-3">
            <div className={`relative w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs ${friend.avatar}`}>
                {friend.name[0]}
                {friend.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                )}
            </div>
            <div>
                <div className="text-white text-sm font-bold">{friend.name}</div>
                <div className="text-white/40 text-xs">{friend.activity}</div>
            </div>
        </div>

        {friend.status === 'online' && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-white/10 rounded-full text-white/60 hover:text-white" title="Message">
                    <MessageSquare size={14} />
                </button>
                <button className="p-1.5 hover:bg-white/10 rounded-full text-white/60 hover:text-cyan-400" title="Join">
                    <Play size={14} />
                </button>
            </div>
        )}
    </div>
);

const FriendsPanel = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-80 bg-[#050505]/95 border-l border-white/10 z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-2">
                                <Users className="text-green-400" size={20} />
                                <h2 className="text-white font-bold tracking-wide">Friends</h2>
                                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full">3 ONLINE</span>
                            </div>
                            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* List */}
                        <div className="flex-1 overflow-y-auto p-2 space-y-1">
                            {MOCK_FRIENDS.map(friend => (
                                <FriendItem key={friend.id} friend={friend} />
                            ))}
                        </div>

                        {/* Footer / Add Friend */}
                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <button className="w-full py-3 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold text-sm transition-colors border border-white/5">
                                <UserPlus size={16} />
                                <span>Add Friend</span>
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default FriendsPanel;
