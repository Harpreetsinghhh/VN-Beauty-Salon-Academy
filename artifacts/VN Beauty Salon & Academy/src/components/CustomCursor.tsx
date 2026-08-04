import { useEffect, useRef, useCallback } from 'react';

type CursorVariant = 'default' | 'text' | 'link' | 'button';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const variantRef = useRef<CursorVariant>('default');
  const rafRef = useRef<number | null>(null);

  const updateVariant = useCallback(() => {
    const cursorText = (document.activeElement as HTMLElement)?.dataset?.cursorText;
    
    if (cursorText) {
      variantRef.current = 'text';
      return;
    }

    const hoveredEl = document.querySelector(':hover') as HTMLElement;
    if (!hoveredEl) {
      variantRef.current = 'default';
      return;
    }

    const dataCursor = hoveredEl.closest('[data-cursor-text]') as HTMLElement;
    if (dataCursor?.dataset?.cursorText) {
      variantRef.current = 'text';
      return;
    }

    const tag = hoveredEl.tagName.toLowerCase();
    if (tag === 'a' || tag === 'button' || hoveredEl.getAttribute('role') === 'button') {
      variantRef.current = 'link';
      return;
    }

    variantRef.current = 'default';
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      updateVariant();

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-text]');
      
      if (cursorRef.current) {
        if (interactiveEl) {
          const dataText = (interactiveEl as HTMLElement).dataset?.cursorText;
          if (dataText) {
            cursorRef.current.classList.add('cursor--text');
            cursorRef.current.setAttribute('data-text', dataText);
          } else {
            cursorRef.current.classList.add('cursor--link');
            cursorRef.current.removeAttribute('data-text');
          }
        } else {
          cursorRef.current.classList.remove('cursor--link', 'cursor--text');
          cursorRef.current.removeAttribute('data-text');
        }
      }
    };

    const animate = () => {
      const dx = mouseRef.current.x - posRef.current.x;
      const dy = mouseRef.current.y - posRef.current.y;
      
      posRef.current.x += dx * 0.12;
      posRef.current.y += dy * 0.12;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateVariant]);

  useEffect(() => {
    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    // Add cursor styles
    const style = document.createElement('style');
    style.textContent = `
      .custom-cursor {
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        transition: opacity 0.3s ease;
        will-change: transform;
      }
      .custom-cursor--outer {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1.5px solid rgba(200, 169, 106, 0.5);
        background: transparent;
        left: -16px;
        top: -16px;
        mix-blend-mode: difference;
        transition: width 0.3s, height 0.3s, border-color 0.3s, background 0.3s;
      }
      .custom-cursor--inner {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #C8A96A;
        left: -3px;
        top: -3px;
        box-shadow: 0 0 6px rgba(200, 169, 106, 0.6);
      }
      .custom-cursor--outer.cursor--link {
        width: 56px;
        height: 56px;
        border-color: rgba(200, 169, 106, 0.8);
        background: rgba(200, 169, 106, 0.08);
        left: -28px;
        top: -28px;
      }
      .custom-cursor--outer.cursor--text {
        width: 80px;
        height: 80px;
        border-color: rgba(200, 169, 106, 0.6);
        background: rgba(200, 169, 106, 0.06);
        left: -40px;
        top: -40px;
      }
      .custom-cursor--outer.cursor--text::after {
        content: attr(data-text);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 8px;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #C8A96A;
        white-space: nowrap;
        font-family: 'Inter', sans-serif;
        font-weight: 500;
      }
      .custom-cursor--inner.cursor--link {
        width: 4px;
        height: 4px;
        left: -2px;
        top: -2px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Only render on devices that have a fine pointer (mouse)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches === false) {
    return null;
  }

  return (
    <>
      <div ref={cursorRef} className="custom-cursor custom-cursor--outer" />
      <div ref={followerRef} className="custom-cursor custom-cursor--inner" />
    </>
  );
}

