'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TypingTextProps {
  strings: string[];
}

export default function TypingText({ strings }: TypingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % strings.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [strings]);

  return (
    <span className="inline-block relative overflow-hidden h-[1.3em] align-bottom min-w-[220px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ rotateX: 90, opacity: 0, y: 15 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: -90, opacity: 0, y: -15 }}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 14,
          }}
          style={{ 
            transformOrigin: 'center bottom 10px', 
            perspective: 1000,
            display: 'inline-block' 
          }}
          className="absolute left-0 bottom-0 text-indigo-400 font-semibold"
        >
          {strings[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
