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
    <section className="relative bg-black border-t border-white/10 overflow-hidden">

      {/* Founders Message + Text Row */}
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px 0', display:'flex', alignItems:'center', gap:40, flexWrap:'wrap' }}>
        {/* Left — Founders Message */}
        <div style={{ display:'flex', alignItems:'center', gap:16, flexShrink:0 }}>
          <div style={{ display:'flex' }}>
            {[
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&fit=crop&crop=face',
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&fit=crop&crop=face',
            ].map((src, i) => (
              <div key={i} style={{ width:44, height:44, borderRadius:'50%', overflow:'hidden', border:'2px solid #000', marginLeft: i > 0 ? -12 : 0, position:'relative', zIndex: 2 - i }}>
                <img src={src} alt="founder" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.75rem', fontWeight:600, color:'#fff', lineHeight:1.3 }}>Founders</div>
            <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.75rem', fontWeight:600, color:'#fff', lineHeight:1.3 }}>Message</div>
          </div>
        </div>

        {/* Right — Text */}
        <div style={{ flex:1, minWidth:280 }}>
          <p style={{ fontFamily:'var(--font-montserrat)', fontSize:'clamp(1rem,2vw,1.35rem)', fontWeight:700, color:'#fff', lineHeight:1.5 }}>
            We work with incredible people from{' '}
            <em style={{ fontStyle:'italic', fontWeight:400 }}>all over the world</em>{' '}
            helping them{' '}
            <em style={{ fontStyle:'italic', fontWeight:400 }}>Grow their Brands,</em>{' '}
            business <em style={{ fontStyle:'italic', fontWeight:400 }}>Online.</em>
          </p>
        </div>
      </div>

      {/* Logo Ticker */}
      <div style={{ padding:'40px 0 48px' }}>
        <div className="pointer-events-none absolute left-0 h-full w-24 z-10" style={{ background:'linear-gradient(to right, black, transparent)' }} />
        <div className="pointer-events-none absolute right-0 h-full w-24 z-10" style={{ background:'linear-gradient(to left, black, transparent)' }} />

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
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 220px"
                  className="object-contain object-center invert opacity-80 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
