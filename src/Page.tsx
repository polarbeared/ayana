import './App.css'
import Nav from './components/nav'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Page() {
  const [markAnimated, setMarkAnimated] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setMarkAnimated(true)
    }, 1500) // 1.5 second delay before animation starts
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/background.jpg"
          alt="Ayana apartments overlooking the Brisbane skyline"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-muted-gold/60 via-smoked-black/30 to-muted-gold/70">
        <div className="absolute inset-0 bg-smoked-black/20"></div>
      </div>
      
      {/* Navigation */}
      <div className="relative z-10">
        <Nav/>
      </div>
      
      {/* Centered mark with animation */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        <div className={`transition-all duration-[2000ms] ease-in-out ${markAnimated ? 'transform -translate-y-8 md:-translate-y-12' : ''}`}>
          <div className="flex flex-col items-center text-center text-warm-off-white space-y-5">
            <p className="uppercase tracking-[0.4em] text-xs md:text-sm font-sans">Introducing</p>
            <img
              src="/logos/logo_white.png"
              alt="Ayana West End logo"
              className="w-48 md:w-64 lg:w-72 opacity-95"
              loading="eager"
            />
            {/* <p className="uppercase tracking-[0.28em] text-xs md:text-sm font-sans text-warm-off-white/90">
              West End Residences
            </p> */}
          </div>
        </div>
        
        {/* Enquire Now button that fades in */}
        <div className={`transition-all duration-[1500ms] ease-in-out delay-500 ${markAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <button 
            onClick={() => navigate('/register')}
            className="px-6 md:px-8 py-2 md:py-3 bg-smoked-black text-warm-off-white font-serif button-reset text-base md:text-lg tracking-[0.24em] hover:bg-muted-gold hover:text-smoked-black transition-colors duration-300 w-full max-w-xs md:w-auto"
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
