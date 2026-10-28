"use client";
import { useEffect, useRef, useState } from "react";
export default function Counter({ to, suffix }: { to: number; suffix: string }) {
  const [n, setN] = useState(0); const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (!e.isIntersecting) return; o.disconnect();
      let t = 0; const id = setInterval(() => { t += 1; setN(Math.round(to * Math.min(t / 40, 1))); if (t >= 40) clearInterval(id); }, 30); });
    if (ref.current) o.observe(ref.current); return () => o.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}
