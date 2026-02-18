import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Wish = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [elements, setElements] = useState([]);

  const addElement = (isSurge = false) => {
    const id = Date.now() + Math.random();
    const newElement = {
      id,
      left: isSurge ? 10 + Math.random() * 80 : Math.random() * 100,
      size: isSurge ? Math.random() * 35 + 20 : Math.random() * 20 + 15,
      duration: isSurge ? Math.random() * 2 + 1.5 : Math.random() * 5 + 5,
      drift: (Math.random() - 0.5) * 200,
      emoji: ["❤️", "💖", "✨", "🌸", "🌷", "☀️", "💝", "✨"][
        Math.floor(Math.random() * 8)
      ],
      isSurge,
    };

    setElements((prev) => [...prev, newElement]);
    setTimeout(() => {
      setElements((prev) => prev.filter((el) => el.id !== id));
    }, 8000);
  };

  useEffect(() => {
    const interval = setInterval(() => addElement(false), 500);
    return () => clearInterval(interval);
  }, []);

  const handleSurprise = () => {
    if (isOpened) return;
    setIsOpened(true);
    for (let i = 0; i < 70; i++) {
      setTimeout(() => addElement(true), i * 20);
    }
    setTimeout(() => setShowPhoto(true), 1500);
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
      }}
      onClick={handleSurprise}
    >
      {/* RADIANT BACK BUTTON */}
      <AnimatePresence>
        {isOpened && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={handleBack}
            className="absolute top-4 left-4 sm:top-8 sm:left-8 z-50 flex items-center gap-2 font-dancing text-lg sm:text-xl font-bold text-[#ff4d6d] bg-white/80 backdrop-blur-md py-1.5 px-5 rounded-full border-2 border-[#ffb3c1]/50 shadow-lg"
          >
            <span>✨</span> Back
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      {elements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute pointer-events-none z-0"
          style={{ left: `${el.left}%`, fontSize: el.size }}
          initial={{ y: "110vh", opacity: 0 }}
          animate={{
            y: "-20vh",
            x: [0, el.drift, el.drift * -1],
            opacity: [0, 1, 0],
            rotate: [0, 360],
            scale: el.isSurge ? [1, 1.5, 1] : 1,
          }}
          transition={{ duration: el.duration, ease: "easeOut" }}
        >
          {el.emoji}
        </motion.div>
      ))}

      {/* Main Card: Uses max-h to prevent overflow on small phones */}
      <motion.div
        layout
        className="z-10 text-center p-6 sm:p-10 bg-white/60 backdrop-blur-2xl rounded-[40px] sm:rounded-[60px] border-2 border-white/80 shadow-2xl max-w-sm sm:max-w-md w-full flex flex-col justify-center items-center overflow-hidden"
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
                transition={{ repeat: Infinity, duration: 3 }}
                className="text-5xl sm:text-6xl"
              >
                ☀️
              </motion.div>
              <h1 className="font-dancing text-4xl sm:text-6xl text-[#ff8fa3] font-bold">
                Good morning,
              </h1>
              <p className="font-dancing text-2xl sm:text-3xl text-[#5d4037] font-semibold">
                cutie patootie!
              </p>
              <p className="font-poppins text-[9px] text-[#ffb3c1] font-bold uppercase tracking-[0.3em] animate-pulse pt-4">
                Tap for a surprise
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="m2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <h1 className="font-dancing text-4xl sm:text-6xl text-[#ff8fa3] font-bold mb-3 sm:mb-6">
                Surprise!
              </h1>
              <div className="font-dancing text-xl sm:text-2xl text-[#5d4037] font-semibold leading-tight space-y-2">
                <p>
                  Thinking of you is the best way{" "}
                  <br className="hidden sm:block" /> to start my morning.
                </p>
                <p className="text-[#ff4d6d] drop-shadow-sm">
                  I hope your day is as wonderful{" "}
                  <br className="hidden sm:block" /> as you make me feel.
                </p>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-lg text-[#ff8fa3] mt-4 sm:mt-6 font-poppins tracking-wider font-bold uppercase"
              >
                Counting down the hours <br /> until I see you! ✨
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPhoto && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-4 sm:mt-6 p-2 bg-white shadow-lg rounded-sm border-b-[20px] sm:border-b-[25px] border-b-white rotate-2"
            >
              <img
                src="her.jpeg"
                alt="Us"
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-sm"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Wish;
