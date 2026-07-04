"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const ROUTES = ['/', '/skill', '/experience', '/project', '/contact'];

// Three concentric ripple rings, each slightly delayed
const RINGS = [
  { delay: 0,    scale: [1, 2.2], opacity: [0.35, 0], duration: 0.7 },
  { delay: 0.1,  scale: [1, 1.9], opacity: [0.22, 0], duration: 0.75 },
  { delay: 0.2,  scale: [1, 1.6], opacity: [0.12, 0], duration: 0.8 },
];

type Direction = 'up' | 'down' | 'left' | 'right';

// Returns position + size for the ripple origin at the correct edge
const getRippleStyle = (dir: Direction): React.CSSProperties => {
  // ~80px radius circle anchored to the edge
  const base: React.CSSProperties = {
    position: 'fixed',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '1.5px solid rgba(255,255,255,0.25)',
    background: 'transparent',
    backdropFilter: 'blur(2px)',
    WebkitBackdropFilter: 'blur(2px)',
    pointerEvents: 'none',
    zIndex: 9999,
  };
  switch (dir) {
    case 'up':    return { ...base, top: '-40px',    left: '50%', transform: 'translateX(-50%)' };
    case 'down':  return { ...base, bottom: '-40px', left: '50%', transform: 'translateX(-50%)' };
    case 'left':  return { ...base, left: '-40px',   top: '50%',  transform: 'translateY(-50%)' };
    case 'right': return { ...base, right: '-40px',  top: '50%',  transform: 'translateY(-50%)' };
  }
};

export default function PageSwipeListener() {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigating = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const [rippleDir, setRippleDir] = useState<Direction | null>(null);
  const [rippleKey, setRippleKey] = useState(0); // force remount on each swipe

  // Reset lock after route change
  useEffect(() => {
    isNavigating.current = true;
    const timeout = setTimeout(() => { isNavigating.current = false; }, 1500);
    const clear = setTimeout(() => { setRippleDir(null); }, 0);
    return () => { clearTimeout(timeout); clearTimeout(clear); };
  }, [pathname]);

  useEffect(() => {
    if (!ROUTES.includes(pathname)) return;

    const navigate = (direction: Direction) => {
      if (isNavigating.current) return;
      isNavigating.current = true;
      setRippleDir(direction);
      setRippleKey(k => k + 1);

      const idx = ROUTES.indexOf(pathname);
      let next = idx;
      if (direction === 'down' || direction === 'right') {
        next = idx < ROUTES.length - 1 ? idx + 1 : 0;
      } else {
        next = idx > 0 ? idx - 1 : ROUTES.length - 1;
      }

      setTimeout(() => { router.push(ROUTES[next]); }, 400);
      setTimeout(() => { isNavigating.current = false; }, 2000);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isNavigating.current) return;
      const isVert = Math.abs(e.deltaY) > Math.abs(e.deltaX);

      if (isVert) {
        const docEl = document.documentElement;
        const scrollHeight = docEl.scrollHeight;
        const clientHeight = window.innerHeight;
        // Page is genuinely scrollable only if content overflows by more than 40px
        const isScrollable = scrollHeight - clientHeight > 40;

        const atBottom = scrollHeight - clientHeight - window.scrollY <= 2;
        const atTop = window.scrollY <= 0;

        if (e.deltaY > 50) {
          // Navigate if page isn't scrollable OR we're at the very bottom
          if (!isScrollable || atBottom) navigate('down');
        } else if (e.deltaY < -50) {
          if (!isScrollable || atTop) navigate('up');
        }
      } else {
        if (e.deltaX > 50) navigate('right');
        else if (e.deltaX < -50) navigate('left');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isNavigating.current) return;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      const dx = touchStartX.current - e.changedTouches[0].clientX;
      const isVert = Math.abs(dy) > Math.abs(dx);
      if (isVert) {
        const atBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY <= 2;
        const atTop = window.scrollY <= 0;
        if (dy > 80 && atBottom) navigate('down');
        else if (dy < -80 && atTop) navigate('up');
      } else {
        if (dx > 80) navigate('right');
        else if (dx < -80) navigate('left');
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

  return (
    <AnimatePresence>
      {rippleDir && RINGS.map((ring, i) => (
        <motion.div
          key={`${rippleKey}-ring-${i}`}
          style={getRippleStyle(rippleDir)}
          initial={{ scale: ring.scale[0], opacity: ring.opacity[0] }}
          animate={{ scale: ring.scale[1], opacity: ring.opacity[1] }}
          exit={{ opacity: 0 }}
          transition={{ duration: ring.duration, delay: ring.delay, ease: 'easeOut' }}
        />
      ))}
    </AnimatePresence>
  );
}
