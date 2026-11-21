import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Menu, X, BedDouble, Utensils, Music, Drama, MessageCircle, Mail, ArrowDown, Instagram, Facebook, Youtube } from 'lucide-react'
import RegistrationForm from './RegistrationForm.jsx'
import { IMAGES, GALLERY, SOCIALS, WHATSAPP_NUMBER, WHATSAPP_DISPLAY, EMAIL } from './config'

const LINKS = [['About', '#about'], ['Experience', '#experience'], ['Destination', '#destination'], ['Gallery', '#gallery'], ['Register', '#register'], ['Contact', '#contact']]

function Reveal({ children, className = '', delay = 0 }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

// Photo with a coloured fallback until the real image is added to /public/images
function Photo({ src, alt, tone = 'from-sand to-gold/50', className = '' }) {
  return (
    <div className={`overflow-hidden bg-gradient-to-br ${tone} ${className}`}>
      <img src={src} alt={alt} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none' }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
    </div>
  )
}

const Logo = ({ className = '' }) => <img src="/logo.png" alt="Lavan Lok – Sambhar, Rajasthan" width="1254" height="1254" className={className} />

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#top" aria-label="Lavan Lok home"><Logo className="h-14 w-14 object-contain mix-blend-multiply" /></a>
        <nav aria-label="Main" className="hidden items-center gap-8 text-sm tracking-wide lg:flex">
          {LINKS.map(([l, h]) => <a key={h} href={h} className="hover:text-sunset">{l}</a>)}
        </nav>
        <a href="#register" className="btn hidden bg-ink py-2.5 text-salt hover:bg-sunset lg:inline-flex">Register</a>
        <button className="p-2 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} aria-label="Mobile" className="border-t border-ink/10 bg-cream px-5 pb-8 pt-4 lg:hidden">
          <Logo className="mx-auto mb-4 h-40 w-40 object-contain mix-blend-multiply" />
          <ul className="grid gap-1 text-center font-display text-2xl">
            {LINKS.map(([l, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="block py-2">{l}</a></li>)}
          </ul>
        </motion.nav>
      )}
    </header>
  )
}

function Hero() {
  const reduce = useReducedMotion()
  return (
    <section id="top" className="relative flex min-h-screen items-end overflow-hidden bg-ink text-salt">
      <div className="absolute inset-0" style={{ backgroundImage: `url(${IMAGES.hero}), linear-gradient(180deg,#1C1917 0%,#3b2a22 35%,#B4532A 68%,#E9A862 82%,#FBF9F4 82.2%,#E4D8C3 100%)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/40" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:pb-28">
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }} className="mb-4 text-sm tracking-[0.3em] text-sand">SAMBHAR LAKE · RAJASTHAN</motion.p>
        <motion.h1 initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl font-semibold leading-none sm:text-8xl lg:text-9xl">LAVAN LOK</motion.h1>
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="mt-5 font-display text-3xl italic text-gold sm:text-4xl">Where Culture Meets Celebration.</motion.p>
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="mt-5 max-w-xl text-lg leading-relaxed text-salt/90">
          An extraordinary escape into music, culture, food and unforgettable experiences at Sambhar Lake, Rajasthan.
        </motion.p>
        <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#experience" className="btn bg-sunset text-white hover:bg-salt hover:text-ink">Explore the Experience</a>
          <a href="#register" className="btn border border-salt/70 bg-salt/10 text-salt backdrop-blur hover:bg-salt hover:text-ink">Register Your Interest</a>
        </motion.div>
      </div>
      <a href="#about" aria-label="Scroll down" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-salt/70"><ArrowDown /></a>
    </section>
  )
}

const Heading = ({ kicker, children, className = '' }) => (
  <div className={className}>
    {kicker && <p className="mb-3 text-sm tracking-[0.25em] text-sunset">{kicker}</p>}
    <h2 className="font-display text-4xl font-semibold leading-tight sm:text-6xl">{children}</h2>
  </div>
)

const EXPERIENCES = [
  { icon: BedDouble, title: 'STAY', text: 'Premium camping and boutique hospitality, set beneath an open desert sky.', img: IMAGES.stay, tone: 'from-gold/60 to-sand' },
  { icon: Utensils, title: 'FOOD', text: 'Authentic Rajasthani flavours and local delicacies, cooked the way the region cooks.', img: IMAGES.food, tone: 'from-sunset/70 to-gold/60' },
  { icon: Music, title: 'MUSIC', text: 'Live performances, acoustic sessions and fusion music as the light fades.', img: IMAGES.music, tone: 'from-ink to-sunset/70' },
  { icon: Drama, title: 'CULTURE', text: 'Traditional folk dance, art and cultural celebrations shared with the community.', img: IMAGES.culture, tone: 'from-sunset to-ink' }
]

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-2 lg:py-36">
          <Reveal><Heading kicker="ABOUT LAVAN LOK">More Than Just a Festival.</Heading></Reveal>
          <Reveal delay={0.15} className="space-y-5 text-lg leading-relaxed text-ink/80">
            <p>Lavan Lok is a cultural escape where Rajasthan's timeless traditions meet modern festival culture. It is a place to slow down, gather around a fire, and let the music carry the evening.</p>
            <p>Here, the folk songs your grandparents hummed share a stage with contemporary sounds. Meals come from local kitchens, stories come from local voices, and every sunset happens over a horizon of white salt.</p>
            <p>Come for the music. Stay for the people, the flavours and the quiet that only a desert lake can give.</p>
          </Reveal>
        </section>

        <section id="experience" className="bg-cream py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5">
            <Reveal><Heading kicker="THE EXPERIENCE" className="mb-14 max-w-2xl">Four ways to feel Lavan Lok.</Heading></Reveal>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {EXPERIENCES.map(({ icon: Icon, title, text, img, tone }, i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <article className="group relative h-[26rem] overflow-hidden rounded-3xl text-salt">
                    <Photo src={img} alt={`${title} at Lavan Lok`} tone={tone} className="absolute inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-500 group-hover:-translate-y-2">
                      <Icon className="mb-3 text-gold" />
                      <h3 className="font-display text-3xl font-semibold tracking-wider">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-salt/85">{text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="destination" className="relative overflow-hidden bg-ink py-28 text-salt lg:py-40">
          <div className="absolute inset-0 opacity-60" style={{ backgroundImage: `url(${IMAGES.destination}), linear-gradient(160deg,#1C1917 20%,#7a3a1d 70%,#B8862F)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 bg-ink/50" />
          <div className="relative mx-auto max-w-4xl px-5 text-center">
            <Reveal>
              <p className="mb-3 text-sm tracking-[0.25em] text-gold">THE DESTINATION</p>
              <h2 className="font-display text-4xl font-semibold leading-tight sm:text-7xl">Discover The Magic of Sambhar.</h2>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-salt/90">Sambhar is India's largest inland salt lake, an endless white horizon that turns pink, orange and gold as the sun goes down. There are no skyline interruptions here: only open sky, wide silence and a landscape unlike anywhere else in Rajasthan.</p>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-salt/90">It is the kind of place that makes the journey part of the story.</p>
            </Reveal>
          </div>
        </section>

        <section id="gallery" className="mx-auto max-w-7xl px-5 py-24 lg:py-32">
          <Reveal><Heading kicker="GALLERY" className="mb-12">Glimpses of Lavan Lok.</Heading></Reveal>
          <div className="grid auto-rows-[14rem] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={i * 0.05} className={`${g.span} h-full`}>
                <figure className="group relative h-full overflow-hidden rounded-2xl">
                  <Photo src={g.src} alt={g.label} tone={g.tone} className="absolute inset-0" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 text-sm text-salt">{g.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="register" className="bg-cream py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-5">
            <Reveal className="mb-10 text-center">
              <Heading>Be Part of Something Extraordinary.</Heading>
              <p className="mt-5 text-lg leading-relaxed text-ink/75">Leave your details and we'll personally connect with you with upcoming event updates, registration information, packages and exclusive experiences.</p>
            </Reveal>
            <Reveal delay={0.1}><RegistrationForm /></Reveal>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-4xl px-5 py-24 text-center lg:py-32">
          <Reveal>
            <Heading>Let's Connect.</Heading>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Lavan Lok, I would like to know more.')}`} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-ink/15 p-6 transition-colors hover:border-sunset">
                <MessageCircle className="mx-auto mb-2 text-sunset" /><p className="text-sm text-ink/60">WhatsApp</p><p className="font-display text-2xl">{WHATSAPP_DISPLAY}</p>
                <span className="btn mt-4 bg-sunset py-2.5 text-white">Chat on WhatsApp</span>
              </a>
              <a href={`mailto:${EMAIL}`} className="rounded-2xl border border-ink/15 p-6 transition-colors hover:border-sunset">
                <Mail className="mx-auto mb-2 text-sunset" /><p className="text-sm text-ink/60">Email</p><p className="break-all font-display text-2xl">{EMAIL}</p>
                <span className="btn mt-4 border border-ink py-2.5">Send an email</span>
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="bg-cream pb-10 pt-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-5 text-center">
          <Logo className="h-44 w-44 object-contain mix-blend-multiply" />
          <p className="font-display text-2xl italic">Where Culture Meets Celebration.</p>
          <p className="text-sm text-ink/70">Sambhar Lake, Rajasthan, India.</p>
          <ul className="flex gap-4" aria-label="Social media">
            {SOCIALS.map((s) => {
              const Icon = { Instagram, Facebook, YouTube: Youtube, Youtube }[s.name] || Instagram
              return <li key={s.name}>{s.url
                ? <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="block rounded-full border border-ink/20 p-3 hover:border-sunset hover:text-sunset"><Icon size={18} /></a>
                : <span title={`${s.name}: coming soon`} aria-label={`${s.name} (coming soon)`} className="block rounded-full border border-ink/10 p-3 text-ink/30"><Icon size={18} /></span>}</li>
            })}
          </ul>
          <p className="text-xs text-ink/50">© {new Date().getFullYear()} Lavan Lok. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
