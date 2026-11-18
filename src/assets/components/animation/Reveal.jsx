import { motion, useReducedMotion } from 'motion/react';

// One entrance per mount: rise softly, then remain in place.
export default function Reveal({ as = 'div', delay = 0, interactive = false, children, ...props }) {
  const reduced = useReducedMotion();
  const Component = motion[as];
  return (
    <Component
      {...props}
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={interactive && !reduced ? { y: -6, transition: { duration: 0.2 } } : undefined}
      whileTap={interactive && !reduced ? { scale: 0.98, transition: { duration: 0.15 } } : undefined}
    >{children}</Component>
  );
}
