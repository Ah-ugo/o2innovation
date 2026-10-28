"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";
// Pass any .lottie or .json URL (LottieFiles) via src.
export default function Lottie({ src, className }: { src: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <div className={className} aria-hidden="true"><DotLottieReact src={src} loop autoplay={!reduceMotion} /></div>;
}
