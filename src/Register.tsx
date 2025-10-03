import './App.css'
import Nav from './components/nav'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface FormData {
  name: string
  email: string
  phone: string
  postcode: string
  message: string
}

// Declare grecaptcha type
declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

  // Load reCAPTCHA Enterprise script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/enterprise.js?render=6LegEssrAAAAAMIdXnC2pscbns4MiKIP4es3kBWk'
    script.async = true
    script.defer = true
    script.onload = () => {
      window.grecaptcha.enterprise.ready(() => {
        setRecaptchaLoaded(true)
      })
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!recaptchaLoaded) {
      setSubmitStatus('error')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Execute reCAPTCHA Enterprise
      const token = await window.grecaptcha.enterprise.execute('6LegEssrAAAAAMIdXnC2pscbns4MiKIP4es3kBWk', {
        action: 'submit_enquiry'
      })
      
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken: token
        }),
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', postcode: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/background.jpg"
          alt="Residences background"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-smoked-black/92 via-smoked-black/75 to-muted-gold/55">
        <div className="absolute inset-0 bg-smoked-black/40"></div>
      </div>
      
      {/* Navigation */}
      <div className="relative z-10">
        <Nav/>
      </div>
      
      {/* Form Container */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] md:min-h-[calc(100vh-120px)] p-4 md:p-8">
        <div className="bg-warm-off-white/95 backdrop-blur-sm p-4 md:p-8 rounded-none max-w-2xl w-full mx-auto">
          {/* Heading */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="font-serif tracking-[0.22em] text-2xl md:text-3xl text-smoked-black mb-2 uppercase">Register Your Interest</h1>
            <p className="text-muted-gold text-xs md:text-sm font-sans tracking-[0.1em]">Complete the form below and we'll be in touch</p>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Thank you for your enquiry. We'll be in touch soon.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              There was an error submitting your enquiry. Please try again.
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Name"
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-sandstone focus:outline-none focus:border-muted-gold bg-white text-sm md:text-base text-smoked-black"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-sandstone focus:outline-none focus:border-muted-gold bg-white text-sm md:text-base text-smoked-black"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-sandstone focus:outline-none focus:border-muted-gold bg-white text-sm md:text-base text-smoked-black"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  placeholder="Postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-sandstone focus:outline-none focus:border-muted-gold bg-white text-sm md:text-base text-smoked-black"
                />
              </div>
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                placeholder="Message (optional)"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-sandstone focus:outline-none focus:border-muted-gold bg-white resize-none text-sm md:text-base text-smoked-black"
              />
            </div>

            {/* reCAPTCHA Enterprise - invisible, automatically handled */}
            <div className="text-center text-xs text-muted-gold tracking-[0.08em]">
              This site is protected by reCAPTCHA Enterprise and the Google{' '}
              <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and{' '}
              <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.
            </div>

            {/* Submit Button */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <button
                type="submit"
                disabled={isSubmitting || !recaptchaLoaded}
                className="flex-1 bg-smoked-black text-warm-off-white font-serif button-reset py-3 px-4 md:px-6 hover:bg-muted-gold hover:text-smoked-black transition-colors duration-300 disabled:opacity-50 text-sm md:text-base tracking-[0.18em]"
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT ENQUIRY'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 md:px-6 py-3 border border-smoked-black text-smoked-black font-serif button-reset hover:bg-smoked-black hover:text-warm-off-white transition-colors duration-300 text-sm md:text-base tracking-[0.18em]"
              >
                BACK
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
