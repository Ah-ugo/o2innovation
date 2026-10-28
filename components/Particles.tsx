"use client";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
export default function Net() {
  const [ok, setOk] = useState(false);
  useEffect(() => { initParticlesEngine(async (e) => { await loadSlim(e); }).then(() => setOk(true)); }, []);
  if (!ok) return null;
  return <Particles className="absolute inset-0" options={{ fullScreen: false, fpsLimit: 60,
    particles: { number: { value: 70, density: { enable: true } }, color: { value: "#ff8c1e" },
      opacity: { value: 0.6 }, size: { value: { min: 1, max: 3 } }, move: { enable: true, speed: 0.7 },
      links: { enable: true, color: "#6f7cff", opacity: 0.25, distance: 140 } },
    interactivity: { events: { onHover: { enable: true, mode: "grab" } }, modes: { grab: { distance: 160 } } } }} />;
}
