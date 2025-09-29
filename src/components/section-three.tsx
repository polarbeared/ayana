import TravelTimes from './TravelTimes'

function SectionThree() {
  return (
    <div className="bg-white">
      {/* Dark green bar at the top */}
      <div className="h-4 bg-sage-green"></div>
      
      {/* Main content container */}
      <div className="px-8 py-16 lg:px-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left side - Main heading */}
          <div className="lg:w-1/3">
            <h1 className="text-sage-green freight-display text-4xl leading-tight">
              CONNECTED TO THE
              <br />
              COASTLINE, CULTURE,
              <br />
              AND METROPOLITAN
              <br />
              CONVENIENCE.
            </h1>
          </div>
          
          {/* Right side - Content */}
          <div className="lg:w-2/3 space-y-6">
            <p className="text-sage-green koho-font text-sm lg:text-base leading-relaxed">
              SET BETWEEN RIVER, COASTLINE, AND CITY, VELA'S ADDRESS PLACES
              EVERYTHING WITHIN EASY REACH. CAFÉS, MARKETS, AND BOUTIQUE
              DINING ARE JUST A WALK AWAY, WHILE RIVERSIDE PARKS, BIKE PATHS,
              AND FORESHORE TRAILS OPEN TO NATURE AT THE DOORSTEP.
            </p>
            
            <p className="text-sage-green koho-font text-sm lg:text-base leading-relaxed">
              The neighbourhood is evolving with landmark redevelopments at the Southport Yacht
              Club, Marina Mirage, and Mariners Cove, bringing world-class dining, retail, and
              cultural experiences. From morning swims in the Broadwater to evenings at HOTA's
              galleries and performances, life here flows seamlessly between water, city, and culture.
            </p>
            
            {/* Call-to-action button */}
            <div className="pt-4">
              <button className="text-sage-green koho-font text-sm pb-8 lg:text-base hover:underline transition-all duration-200">
                VIEW LOCATION MAP &gt; 
              </button>
            </div>
          </div>
        </div>
        <img src="/images/map.png" alt="Section" className="w-full" />
        
        {/* Bottom Section with Text and Images - Matching Section Two Layout */}
        <div className="relative py-20 px-8">
          <div className="flex">
            {/* Left Section */}
            <div className="w-1/2 pr-8 relative">
              {/* Vertical divider line */}
              <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-300"></div>
              
              {/* Text Block */}
              <div className="w-96 mb-8">
                <p className="text-sage-green koho-font text-sm leading-relaxed mb-6">
                  THE FUTURE OF SOUTHPORT AND MAIN BEACH IS SET TO BE REDEFINED BY
                  LANDMARK PROJECTS ALREADY UNDERWAY. THE SOUTHPORT YACHT CLUB
                  MARINA REDEVELOPMENT, COMMENCING IN LATE 2025, WILL INTRODUCE
                  WORLD-CLASS SUPERYACHTS, BOUTIQUE RETAIL, AND ELEVATED DINING.
                </p>
                <p className="text-sage-green koho-font text-sm leading-relaxed">
                  Just beyond, the $500 million Marina Mirage redevelopment will bring luxury residences,
                  a five-star hotel, and curated waterfront experiences, while the proposed Ritz-Carlton at
                  Mariners Cove is poised to set a new benchmark in hospitality and superyacht facilities.
                  Together, these investments signal a powerful evolution of the precinct, positioning Vela
                  at the centre of a new era for the Gold Coast waterfront.
                </p>
              </div>

              {/* Art Image */}
              <div className="mb-6">
                <img 
                  src="/images/art.png" 
                  alt="Art" 
                  className="w-full h-80 object-cover mb-4"
                />
                <p className="text-sage-green freight-display text-sm">CULTURAL EXPERIENCES</p>
              </div>

              {/* ENQUIRE Button */}
              <div className="mt-8">
                <button className="text-sage-green freight-display text-lg hover:opacity-80 transition-opacity flex items-center">
                  ENQUIRE <span className="ml-2">&gt;</span>
                </button>
              </div>
            </div>
            
            {/* Right Section */}
            <div className="w-1/2 pl-8">
              {/* Kayak Image */}
              <div className="mb-6">
                <img 
                  src="/images/kayak.png" 
                  alt="Kayak" 
                  className="w-full h-80 object-cover mb-4"
                />
                <p className="text-sage-green freight-display text-sm">WATERFRONT ACTIVITIES</p>
              </div>
              
              {/* Oyster and Surf Images */}
              <div className="space-y-6">
                <div>
                  <img 
                    src="/images/oyster.png" 
                    alt="Oyster" 
                    className="w-full h-40 object-cover mb-4"
                  />
                  <p className="text-sage-green freight-display text-sm">DINING EXPERIENCES</p>
                </div>
                
                <div>
                  <img 
                    src="/images/surf.png" 
                    alt="Surf" 
                    className="w-full h-40 object-cover mb-4"
                  />
                  <p className="text-sage-green freight-display text-sm">COASTAL LIFESTYLE</p>
                </div>
              </div>
              
              {/* Additional Text */}
              <div className="mt-8">
                <p className="text-sage-green koho-font text-sm leading-relaxed">
                  Beyond its immediate lifestyle, Vela is connected to the wider Gold Coast with
                  effortless transport links. The G:link light rail, ferry terminal, and major roadways
                  place Surfers Paradise, Pacific Fair, and the airport within easy reach. Whether it's a
                  morning commute, a weekend escape, or a cultural evening by the water, Southport
                  places the whole city within arm's reach while keeping home grounded in its own
                  distinct character.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Travel Times Component */}
        <TravelTimes />
      </div>
    </div>
  )
}

export default SectionThree