import { Footprints, Car, Bus, Bike } from 'lucide-react'

function TravelTimes() {
  return (
    <div className="mt-16">
      <h2 className="text-sage-green freight-display text-2xl lg:text-3xl mb-12 text-center">
        TRAVEL TIMES FROM VELA
      </h2>
      
      <div className="space-y-8">
        {/* Walking */}
        <div>
          <div className="flex items-center mb-4">
            <h3 className="text-sage-green freight-display text-lg w-24">WALKING</h3>
          </div>
          
          <div className="flex items-start">
            {/* Icon column */}
            <div className="w-24 flex justify-center">
              <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center">
                <Footprints className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Time and location columns */}
            <div className="flex-1 flex relative">
              {/* Connecting line - spans from center of first to center of last circle */}
              <div className="absolute top-8 left-1/2 right-1/2 h-0.5 bg-sage-green" style={{left: '12.5%', right: '12.5%'}}></div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">1</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Meriton Retail & Dining</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">4</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Parklands & Waters Edge</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">4</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Australia Fair</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">12</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Light Rail Station</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">12</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Southport Yacht Club</div>
              </div>
            </div>
          </div>
        </div>

        {/* Car */}
        <div>
          <div className="flex items-center mb-4">
            <h3 className="text-sage-green freight-display text-lg w-24">CAR</h3>
          </div>
          
          <div className="flex items-start">
            {/* Icon column */}
            <div className="w-24 flex justify-center">
              <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Time and location columns */}
            <div className="flex-1 flex relative">
              {/* Connecting line - spans from center of first to center of last circle */}
              <div className="absolute top-8 left-1/2 right-1/2 h-0.5 bg-sage-green" style={{left: '12.5%', right: '12.5%'}}></div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">3</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Broadwater Parklands</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">5</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Main Beach Tedder</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">6</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Marina Mirage</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">7</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Ferry Road Markets</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">7</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">HOTA Home of Arts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bus/Tram */}
        <div>
          <div className="flex items-center mb-4">
            <h3 className="text-sage-green freight-display text-lg w-24">BUS / TRAM</h3>
          </div>
          
          <div className="flex items-start">
            {/* Icon column */}
            <div className="w-24 flex justify-center">
              <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center">
                <Bus className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Time and location columns */}
            <div className="flex-1 flex relative">
              {/* Connecting line - spans from center of first to center of last circle */}
              <div className="absolute top-8 left-1/2 right-1/2 h-0.5 bg-sage-green" style={{left: '12.5%', right: '12.5%'}}></div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">14</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Surfers Paradise</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">20</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">HOTA Home of Arts</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">50</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Pacific Fair</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">50</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Gold Coast Airport</div>
              </div>
            </div>
          </div>
        </div>

        {/* Cycling */}
        <div>
          <div className="flex items-center mb-4">
            <h3 className="text-sage-green freight-display text-lg w-24">CYCLING</h3>
          </div>
          
          <div className="flex items-start">
            {/* Icon column */}
            <div className="w-24 flex justify-center">
              <div className="w-16 h-16 bg-sage-green rounded-full flex items-center justify-center">
                <Bike className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Time and location columns */}
            <div className="flex-1 flex relative">
              {/* Connecting line - spans from center of first to center of last circle */}
              <div className="absolute top-8 left-1/2 right-1/2 h-0.5 bg-sage-green" style={{left: '12.5%', right: '12.5%'}}></div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">6</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">HOPO Ferry</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">7</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Main Beach Tedder</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">8</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Main Beach Surf</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">10</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">Seafood Market</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center">
                <div className="w-16 h-16 bg-white border border-sage-green rounded-full flex flex-col items-center justify-center mb-2 relative z-10">
                  <span className="text-sage-green text-lg font-bold">10</span>
                  <span className="text-sage-green text-xs font-bold">mins</span>
                </div>
                <div className="text-xs text-sage-green koho-font text-center">The Spit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelTimes
