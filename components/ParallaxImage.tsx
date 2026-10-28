"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function ParallaxImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const hasPosition = /\b(absolute|fixed|sticky)\b/.test(className);

  return (
    <div
      ref={ref}
      className={`${hasPosition ? "" : "relative"} isolate overflow-hidden ${className}`}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        style={reduceMotion ? undefined : { y }}
        className={`absolute inset-x-0 -top-[5%] h-[110%] w-full object-cover ${imageClassName}`}
      />
    </div>
  );
}

