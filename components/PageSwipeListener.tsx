"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const ROUTES = ['/', '/skill', '/experience', '/project', '/contact'];

export default function PageSwipeListener() {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigating = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  
  const [dripDirection, setDripDirection] = useState<'up' | 'down' | 'left' | 'right' | null>(null);

  // Debounce the event so that inertia scrolling doesn't instantly trigger navigation after a route change
  useEffect(() => {
    isNavigating.current = true;
    
    const timeout = setTimeout(() => {
      isNavigating.current = false;
    }, 1500);

    // Clear drip animation after a brief delay (avoids calling setState synchronously in effect)
    const dripClear = setTimeout(() => {
      setDripDirection(null);
    }, 0);

    return () => {
      clearTimeout(timeout);
      clearTimeout(dripClear);
    };
  }, [pathname]);

  useEffect(() => {
    if (!ROUTES.includes(pathname)) return;

    const handleNavigate = (direction: 'up' | 'down' | 'left' | 'right') => {
      if (isNavigating.current) return;
      isNavigating.current = true;
      setDripDirection(direction);

      const currentIndex = ROUTES.indexOf(pathname);
      let nextIndex = currentIndex;
      
      if (direction === 'down' || direction === 'right') {
        nextIndex = currentIndex < ROUTES.length - 1 ? currentIndex + 1 : 0;
      } else if (direction === 'up' || direction === 'left') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : ROUTES.length - 1;
      }
      
      // Delay navigation slightly so the water drip effect can expand
      setTimeout(() => {
        router.push(ROUTES[nextIndex]);
      }, 500); 
      
      setTimeout(() => {
        isNavigating.current = false;
      }, 2000);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isNavigating.current) return;
      
      const isVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);

      if (isVertical) {
        const docEl = document.documentElement;
        const scrollTop = window.scrollY;
        const scrollHeight = docEl.scrollHeight;
        const clientHeight = window.innerHeight;

        const atBottom = scrollHeight - clientHeight - scrollTop <= 2;
        const atTop = scrollTop <= 0;

        if (e.deltaY > 50 && atBottom) {
          handleNavigate('down');
        } else if (e.deltaY < -50 && atTop) {
          handleNavigate('up');
        }
      } else {
        // Horizontal Scroll
        if (e.deltaX > 50) {
          handleNavigate('right');
        } else if (e.deltaX < -50) {
          handleNavigate('left');
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isNavigating.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;
      
      const isVertical = Math.abs(deltaY) > Math.abs(deltaX);

      if (isVertical) {
        const docEl = document.documentElement;
        const scrollTop = window.scrollY;
        const scrollHeight = docEl.scrollHeight;
        const clientHeight = window.innerHeight;

        const atBottom = scrollHeight - clientHeight - scrollTop <= 2;
        const atTop = scrollTop <= 0;

        if (deltaY > 80 && atBottom) {
          handleNavigate('down');
        } else if (deltaY < -80 && atTop) {
          handleNavigate('up');
        }
      } else {
        if (deltaX > 80) {
          handleNavigate('right');
        } else if (deltaX < -80) {
          handleNavigate('left');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pathname, router]);

  const getDripStyle = (dir: 'up' | 'down' | 'left' | 'right'): React.CSSProperties => {
    // A smaller, subtle ripple that expands from the edge
    const size = '500px';
    const offset = '-250px'; 
    
    const baseStyle: React.CSSProperties = {
      width: size,
      height: size,
      borderRadius: '50%',
      position: 'fixed',
      background: 'transparent',
    };

    switch (dir) {
      case 'up':
        return { ...baseStyle, top: offset, left: '50%', marginLeft: offset };
      case 'down':
        return { ...baseStyle, bottom: offset, left: '50%', marginLeft: offset };
      case 'left':
        return { ...baseStyle, left: offset, top: '50%', marginTop: offset };
      case 'right':
        return { ...baseStyle, right: offset, top: '50%', marginTop: offset };
    }
  };

  return (
    <AnimatePresence>
      {dripDirection && (
        <motion.div
          key={dripDirection}
          className="z-[9999] pointer-events-none backdrop-blur-md border border-foreground/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]"
          style={getDripStyle(dripDirection)}
          initial={{ scale: 0.1, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}
