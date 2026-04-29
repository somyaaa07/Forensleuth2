import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Welcome from '@/components/Welcome'
import Services from '@/components/Service'
import WhyChooseUs from '@/components/Whychooseus'
import CTASection from '@/components/Cta'
import Testimonials from '@/components/Testimonial'
import Blogs from '@/components/Blog'
import Gallery from '@/components/Gallery'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main style={{ background: '#03060d' }}>
      <Navbar />
      <Hero />
      <Welcome />
      <Services />
      <WhyChooseUs />
      <CTASection />
      <Testimonials />
      {/* <Blogs /> */}
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}