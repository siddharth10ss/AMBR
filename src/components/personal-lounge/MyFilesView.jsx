import React, { useState, useRef } from 'react';
import { Upload, Music, Trash2, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

const MyFilesView = () => {
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [currentFile, setCurrentFile] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    const handleFileSelect = (e) => {
        const selected = Array.from(e.target.files);
        const newFiles = selected.filter(f => f.type.startsWith('audio/')).map(f => ({
            id: Math.random().toString(36).substr(2, 9),
            file: f,
            name: f.name,
            url: URL.createObjectURL(f)
        }));
        setFiles(prev => [...prev, ...newFiles]);
    };

    const handlePlay = (file) => {
        if (currentFile?.id === file.id && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            if (currentFile?.id !== file.id) {
                audioRef.current.src = file.url;
                setCurrentFile(file);
            }
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const removeFile = (id) => {
        setFiles(prev => prev.filter(f => f.id !== id));
        if (currentFile?.id === id) {
            audioRef.current.pause();
            setCurrentFile(null);
            setIsPlaying(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col md:flex-row gap-6">
            {/* Upload Area */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 min-h-[200px] border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-fuchsia-500/50 hover:bg-white/5 transition-all group"
                >
                    <div className="p-4 rounded-full bg-white/5 group-hover:bg-fuchsia-500/20 mb-4 transition-colors">
                        <Upload size={32} className="text-white/60 group-hover:text-fuchsia-400" />
                    </div>
                    <h3 className="font-bold text-white mb-1">Upload Music</h3>
                    <p className="text-sm text-white/50 text-center">Click or drag mp3, wav files here</p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        multiple
                        accept="audio/*"
                        className="hidden"
                    />
                </div>

                {/* Visualizer Placeholder */}
                <div className="h-40 glass rounded-2xl flex items-center justify-center text-white/20">
                    <span className="text-xs uppercase tracking-widest">Visualizer Ready</span>
                </div>
            </div>

            {/* Playlist */}
            <div className="flex-1 glass rounded-2xl p-6 overflow-hidden flex flex-col">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Music size={18} className="text-fuchsia-400" />
                    Your Library ({files.length})
                </h3>

                <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                    {files.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-white/30">
                            <Music size={48} className="mb-4 opacity-50" />
                            <p>No tracks added yet</p>
                        </div>
                    ) : (
                        files.map((file, idx) => (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${currentFile?.id === file.id ? 'bg-fuchsia-500/20 border border-fuchsia-500/30' : 'bg-white/5 hover:bg-white/10'
                                    }`}
                            >
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <button
                                        onClick={() => handlePlay(file)}
                                        className={`p-2 rounded-full ${currentFile?.id === file.id ? 'bg-fuchsia-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                                            }`}
                                    >
                                        {currentFile?.id === file.id && isPlaying ? <Pause size={14} /> : <Play size={14} />}
                                    </button>
                                    <div className="flex flex-col overflow-hidden">
                                        <span className={`font-medium truncate ${currentFile?.id === file.id ? 'text-fuchsia-200' : 'text-white'}`}>
                                            {file.name}
                                        </span>
                                        <span className="text-xs text-white/40">Local File</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeFile(file.id)}
                                    className="p-2 text-white/30 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyFilesView;
