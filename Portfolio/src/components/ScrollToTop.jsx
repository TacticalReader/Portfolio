import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

import { styles } from "../styles";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className='fixed bottom-10 right-10 z-50 cursor-pointer flex justify-center items-center group'
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Progress Ring */}
          <svg className="absolute w-[80px] h-[80px] -rotate-90 pointer-events-none drop-shadow-[0_0_10px_rgba(145,94,255,0.5)]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              stroke="#1d1836"
              strokeWidth="5"
              fill="none"
              className="opacity-50"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="48"
              stroke="url(#gradient)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength: scaleX }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#915EFF" />
                <stop offset="50%" stopColor="#22d04eff" />
                <stop offset="100%" stopColor="#FF6B9D" />
              </linearGradient>
            </defs>
          </svg>

          <div className='w-14 h-14 rounded-full bg-primary flex justify-center items-center shadow-card relative z-10 border border-[#915EFF]/30 backdrop-blur-md group-hover:bg-tertiary transition-colors duration-300'>
             <FaArrowUp className='text-[#915EFF] text-[22px] group-hover:text-white transition-colors duration-300' />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
