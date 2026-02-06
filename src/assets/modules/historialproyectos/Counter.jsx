import { useEffect, useRef, useState } from "react";
import styles from "./Historial.module.css";

const Counter = ({
  end,
  duration = 1200,
}) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  // Detecta cuando entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect(); // Desconectar para que no vuelva a dispararse
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  // Animación
  useEffect(() => {
    if (!started) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const value = Math.min(
        Math.floor((progress / duration) * end),
        end
      );
      setCount(value);
      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [started, end, duration]);

  return (
    <span ref={ref} className={styles.number}>
      +{count.toLocaleString()}
    </span>
  );
};

export default Counter;
