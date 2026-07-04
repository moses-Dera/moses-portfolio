"use client";

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const ROUTES = ['/', '/skill', '/experience', '/project', '/contact'];

export default function PageSwipeListener() {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigating = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

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

    const getScrollableElement = (target: HTMLElement) => {
      let scrollableParent: HTMLElement | null = target;
      while (scrollableParent && scrollableParent !== document.body && scrollableParent !== document.documentElement) {
        if (isScrollable(scrollableParent)) return scrollableParent;
        scrollableParent = scrollableParent.parentElement;
      }
      
      // If we reached the body/html, check if the page itself is vertically scrollable
      const docEl = document.documentElement;
      if (docEl.scrollHeight > docEl.clientHeight) return docEl;
      
      return null;
    };

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollableEl = getScrollableElement(target);
      
      const isVertical = Math.abs(e.deltaY) > Math.abs(e.deltaX);

      if (isVertical) {
        if (scrollableEl) {
          const isDoc = scrollableEl === document.documentElement || scrollableEl === document.body;
          const scrollTop = isDoc ? window.scrollY : scrollableEl.scrollTop;
          const scrollHeight = scrollableEl.scrollHeight;
          const clientHeight = isDoc ? window.innerHeight : scrollableEl.clientHeight;

          const atBottom = scrollHeight - clientHeight - scrollTop <= 2;
          const atTop = scrollTop <= 0;

          if (e.deltaY > 0 && atBottom) handleNavigate('down');
          else if (e.deltaY < 0 && atTop) handleNavigate('up');
        } else {
          // Vertical scroll but no scrollable element (short page)
          if (e.deltaY > 30) handleNavigate('down');
          else if (e.deltaY < -30) handleNavigate('up');
        }
      } else {
        // Horizontal scroll
        if (e.deltaX > 30) handleNavigate('down');
        else if (e.deltaX < -30) handleNavigate('up');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;
      
      const target = e.target as HTMLElement;
      const scrollableEl = getScrollableElement(target);
      
      const isVertical = Math.abs(deltaY) > Math.abs(deltaX);

      if (isVertical) {
        if (scrollableEl) {
          const isDoc = scrollableEl === document.documentElement || scrollableEl === document.body;
          const scrollTop = isDoc ? window.scrollY : scrollableEl.scrollTop;
          const scrollHeight = scrollableEl.scrollHeight;
          const clientHeight = isDoc ? window.innerHeight : scrollableEl.clientHeight;

          const atBottom = scrollHeight - clientHeight - scrollTop <= 2;
          const atTop = scrollTop <= 0;

          if (deltaY > 50 && atBottom) handleNavigate('down');
          else if (deltaY < -50 && atTop) handleNavigate('up');
        } else {
          if (deltaY > 50) handleNavigate('down');
          else if (deltaY < -50) handleNavigate('up');
        }
      } else {
        if (deltaX > 50) handleNavigate('down');
        else if (deltaX < -50) handleNavigate('up');
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

  return null;
}
