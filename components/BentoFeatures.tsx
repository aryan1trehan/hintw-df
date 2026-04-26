'use client'

import { useEffect, useRef } from 'react'

function CanvasCard({ id, title, subtitle, initFn }: { id: string; title: string; subtitle: string; initFn: (canvas: HTMLCanvasElement) => () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const DPR = window.devicePixelRatio || 1
    function resize() {
      if (!canvas || !wrapper) return
      canvas.width = wrapper.clientWidth * DPR
      canvas.height = wrapper.clientHeight * DPR
      canvas.style.width = wrapper.clientWidth + 'px'
      canvas.style.height = wrapper.clientHeight + 'px'
    }
    resize()
    window.addEventListener('resize', resize)

    const cleanup = initFn(canvas)
    return () => {
      window.removeEventListener('resize', resize)
      cleanup?.()
    }
  }, [initFn])

  return (
    <div style={{ background:'#0e1a19', border:'1px solid rgba(32,59,55,0.7)', borderRadius:20, overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 0 80px rgba(32,59,55,0.3), 0 2px 40px rgba(0,0,0,0.7)' }}>
      <div ref={wrapperRef} style={{ height:240, position:'relative', overflow:'hidden', background:'#0a1312' }}>
        <canvas ref={canvasRef} style={{ display:'block' }} />
      </div>
      <div style={{ padding:'20px 22px 24px' }}>
        <h3 style={{ fontFamily:'var(--font-montserrat)', fontSize:'1rem', fontWeight:700, color:'#fff', marginBottom:6, letterSpacing:'-0.2px' }}>{title}</h3>
        <p style={{ fontFamily:'var(--font-montserrat)', fontSize:'.85rem', color:'rgba(255,255,255,0.45)' }}>{subtitle}</p>
      </div>
    </div>
  )
}

function initBarChart(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const DPR = window.devicePixelRatio || 1
  const bars = [{ h: 0.52 }, { h: 0.72 }, { h: 1.00 }, { h: 0.60 }, { h: 0.78 }]
  const STAGGER = 0.13, BAR_DUR = 0.7, HOLD_DUR = 1.8
  const TOTAL_DUR = STAGGER * (bars.length - 1) + BAR_DUR + HOLD_DUR
  let startTime: number | null = null
  let raf: number
  function easeOutBack(t: number) { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2) }
  function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }
  function draw(ts: number) {
    if (!startTime) startTime = ts
    const loopT = ((ts - startTime) / 1000) % TOTAL_DUR
    const W = canvas.width, H = canvas.height
    ctx.clearRect(0, 0, W, H)
    const pad = 52 * DPR, bottom = H - 28 * DPR, maxH = bottom - 28 * DPR
    const totalW = W - pad * 2, barW = totalW / (bars.length * 1.8)
    const gap = (totalW - barW * bars.length) / (bars.length + 1)
    bars.forEach((bar, i) => {
      const localT = clamp((loopT - i * STAGGER) / BAR_DUR, 0, 1)
      const progress = easeOutBack(localT)
      const fullH = maxH * bar.h, currentH = fullH * progress
      const x = pad + gap + i * (barW + gap), y = bottom - currentH
      const r = Math.min(10 * DPR, barW * 0.22)
      if (currentH <= 0) return
      const isTallest = bar.h === 1.0
      if (isTallest && localT > 0.5) {
        const gAlpha = clamp((localT - 0.5) * 2, 0, 1) * 0.35
        const cx2 = x + barW / 2
        const gGlow = ctx.createRadialGradient(cx2, y, 0, cx2, y + currentH * 0.3, barW * 2.2)
        gGlow.addColorStop(0, `rgba(45,122,106,${gAlpha})`); gGlow.addColorStop(1, 'rgba(32,59,55,0)')
        ctx.fillStyle = gGlow; ctx.fillRect(x - barW, y - barW * 0.5, barW * 3, currentH + barW)
      }
      const grad = ctx.createLinearGradient(0, y, 0, bottom)
      if (isTallest) { grad.addColorStop(0, 'rgba(55,110,95,1)'); grad.addColorStop(0.4, 'rgba(40,80,70,1)'); grad.addColorStop(1, 'rgba(20,45,40,1)') }
      else { grad.addColorStop(0, 'rgba(38,75,65,1)'); grad.addColorStop(0.5, 'rgba(28,57,50,1)'); grad.addColorStop(1, 'rgba(15,35,30,1)') }
      ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + barW - r, y); ctx.quadraticCurveTo(x + barW, y, x + barW, y + r)
      ctx.lineTo(x + barW, bottom); ctx.lineTo(x, bottom); ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath()
      ctx.fillStyle = grad; ctx.fill()
      ctx.save(); ctx.clip()
      const shimGrad = ctx.createLinearGradient(x, y, x + barW, y)
      shimGrad.addColorStop(0, 'rgba(255,255,255,0.0)'); shimGrad.addColorStop(0.35, 'rgba(255,255,255,0.07)'); shimGrad.addColorStop(1, 'rgba(255,255,255,0.0)')
      ctx.fillStyle = shimGrad; ctx.fillRect(x, y, barW, currentH * 0.5)
      ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + barW - r, y); ctx.quadraticCurveTo(x + barW, y, x + barW, y + r)
      ctx.strokeStyle = isTallest ? 'rgba(110,232,202,0.5)' : 'rgba(110,232,202,0.2)'; ctx.lineWidth = 1.5 * DPR; ctx.stroke()
      ctx.restore()
    })
    raf = requestAnimationFrame(draw)
  }
  raf = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(raf)
}

function initChart(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const DPR = window.devicePixelRatio || 1
  const rawPts = [[0.00,0.80],[0.06,0.64],[0.14,0.54],[0.22,0.60],[0.30,0.64],[0.38,0.61],[0.46,0.52],[0.54,0.40],[0.60,0.30],[0.66,0.34],[0.72,0.40],[0.80,0.43],[0.88,0.38],[0.94,0.41],[1.00,0.46]]
  function catmullRom(pts: number[][], n: number) {
    const out: number[][] = []
    for (let s = 0; s < n; s++) {
      const tt = s / (n - 1), f = tt * (pts.length - 1), i = Math.min(Math.floor(f), pts.length - 2), u = f - i
      const p0 = pts[Math.max(i-1,0)], p1 = pts[i], p2 = pts[i+1], p3 = pts[Math.min(i+2,pts.length-1)]
      out.push([0.5*((-p0[0]+3*p1[0]-3*p2[0]+p3[0])*u*u*u+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*u*u+(-p0[0]+p2[0])*u+2*p1[0]),0.5*((-p0[1]+3*p1[1]-3*p2[1]+p3[1])*u*u*u+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*u*u+(-p0[1]+p2[1])*u+2*p1[1])])
    }
    return out
  }
  const SAMPLES = 400, curvePts = catmullRom(rawPts, SAMPLES)
  let peakIdx = 0; curvePts.forEach((p,i) => { if (p[1] < curvePts[peakIdx][1]) peakIdx = i })
  const DRAW_DUR = 2.2, HOLD_DUR = 1.8, TOTAL_DUR = DRAW_DUR + HOLD_DUR + 0.6
  let startTime: number | null = null; let raf: number
  function easeOut(t: number) { return 1 - Math.pow(1-t, 3) }
  function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)) }
  function draw(ts: number) {
    if (!startTime) startTime = ts
    const loopT = ((ts - startTime) / 1000) % TOTAL_DUR
    const W = canvas.width, H = canvas.height
    ctx.clearRect(0, 0, W, H)
    const progress = easeOut(Math.min(loopT / DRAW_DUR, 1))
    const drawnCount = Math.max(2, Math.floor(progress * SAMPLES))
    const drawnPts = curvePts.slice(0, drawnCount)
    const dotPt = drawnPts[drawnPts.length - 1]
    const dotX = dotPt[0] * W, dotY = dotPt[1] * H
    const pastPeak = drawnCount > peakIdx
    const peakX = curvePts[peakIdx][0] * W, peakY = curvePts[peakIdx][1] * H
    let tipAlpha = 0
    if (pastPeak) { const s = (drawnCount - peakIdx) / (SAMPLES - peakIdx); tipAlpha = Math.min(s / 0.15, 1) }
    if (pastPeak) {
      const gGlow = ctx.createRadialGradient(peakX, peakY, 0, peakX, peakY, W * 0.38)
      gGlow.addColorStop(0, `rgba(45,122,106,${0.28*tipAlpha})`); gGlow.addColorStop(1, 'rgba(32,59,55,0)')
      ctx.fillStyle = gGlow; ctx.fillRect(0, 0, W, H)
    }
    if (drawnCount > 1) {
      const areaGrad = ctx.createLinearGradient(0, 0, 0, H)
      areaGrad.addColorStop(0, 'rgba(32,59,55,0.95)'); areaGrad.addColorStop(0.55, 'rgba(21,42,39,0.88)'); areaGrad.addColorStop(1, 'rgba(10,19,18,0.95)')
      ctx.beginPath(); ctx.moveTo(drawnPts[0][0]*W, drawnPts[0][1]*H)
      for (let i=1;i<drawnPts.length;i++) ctx.lineTo(drawnPts[i][0]*W, drawnPts[i][1]*H)
      ctx.lineTo(dotX, H); ctx.lineTo(drawnPts[0][0]*W, H); ctx.closePath(); ctx.fillStyle = areaGrad; ctx.fill()
      ctx.save(); ctx.shadowColor = 'rgba(110,232,202,0.5)'; ctx.shadowBlur = 12*DPR
      ctx.beginPath(); ctx.moveTo(drawnPts[0][0]*W, drawnPts[0][1]*H)
      for (let i=1;i<drawnPts.length;i++) ctx.lineTo(drawnPts[i][0]*W, drawnPts[i][1]*H)
      ctx.strokeStyle = 'rgba(110,232,202,0.55)'; ctx.lineWidth = 2*DPR; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); ctx.restore()
    }
    if (pastPeak) {
      const lGrad = ctx.createLinearGradient(0, peakY, 0, H)
      lGrad.addColorStop(0, `rgba(110,232,202,${0.9*tipAlpha})`); lGrad.addColorStop(1, 'rgba(110,232,202,0)')
      ctx.beginPath(); ctx.moveTo(peakX, peakY); ctx.lineTo(peakX, H); ctx.strokeStyle = lGrad; ctx.lineWidth = 1.5*DPR; ctx.stroke()
    }
    const dGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 22*DPR)
    dGlow.addColorStop(0, 'rgba(110,232,202,0.5)'); dGlow.addColorStop(1, 'rgba(110,232,202,0)')
    ctx.beginPath(); ctx.arc(dotX, dotY, 22*DPR, 0, Math.PI*2); ctx.fillStyle = dGlow; ctx.fill()
    ctx.beginPath(); ctx.arc(dotX, dotY, 7*DPR, 0, Math.PI*2); ctx.fillStyle = '#0e1a19'; ctx.strokeStyle = 'rgba(110,232,202,0.95)'; ctx.lineWidth = 2*DPR; ctx.fill(); ctx.stroke()
    ctx.beginPath(); ctx.arc(dotX, dotY, 2.5*DPR, 0, Math.PI*2); ctx.fillStyle = '#ffffff'; ctx.fill()
    if (tipAlpha > 0) {
      const pW=116*DPR, pH=30*DPR, pX=peakX-pW/2, pY=peakY-48*DPR, pR=15*DPR
      ctx.globalAlpha = tipAlpha
      ctx.beginPath(); ctx.moveTo(pX+pR,pY); ctx.lineTo(pX+pW-pR,pY); ctx.arcTo(pX+pW,pY,pX+pW,pY+pR,pR); ctx.lineTo(pX+pW,pY+pH-pR); ctx.arcTo(pX+pW,pY+pH,pX+pW-pR,pY+pH,pR); ctx.lineTo(pX+pR,pY+pH); ctx.arcTo(pX,pY+pH,pX,pY+pH-pR,pR); ctx.lineTo(pX,pY+pR); ctx.arcTo(pX,pY,pX+pR,pY,pR); ctx.closePath()
      ctx.fillStyle = '#203b37'; ctx.fill()
      ctx.strokeStyle = 'rgba(110,232,202,0.35)'; ctx.lineWidth = 1*DPR; ctx.stroke()
      ctx.fillStyle = '#ffffff'; ctx.font = `500 ${13*DPR}px -apple-system,sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('100k+ views', peakX, pY+pH/2)
      ctx.globalAlpha = 1
    }
    raf = requestAnimationFrame(draw)
  }
  raf = requestAnimationFrame(draw)
  return () => cancelAnimationFrame(raf)
}

function initHierarchy(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const DPR = window.devicePixelRatio || 1
  const TOTAL_DUR = 4.5; let startTime: number | null = null; let raf: number
  function easeOutBack(t: number) { const c1=1.5,c3=c1+1; return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2) }
  function easeOut(t: number) { return 1-Math.pow(1-t,3) }
  function clamp(v: number,lo: number,hi: number) { return Math.max(lo,Math.min(hi,v)) }
  function roundRect(x: number,y: number,w: number,h: number,r: number) {
    ctx.beginPath(); ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r); ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r); ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r); ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r); ctx.closePath()
  }
  function drawCrown(cx: number,cy: number,size: number,alpha: number) {
    ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle='rgba(255,255,255,0.9)'; ctx.fillStyle='rgba(255,255,255,0.15)'; ctx.lineWidth=1.8*DPR; ctx.lineJoin='round'
    const s=size*0.38
    ctx.beginPath(); ctx.moveTo(cx-s,cy+s*0.5); ctx.lineTo(cx-s*0.6,cy-s*0.3); ctx.lineTo(cx-s*0.2,cy+s*0.1); ctx.lineTo(cx,cy-s*0.6); ctx.lineTo(cx+s*0.2,cy+s*0.1); ctx.lineTo(cx+s*0.6,cy-s*0.3); ctx.lineTo(cx+s,cy+s*0.5); ctx.closePath(); ctx.fill(); ctx.stroke()
    ctx.beginPath(); ctx.arc(cx,cy,s*1.15,0,Math.PI*2); ctx.strokeStyle='rgba(255,255,255,0.35)'; ctx.lineWidth=1.2*DPR; ctx.stroke(); ctx.restore()
  }
  function drawMeta(cx: number,cy: number,size: number,alpha: number) {
    ctx.save(); ctx.globalAlpha=alpha; const s=size*0.28
    const grad=ctx.createLinearGradient(cx-s*1.1,cy,cx+s*1.1,cy); grad.addColorStop(0,'#0081FB'); grad.addColorStop(0.5,'#0064E0'); grad.addColorStop(1,'#0081FB')
    ctx.strokeStyle=grad; ctx.lineWidth=s*0.38; ctx.lineCap='round'
    ctx.beginPath(); ctx.ellipse(cx-s*0.52,cy,s*0.48,s*0.72,-Math.PI*0.18,0,Math.PI*2); ctx.stroke()
    ctx.beginPath(); ctx.ellipse(cx+s*0.52,cy,s*0.48,s*0.72,Math.PI*0.18,0,Math.PI*2); ctx.stroke(); ctx.restore()
  }
  function drawGoogle(cx: number,cy: number,size: number,alpha: number) {
    ctx.save(); ctx.globalAlpha=alpha; const s=size*0.34
    const ax=cx,ay=cy-s*0.6,lx=cx-s*0.5,ly=cy+s*0.4,rx=cx+s*0.5,ry=cy+s*0.4
    const lCX=(ax+lx)/2,lCY=(ay+ly)/2,lA=Math.atan2(lx-ax,ay-ly)
    const rCX=(ax+rx)/2,rCY=(ay+ry)/2,rA=Math.atan2(rx-ax,ay-ry)
    const hL=Math.sqrt(Math.pow(s*0.5,2)+Math.pow(s*1.0,2))/2,hW=s*0.19
    ctx.save(); ctx.translate(lCX,lCY); ctx.rotate(lA); ctx.beginPath(); ctx.ellipse(0,0,hW,hL,0,0,Math.PI*2); ctx.fillStyle='#FBBC04'; ctx.fill(); ctx.restore()
    ctx.save(); ctx.translate(rCX,rCY); ctx.rotate(rA); ctx.beginPath(); ctx.ellipse(0,0,hW,hL,0,0,Math.PI*2); ctx.fillStyle='#4285F4'; ctx.fill(); ctx.restore()
    ctx.beginPath(); ctx.arc(ax,ay,s*0.22,0,Math.PI*2); ctx.fillStyle='#34A853'; ctx.fill(); ctx.restore()
  }
  function drawLinkedIn(cx: number,cy: number,size: number,alpha: number) {
    ctx.save(); ctx.globalAlpha=alpha; const s=size*0.56,r=s*0.18
    roundRect(cx-s/2,cy-s/2,s,s,r); ctx.fillStyle='#0A66C2'; ctx.fill()
    ctx.fillStyle='#ffffff'; ctx.font=`bold ${s*0.62}px -apple-system,sans-serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('in',cx,cy+s*0.03); ctx.restore()
  }
  function drawNode(cx: number,cy: number,size: number,iconFn: (cx:number,cy:number,s:number,a:number)=>void,scale: number,alpha: number,isTop: boolean) {
    if(scale<=0||alpha<=0) return
    ctx.save(); ctx.translate(cx,cy); ctx.scale(scale,scale); ctx.translate(-cx,-cy)
    const s=size,r=12*DPR
    if(isTop) {
      const g=ctx.createRadialGradient(cx,cy,0,cx,cy,s); g.addColorStop(0,`rgba(45,122,106,${0.4*alpha})`); g.addColorStop(1,'rgba(32,59,55,0)')
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,s*1.5,0,Math.PI*2); ctx.fill()
    }
    ctx.save(); ctx.shadowColor='rgba(32,59,55,0.8)'; ctx.shadowBlur=18*DPR
    roundRect(cx-s/2,cy-s/2,s,s,r); ctx.fillStyle='#122320'; ctx.globalAlpha=alpha; ctx.fill(); ctx.restore()
    ctx.globalAlpha=alpha; roundRect(cx-s/2,cy-s/2,s,s,r)
    const bG=ctx.createLinearGradient(cx-s/2,cy-s/2,cx+s/2,cy+s/2); bG.addColorStop(0,'rgba(110,232,202,0.35)'); bG.addColorStop(1,'rgba(32,59,55,0.2)')
    ctx.strokeStyle=bG; ctx.lineWidth=1.2*DPR; ctx.stroke()
    roundRect(cx-s/2,cy-s/2,s,s,r)
    const fG=ctx.createLinearGradient(cx-s/2,cy-s/2,cx+s/2,cy+s/2); fG.addColorStop(0,'rgba(32,59,55,0.6)'); fG.addColorStop(1,'rgba(15,30,28,0.4)')
    ctx.fillStyle=fG; ctx.fill()
    iconFn(cx,cy,s,alpha); ctx.restore()
  }
  function drawLine(x1: number,y1: number,x2: number,y2: number,progress: number,alpha: number) {
    if(progress<=0||alpha<=0) return
    const ex=x1+(x2-x1)*progress,ey=y1+(y2-y1)*progress
    ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle='rgba(110,232,202,0.3)'; ctx.lineWidth=1.2*DPR; ctx.setLineDash([4*DPR,4*DPR])
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(ex,ey); ctx.stroke(); ctx.restore()
  }
  function draw(ts: number) {
    if(!startTime) startTime=ts
    const loopT=((ts-startTime)/1000)%TOTAL_DUR
    const W=canvas.width,H=canvas.height; ctx.clearRect(0,0,W,H)
    const cx2=W/2,topY=H*0.24,botY=H*0.72,nodeS=62*DPR,spread=130*DPR
    const nodes=[{x:cx2,y:topY,icon:drawCrown,delay:0.9},{x:cx2-spread,y:botY,icon:drawMeta,delay:1.3},{x:cx2,y:botY,icon:drawGoogle,delay:1.5},{x:cx2+spread,y:botY,icon:drawLinkedIn,delay:1.7}]
    const platAlpha=clamp(easeOut(loopT/0.6),0,1)*(0.7+0.15*Math.sin(loopT*1.2))
    const platGlow=ctx.createRadialGradient(cx2,(topY+botY)/2,0,cx2,(topY+botY)/2,spread*1.6)
    platGlow.addColorStop(0,`rgba(32,80,65,${platAlpha*0.55})`); platGlow.addColorStop(0.5,`rgba(20,55,45,${platAlpha*0.3})`); platGlow.addColorStop(1,'rgba(10,19,18,0)')
    ctx.fillStyle=platGlow; ctx.fillRect(0,0,W,H)
    const lineProgress=clamp(easeOut((loopT-0.5)/0.6),0,1),lineAlpha=clamp(easeOut((loopT-0.5)/0.4),0,1)
    const midY=topY+(botY-topY)*0.5
    drawLine(cx2,topY+nodeS*0.5,cx2,midY,lineProgress,lineAlpha)
    drawLine(cx2-spread,midY,cx2+spread,midY,lineProgress,lineAlpha)
    ;[cx2-spread,cx2,cx2+spread].forEach(bx=>drawLine(bx,midY,bx,botY-nodeS*0.5,lineProgress,lineAlpha))
    nodes.forEach(n=>{
      const localT=clamp((loopT-n.delay)/0.45,0,1),scale=easeOutBack(localT),alpha=clamp(localT/0.3,0,1)
      drawNode(n.x,n.y,nodeS,n.icon,scale,alpha,n===nodes[0])
    })
    raf=requestAnimationFrame(draw)
  }
  raf=requestAnimationFrame(draw)
  return ()=>cancelAnimationFrame(raf)
}

function initProgress(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  const DPR = window.devicePixelRatio || 1
  const TOTAL_DUR=4.5; let startTime: number|null=null; let raf: number
  function easeOut(t: number){return 1-Math.pow(1-t,3)}
  function easeOutBack(t: number){const c1=1.4,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)}
  function clamp(v: number,lo: number,hi: number){return Math.max(lo,Math.min(hi,v))}
  function roundRect(x: number,y: number,w: number,h: number,r: number){
    ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.arcTo(x+w,y,x+w,y+r,r);ctx.lineTo(x+w,y+h-r);ctx.arcTo(x+w,y+h,x+w-r,y+h,r);ctx.lineTo(x+r,y+h);ctx.arcTo(x,y+h,x,y+h-r,r);ctx.lineTo(x,y+r);ctx.arcTo(x,y,x+r,y,r);ctx.closePath()
  }
  const logoSrcs = ['/outro.png', '/Bunai .png', '/Floristry.jpeg']
  const logoImgs: HTMLImageElement[] = logoSrcs.map(src => {
    const img = new Image()
    img.onload = () => { startTime = null }
    img.src = src
    return img
  })
  function draw(ts: number){
    if(!startTime)startTime=ts
    const loopT=((ts-startTime)/1000)%TOTAL_DUR
    const W=canvas.width,H=canvas.height; ctx.clearRect(0,0,W,H)
    const pad=36*DPR
    const bgGlow=ctx.createRadialGradient(W*0.35,H*0.45,0,W*0.35,H*0.45,W*0.55)
    bgGlow.addColorStop(0,'rgba(32,59,55,0.35)');bgGlow.addColorStop(1,'rgba(10,19,18,0)')
    ctx.fillStyle=bgGlow;ctx.fillRect(0,0,W,H)
    const panelAlpha=clamp(easeOut(loopT/0.5),0,1)
    const pX=pad,pY=H*0.28,pW=W-pad*2,pH=H*0.56,pR=14*DPR
    ctx.save();ctx.globalAlpha=panelAlpha*0.5;roundRect(pX+10*DPR,pY+10*DPR,pW-20*DPR,pH,pR);ctx.fillStyle='#152b28';ctx.fill();ctx.restore()
    ctx.save();ctx.globalAlpha=panelAlpha;roundRect(pX,pY,pW,pH,pR)
    const pGrad=ctx.createLinearGradient(pX,pY,pX+pW,pY+pH);pGrad.addColorStop(0,'#1a3b36');pGrad.addColorStop(1,'#0f2220')
    ctx.fillStyle=pGrad;ctx.fill();ctx.strokeStyle='rgba(110,232,202,0.15)';ctx.lineWidth=1*DPR;ctx.stroke();ctx.restore()
    const b1Y=pY+pH*0.25,b1H=14*DPR,b1X=pX+20*DPR,b1W=pW-40*DPR,b1R=b1H/2
    const b1P=clamp(easeOut(clamp((loopT-0.7)/1.2,0,1)),0,1)*0.72
    ctx.save();ctx.globalAlpha=panelAlpha;roundRect(b1X,b1Y,b1W,b1H,b1R);ctx.fillStyle='rgba(255,255,255,0.07)';ctx.fill()
    if(b1P>0){roundRect(b1X,b1Y,b1W*b1P,b1H,b1R);const g=ctx.createLinearGradient(b1X,0,b1X+b1W,0);g.addColorStop(0,'#2d7a6a');g.addColorStop(1,'#6ee8ca');ctx.fillStyle=g;ctx.fill()}
    ctx.restore()
    const b2Y=pY+pH*0.6,b2H=22*DPR,b2X=pX+20*DPR,b2W=pW-40*DPR,b2R=b2H/2
    const b2P=clamp(easeOut(clamp((loopT-0.9)/1.4,0,1)),0,1)*0.67
    ctx.save();ctx.globalAlpha=panelAlpha;roundRect(b2X,b2Y,b2W,b2H,b2R);ctx.fillStyle='rgba(255,255,255,0.06)';ctx.fill()
    if(b2P>0){roundRect(b2X,b2Y,b2W*b2P,b2H,b2R);const g=ctx.createLinearGradient(b2X,0,b2X+b2W,0);g.addColorStop(0,'#1a4a40');g.addColorStop(1,'#3a9a80');ctx.fillStyle=g;ctx.fill()
      if(b2P>0.35){const tA=clamp((b2P-0.35)/0.15,0,1);ctx.globalAlpha=panelAlpha*tA*0.75;ctx.fillStyle='rgba(255,255,255,0.85)';ctx.font=`500 ${10*DPR}px -apple-system,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('Almost there!',b2X+b2W*b2P*0.5,b2Y+b2H/2)}
    }
    ctx.restore()
    const cX=pX+pW-58*DPR,cY=pY-22*DPR,cR=32*DPR
    const cP=clamp(easeOut(clamp((loopT-0.6)/1.3,0,1)),0,1)*0.67
    const cA=clamp(easeOut(loopT/0.5),0,1)
    ctx.save();ctx.globalAlpha=cA;ctx.beginPath();ctx.arc(cX,cY,cR,0,Math.PI*2);ctx.fillStyle='#0e1a19';ctx.fill();ctx.strokeStyle='rgba(255,255,255,0.08)';ctx.lineWidth=3.5*DPR;ctx.stroke()
    ctx.beginPath();ctx.arc(cX,cY,cR,-Math.PI/2,-Math.PI/2+Math.PI*2*cP);ctx.strokeStyle='#6ee8ca';ctx.lineWidth=3.5*DPR;ctx.lineCap='round';ctx.stroke()
    ctx.fillStyle='#ffffff';ctx.font=`600 ${12*DPR}px -apple-system,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(Math.round(cP/0.67*67)+'%',cX,cY);ctx.restore()
    const avR=24*DPR,avStartX=pX+14*DPR,avY=pY-avR-4*DPR
    logoSrcs.forEach((_, i)=>{
      const avA=clamp(easeOutBack(clamp((loopT-0.3-i*0.12)/0.4,0,1)),0,1)
      const avX=avStartX+avR+i*(avR*2-6*DPR*1.5)
      const img = logoImgs[i]
      ctx.save()
      ctx.globalAlpha = avA
      // clip to circle
      ctx.beginPath()
      ctx.arc(avX, avY, avR, 0, Math.PI*2)
      ctx.clip()
      // white background
      ctx.fillStyle = '#ffffff'
      ctx.fill()
      // draw image if loaded
      if (img && img.complete && img.naturalWidth > 0) {
        const pad = avR * 0.15
        ctx.drawImage(img, avX - avR + pad, avY - avR + pad, (avR - pad) * 2, (avR - pad) * 2)
      }
      ctx.restore()
      // border ring
      ctx.save()
      ctx.globalAlpha = avA
      ctx.beginPath()
      ctx.arc(avX, avY, avR, 0, Math.PI*2)
      ctx.strokeStyle = 'rgba(110,232,202,0.5)'
      ctx.lineWidth = 1.5 * DPR
      ctx.stroke()
      ctx.restore()
    })
    const plusX=avStartX+avR+logoSrcs.length*(avR*2-6*DPR*1.5)
    const plusA=clamp(easeOutBack(clamp((loopT-0.3-logoSrcs.length*0.12)/0.4,0,1)),0,1)
    ctx.save();ctx.globalAlpha=plusA;ctx.beginPath();ctx.arc(plusX,avY,avR,0,Math.PI*2);ctx.fillStyle='#1e3b36';ctx.fill();ctx.strokeStyle='rgba(110,232,202,0.3)';ctx.lineWidth=1.5*DPR;ctx.stroke();ctx.fillStyle='rgba(255,255,255,0.7)';ctx.font=`300 ${18*DPR}px -apple-system`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('+',plusX,avY);ctx.restore()
    const firstAvX=avStartX+avR,bA=clamp(easeOutBack(clamp((loopT-0.5)/0.35,0,1)),0,1)
    const bW=34*DPR,bH=18*DPR,bR2=9*DPR,bX=firstAvX-bW/2,bY2=avY-avR-bH*0.3
    ctx.save();ctx.globalAlpha=bA;roundRect(bX,bY2,bW,bH,bR2);ctx.fillStyle='#2d7a6a';ctx.fill();ctx.fillStyle='#ffffff';ctx.font=`700 ${9.5*DPR}px -apple-system,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('1st',bX+bW/2,bY2+bH/2);ctx.restore()
    raf=requestAnimationFrame(draw)
  }
  raf=requestAnimationFrame(draw)
  return ()=>cancelAnimationFrame(raf)
}

export default function BentoFeatures() {
  return (
    <section style={{ padding:'5rem 24px', background:'#000' }}>
      <div style={{ maxWidth:1280, margin:'0 auto' }}>
        <style>{`
          .bento-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
          @media(min-width:768px){ .bento-grid { grid-template-columns: 1fr 1fr; } }
        `}</style>
        <div className="bento-grid">
          <CanvasCard id="chart" title="We use real data, not guesswork" subtitle="Every campaign is optimised" initFn={initChart} />
          <CanvasCard id="hierarchy" title="Unveiled Metrics" subtitle="Total visibility into your investments" initFn={initHierarchy} />
          <CanvasCard id="barchart" title="Experience across top industries" subtitle="Every campaign is optimised" initFn={initBarChart} />
          <CanvasCard id="progress" title="Client-first approach" subtitle="Your goals become our KPIs" initFn={initProgress} />
        </div>
      </div>
    </section>
  )
}
