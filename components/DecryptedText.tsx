"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number; // Speed of interval in ms
  revealPerTick?: number; // How many characters to reveal per tick
  characters?: string;
  className?: string;
  delay?: number; // Delay in ms before starting
  as?: React.ElementType;
}

const SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  speed = 50,
  revealPerTick = 0.5, 
  characters = SYMBOLS,
  className = "",
  delay = 0,
  as: Component = "span",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      let interval: NodeJS.Timeout;
      let timeout: NodeJS.Timeout;

      const startAnimation = () => {
        let iteration = 0;
        
        interval = setInterval(() => {
          setDisplayText(
            text
              .split("")
              .map((letter, index) => {
                if (letter === " ") return " ";
                if (index < iteration) {
                  return text[index];
                }
                return characters[Math.floor(Math.random() * characters.length)];
              })
              .join("")
          );
          
          if (iteration >= text.length) {
            clearInterval(interval);
            setHasAnimated(true);
            setDisplayText(text); // Ensure final state is exact
          }
          
          iteration += revealPerTick; 
        }, speed);
      };

      if (delay > 0) {
        // Scramble it immediately while waiting for delay
        setDisplayText(
          text
            .split("")
            .map((c) => (c === " " ? " " : characters[Math.floor(Math.random() * characters.length)]))
            .join("")
        );
        timeout = setTimeout(startAnimation, delay);
      } else {
        startAnimation();
      }

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isInView, hasAnimated, text, speed, revealPerTick, characters, delay]);

  return (
    <Component ref={containerRef} className={className}>
      {displayText}
    </Component>
  );
};
