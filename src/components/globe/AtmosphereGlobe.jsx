import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Environment, Loader, PerspectiveCamera } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import MainPlanet from './MainPlanet';
import GlobeCore from './GlobeCore';
import SocialSatelliteSystem from './SocialSatelliteSystem';
import CreateRoomModal from './CreateRoomModal';
import FriendsPanel from './FriendsPanel';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Atom, Radio, Users } from 'lucide-react'; // Added Users icon
import * as THREE from 'three';
import { SOCIAL_ROOMS_DATA } from '../../data/socialRooms';
import WarpEffect from '../effects/WarpEffect';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Camera Rig to handle Core transitions
const CameraRig = ({ viewMode, controlsRef }) => {
    // eslint-disable-next-line
    const { camera } = useThree();
    const vec = new THREE.Vector3();

    useFrame((state) => {
        if (viewMode === 'core') {
            // --- CORE VIEW (Inside the Globe) ---
            const targetPos = new THREE.Vector3(0, 0, 1.5);

            // Smoothly move camera
            state.camera.position.lerp(targetPos, 0.02);
            state.camera.lookAt(0, 0, 0);

            // Disable manual controls while zoomed in
            if (controlsRef.current) controlsRef.current.enabled = false;
        } else {
            // --- GLOBAL VIEW ---
            if (controlsRef.current) {
                controlsRef.current.enabled = true;
                controlsRef.current.update();
            }

            // Safety: ONLY apply if we are intentionally in global mode and accidentally inside
            if (viewMode === 'global' && state.camera.position.length() < 2.5) {
                const currentLen = state.camera.position.length();
                const targetLen = 3.5;
                state.camera.position.setLength(currentLen + (targetLen - currentLen) * 0.05);
            }
        }
    });

    useEffect(() => {
        if (controlsRef.current) {
            controlsRef.current.target.set(0, 0, 0);
        }
    }, [viewMode]);

    return null;
}

// Error Boundary
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("3D Globe Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-red-400 font-mono text-xs p-4 text-center">
                    <div className="mb-2">[VISUAL SYSTEM OFFLINE]</div>
                    <div className="text-white/30">{this.state.error?.toString()}</div>
                </div>
            );
        }
        return this.props.children;
    }
}

const AtmosphereGlobe = () => {
    const navigate = useNavigate();
    const [hoveredRoomId, setHoveredRoomId] = useState(null);
    const [viewMode, setViewMode] = useState('global'); // 'global' | 'core'
    const [creationModalOpen, setCreationModalOpen] = useState(false);
    const [friendsPanelOpen, setFriendsPanelOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const controlsRef = useRef();

    const handleRoomEnter = (roomId) => {
        setIsTransitioning(true);
        setTimeout(() => {
            navigate(`/room/${roomId}`);
        }, 1500); // Wait for warp effect
    };

    const handleSocialRoomSelect = (room) => {
        console.log("Joined Social Room:", room.name);
        if (room.type === 'empty') {
            setCreationModalOpen(true);
        } else {
            console.log(`Joining ${room.name}...`);
            alert(`Joining ${room.name}... (Demo)`);
        }
    };

    const handleCreateRoom = (roomData) => {
        console.log("Creating Room:", roomData);
        setCreationModalOpen(false);
        // Navigate to the chosen vibe room, but pass the custom name to override it
        navigate(`/room/${roomData.vibe}`, {
            state: {
                customName: roomData.name,
                isPrivate: roomData.private,
                isSocialMode: true // Force social mode for created rooms
            }
        });
    };

    const handleQuickMatch = () => {
        const publicRooms = SOCIAL_ROOMS_DATA.filter(r => r.type === 'public');
        if (publicRooms.length > 0) {
            const randomRoom = publicRooms[Math.floor(Math.random() * publicRooms.length)];
            // Navigate to random existing public room (Mock ID -> Vibe ID)
            // For demo, we'll map randomRoom.id to 'rain-cafe' or 'neon-lounge' arbitrarily if ID doesn't match
            // or just assume the mock data IDs match real IDs? 
            // Mock data has 'room-alex' etc. Let's just default to 'neon-lounge' for the demo if ID is unknown.
            const targetId = ['rain-cafe', 'neon-lounge', 'forest-focus'][Math.floor(Math.random() * 3)];

            navigate(`/room/${targetId}`, {
                state: {
                    customName: randomRoom.name,
                    isSocialMode: true
                }
            });
        } else {
            alert("No public rooms active right now. Why not create one?");
            setCreationModalOpen(true);
        }
    };

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">

            {/* 3D Scene */}
            <ErrorBoundary>
                <Canvas
                    gl={{ antialias: true, alpha: false }}
                    dpr={[1, 1.5]}
                    performance={{ min: 0.5 }}
                >
                    <PerspectiveCamera makeDefault position={[0, 2, 7]} fov={45} />

                    <CameraRig viewMode={viewMode} controlsRef={controlsRef} />

                    <color attach="background" args={['#050505']} />

                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffd4a3" />
                    <pointLight position={[-10, -5, -10]} intensity={1} color="#4c6ef5" />

                    <Environment preset="city" blur={0.8} background={false} />

                    <group rotation={[0, 0, 0.1]}>
                        <Suspense fallback={null}>
                            <MainPlanet
                                onHover={setHoveredRoomId}
                                onRoomClick={handleRoomEnter}
                            />

                            <GlobeCore
                                onHover={(isHover) => setHoveredRoomId(isHover ? 'personal-lounge' : null)}
                                onCoreClick={() => setViewMode('core')}
                                isHoveredOuter={!!hoveredRoomId}
                            />

                            <SocialSatelliteSystem onRoomSelect={handleSocialRoomSelect} />
                        </Suspense>
                    </group>



                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={1.2} />
                    </EffectComposer>

                    <OrbitControls
                        ref={controlsRef}
                        enabled={viewMode === 'global' && !creationModalOpen && !friendsPanelOpen} // Disable controls when UI is open!
                        enableZoom={viewMode === 'global' && !creationModalOpen && !friendsPanelOpen}
                        enablePan={false}
                        autoRotate={!hoveredRoomId && viewMode === 'global' && !creationModalOpen && !friendsPanelOpen}
                        autoRotateSpeed={0.5}
                        dampingFactor={0.05}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI - Math.PI / 4}
                        maxDistance={12}
                        minDistance={3.5}
                    />
                </Canvas>
            </ErrorBoundary>

            <Loader />

            {/* UI Overlay (HUD) */}
            <div className={`absolute inset-0 pointer-events-none flex flex-col justify-between p-8 z-10 ${creationModalOpen || friendsPanelOpen ? 'backdrop-blur-sm' : ''}`}>

                {/* Make sure these utilize pointer-events-auto inside them */}
                <div className="pointer-events-auto">
                    <CreateRoomModal
                        isOpen={creationModalOpen}
                        onClose={() => setCreationModalOpen(false)}
                        onCreate={handleCreateRoom}
                    />
                </div>

                <div className="pointer-events-auto">
                    <FriendsPanel
                        isOpen={friendsPanelOpen}
                        onClose={() => setFriendsPanelOpen(false)}
                    />
                </div>

                {/* Top Right Friends Button */}
                <div className="absolute top-8 right-8 pointer-events-auto z-50">
                    <button
                        onClick={() => setFriendsPanelOpen(prev => !prev)}
                        className="relative p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors group"
                    >
                        <Users size={20} className="text-white/70 group-hover:text-white transition-colors" />
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 text-[9px] font-bold text-black items-center justify-center">3</span>
                        </span>
                    </button>
                </div>

                {/* Header */}
                <div className="flex flex-col items-center mt-4 text-center pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
                    >
                        <Sparkles size={16} className="text-yellow-300" />
                        <span className="text-xs uppercase tracking-widest text-white/80">Experience ambient presence</span>
                    </motion.div>

                    <div className="relative">
                        <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-none">
                            Find Your
                        </h1>
                        <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400 tracking-tight leading-none">
                            Vibe Space
                        </h1>
                    </div>

                    {/* View Toggle Buttons & Quick Match */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pointer-events-auto">
                        <button
                            onClick={() => setViewMode('global')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all duration-300 ${viewMode === 'global' ? 'bg-white text-black border-white' : 'bg-black/50 text-white/50 border-white/20 hover:border-white/50'}`}
                        >
                            <Globe size={16} />
                            <span className="text-xs font-bold tracking-widest uppercase">Global View</span>
                        </button>
                        <button
                            onClick={() => setViewMode('core')}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all duration-300 ${viewMode === 'core' ? 'bg-[#ff00ff] text-white border-[#ff00ff]' : 'bg-black/50 text-white/50 border-white/20 hover:border-white/50'}`}
                        >
                            <Atom size={16} />
                            <span className="text-xs font-bold tracking-widest uppercase">The Core</span>
                        </button>

                        <div className="w-px h-8 bg-white/20 mx-2" /> {/* Divider */}

                        <button
                            onClick={handleQuickMatch}
                            className="flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-500/50 bg-cyan-900/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                        >
                            <Radio size={16} className="animate-pulse" />
                            <span className="text-xs font-bold tracking-widest uppercase">Quick Match</span>
                        </button>
                    </div>
                </div>

                {/* Footer / Status */}
                <div className="flex justify-between items-end">
                    <div className="text-white/20 font-mono text-xs">
                        Coordinates: CO.RE.00<br />
                        System Status: Online<br />
                        View: {viewMode === 'core' ? 'INNER CORE' : 'ORBITAL'}
                    </div>

                    <div className="text-right">
                        {viewMode === 'core' ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-right"
                            >
                                <div className="text-sm font-light text-[#ff00ff] uppercase tracking-widest mb-1">Internal Core</div>
                                <div className="text-2xl font-bold text-white">PERSONAL LOUNGE</div>
                                <button
                                    onClick={() => handleRoomEnter('personal-lounge')}
                                    className="mt-4 px-6 py-3 bg-[#ff00ff] text-white font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors pointer-events-auto"
                                >
                                    Enter The Core
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                animate={{ opacity: hoveredRoomId ? 1 : 0 }}
                                className="text-white text-right"
                            >
                                <div className="text-sm font-light text-cyan-400 uppercase tracking-widest mb-1">Target Locked</div>
                                <div className="text-2xl font-bold">{hoveredRoomId ? hoveredRoomId.replace('-', ' ').toUpperCase() : 'SEARCHING...'}</div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AtmosphereGlobe;
