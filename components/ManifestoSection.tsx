export default function ManifestoSection() {
  return (
    <section style={{ background:'#000', borderBottom:'1px solid rgba(255,255,255,0.1)' }}>

      {/* ── MOBILE ── */}
      <div className="md:hidden px-5 py-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 mb-5">Founders Message</p>
        <div className="bg-white/[0.03] border-l-[3px] border-white/20 rounded-r-xl pl-4 pr-4 py-5">
          <div style={{ fontFamily:'var(--font-cormorant)', fontSize:'2.8rem', lineHeight:0.7, color:'rgba(255,255,255,0.15)', marginBottom:10 }}>&ldquo;</div>
          <p style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.15rem', fontWeight:600, color:'#fff', lineHeight:1.5, fontStyle:'italic' }}>
            From presence to permanence, Enhanccee builds brands that define their era.
          </p>
          <p className="text-[11px] text-white/40 mt-4 leading-relaxed">
            This is our commitment to every partner who walks through our doors.
          </p>
        </div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block" style={{ padding:'3rem 0' }}>
        <style>{`.manifesto-inner{display:flex;flex-direction:row;align-items:flex-start;gap:48px;max-width:1280px;margin:0 auto;padding:0 24px;}.manifesto-label{flex-shrink:0;padding-top:32px;min-width:120px;}`}</style>
        <div className="manifesto-inner">
          <div className="manifesto-label">
            <div style={{ fontFamily:'var(--font-montserrat)', fontSize:'.7rem', fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'.15em', textTransform:'uppercase', lineHeight:1.6 }}>Founders<br />Message</div>
          </div>
          <div style={{ flex:1 }}>
            <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(3rem,6vw,6rem)', lineHeight:0.4, color:'rgba(255,255,255,0.2)', display:'block', marginBottom:8 }}>&ldquo;</span>
            <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(1.5rem,3vw,2.5rem)', fontWeight:700, color:'#fff', lineHeight:1.3 }}>
              From presence to permanence, Enhanccee builds brands that define their era.
            </h2>
            <span style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(3rem,6vw,6rem)', lineHeight:0.2, color:'rgba(255,255,255,0.2)', display:'block', textAlign:'right', marginBottom:24 }}>&rdquo;</span>
            <div style={{ height:1, width:64, background:'#C9A84C', marginLeft:'auto', marginBottom:20 }} />
            <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'clamp(.85rem,1.2vw,1rem)', fontWeight:300, letterSpacing:'0.05em', textAlign:'right' }}>
              This is our commitment to every partner who walks through our doors.
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}
