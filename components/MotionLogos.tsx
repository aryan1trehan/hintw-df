"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Fabcurate from './IMG/images (1).png'
import Superkicks from './IMG/images (2).png'
import Tichu from './IMG/images (4)_edited.png'
import RangatJaipur from './IMG/images (4)_edited_edited.jpg'
import Vako from './IMG/Untitled design (7).png'
import Outro from './IMG/Untitled design (8).png'
import Bunai from './IMG/Bunai .png'
import PinkFalcon from './IMG/Pink Falcon .png'
import Tabeer from './IMG/Tabeer India .png'

const logos = [Fabcurate, Superkicks, RangatJaipur, Vako, Outro, Tichu, Bunai, PinkFalcon, Tabeer];

export default function MotionLogo() {
  return (<>
    {/* MOBILE */}
    <div className="mobile-nav" style={{ background:'#000', borderTop:'1px solid rgba(255,255,255,0.1)', padding:'20px 0', overflow:'hidden' }}>
      <p style={{ textAlign:'center', fontSize:9, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:16 }}>
        Trusted by Leading Brands
      </p>
      <div style={{ position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', left:0, top:0, height:'100%', width:40, zIndex:10, background:'linear-gradient(to right, black, transparent)' }} />
        <div style={{ position:'absolute', right:0, top:0, height:'100%', width:40, zIndex:10, background:'linear-gradient(to left, black, transparent)' }} />
        <motion.div
          style={{ display:'flex', gap:32, width:'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} style={{ position:'relative', height:40, width:120, flexShrink:0 }}>
              <Image src={logo} alt="brand" fill sizes="120px" className="object-contain object-center invert opacity-80" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>

    {/* DESKTOP */}
    <section className="desktop-nav" style={{ background:'#000', borderTop:'1px solid rgba(255,255,255,0.1)', overflow:'hidden', padding:'40px 0', position:'relative' }}>
      <div className="pointer-events-none" style={{ position:'absolute', left:0, top:0, height:'100%', width:96, zIndex:10, background:'linear-gradient(to right, black, transparent)' }} />
      <div className="pointer-events-none" style={{ position:'absolute', right:0, top:0, height:'100%', width:96, zIndex:10, background:'linear-gradient(to left, black, transparent)' }} />
      <p style={{ textAlign:'center', fontSize:11, fontWeight:600, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:32 }}>
        Trusted by Leading Brands
      </p>
      <div style={{ overflow:'hidden' }}>
        <motion.div
          className="flex gap-10 w-max"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="relative h-[5.4rem] w-[168px] sm:h-[6.6rem] sm:w-[216px] md:h-[134px] md:w-[264px] flex-shrink-0">
              <Image src={logo} alt="brand" fill sizes="(max-width: 640px) 168px, (max-width: 1024px) 216px, 264px"
                className="object-contain object-center invert opacity-80 hover:opacity-100 transition-all duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  </>)
}
