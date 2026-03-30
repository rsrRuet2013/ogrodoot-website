"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 200, mass: 0.5 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    // Check if it's a touch device
    const checkTouch = () => {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);

    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16); // Center offset
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const checkHoverState = () => {
      const hoveredElement = document.elementFromPoint(cursorX.get() + 16, cursorY.get() + 16);
      if (!hoveredElement) return;

      const isClickable = hoveredElement.closest("a, button, [role='button']");
      const isCta = hoveredElement.closest("[data-cta='true']");
      
      setIsHovered(!!isClickable);
      setIsCtaHovered(!!isCta);
    };

    // Attach event listeners for all links/buttons
    const updateHoverElements = () => {
      const elements = document.querySelectorAll("a, button, [role='button']");
      elements.forEach(el => {
        el.addEventListener("mouseenter", () => {
          setIsHovered(true);
          if (el.getAttribute("data-cta") === "true") setIsCtaHovered(true);
        });
        el.addEventListener("mouseleave", () => {
          setIsHovered(false);
          setIsCtaHovered(false);
        });
      });
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    
    // Initial binding
    updateHoverElements();

    // Re-bind occasionally for dynamic elements
    const interval = setInterval(updateHoverElements, 2000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(interval);
      window.removeEventListener("resize", checkTouch);
    };
  }, [cursorX, cursorY, isTouchDevice, isVisible]);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isCtaHovered 
            ? "rgba(193, 68, 14, 0.4)" // mars-red transparent
            : isHovered
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(255, 255, 255, 1)", // white dot
          border: isHovered
            ? isCtaHovered
              ? "1px solid rgba(193, 68, 14, 1)"
              : "1px solid rgba(255, 255, 255, 0.5)"
            : "0px solid transparent",
          width: isHovered ? 40 : 8,
          height: isHovered ? 40 : 8,
          x: isHovered ? -12 : 12,
          y: isHovered ? -12 : 12,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-full flex items-center justify-center mix-blend-difference"
      />
    </motion.div>
  );
}
