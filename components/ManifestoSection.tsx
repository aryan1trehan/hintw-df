export default function ManifestoSection() {
  return (
    <section style={{ padding:'3rem 0', background:'#000', borderBottom:'1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px' }}>
        <div style={{ display:'flex', flexDirection:'row', alignItems:'flex-start', gap:48 }}>
          
          {/* Left — Founders Message */}
          <div style={{ flexShrink:0, paddingTop:32, minWidth:120 }}>
            <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.7rem', fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'.15em', textTransform:'uppercase', lineHeight:1.6 }}>
              Founders<br />Message
            </div>
          </div>

          {/* Vertical Divider */}
          <div style={{ width:1, background:'rgba(255,255,255,0.15)', alignSelf:'stretch', flexShrink:0 }} />

          {/* Right — Quote */}
          <div style={{ flex:1 }}>
            <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'6rem', lineHeight:0.4, color:'rgba(255,255,255,0.2)', display:'block', marginBottom:8 }}>&ldquo;</span>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(1.5rem,3vw,2.5rem)', fontWeight:700, color:'#fff', lineHeight:1.3, marginBottom:0 }}>
              From presence to permanence, Enhanccee builds brands that define their era.
            </h2>
            <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'6rem', lineHeight:0.2, color:'rgba(255,255,255,0.2)', display:'block', textAlign:'right', marginBottom:24 }}>&rdquo;</span>
            <div style={{ height:1, width:64, background:'#C9A84C', marginLeft:'auto', marginBottom:20 }} />
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'1rem', fontWeight:300, letterSpacing:'0.05em', textAlign:'right' }}>
              This is our commitment to every partner who walks through our doors.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
