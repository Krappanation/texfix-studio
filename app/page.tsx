import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Projects from '@/components/sections/Projects'
import Process from '@/components/sections/Process'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import ScrollToSection from '@/components/ScrollToSection'

export default function Home() {
  return (
    <main>
      <ScrollToSection />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Process />
      <Testimonials />
      <Contact />
    </main>
  )
}
