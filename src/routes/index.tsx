import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '#/components/ui/home/HeroSection'
import { ZenDialogue } from '#/components/accordion'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <main className="min-h-screen w-full bg-[#f0f0eb] text-[#1a1a1a] selection:bg-red-900 selection:text-white overflow-x-hidden font-sans">
      <Hero />
      <ZenDialogue />
    </main>
  )
}
