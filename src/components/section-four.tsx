function SectionFour() {
  return (
    <div className="bg-soft-sand">
      {/* Top Section - Header left, Description right */}
      <div className="flex flex-col lg:flex-row px-8 py-16 lg:py-24">
        {/* Left side - Header */}
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
          <h1 className="text-sage-green freight-display text-4xl leading-tight">
            WHERE<br/>
            COMMUNITY<br/>
            AND WELLNESS<br/>
            INTERTWINE
          </h1>
        </div>
        
        {/* Right side - Description and Enquire button */}
        <div className="w-full lg:w-2/3 lg:pl-8">
          <p className="text-sage-green koho-font text-sm md:text-base lg:text-lg leading-relaxed mb-8">
            VELA'S SHARED SPACES ARE DESIGNED TO EXTEND THE EXPERIENCE
            OF HOME BEYOND THE PRIVATE RESIDENCE, CALM, DELIBERATE, AND
            ATTUNED TO THE WAY PEOPLE LIVE. AT GROUND LEVEL, A RESIDENTS'
            RETREAT IS FRAMED BY SOFT LANDSCAPING AND LAYERED THRESHOLDS,
            OFFERING PLACES TO PAUSE OR TO MEET, ALL WITHIN A CAREFULLY
            COMPOSED SETTING.
          </p>
          
          <button className="text-sage-green freight-display text-lg hover:opacity-70 transition-opacity duration-300">
            ENQUIRE &gt;
          </button>
        </div>
      </div>
      
      {/* Main Architectural Image - Full Width */}
      <div className="w-full px-8 pb-16">
        <img 
          src="/images/render3.png" 
          alt="Vela Architectural Rendering" 
          className="w-full h-auto"
        />
      </div>
      
      {/* Bottom Section - Two Column Layout */}
      <div className="flex flex-col lg:flex-row px-8 pb-16">
        {/* Left Column - Text and Small Image */}
        <div className="w-full lg:w-1/2 lg:pr-8">
          <p className="text-sage-green koho-font text-sm md:text-base lg:text-lg leading-relaxed mb-8">
            The outdoor BBQ and dining area creates a communal setting for connection and everyday
            gatherings. Wellness is part of daily life with a pool, sauna, and ice bath offering balance
            and restoration. Together, these shared spaces embody Vela's intent, to enhance life in
            balance and in community.
          </p>
          
          {/* Small architectural image */}
          <div className="mb-4">
            <img 
              src="/images/render3.png" 
              alt="Residents BBQ and Lounge Areas" 
              className="w-full h-auto"
            />
            <p className="text-sage-green freight-display text-sm mt-2">
              RESIDENTS BBQ AND LOUNGE AREAS
            </p>
          </div>
        </div>
        
        {/* Right Column - Wellness Images */}
        <div className="w-full lg:w-1/2 lg:pl-8 space-y-8">
          {/* Sauna Image */}
          <div>
            <img 
              src="/images/sauna.png" 
              alt="Sauna" 
              className="w-full h-64 object-cover"
            />
            <p className="text-sage-green freight-display text-sm mt-2">SAUNA</p>
          </div>
          
          {/* Ice Bath Image */}
          <div>
            <img 
              src="/images/icebath.png" 
              alt="Ice Bath" 
              className="w-full h-48 object-cover"
            />
            <p className="text-sage-green freight-display text-sm mt-2">ICE BATH</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionFour