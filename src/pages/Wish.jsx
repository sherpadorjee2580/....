import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Wish = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [elements, setElements] = useState([]);
  const navigate = useNavigate();

  const addElement = useCallback((isSurge = false) => {
    const id = Math.random();
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
    setTimeout(() => {
      setElements((prev) => prev.filter((el) => el.id !== id));
    }, 6000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!document.hidden) addElement(false);
    }, 800);
    return () => clearInterval(interval);
  }, [addElement]);

  const handleSurprise = () => {
    if (isOpened) return;
    setIsOpened(true);
    for (let i = 0; i < 40; i++) {
      setTimeout(() => addElement(true), i * 25);
    }
  };

  return (
    <div
      className="relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col items-center justify-center cursor-pointer select-none px-4 py-6"
      style={{
        background: "linear-gradient(135deg, #fff5f5 0%, #fff0f3 100%)",
        isolation: "isolate",
      }}
      onClick={handleSurprise}
    >
      {/* Background Floating Elements */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute pointer-events-none z-0"
          style={{ left: `${el.left}%`, fontSize: el.size }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{ y: "-20vh", x: el.drift, opacity: [0, 1, 1, 0] }}
          transition={{ duration: el.duration, ease: "linear" }}
        >
          {el.emoji}
        </motion.div>
      ))}

      <motion.div
        layout
        className="z-10 text-center p-6 bg-white/70 backdrop-blur-md rounded-[40px] border border-white/80 shadow-xl max-w-sm w-full"
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
              <h1 className="font-dancing text-4xl text-[#ff8fa3] font-bold mb-2">
                Surprise!
              </h1>

              <div className="font-dancing text-lg text-[#5d4037] space-y-1 mb-4 text-balance">
                <p>Thinking of you is the best way to start my morning.</p>
                <p className="text-[#ff4d6d]">
                  I hope your day is as wonderful as you make me feel.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6 p-2 bg-white shadow-lg rotate-3 border-b-[15px] border-white"
              >
                <img
                  src="her.jpeg"
                  alt="Us"
                  className="w-32 h-32 object-cover"
                />
              </motion.div>

              {/* UPDATED BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0px 0px 0px rgba(255,143,163,0)",
                    "0px 0px 15px rgba(255,143,163,0.5)",
                    "0px 0px 0px rgba(255,143,163,0)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/gift");
                }}
                className="bg-[#ff8fa3] text-white px-8 py-3 rounded-full font-dancing text-xl shadow-md"
              >
                One more thing... ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Wish;
