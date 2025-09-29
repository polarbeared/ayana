import { Instagram } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-dark-sage-green text-light-off-white py-20 px-8 text-center">
      {/* Vela Logo and Southport */}
      <div className="mb-12">
        <img 
          src="/images/secondary/PNG/logo2.png" 
          alt="Vela Logo" 
          className="mx-auto mb-4 h-20 md:h-24 lg:h-28 w-auto"
        />
        <p className="koho-font uppercase tracking-widest text-sm md:text-base text-light-off-white">
          SOUTHPORT
        </p>
      </div>

      {/* Address */}
      <div className="mb-12">
        <p className="koho-font uppercase text-base md:text-lg text-light-off-white">
          14 MERON STREET, SOUTHPORT, GOLD COAST
        </p>
      </div>

      {/* Instagram */}
      <div className="flex items-center justify-center mb-12">
        <Instagram className="w-6 h-6 mr-3 text-light-off-white" />
        <p className="koho-font text-sm md:text-base text-light-off-white">@zen.group</p>
      </div>

      {/* Zen Group Logo */}
      <div className="mb-12">
        <img 
          src="/images/zen-logo.png" 
          alt="Zen Group Logo" 
          className="h-16 lg:h-20 mx-auto"
        />
      </div>

      {/* Legal Links */}
      <div className="mb-8">
        <a 
          href="#" 
          className="koho-font uppercase text-sm md:text-base text-light-off-white hover:opacity-70 transition-opacity duration-300"
        >
          PRIVACY POLICY
        </a>
        <span className="mx-4 text-light-off-white">|</span>
        <a 
          href="#" 
          className="koho-font uppercase text-sm md:text-base text-light-off-white hover:opacity-70 transition-opacity duration-300"
        >
          TERMS & CONDITIONS
        </a>
      </div>

      {/* Copyright */}
      <p className="koho-font text-xs md:text-sm text-light-off-white">
        Copyright © 2025. All rights reserved. Zen Group Pty Ltd.
      </p>
    </footer>
  )
}

export default Footer