import logo from '/images/secondary/PNG/logo2.png'
import './App.css'
import background from '/images/external.jpg'
import Nav from './components/nav'
import Ticker from './components/ticker'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Section from './components/section'
import SectionTwo from './components/section-two'
import SectionThree from './components/section-three'
import SectionFour from './components/section-four'
import SectionFive from './components/section-five'
import Footer from './components/footer'

function Page() {
  const [logoAnimated, setLogoAnimated] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setLogoAnimated(true)
    }, 1500) // 1.5 second delay before animation starts
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <>
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
        <img src={background} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Navigation */}
      <div className="relative z-10">
        <Nav/>
      </div>
      
      {/* Centered logo with animation */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <div className={`transition-all duration-[2000ms] ease-in-out ${logoAnimated ? 'transform -translate-y-8 md:-translate-y-12' : ''}`}>
          <img src={logo} className="logo-centered" alt="Vela logo" />
        </div>
        
        {/* Enquire Now button that fades in */}
        <div className={`transition-all duration-[1500ms] ease-in-out delay-500 ${logoAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <button 
            onClick={() => navigate('/register')}
            className="px-6 md:px-8 py-2 md:py-3 bg-soft-sand text-sage-green freight-display font-medium text-base md:text-lg tracking-wider hover:bg-mooring-grey transition-colors duration-300 w-full max-w-xs md:w-auto"
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>
      
      {/* Bottom ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Ticker />
      </div>
    </div>
    <Section />
    <SectionTwo />
    <SectionThree />
    <SectionFour />
    <SectionFive />
    <Footer />
    </>
  )
}

export default Page

