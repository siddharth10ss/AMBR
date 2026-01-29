import React, { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RoomGallery from './RoomGallery';
import { Sparkles, Zap, Coffee, Tent, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { staggerContainer } from '../utils/animations';
// Lazy load the heavy 3D globe to avoid large initial bundle size
const AtmosphereGlobe = React.lazy(() => import('./globe/AtmosphereGlobe'));
import AmbientParticles from './effects/AmbientParticles';
import { TextGradient, TextReveal } from './ui/TextAnimations';
import useEasterEggs from '../hooks/useEasterEggs';

const LandingPage = ({ rooms }) => {
    const navigate = useNavigate();
    const { handleLogoDoubleClick } = useEasterEggs();

    // Scroll handling just for opacity of the 3D scene when scrolling down?
    // Actually AtmosphereGlobe is full screen fixed mostly? 
    // Let's keep smooth scroll container behavior.

    return (
        <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 overflow-x-hidden">

            {/* 3D Hero Section (The Fifth Element) */}
            <section className="relative w-full h-screen">
                <Suspense fallback={<div className="absolute inset-0 bg-black flex items-center justify-center text-white/30 font-mono tracking-widest">INITIALIZING ATMOSPHERE...</div>}>
                    <AtmosphereGlobe />
                </Suspense>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 2, duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 pointer-events-none z-20"
                >
                    <span className="text-xs uppercase tracking-widest">Explore The Galaxy</span>
                    <ChevronDown size={20} />
                </motion.div>
            </section>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                {/* Room Gallery */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full -mx-6 md:-mx-[calc( (100vw-min(100vw,80rem))/2 + 1.5rem )]" // Negative margin to break out of container
                >
                    <div className="w-screen max-w-full">
                        <RoomGallery
                            rooms={rooms}
                            onRoomClick={(id) => navigate(`/room/${id}`)}
                        />
                    </div>
                </motion.div>

                {/* Feature Highlights */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
                >
                    {[
                        { icon: Zap, label: "Real-time" },
                        { icon: Coffee, label: "Chill Vibes" },
                        { icon: Sparkles, label: "Immersive" },
                        { icon: Tent, label: "Cozy" },
                    ].map(({ icon: Icon, label }, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 text-white/40 hover:text-white transition-colors duration-500 group">
                            <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                <Icon size={24} />
                            </div>
                            <span className="caption group-hover:text-white transition-colors">{label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <footer className="relative z-10 border-t border-white/5 py-12 text-center text-white/20 text-sm">
                <p>© 2026 AMBR. Built for the Hackathon.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
