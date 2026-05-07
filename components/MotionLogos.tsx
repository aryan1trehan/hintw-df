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

const logos = [Fabcurate, Superkicks, Tichu, RangatJaipur, Vako, Outro, Bunai, PinkFalcon, Tabeer];

export default function MotionLogo() {
  return (<>
    {/* ── MOBILE: scrolling marquee ── */}
    <div className="mobile-nav" style={{ background:'#000', borderTop:'1px solid rgba(255,255,255,0.1)', padding:'20px 0', overflow:'hidden' }}>
      <p style={{ textAlign:'center', fontSize:9, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:16 }}>
        Trusted by Leading Brands
      </p>
      <div style={{ position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, height:'100%', width:40, zIndex:10, background:'linear-gradient(to right, black, transparent)' }} />
        <div style={{ position:'absolute', right:0, top:0, height:'100%', width:40, zIndex:10, background:'linear-gradient(to left, black, transparent)' }} />
        <motion.div
          style={{ display:'flex', gap:32, width:'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} style={{ position:'relative', height:40, width:120, flexShrink:0 }}>
              <Image src={logo} alt="brand" fill sizes="120px" style={{ objectFit:'contain', objectPosition:'center', opacity:0.9 }} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>

    {/* ── DESKTOP: scrolling marquee ── */}
    <section className="desktop-nav" style={{ background:'#000', borderTop:'1px solid rgba(255,255,255,0.1)', overflow:'hidden', padding:'40px 0' }}>
      <div style={{ position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, height:'100%', width:96, zIndex:10, background:'linear-gradient(to right, black, transparent)' }} />
        <div style={{ position:'absolute', right:0, top:0, height:'100%', width:96, zIndex:10, background:'linear-gradient(to left, black, transparent)' }} />
        <p style={{ textAlign:'center', fontSize:11, fontWeight:600, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)', marginBottom:32 }}>Trusted by Leading Brands</p>
        <motion.div
          style={{ display:'flex', gap:40, width:'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} style={{ position:'relative', height:80, width:200, flexShrink:0 }}>
              <Image src={logo} alt="brand" fill sizes="200px" style={{ objectFit:'contain', objectPosition:'center', opacity:0.9 }} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  </>)
}
