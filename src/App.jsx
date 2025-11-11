import { useEffect, useMemo, useRef, useState } from 'react'
import { Github, Linkedin, Mail, Download, Moon, Sun, ChevronRight } from 'lucide-react'
import Spline from '@splinetool/react-spline'

// Typing animation hook
function useTypewriter(phrases, speed = 50, delay = 1400) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[index % phrases.length]
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), delay)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % phrases.length)
      return
    }
    const t = setTimeout(() => {
      setText((prev) => (deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)))
    }, deleting ? Math.max(20, speed * 0.6) : speed)
    return () => clearTimeout(t)
  }, [text, deleting, index, phrases, speed, delay])

  return text
}

function Header({ currentSection, onToggleTheme, theme }) {
  const nav = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'stack', label: 'Tech' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'certs', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ]
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-900/60 border-b border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="#hero" className="font-semibold tracking-tight flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></div>
          <span className="text-neutral-900 dark:text-white">Alankar Jamle</span>
          <span className="hidden sm:inline text-neutral-500 dark:text-neutral-400">— Software Engineer</span>
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 hover:text-teal-600 dark:hover:text-teal-400 ${
                currentSection === n.id
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a aria-label="GitHub" href="https://github.com/" target="_blank" rel="noreferrer" className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Github className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
          </a>
          <a aria-label="LinkedIn" href="https://linkedin.com/" target="_blank" rel="noreferrer" className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Linkedin className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
          </a>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  )
}

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className="relative inline-flex h-9 w-16 items-center rounded-full bg-neutral-200 dark:bg-neutral-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-white dark:focus:ring-offset-neutral-900"
    >
      <span className={`absolute left-1 top-1 h-7 w-7 rounded-full bg-white dark:bg-neutral-900 shadow transition-all duration-300 ${
        theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
      }`}></span>
      <span className="absolute left-2 text-coral-500">
        <Sun className={`h-5 w-5 text-coral-500 transition-opacity ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`} />
      </span>
      <span className="absolute right-2">
        <Moon className={`h-5 w-5 text-teal-400 transition-opacity ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`} />
      </span>
    </button>
  )
}

function Badge({ children }) {
  return (
    <div className="px-3 py-1.5 rounded-full text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/10 shadow-sm hover:shadow-md transition-shadow duration-300 hover:brightness-110">
      {children}
    </div>
  )
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        {title && (
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">{title}</h2>
            {subtitle && (
              <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-2xl">{subtitle}</p>
            )}
          </div>
        )}
        <div className="[&>*]:animate-fade-in">
          {children}
        </div>
      </div>
    </section>
  )
}

function Hero() {
  const phrases = useMemo(
    () => [
      'Engineering backend systems that scale effortlessly',
      'Building clean APIs with purpose and precision',
      'Turning ideas into resilient cloud-native solutions',
      'Automating the boring, architecting the essential',
    ],
    []
  )
  const typed = useTypewriter(phrases, 26, 1200)

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90 dark:from-neutral-950/90 dark:via-neutral-950/60 dark:to-neutral-950/90 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 py-28 sm:py-36 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/5 dark:bg-white/10 px-3 py-1 text-sm text-neutral-700 dark:text-neutral-200">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            Available for backend roles
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-white">
            Alankar Jamle
          </h1>
          <p className="text-lg sm:text-xl text-neutral-700 dark:text-neutral-300 min-h-[2.5rem]">
            {typed}
            <span className="align-middle inline-block w-0.5 h-6 bg-coral-500 ml-1 animate-pulse"/>
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-teal-500 text-white font-semibold shadow hover:brightness-110 transition-all">
              Let’s connect <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white font-semibold shadow hover:brightness-110 transition-all">
              <Download className="w-4 h-4"/> Download Resume
            </a>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            <QuoteCard text="Any fool can write code that a computer can understand. Good programmers write code that humans can understand." author="Martin Fowler" />
            <QuoteCard text="Code is like humor. When you have to explain it, it's bad." author="Cory House" />
            <QuoteCard text="The function of good software is to make the complex appear to be simple." author="Grady Booch" />
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative w-64 h-72 sm:w-72 sm:h-80 md:w-80 md:h-96 [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0%_50%)] rotate-3 shadow-xl border border-black/5 dark:border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-coral-500/20" />
            <img src="https://dummyimage.com/600x800/000/ffffff.png&text=+" alt="Alankar Jamle" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}

function QuoteCard({ text, author }) {
  return (
    <div className="p-4 rounded-lg bg-white/70 dark:bg-neutral-900/70 backdrop-blur border border-black/5 dark:border-white/10 text-sm text-neutral-700 dark:text-neutral-300 hover:shadow-lg transition-shadow">
      <p className="">“{text}”</p>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">— {author}</p>
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })
  const [currentSection, setCurrentSection] = useState('hero')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  // Smooth scroll behavior
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
  }, [])

  // Active section highlighting
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrentSection(entry.target.id)
        })
      },
      { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0.25 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const onToggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 selection:bg-teal-200 dark:selection:bg-teal-700/40">
      <Header currentSection={currentSection} onToggleTheme={onToggleTheme} theme={theme} />
      <main className="pt-16">
        <Hero />
        <Section id="about" title="About Me" subtitle="Backend-focused engineer based in India">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <p>
                I’m a Software Engineer with 2.5 years of experience designing and building backend services with Java and Spring Boot. I enjoy crafting clean APIs, optimizing data flows, and deploying cloud-native systems that are reliable, observable, and easy to evolve.
              </p>
              <p className="mt-4 p-4 rounded-lg border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-neutral-900">
                <span className="font-semibold text-neutral-900 dark:text-white">Personal philosophy:</span> “I believe software should be like a well-written sentence — clear, purposeful, and readable. I aim to build systems that don’t just work but evolve gracefully.”
              </p>
            </div>
            <div className="space-y-3">
              <a href="#" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-teal-500 text-white font-semibold shadow hover:brightness-110 transition-all">
                <Download className="w-4 h-4"/> Download Resume
              </a>
              <a href="#contact" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white font-semibold shadow hover:brightness-110 transition-all">
                <Mail className="w-4 h-4"/> Contact Me
              </a>
            </div>
          </div>
        </Section>

        <Section id="stack" title="Tech Stack" subtitle="Tools I use to ship production software">
          <div className="flex flex-wrap gap-3">
            {['Java','Spring Boot','PostgreSQL','AWS','Docker','Jenkins','React','Git'].map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills" subtitle="Breadth to move fast, depth to deliver right">
          <div className="grid md:grid-cols-3 gap-6">
            <Card title="Backend & APIs" items={[
              'Domain-driven design, REST best practices',
              'Spring Boot, Spring Cloud, JWT, validation',
              'RDBMS design, JPA, query optimization',
            ]} />
            <Card title="Cloud & DevOps" items={[
              'AWS (EC2, S3, RDS, IAM), Terraform basics',
              'Docker, CI/CD with Jenkins & GitHub Actions',
              'Observability: logs, metrics, tracing',
            ]} />
            <Card title="Collaboration" items={[
              'Code reviews, clean code, testing mindset',
              'Agile delivery, documentation, RFCs',
              'Mentoring and knowledge-sharing',
            ]} />
          </div>
        </Section>

        <Section id="experience" title="Experience" subtitle="What I’ve been building recently">
          <Timeline items={[
            {
              role: 'Software Engineer',
              company: 'Backend Systems',
              period: '2022 — Present',
              bullets: [
                'Designed and maintained microservices in Java/Spring Boot handling thousands of daily requests.',
                'Improved API latency by optimizing queries and introducing caching where appropriate.',
                'Built CI/CD pipelines and containerized services for reliable deployments.',
              ],
            },
          ]} />
        </Section>

        <Section id="certs" title="Certifications" subtitle="Validated skills and continuous learning">
          <ul className="grid sm:grid-cols-2 gap-4">
            <li className="p-4 rounded-lg border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 hover:shadow-md transition-shadow">
              AWS Certified Cloud Practitioner — In progress
            </li>
            <li className="p-4 rounded-lg border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 hover:shadow-md transition-shadow">
              Oracle Certified Professional: Java SE — In progress
            </li>
          </ul>
        </Section>

        {/* 
        <section id="projects">
          <h2>Projects</h2>
          <!-- project cards go here -->
        </section>
        */}

        <Section id="contact" title="Contact" subtitle="Let’s build something reliable together">
          <ContactForm />
        </Section>
      </main>
      <Footer />
    </div>
  )
}

function Card({ title, items }) {
  return (
    <div className="p-6 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 hover:shadow-lg transition-all">
      <h3 className="font-semibold text-neutral-900 dark:text-white">{title}</h3>
      <ul className="mt-3 space-y-2 text-neutral-700 dark:text-neutral-300">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-400"/>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Timeline({ items }) {
  return (
    <div className="relative pl-6">
      <span className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-coral-500" />
      <div className="space-y-8">
        {items.map((it, idx) => (
          <div key={idx} className="relative">
            <span className="absolute -left-0.5 mt-1 h-3 w-3 rounded-full bg-white dark:bg-neutral-900 border border-teal-400"></span>
            <div className="p-5 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-neutral-900 dark:text-white">{it.role}</h3>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-600 dark:text-neutral-300">{it.company}</span>
                <span className="ml-auto text-sm text-neutral-500">{it.period}</span>
              </div>
              <ul className="mt-3 space-y-2 text-neutral-700 dark:text-neutral-300">
                {it.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-coral-500"/>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('')
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const msgRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('Sending...')
    setTimeout(() => {
      setStatus('Thanks! I will get back to you soon.')
      if (nameRef.current) nameRef.current.value = ''
      if (emailRef.current) emailRef.current.value = ''
      if (msgRef.current) msgRef.current.value = ''
    }, 800)
  }

  return (
    <form onSubmit={onSubmit} className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-neutral-600 dark:text-neutral-300 mb-1">Name</label>
          <input ref={nameRef} required type="text" className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
        </div>
        <div>
          <label className="block text-sm text-neutral-600 dark:text-neutral-300 mb-1">Email</label>
          <input ref={emailRef} required type="email" className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-neutral-600 dark:text-neutral-300 mb-1">Message</label>
          <textarea ref={msgRef} required rows={5} className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-3 py-2 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <button type="submit" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-teal-500 text-white font-semibold shadow hover:brightness-110 transition-all">
            <Mail className="w-4 h-4"/> Send Message
          </button>
          <p className="text-sm text-teal-700 dark:text-teal-400">{status}</p>
        </div>
      </div>
    </form>
  )
}

function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 flex flex-col sm:flex-row items-center gap-4 justify-between text-neutral-600 dark:text-neutral-300">
        <div className="flex items-center gap-2">
          <a aria-label="GitHub" href="https://github.com/" target="_blank" rel="noreferrer" className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a aria-label="LinkedIn" href="https://linkedin.com/" target="_blank" rel="noreferrer" className="p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
        <p className="text-sm">Crafted with logic and caffeine ☕</p>
        <a href="#hero" className="text-sm hover:text-teal-600 dark:hover:text-teal-400">Back to top</a>
      </div>
    </footer>
  )
}
