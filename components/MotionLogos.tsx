"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import Fabcurate from './IMG/images (1).png'
import Superkicks from './IMG/images (2).png'
import Tichu from './IMG/images (4)_edited.png'
import RangatJaipur from './IMG/images (4)_edited_edited.jpg'
import Vako from './IMG/Untitled design (7).png'
import Outro from './IMG/Untitled design (8).png'

const logos = [Fabcurate, Superkicks, RangatJaipur, Vako, Outro, Tichu];

export default function MotionLogo() {
  return (
    <section className="relative bg-black border-t border-white/10 overflow-hidden py-10 sm:py-12">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10" style={{ background:'linear-gradient(to right, black, transparent)' }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10" style={{ background:'linear-gradient(to left, black, transparent)' }} />

      <p className="text-center text-white/40 text-xs uppercase tracking-[0.3em] mb-8">
        Trusted by Leading Brands
      </p>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-10 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="relative h-[5.4rem] w-[168px] sm:h-[6.6rem] sm:w-[216px] md:h-[134px] md:w-[264px] flex-shrink-0">
              <Image
                src={logo}
                alt="brand"
                fill
                sizes="(max-width: 640px) 168px, (max-width: 1024px) 216px, 264px"
                className="object-contain object-center invert opacity-80 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
