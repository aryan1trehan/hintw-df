"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Fabcurate from './IMG/images (1).png'
import Superkicks from './IMG/images (2).png'
import Tichu from './IMG/images (4)_edited.png'
import RangatJaipur from './IMG/images (4)_edited_edited.jpg'
import Vako from './IMG/Untitled design (7).png'
import Outro from './IMG/Untitled design (8).png'

const logos = [
  Fabcurate,
  Superkicks,
  RangatJaipur,
  Vako,
  Outro,
  Tichu,
];

export default function MotionLogo() {
  return (
    <section className="relative bg-black py-12 border-t border-white/10 overflow-hidden">
      
      {/* Edge Fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-black to-transparent z-10" />

      <div className="max-w-7xl mx-auto">
        <p className="text-center text-white/40 text-xs uppercase tracking-[0.3em] mb-8">
          Trusted by Leading Brands
        </p>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-10 w-max group"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
                repeat: Infinity,
                duration: 35,
                ease: "linear",
            }}
            >
            {[...logos, ...logos].map((logo, i) => (
                <div
                key={i}
                className="relative h-[4.5rem] w-[140px] sm:h-[5.5rem] sm:w-[180px] md:h-28 md:w-[220px] flex-shrink-0"
                >
                <Image
                    src={logo}
                    alt="brand"
                    fill
                    sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 220px"
                    className="object-contain object-center invert opacity-70 hover:opacity-100 transition-all duration-300"
                />
                </div>
            ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
}