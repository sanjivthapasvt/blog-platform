import React from 'react';
import { motion } from 'framer-motion';

const BackgroundElement = ({ count = 15, color = 'indigo', opacity = 0.1 }) => {
  const elements = Array.from({ length: count }, (_, i) => i);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((i) => {
        // Random properties for each bubble
        const size = Math.random() * 40 + 10;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 10;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-${color}-500`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [opacity * 0.5, opacity, opacity * 0.5],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
            }}
          />
        );
      })}
    </div>
  );
};

export default BackgroundElement;