"use client";

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const ROUTES = ['/', '/skill', '/experience', '/project', '/contact'];

export default function PageSwipeListener() {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigating = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    // Only enable on our main portfolio routes. Avoid admin routes or individual case studies.
    if (!ROUTES.includes(pathname)) return;

    const handleNavigate = (direction: 'up' | 'down') => {
      if (isNavigating.current) return;

      const currentIndex = ROUTES.indexOf(pathname);
      
      if (direction === 'down') {
        isNavigating.current = true;
        // Loop back to start if at the end
        const nextIndex = currentIndex < ROUTES.length - 1 ? currentIndex + 1 : 0;
        router.push(ROUTES[nextIndex]);
      } else if (direction === 'up') {
        isNavigating.current = true;
        // Loop back to end if at the start
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : ROUTES.length - 1;
        router.push(ROUTES[prevIndex]);
      }
      
      // Lock navigation for a short duration to prevent double-jumps from trackpad inertia
      setTimeout(() => {
        isNavigating.current = false;
      }, 1000);
    };

    const isScrollable = (el: HTMLElement) => {
      const hasScrollableContent = el.scrollHeight > el.clientHeight;
      const overflowYStyle = window.getComputedStyle(el).overflowY;
      const isOverflowHidden = overflowYStyle.indexOf('hidden') !== -1;
      return hasScrollableContent && !isOverflowHidden;
    };

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      
      let scrollableParent: HTMLElement | null = target;
      while (scrollableParent && scrollableParent !== document.body && scrollableParent !== document.documentElement) {
        if (isScrollable(scrollableParent)) break;
        scrollableParent = scrollableParent.parentElement;
      }

      if (scrollableParent && scrollableParent !== document.body && scrollableParent !== document.documentElement) {
        const atBottom = Math.abs(scrollableParent.scrollHeight - scrollableParent.clientHeight - scrollableParent.scrollTop) <= 2;
        const atTop = scrollableParent.scrollTop <= 0;

        if (e.deltaY > 0 && atBottom) handleNavigate('down');
        else if (e.deltaY < 0 && atTop) handleNavigate('up');
        return;
      }

      // Support both vertical scrolling (deltaY) and horizontal trackpad swiping (deltaX)
      if (e.deltaY > 30 || e.deltaX > 30) handleNavigate('down'); // Scroll down or swipe left
      else if (e.deltaY < -30 || e.deltaX < -30) handleNavigate('up'); // Scroll up or swipe right
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      // Add touchStartX to global object or use a ref for horizontal touch swiping
      (window as any).touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = ((window as any).touchStartX || 0) - touchEndX;
      
      const target = e.target as HTMLElement;
      let scrollableParent: HTMLElement | null = target;
      while (scrollableParent && scrollableParent !== document.body && scrollableParent !== document.documentElement) {
        if (isScrollable(scrollableParent)) break;
        scrollableParent = scrollableParent.parentElement;
      }

      if (scrollableParent && scrollableParent !== document.body && scrollableParent !== document.documentElement) {
        const atBottom = Math.abs(scrollableParent.scrollHeight - scrollableParent.clientHeight - scrollableParent.scrollTop) <= 2;
        const atTop = scrollableParent.scrollTop <= 0;

        if (deltaY > 50 && atBottom) handleNavigate('down');
        else if (deltaY < -50 && atTop) handleNavigate('up');
        return;
      }

      // Support both vertical swiping and horizontal swiping
      if (deltaY > 50 || deltaX > 50) handleNavigate('down');
      else if (deltaY < -50 || deltaX < -50) handleNavigate('up');
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

  return null;
}
