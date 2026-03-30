import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } }
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } }
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } }
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } }
}

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] } }
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

export const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } }
}

export const cardHover: Variants = {
  rest: { y: 0, boxShadow: "0 0 0px rgba(193, 68, 14, 0)" },
  hover: { y: -8, boxShadow: "0 20px 60px rgba(193, 68, 14, 0.25)" }
}

export const hudReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] } }
}

export const glitch: Variants = {
  rest: { x: 0, filter: "none" },
  hover: {
    x: [0, -2, 2, -1, 0],
    filter: ["none", "hue-rotate(90deg)", "none"],
    transition: { duration: 0.3 }
  }
}
