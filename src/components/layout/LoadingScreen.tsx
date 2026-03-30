"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-deep-space flex flex-col items-center justify-center p-4"
        >
          {/* Logo container with float animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="w-32 h-32 md:w-48 md:h-48 relative mb-8 animate-[float_4s_ease-in-out_infinite]"
          >
            <Image
              src="/logo-white.png"
              alt="Team Ogrodoot"
              fill
              sizes="(max-width: 768px) 128px, 192px"
              className="object-contain"
              priority
            />
          </motion.div>

          <div className="w-full max-w-sm flex flex-col gap-4 text-center">
            {/* Loading text with scan-line effect */}
            <div className="relative font-jetbrains-mono text-sm tracking-widest text-star-white overflow-hidden">
              <span className="relative z-10 text-hud-teal">INITIALIZING MISSION SYSTEMS...</span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-mars-red shadow-[0_0_10px_rgba(193,68,14,0.8)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>

            {/* Percentage Text */}
            <motion.div className="font-orbitron text-lg font-bold tracking-widest text-[var(--color-mars-red)]">
              {Math.min(progress, 100)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
