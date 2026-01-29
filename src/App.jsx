import React, { useEffect, Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { pageTransition } from './utils/transitions';
import audioManager from './utils/audioManager';
import { ROOMS_DATA } from './data/rooms';

// Foundation Components
import { CursorProvider } from './context/CursorContext';
import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';
import CinematicIntro from './components/ui/CinematicIntro';

// Lazy load components
const LandingPage = lazy(() => import('./components/LandingPage'));
const Room = lazy(() => import('./components/Room'));
const PersonalLounge = lazy(() => import('./components/personal-lounge/PersonalLounge'));


// detailed wrapper to find room data
const RoomWrapper = () => {
  const { roomId } = useParams();
  const room = ROOMS_DATA.find(r => r.id === roomId);

  if (!room) return <div className="text-white text-center mt-20">Room not found</div>;

  if (room.id === 'personal-lounge') {
    return (
      <motion.div
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full"
      >
        <PersonalLounge roomData={room} />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      <Room roomData={room} />
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Global Audio Cleanup: If not in a room, stop everything.
    if (!location.pathname.startsWith('/room/')) {
      audioManager.stopAll();
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full"
            >
              <LandingPage rooms={ROOMS_DATA} />
            </motion.div>
          }
        />
        <Route path="/room/:roomId" element={<RoomWrapper />} />
      </Routes>
    </AnimatePresence>
  );
};

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen w-full bg-black text-white">
    <div className="animate-pulse">Loading Vibe Space...</div>
  </div>
);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize audio manager with room data
    audioManager.init(ROOMS_DATA);

    // Preload audios
    ROOMS_DATA.forEach(room => {
      if (room.audioFile) {
        audioManager.loadRoom(room.id, room.audioFile);
      }
    });

  }, []);

  return (
    <CursorProvider>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Router>
            <Suspense fallback={<LoadingScreen />}>
              <AnimatedRoutes />
            </Suspense>
          </Router>
        </motion.div>
      )}
    </CursorProvider>
  );
}

export default App;
