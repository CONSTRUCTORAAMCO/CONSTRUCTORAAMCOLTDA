import { useEffect, useRef } from 'react';
import './ConstructionCursor.css';

// Flecha amarilla + aro fino que sigue el cursor con un leve retraso.
// Sobre enlaces y botones el aro crece; al hacer clic se contrae.
export default function ConstructionCursor() {
  const rootRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const ring = ringRef.current;
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let visible = false;
    let targetX = 0, targetY = 0, x = 0, y = 0;
    let frame = 0;

    const render = () => {
      x += (targetX - x) * 0.2;
      y += (targetY - y) * 0.2;
      ring.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const hide = () => {
      visible = false;
      root.dataset.visible = 'false';
      root.dataset.active = 'false';
      root.dataset.pressed = 'false';
      document.documentElement.classList.remove('amco-custom-cursor');
    };

    const move = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!media.matches || event.pointerType !== 'mouse' || target?.closest('input, textarea, select, [contenteditable="true"], iframe')) {
        hide();
        return;
      }
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        // Al reaparecer, colocar el aro directamente en el cursor.
        x = targetX;
        y = targetY;
        visible = true;
        root.dataset.visible = 'true';
      }
      if (!frame) frame = requestAnimationFrame(render);
      const active = Boolean(target?.closest('a, button, [role="button"], [role="tab"]')) || (target && getComputedStyle(target).cursor === 'pointer');
      root.dataset.active = String(active);
      document.documentElement.classList.add('amco-custom-cursor');
    };

    const down = (event) => {
      if (!visible || event.pointerType !== 'mouse' || !media.matches) return;
      root.dataset.pressed = 'true';
    };
    const up = () => { root.dataset.pressed = 'false'; };
    const visibility = () => { if (document.hidden) hide(); };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('blur', hide);
    document.documentElement.addEventListener('pointerleave', hide);
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', hide);
    return () => {
      hide();
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('blur', hide);
      document.documentElement.removeEventListener('pointerleave', hide);
      document.removeEventListener('visibilitychange', visibility);
      media.removeEventListener('change', hide);
    };
  }, []);

  return (
    <div ref={rootRef} className="amco-cursor-effects" aria-hidden="true" data-visible="false">
      <div ref={ringRef} className="amco-cursor-ring"><span /></div>
    </div>
  );
}
