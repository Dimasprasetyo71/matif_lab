import { useLayoutEffect, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Circle, Hexagon, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

// 1. Magnetic Button (Sticks to cursor)
export function MagneticButton({ children, className, ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = e.clientX - (left + width / 2)
      const y = e.clientY - (top + height / 2)

      // Move the button towards mouse (magnetic effect)
      gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: 'power3.out' })
      // Move the inner text slightly more (parallax inside button)
      gsap.to(el.children, {
        x: x * 0.1,
        y: y * 0.1,
        duration: 0.5,
        ease: 'power3.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' })
      gsap.to(el.children, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <button
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...props}
    >
      <div className="relative z-10 pointer-events-none">{children}</div>
    </button>
  )
}

// 2. Parallax Image (Velocity Skew + Scroll Speed)
export function ParallaxImage({
  src,
  speed = 1,
  className,
}: {
  src: string
  speed?: number
  className?: string
}) {
  const container = useRef(null)
  const img = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax Movement
      gsap.fromTo(
        img.current,
        { y: '-20%' },
        {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )

      // Velocity Skew
      ScrollTrigger.create({
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const skew = self.getVelocity() / 300
          gsap.to(container.current, {
            skewY: skew,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: true,
          })
        },
      })
    }, container)
    return () => ctx.revert()
  }, [speed])

  return (
    <div
      ref={container}
      className={cn(
        'overflow-hidden relative will-change-transform',
        className,
      )}
    >
      <img
        ref={img}
        src={src}
        alt="Parallax"
        className="w-full h-[140%] object-cover absolute top-[-20%] left-0 will-change-transform grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>
  )
}

// 3. Navbar
export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white">
      <div className="font-bold text-2xl tracking-tighter uppercase font-mono">
        KINETIC<span className="text-lime-400">.VOID</span>
      </div>
      <MagneticButton className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white hover:text-black transition-colors uppercase font-mono text-sm font-bold">
        Menu <Menu className="w-4 h-4" />
      </MagneticButton>
    </nav>
  )
}

// 4. Multi-Layer Parallax Hero
export function Hero() {
  const container = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.layer-bg', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.layer-text', {
        yPercent: 50,
        opacity: 0,
        scale: 0.9,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to('.layer-shape', {
        yPercent: -50,
        rotate: 90,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, container)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={container}
      className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center"
    >
      {/* Layer 1: Background */}
      <div className="layer-bg absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-lime-400 opacity-20 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 m-auto h-100 w-100 rounded-full bg-blue-600 opacity-20 blur-[120px]"></div>
      </div>

      {/* Layer 3: Shapes (In front of BG, Behind Text) */}
      <div className="layer-shape absolute top-[20%] left-[15%] text-zinc-800 opacity-50">
        <Circle size={120} strokeWidth={1} />
      </div>
      <div className="layer-shape absolute bottom-[20%] right-[15%] text-zinc-800 opacity-50">
        <Hexagon size={180} strokeWidth={1} />
      </div>

      {/* Layer 2: Main Text */}
      <div className="layer-text relative z-10 text-center mix-blend-difference px-4">
        <h1 className="text-[12vw] md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter text-white">
          MATIF <br />
          <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-600">
            LAB
          </span>
        </h1>
        <p className="mt-8 text-xl md:text-2xl font-mono text-zinc-400 max-w-xl mx-auto">
          LOLOREM IPSUM DOWLOAD <br />
          LOLOREM IPSUM DOWLOAD
        </p>
      </div>

      {/* Foreground Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-xs font-mono animate-bounce">
        SCROLL
      </div>
    </section>
  )
}
