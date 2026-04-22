'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

const categories = ['All', 'Brand Strategy', 'Digital Growth', 'Design & UX', 'SEO', 'Social Media', 'Case Studies']

const posts = [
  {
    id: 1,
    category: 'Brand Strategy',
    title: 'Why Most Luxury Brands Fail at Digital — And How to Fix It',
    excerpt: 'The rules of luxury branding in the physical world don\'t always translate online. Here\'s what separates brands that thrive digitally from those that dilute their equity.',
    author: 'Enhanccee Team',
    date: 'Apr 18, 2026',
    readTime: '6 Min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop',
  },
  {
    id: 2,
    category: 'Digital Growth',
    title: 'The Conversion Architecture Framework: Building Sites That Sell',
    excerpt: 'Conversion isn\'t a feature you add at the end. It\'s an architectural principle that must be embedded from the first wireframe.',
    author: 'Enhanccee Team',
    date: 'Apr 14, 2026',
    readTime: '5 Min read',
    featured: true,
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80&fit=crop',
  },
  {
    id: 3,
    category: 'SEO',
    title: 'Beyond Keywords: How Semantic SEO is Reshaping Search in 2026',
    excerpt: 'Search engines have moved far beyond keyword matching. Understanding semantic intent is now the core competency that separates winning brands from invisible ones.',
    author: 'Enhanccee Team',
    date: 'Apr 10, 2026',
    readTime: '7 Min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&fit=crop',
  },
  {
    id: 4,
    category: 'Design & UX',
    title: 'The Psychology of Luxury UI: What High-End Brands Know About Restraint',
    excerpt: 'Luxury design is defined by what you leave out. An exploration of whitespace, typography hierarchy, and the art of communicating premium through minimalism.',
    author: 'Enhanccee Team',
    date: 'Apr 7, 2026',
    readTime: '4 Min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80&fit=crop',
  },
  {
    id: 5,
    category: 'Social Media',
    title: 'Content That Converts: The Enhanccee Social Media Matrix',
    excerpt: 'Not all content is equal. Our proprietary matrix maps content types to funnel stages — so every post has a purpose and every rupee works harder.',
    author: 'Enhanccee Team',
    date: 'Apr 3, 2026',
    readTime: '5 Min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop',
  },
  {
    id: 6,
    category: 'Case Studies',
    title: 'How We Grew a Jaipur Fashion Brand 3.4× in 6 Months',
    excerpt: 'A behind-the-scenes look at the strategy, creative direction, and growth systems we deployed for a premium Jaipur-based fashion label.',
    author: 'Enhanccee Team',
    date: 'Mar 28, 2026',
    readTime: '8 Min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80&fit=crop',
  },
  {
    id: 7,
    category: 'Brand Strategy',
    title: 'The Brand Audit: 10 Questions Every Founder Should Ask',
    excerpt: 'Before you spend another rupee on marketing, run this diagnostic. Most brands are surprised by what they find.',
    author: 'Enhanccee Team',
    date: 'Mar 22, 2026',
    readTime: '4 Min read',
    featured: false,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&fit=crop',
  },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const featured = posts.filter(p => p.featured)
  const filtered = activeCategory === 'All'
    ? posts.filter(p => !p.featured)
    : posts.filter(p => p.category === activeCategory && !p.featured)
  const allFiltered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  return (
    <div style={{ minHeight:'100vh', background:'#000', color:'#fff', fontFamily:'var(--font-montserrat)' }}>
      <Header />

      <section style={{ borderBottom:'1px solid rgba(255,255,255,.08)', padding:'80px 24px 40px', background:'#000' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <span style={{ fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', display:'block', marginBottom:16 }}>Enhanccee</span>
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            <h1 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2.4rem,6vw,4.5rem)', fontWeight:400, lineHeight:1.1, color:'#fff', margin:0 }}>
              Ideas &amp; <em style={{ fontStyle:'italic', color:'rgba(255,255,255,.6)' }}>Insights</em>
            </h1>
            <p style={{ fontSize:'.85rem', lineHeight:1.8, color:'rgba(255,255,255,.5)', maxWidth:560, margin:0 }}>
              Strategy, design, and growth thinking from the team that builds digital presence for brands that refuse to be ordinary.
            </p>
          </div>
        </div>
      </section>

      <nav style={{ borderBottom:'1px solid rgba(255,255,255,.08)', background:'#000', position:'sticky', top:0, zIndex:50, overflowX:'auto' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', display:'flex', gap:0 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding:'16px 20px',
                fontSize:'.62rem',
                fontWeight:600,
                letterSpacing:'.12em',
                textTransform:'uppercase',
                color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,.4)',
                background:'none',
                border:'none',
                borderBottom: activeCategory === cat ? '2px solid #fff' : '2px solid transparent',
                cursor:'pointer',
                whiteSpace:'nowrap',
                transition:'all .2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth:1280, margin:'0 auto', padding:'48px 24px 80px' }}>

        {(activeCategory === 'All' || featured.some(p => p.category === activeCategory)) && (
          <div style={{ marginBottom:48 }}>
            <style>{`
              .blog-featured-grid { display: grid; grid-template-columns: 1fr; gap: 3px; }
              @media(min-width:768px){ .blog-featured-grid { grid-template-columns: 1.4fr 1fr; } }
            `}</style>
            <div className="blog-featured-grid">
              {featured[0] && (activeCategory === 'All' || featured[0].category === activeCategory) && (
                <div style={{ position:'relative', overflow:'hidden', minHeight:420, cursor:'pointer', background:'#111' }}>
                  <img src={featured[0].image} alt={featured[0].title} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.7)', position:'absolute', inset:0 }}/>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.3) 60%, transparent 100%)' }}/>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'32px' }}>
                    <span style={{ fontSize:'.55rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.6)', background:'rgba(255,255,255,.1)', padding:'4px 12px', marginBottom:16, display:'inline-block' }}>{featured[0].category}</span>
                    <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(1.6rem,3vw,2.4rem)', fontWeight:400, color:'#fff', lineHeight:1.2, marginBottom:12 }}>{featured[0].title}</h2>
                    <div style={{ display:'flex', gap:16, fontSize:'.62rem', color:'rgba(255,255,255,.4)', letterSpacing:'.06em' }}>
                      <span>{featured[0].date}</span>
                      <span>·</span>
                      <span>{featured[0].readTime}</span>
                    </div>
                  </div>
                </div>
              )}
              {featured[1] && (activeCategory === 'All' || featured[1].category === activeCategory) && (
                <div style={{ position:'relative', overflow:'hidden', minHeight:300, cursor:'pointer', background:'#111' }}>
                  <img src={featured[1].image} alt={featured[1].title} style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.4) saturate(.7)', position:'absolute', inset:0 }}/>
                  <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.3) 60%, transparent 100%)' }}/>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'28px' }}>
                    <span style={{ fontSize:'.55rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.6)', background:'rgba(255,255,255,.1)', padding:'4px 12px', marginBottom:14, display:'inline-block' }}>{featured[1].category}</span>
                    <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(1.4rem,2.5vw,1.9rem)', fontWeight:400, color:'#fff', lineHeight:1.2, marginBottom:10 }}>{featured[1].title}</h2>
                    <div style={{ display:'flex', gap:16, fontSize:'.62rem', color:'rgba(255,255,255,.4)', letterSpacing:'.06em' }}>
                      <span>{featured[1].date}</span>
                      <span>·</span>
                      <span>{featured[1].readTime}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:40 }}>
          <span style={{ fontSize:'.58rem', letterSpacing:'.3em', textTransform:'uppercase', color:'rgba(255,255,255,.4)' }}>
            {activeCategory === 'All' ? 'Latest Articles' : activeCategory}
          </span>
          <div style={{ flex:1, height:1, background:'rgba(255,255,255,.08)' }}/>
        </div>

        <style>{`
          .blog-grid { display: grid; grid-template-columns: 1fr; gap: 3px; }
          @media(min-width:640px){ .blog-grid { grid-template-columns: 1fr 1fr; } }
          @media(min-width:1024px){ .blog-grid { grid-template-columns: 1fr 1fr 1fr; } }
          .blog-card:hover .blog-card-img { transform: scale(1.04); }
          .blog-card:hover .blog-card-title { color: rgba(255,255,255,.8); }
        `}</style>
        <div className="blog-grid">
          {(activeCategory === 'All' ? filtered : allFiltered.filter(p => !featured.includes(p) || activeCategory !== 'All')).map((post) => (
            <div key={post.id} className="blog-card" style={{ background:'#0d0d0d', border:'1px solid rgba(255,255,255,.06)', cursor:'pointer', overflow:'hidden', display:'flex', flexDirection:'column' }}>
              <div style={{ overflow:'hidden', height:220, position:'relative' }}>
                <img
                  className="blog-card-img"
                  src={post.image}
                  alt={post.title}
                  style={{ width:'100%', height:'100%', objectFit:'cover', filter:'brightness(.5) saturate(.7)', transition:'transform .6s cubic-bezier(.16,1,.3,1)' }}
                />
                <span style={{ position:'absolute', top:16, left:16, fontSize:'.52rem', letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(255,255,255,.7)', background:'rgba(0,0,0,.6)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.1)', padding:'4px 10px' }}>{post.category}</span>
              </div>
              <div style={{ padding:'24px', display:'flex', flexDirection:'column', flex:1 }}>
                <h3 className="blog-card-title" style={{ fontFamily:'var(--font-cormorant)', fontSize:'1.25rem', fontWeight:400, color:'#fff', lineHeight:1.3, marginBottom:12, transition:'color .3s' }}>{post.title}</h3>
                <p style={{ fontSize:'.75rem', lineHeight:1.85, color:'rgba(255,255,255,.45)', flex:1, marginBottom:20 }}>{post.excerpt}</p>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:16, borderTop:'1px solid rgba(255,255,255,.06)' }}>
                  <span style={{ fontSize:'.6rem', color:'rgba(255,255,255,.35)', letterSpacing:'.06em' }}>{post.date}</span>
                  <span style={{ fontSize:'.6rem', color:'rgba(255,255,255,.35)', letterSpacing:'.06em' }}>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {allFiltered.length === 0 && (
          <div style={{ textAlign:'center', padding:'80px 0' }}>
            <p style={{ fontFamily:'var(--font-cormorant)', fontSize:'2rem', color:'rgba(255,255,255,.3)' }}>No articles yet in this category</p>
            <button onClick={() => setActiveCategory('All')} style={{ marginTop:20, fontSize:'.62rem', letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(255,255,255,.5)', background:'none', border:'1px solid rgba(255,255,255,.15)', padding:'10px 24px', cursor:'pointer' }}>View All</button>
          </div>
        )}

      </main>

      <section style={{ background:'#0a0a0a', borderTop:'1px solid rgba(255,255,255,.06)', padding:'60px 24px', textAlign:'center' }}>
        <div style={{ maxWidth:640, margin:'0 auto' }}>
          <span style={{ fontSize:'.58rem', letterSpacing:'.35em', textTransform:'uppercase', color:'rgba(255,255,255,.4)', display:'block', marginBottom:20 }}>Work With Us</span>
          <h2 style={{ fontFamily:'var(--font-cormorant)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:400, color:'#fff', marginBottom:16, lineHeight:1.2 }}>
            Ready to build a brand<br /><em style={{ fontStyle:'italic', color:'rgba(255,255,255,.6)' }}>that defines its era?</em>
          </h2>
          <p style={{ fontSize:'.8rem', lineHeight:1.9, color:'rgba(255,255,255,.45)', marginBottom:32 }}>
            We partner with select brands each quarter. Let&apos;s talk about yours.
          </p>
          <Link
            href="/contact"
            style={{ background:'none', color:'#fff', fontSize:'.62rem', fontWeight:700, letterSpacing:'.2em', textTransform:'uppercase', padding:'14px 36px', display:'inline-block', border:'1px solid rgba(255,255,255,.4)', transition:'all .3s' }}
            onMouseEnter={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.color='#000'; e.currentTarget.style.borderColor='#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background='none'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='rgba(255,255,255,.4)'; }}
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
