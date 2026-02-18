import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GiftPage = () => {
  const [hasPlucked, setHasPlucked] = useState(false);
  const [burstElements, setBurstElements] = useState([]);
  const navigate = useNavigate();

  // The "OP" Upward Burst Logic
  const addBurstElement = useCallback(() => {
    const id = Math.random();
    const newElement = {
      id,
      left: Math.random() * 100,
      size: Math.random() * 30 + 20,
      duration: Math.random() * 2 + 2,
      drift: (Math.random() - 0.5) * 400,
      emoji: ["🌸", "🌹", "🌷", "✨", "💖", "🌺", "💝"][
        Math.floor(Math.random() * 7)
      ],
    };

    setBurstElements((prev) => [...prev, newElement]);
    setTimeout(() => {
      setBurstElements((prev) => prev.filter((el) => el.id !== id));
    }, 4000);
  }, []);

  const handlePluck = () => {
    if (hasPlucked) return;
    setHasPlucked(true);

    // Trigger the massive burst when she taps the flower
    for (let i = 0; i < 60; i++) {
      setTimeout(() => addBurstElement(), i * 30);
    }
  };

  return (
    <div
      className="relative w-full h-screen h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-6"
      style={{
        background: "linear-gradient(to bottom, #fff0f3 0%, #ffdee9 100%)",
      }}
    >
      {/* Flying Flowers Layer (Only appears after plucking) */}
      {burstElements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute pointer-events-none z-0"
          style={{ left: `${el.left}%`, fontSize: el.size, bottom: "-10%" }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: "-120vh",
            x: el.drift,
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{ duration: el.duration, ease: "easeOut" }}
        >
          {el.emoji}
        </motion.div>
      ))}

      <div className="z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Step 1: The Interactive Flower */}
        <motion.div
          layout
          initial={{ scale: 0 }}
          animate={{
            scale: hasPlucked ? 0.8 : 1,
            y: hasPlucked ? 0 : [0, -15, 0],
          }}
          transition={{
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            scale: { type: "spring", stiffness: 200 },
          }}
          onClick={handlePluck}
          className={`relative mb-4 cursor-pointer ${!hasPlucked ? "hover:scale-110" : ""}`}
        >
          <motion.div
            className="text-[140px] leading-none drop-shadow-2xl filter saturate-150"
            animate={!hasPlucked ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            🌹
          </motion.div>

          <AnimatePresence>
            {!hasPlucked && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-max text-[#ff4d6d] font-dancing text-xl font-bold italic"
              >
                Tap to take it...
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-white blur-3xl rounded-full -z-10 opacity-40"
          />
        </motion.div>

        {/* Step 2: The Message Card (Slides up after tap) */}
        <AnimatePresence>
          {hasPlucked && (
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="bg-white/30 backdrop-blur-lg p-8 rounded-[40px] border border-white/40 shadow-2xl"
            >
              <h2 className="font-dancing text-3xl text-[#ff4d6d] font-bold mb-4">
                A flower for a flower...
              </h2>

              <p className="font-dancing text-2xl text-[#5d4037] leading-relaxed italic">
                "I wanted to give you something as beautiful as your smile, but
                I couldn't find anything that even came close. So, here is a
                virtual one to start your day with a little extra love."
              </p>

              <motion.div
                className="mt-6 flex justify-center gap-2 text-[#ff8fa3]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <span>❤️</span>
                <span className="font-bold tracking-widest uppercase text-xs">
                  CUTIE PATOOTIEEE
                </span>
                <span>❤️</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Link */}
        <motion.button
          onClick={() => navigate("/")}
          className="mt-12 opacity-50 hover:opacity-100 transition-opacity text-[#ff758c] font-bold text-xs tracking-widest uppercase border-b border-[#ff758c]"
        >
          Restart
        </motion.button>
      </div>
    </div>
  );
};

export default GiftPage;
