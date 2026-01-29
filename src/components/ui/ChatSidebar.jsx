import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Users, ChevronLeft, ChevronRight, Hash, MessageCircle } from 'lucide-react';

const MOCK_MESSAGES = [
    { id: 1, user: 'Alex', text: 'Yo this track is fire 🔥', time: '12:01', color: '#4ade80' },
    { id: 2, user: 'Sarah', text: 'Can we queue some lo-fi next?', time: '12:02', color: '#60a5fa' },
    { id: 3, user: 'System', text: 'Mike joined the room', time: '12:03', type: 'system' },
];

const MEMBER_LIST = [
    { id: 1, name: 'You', status: 'online', color: '#ffffff' },
    { id: 2, name: 'Alex', status: 'listening', color: '#4ade80' },
    { id: 3, name: 'Sarah', status: 'typing...', color: '#60a5fa' },
    { id: 4, name: 'Mike', status: 'online', color: '#f87171' },
];

const ChatSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage = {
            id: Date.now(),
            user: 'You',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            color: '#fff'
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    return (
        <>
            {/* Toggle Button (Visible when closed) */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed top-24 left-4 z-40 p-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all group"
                    >
                        <MessageCircle size={20} />
                        <span className="absolute left-12 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded text-xs whitespace-nowrap">Open Chat</span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Sidebar Panel */}
            <motion.div
                initial={{ x: -320 }}
                animate={{ x: isOpen ? 0 : -320 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 h-full w-80 bg-black/80 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-2">
                        <Hash className="text-white/40" size={18} />
                        <span className="font-bold text-white tracking-wide">Room Chat</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <ChevronLeft className="text-white/60" size={20} />
                    </button>
                </div>

                {/* Members Strip */}
                <div className="px-4 py-3 border-b border-white/5 bg-black/20 overflow-x-auto no-scrollbar flex gap-2">
                    {MEMBER_LIST.map((member) => (
                        <div key={member.id} className="relative group cursor-pointer flex-shrink-0">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border border-white/10"
                                style={{ backgroundColor: `${member.color}20`, color: member.color }}
                            >
                                {member.name.substring(0, 2).toUpperCase()}
                            </div>
                            {member.status !== 'online' && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
                            )}
                            {/* Tooltip */}
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                                {member.name} • {member.status}
                            </div>
                        </div>
                    ))}
                    <button className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
                        <Users size={14} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans no-scrollbar">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex flex-col ${msg.type === 'system' ? 'items-center my-4' : 'items-start'}`}
                        >
                            {msg.type === 'system' ? (
                                <span className="text-[10px] uppercase tracking-widest text-white/30 bg-white/5 px-3 py-1 rounded-full">
                                    {msg.text}
                                </span>
                            ) : (
                                <div className="group w-full hover:bg-white/5 p-2 -mx-2 rounded-lg transition-colors">
                                    <div className="flex items-baseline gap-2 mb-0.5">
                                        <span className="text-xs font-bold" style={{ color: msg.color }}>{msg.user}</span>
                                        <span className="text-[10px] text-white/20">{msg.time}</span>
                                    </div>
                                    <p className="text-sm text-white/80 leading-relaxed break-words">
                                        {msg.text}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-black/40">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Say something..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all placeholder:text-white/20"
                        />
                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="absolute right-2 p-1.5 bg-white/10 hover:bg-cyan-500 rounded-lg text-white/60 hover:text-white disabled:opacity-0 disabled:scale-0 transition-all duration-200"
                        >
                            <Send size={14} />
                        </button>
                    </div>
                </form>
            </motion.div>
        </>
    );
};

export default ChatSidebar;
