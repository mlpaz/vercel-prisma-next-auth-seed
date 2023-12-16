import { Variants } from "framer-motion";

export const variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 0px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 1.0,
      delayChildren: 0.05,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(0% 0% 100% 0% round 0px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};

export const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
