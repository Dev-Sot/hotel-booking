"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  image: string;
  children?: ReactNode;
}

/** Cabecera de página interior: imagen a sangre, velo oscuro y título editorial. */
export default function PageHero({ eyebrow, title, description, image, children }: PageHeroProps) {
  return (
    <header className="relative flex min-h-[58vh] items-end overflow-hidden pb-16 pt-40 md:min-h-[64vh] md:pb-20">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="container-site relative"
      >
        <div className="flex items-center gap-4">
          <span className="hairline" />
          <p className="eyebrow">{eyebrow}</p>
        </div>
        <h1 className="mt-6 max-w-3xl text-5xl leading-[1.05] md:text-7xl">{title}</h1>
        {description && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-sand/80 md:text-lg">{description}</p>
        )}
        {children}
      </motion.div>
    </header>
  );
}
