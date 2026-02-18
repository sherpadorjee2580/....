import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Wish = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [elements, setElements] = useState([]);

  // Use useCallback to prevent unnecessary function recreation
  const addElement = useCallback((isSurge = false) => {
    const id = Math.random(); // Fast ID generation
    const newElement = {
      id,
      left: isSurge ? 10 + Math.random() * 80 : Math.random() * 100,
      size: isSurge ? Math.random() * 30 + 20 : Math.random() * 15 + 15,
      duration: isSurge ? Math.random() * 1.5 + 1 : Math.random() * 4 + 4,
      drift: (Math.random() - 0.5) * 150,
      emoji: ["❤️", "💖", "✨", "🌸", "🌷", "☀️", "💝"][
        Math.floor(Math.random() * 7)
      ],
      isSurge,
    };

    setElements((prev) => [...prev, newElement]);

    // Clean up elements faster to keep the DOM light
    setTimeout(() => {
      setElements((prev) => prev.filter((el) => el.id !== id));
    }, 6000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Only spawn background elements if the tab is active
      if (!document.hidden) addElement(false);
    }, 800);
    return () => clearInterval(interval);
  }, [addElement]);

  const handleSurprise = () => {
    if (isOpened) return;
    setIsOpened(true);

    // Batch the surge slightly differently to avoid frame drops
    for (let i = 0; i < 45; i++) {
      setTimeout(() => addElement(true), i * 25);
    }
    setTimeout(() => setShowPhoto(true), 1200);
  };

  const handleBack = (e) => {
    e.stopPropagation();
    setIsOpened(false);
    setShowPhoto(false);
  };

  return (
    <div
      className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col items-center justify-center cursor-pointer select-none px-4 py-6"
      style={{
        background: "linear-gradient(135deg, #fff5f5 0%, #fff0f3 100%)",
        // This helps performance by creating a separate stacking context
        isolation: "isolate",
      }}
      onClick={handleSurprise}
    >
      <AnimatePresence>
        {isOpened && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBack}
            className="absolute top-6 left-6 z-50 flex items-center gap-2 font-dancing text-lg font-bold text-[#ff4d6d] bg-white/90 py-2 px-6 rounded-full shadow-md"
          >
            <span>✨</span> Back
          </motion.button>
        )}
      </AnimatePresence>

      {/* Optimized Floating Elements */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute pointer-events-none z-0"
          style={{
            left: `${el.left}%`,
            fontSize: el.size,
            willChange: "transform", // Forces GPU acceleration
          }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-20vh",
            x: el.drift,
            opacity: [0, 1, 1, 0],
            rotate: el.isSurge ? 360 : 0,
          }}
          transition={{
            duration: el.duration,
            ease: "linear", // Linear is cheaper to calculate than easeOut
          }}
        >
          {el.emoji}
        </motion.div>
      ))}

      <motion.div
        layout
        className={`z-10 text-center p-8 bg-white/70 ${!isOpened ? "backdrop-blur-md" : ""} rounded-[50px] border border-white/80 shadow-xl max-w-sm w-full`}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="m1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl"
              >
                ☀️
              </motion.div>
              <h1 className="font-dancing text-5xl text-[#ff8fa3] font-bold">
                Good morning,
              </h1>
              <p className="font-dancing text-2xl text-[#5d4037]">
                cutie patootie!
              </p>
              <p className="text-[10px] text-[#ffb3c1] font-bold uppercase tracking-widest pt-4">
                Tap for a surprise
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="m2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <h1 className="font-dancing text-5xl text-[#ff8fa3] font-bold mb-4">
                Surprise!
              </h1>
              <div className="font-dancing text-xl text-[#5d4037] space-y-2">
                <p>Thinking of you is the best way to start my morning.</p>
                <p className="text-[#ff4d6d]">
                  I hope your day is as wonderful as you make me feel.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPhoto && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-2 bg-white shadow-xl inline-block rotate-3 border-b-[20px] border-white"
            >
              <img src="her.jpeg" alt="Us" className="w-40 h-40 object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Wish;
