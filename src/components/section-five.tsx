function SectionFive() {
  return (
    <div className="bg-sage-green text-white">
      {/* Top Section - VELA VISION */}
      <div className="flex flex-col lg:flex-row px-8 py-16 lg:py-24">
        {/* Left side - Header */}
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
          <h1 className="text-white freight-display text-4xl leading-tight">
            THE VELA VISION
          </h1>
        </div>
        
        {/* Right side - Description and Logo */}
        <div className="w-full lg:w-2/3 lg:pl-8">
          <p className="text-white koho-font text-sm md:text-base lg:text-lg leading-relaxed mb-6">
            AT ZEN GROUP, OUR VISION FOR VELA WAS TO CREATE MORE THAN JUST
            RESIDENCES, BUT A PLACE THAT ENRICHES EVERYDAY LIFE. SOUTHPORT
            IS A LOCATION OF TRANSFORMATION, WHERE THE CITY, COASTLINE, AND
            CULTURAL HEART OF THE GOLD COAST CONVERGE. VELA RESPONDS
            TO THIS WITH ARCHITECTURE AND INTERIORS DESIGNED FOR LIGHT,
            OUTLOOK, AND CONNECTION, ANCHORED BY SPACES THAT FOSTER BOTH
            COMMUNITY AND PERSONAL RETREAT.
          </p>
          
          <p className="text-white koho-font text-sm md:text-base lg:text-lg leading-relaxed mb-8">
            Our commitment is to deliver homes of enduring quality, guided by intention and
            crafted with care. Vela represents this philosophy, a rare address, designed for the
            way people truly live today and for the future taking shape around it.
          </p>
          
          {/* Zen Group Logo */}
          <div className="mb-8">
            <img 
              src="/images/zen-logo.png" 
              alt="Zen Group Logo" 
              className="h-20 lg:h-24"
            />
          </div>
          
          {/* Website Link */}
          <a href="#" className="text-white freight-display text-lg hover:opacity-70 transition-opacity duration-300">
            ZENGROUP.COM.AU &gt;
          </a>
        </div>
      </div>
      
      {/* Middle Section - Team Photo */}
      <div className="px-8 pb-16">
        <div className="mb-8">
          <img 
            src="/images/team.png" 
            alt="Zen Group Team" 
            className="w-full h-[32rem] object-cover"
          />
        </div>
        
        <p className="text-white koho-font text-sm md:text-base lg:text-lg leading-relaxed text-center max-w-6xl mx-auto">
          Vela Southport has been shaped by a team dedicated to creating more
          than just a building. Every decision, from concept to completion, has been
          approached with care and consideration, ensuring the project reflects
          both its place and the people who will call it home. With attention given
          to every touch point, the result is a development that feels intentional,
          enduring, and deeply connected to its surroundings.
        </p>
      </div>
      
      {/* Bottom Section - Three Partner Columns */}
      <div className="px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Archie Bolden */}
          <div className="text-center">
            <img 
              src="/images/archie.png" 
              alt="Archie Bolden Interiors" 
              className="w-full aspect-square object-cover mb-4"
            />
            <h3 className="text-white freight-display text-lg mb-4">ARCHIE BOLDEN - INTERIORS</h3>
            <p className="text-white koho-font text-sm leading-relaxed mb-4 text-justify">
              Archie Bolden is a multi-disciplinary design studio with a global
              presence, working as a curious and collaborative collective. Detail-
              obsessed yet approachable, their team balances rigour with
              creativity, delivering work defined by clarity and craft. Believing
              the best ideas come from great people rather than big egos,
              they foster a culture of collaboration that ensures every project,
              including Vela, is guided by both expertise and authenticity.
            </p>
            {/* Archie Bolden Logo */}
            <div className="mb-4">
              <img 
                src="/images/archie-logo.png" 
                alt="Archie Bolden Logo" 
                className="h-8 mx-auto"
              />
            </div>
            
            <a href="#" className="text-white freight-display text-sm hover:opacity-70 transition-opacity duration-300">
              ARCHIEBOLDEN.COM &gt;
            </a>
          </div>
          
          {/* Middle Column - MullArch */}
          <div className="text-center">
            <img 
              src="/images/mullarch.png" 
              alt="MullArch Architecture" 
              className="w-full aspect-square object-cover mb-4"
            />
            <h3 className="text-white freight-display text-lg mb-4">MULLARCH - ARCHITECTURE</h3>
            <p className="text-white koho-font text-sm leading-relaxed mb-4 text-justify">
              Established in 2006, MullArch Architects has built a reputation for
              delivering thoughtful, high-quality architecture across Brisbane
              and beyond. The practice is defined by a hands-on approach,
              ensuring each project receives individual attention from concept
              to completion. With a dedicated team of architects and technical
              staff, MullArch tailors its services to client needs and budgets,
              creating design outcomes that are both enduring and practical.
            </p>
            {/* MullArch Logo */}
            <div className="mb-4">
              <img 
                src="/images/mullarch-logo.png" 
                alt="MullArch Logo" 
                className="h-8 mx-auto"
              />
            </div>
            
            <a href="#" className="text-white freight-display text-sm hover:opacity-70 transition-opacity duration-300">
              MULLARCH.COM.AU
            </a>
          </div>
          
          {/* Right Column - R&W Plus */}
          <div className="text-center">
            <img 
              src="/images/randw.png" 
              alt="R&W Plus Sales" 
              className="w-full aspect-square object-cover mb-4"
            />
            <h3 className="text-white freight-display text-lg mb-4">R&W PLUS - SALES</h3>
            <p className="text-white koho-font text-sm leading-relaxed mb-4 text-justify">
              With a reputation built on trust, expertise, and a tailored approach,
              R&W Plus Sales bring a deep understanding of the Gold Coast
              property market to Vela. Their focus is on more than transactions,
              guiding purchasers with clarity and care to ensure every detail
              of the journey feels seamless. This commitment to service and
              insight ensures Vela is introduced to the market with the same
              consideration that defines the project itself.
            </p>
            
            {/* R&W Plus Logo */}
            <div className="mb-4">
              <img 
                src="/images/RW-logo.png" 
                alt="R&W Plus Logo" 
                className="h-8 mx-auto"
              />
            </div>
            
            <a href="#" className="text-white freight-display text-sm hover:opacity-70 transition-opacity duration-300">
              RANDW.COM.AU
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionFive