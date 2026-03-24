import { useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls, RoundedBox, Sphere } from '@react-three/drei'
import { ShieldCheck, GraduationCap, Building2, Clock3, ArrowUpRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay } from 'swiper/modules'
import gsap from 'gsap'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

const courseData = [
  ['ADCA', 'Advance Diploma in Computer Application', '6 Months'],
  ['DCA', 'Diploma in Computer Application', '6 Months'],
  ['Tally', 'Financial Accounting', '3 Months'],
  ['ADIT', 'Advance Diploma in Information Technology', '12 Months'],
  ['DCTT', 'Diploma in Computer Teacher Training', '18 Months'],
]

function Keyboard3D() {
  const [activeKeys, setActiveKeys] = useState(new Set())

  useEffect(() => {
    const onDown = (e) => setActiveKeys((p) => new Set([...p, e.key.toLowerCase()]))
    const onUp = (e) => {
      setActiveKeys((p) => {
        const n = new Set(p)
        n.delete(e.key.toLowerCase())
        return n
      })
    }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
    }
  }, [])

  const keys = useMemo(() => 'qwertyuiopasdfghjklzxcvbnm'.split(''), [])
  return (
    <group position={[0, -1.2, 0]}>
      {keys.map((k, i) => {
        const row = i < 10 ? 0 : i < 19 ? 1 : 2
        const x = (i - (row === 0 ? 4.5 : row === 1 ? 14 : 22)) * 0.35 + row * 0.15
        const y = row * -0.3
        const active = activeKeys.has(k)
        return (
          <RoundedBox key={k} args={[0.26, 0.07, 0.26]} radius={0.03} position={[x, y, 0]}>
            <meshStandardMaterial color={active ? '#22d3ee' : '#1f2a44'} emissive={active ? '#8b5cf6' : '#000'} emissiveIntensity={active ? 1.3 : 0} />
          </RoundedBox>
        )
      })}
    </group>
  )
}

function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0.6, 3.8], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 2]} intensity={1.1} color="#22d3ee" />
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.3}>
        <Sphere args={[0.45, 32, 32]} position={[-1.7, 0.8, -0.4]}>
          <meshStandardMaterial color="#8b5cf6" transparent opacity={0.6} wireframe />
        </Sphere>
      </Float>
      <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.6}>
        <RoundedBox args={[0.8, 0.18, 0.8]} radius={0.08} position={[1.6, 0.5, -0.8]}>
          <meshStandardMaterial color="#22d3ee" />
        </RoundedBox>
      </Float>
      <Keyboard3D />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

export default function App() {
  const [now, setNow] = useState(new Date('2026-03-24T12:09:54'))
  const [typed, setTyped] = useState('')
  const heroLines = ['Enroll Today, Empower Tomorrow.', 'Dream Big, Learn Bigger.', 'Excellence Through Education.']
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const text = heroLines[lineIndex]
    let i = 0
    setTyped('')
    const type = setInterval(() => {
      i += 1
      setTyped(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(type)
        setTimeout(() => setLineIndex((p) => (p + 1) % heroLines.length), 1100)
      }
    }, 45)
    return () => clearInterval(type)
  }, [lineIndex])

  useEffect(() => {
    gsap.fromTo('.glass-card', { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7 })
  }, [])

  return (
    <div className="min-h-screen bg-space text-white">
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-white/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm">
          <div className="flex items-center gap-2"><span className="rounded-full bg-cyanpulse/25 px-3 py-1">Admin Login</span><span className="rounded-full bg-violetneon/25 px-3 py-1">Centre Login</span></div>
          <div>{now.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })} | {now.toLocaleTimeString()}</div>
          <nav className="hidden gap-4 md:flex text-cyan-100"><a>About</a><a>Courses</a><a>Student Zone</a><a>Results</a><a>Franchise</a><a>Downloads</a><a>Gallery</a></nav>
        </div>
      </header>

      <main className="pt-20">
        <section className="relative overflow-hidden px-4 py-20 md:py-24">
          <div className="absolute inset-0 -z-10"><Hero3D /></div>
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-cyanpulse">01010101</p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Enroll Today, Empower Tomorrow.</h1>
            <p className="mt-5 text-lg text-cyan-100">{typed}<span className="animate-pulse">|</span></p>
            <div className="mt-8 overflow-hidden rounded-full border border-white/20 bg-black/30 py-2">
              <div className="flex w-[200%] animate-marquee gap-8 whitespace-nowrap text-sm text-cyan-100">
                {Array.from({ length: 2 }).map((_, i) => <div key={i} className="flex gap-8"><span>Admission is Going On...</span><span>Contact for Franchisee Opening.</span><span>Shaping Minds, Shaping Futures.</span></div>)}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3">
          <article className="glass-card rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl md:col-span-2">
            <p className="text-cyanpulse">The Director's Portal</p>
            <h2 className="mt-2 text-3xl font-bold">A Message from the Director</h2>
            <p className="mt-4 text-white/85">Greetings and welcome to Improven Computer Academy (ICA). We deliver adaptive, industry-relevant computer education through DCA, ADCA, typing, office automation, and technology pathways for future-ready careers.</p>
            <p className="mt-4 rounded-2xl border border-violetneon/40 bg-violetneon/10 p-4 text-xl font-semibold">“Shaping Minds, Shaping Futures.”</p>
          </article>
          <aside className="glass-card flex items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-b from-white/20 to-white/5 p-6">
            <div className="h-44 w-44 rounded-full border border-cyanpulse/50 bg-[radial-gradient(circle_at_30%_30%,#22d3ee,#0a0f1e)] shadow-glow" />
          </aside>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2">
          <div className="glass-card rounded-2xl border border-cyanpulse/30 bg-cyanpulse/10 p-6"><GraduationCap className="mb-2 text-cyanpulse" /><p className="text-4xl font-black">18,000+</p><p>Total Registered Students</p></div>
          <div className="glass-card rounded-2xl border border-violetneon/30 bg-violetneon/10 p-6"><Building2 className="mb-2 text-violet-300" /><p className="text-4xl font-black">30+</p><p>Total Registered Centres</p></div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-center text-3xl font-bold">Course Matrix</h2>
          <p className="mt-2 text-center text-cyan-100">Swipe the 3D coverflow to explore flagship programs.</p>
          <Swiper effect="coverflow" grabCursor centeredSlides slidesPerView={'auto'} coverflowEffect={{ rotate: 30, depth: 120, modifier: 1 }} modules={[EffectCoverflow, Autoplay]} autoplay={{ delay: 2200 }} className="mt-8">
            {courseData.map(([code, title, duration]) => (
              <SwiperSlide key={code} className="!w-[280px]">
                <article className="glass-card group rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl transition hover:border-cyanpulse/70 hover:shadow-glow">
                  <h3 className="text-3xl font-black text-cyanpulse">{code}</h3>
                  <p className="mt-2 min-h-12 text-white/90">{title}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm text-violet-200"><Clock3 size={14} /> Duration: {duration}</p>
                  <button className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyanpulse/50 px-4 py-2 text-sm transition group-hover:bg-cyanpulse/20">Read More <ArrowUpRight size={14} /></button>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-14">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">Verification Hub · Security Dashboard</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {['Registration Verification', 'I-Card Verification', 'Marksheet Verification', 'Certificate Verification', 'Typing Certificate'].map((item) => (
                <a key={item} className="glass-card flex items-center justify-between rounded-xl border border-cyanpulse/20 bg-space/70 px-4 py-3 text-sm hover:border-cyanpulse/70">
                  <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-cyanpulse" />{item}</span><span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">Verified</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-black/40 px-4 py-10">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-cyanpulse/20 bg-white/5 p-5">
            <h3 className="font-bold text-cyanpulse">Bihar HQ</h3>
            <p className="mt-2 text-sm text-white/80">Improven Computer Academy Pvt Ltd, Near RLSY College, Dharhara Paliganj, Patna - 801110, Bihar, India</p>
          </div>
          <div className="rounded-2xl border border-violetneon/20 bg-white/5 p-5">
            <h3 className="font-bold text-violet-300">Bengaluru Corporate Office</h3>
            <p className="mt-2 text-sm text-white/80">4th Floor, Dr. B.R. Ambedkar Main Road, Hebbagodi, Bengaluru, Karnataka - 560099, India</p>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-7xl text-xs text-white/60">ISO · MSME · Trade Mark · PAN · Central Vigilance Commission</div>
      </footer>
    </div>
  )
}
