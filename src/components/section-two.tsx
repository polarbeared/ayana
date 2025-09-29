function SectionTwo() {
  return (
    <div className="bg-sage-green relative">
      {/* Header Section - Logo and Title */}
      <div className="flex flex-row justify-between items-center px-10 py-8">
        <img src="/images/brand/PNG/four.png" alt="Logo" className="w-36" />
        <h1 className="text-soft-sand freight-display text-4xl">DESIGNED WITH INTENTION</h1>
      </div>

      {/* Three Image Carousel - Main Focal Point */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <div className="flex h-full">
          {/* Left Image - Partially Cropped */}
          <div className="w-1/3 relative">
            <img 
              src="/images/render/three_bed/living_b.jpg" 
              alt="Three Bedroom Living Space" 
              className="absolute -left-1/4 top-0 h-full w-auto object-cover"
            />
          </div>
          {/* Middle Image - Full Width, Largest */}
          <div className="w-1/3 relative">
            <img 
              src="/images/render/two_bed/living_a.jpg" 
              alt="Two Bedroom Living Space" 
              className="h-full w-full object-cover"
            />
          </div>
          {/* Right Image - Partially Cropped */}
          <div className="w-1/3 relative">
            <img 
              src="/images/render/three_bed/bedroom.jpg" 
              alt="Three Bedroom Master" 
              className="absolute -right-1/4 top-0 h-full w-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Text Section Above Image */}
      <div className="relative py-16">
        {/* Navigation Arrows */}
        <div className="flex justify-end pr-8 mb-8">
          <div className="flex space-x-4">
            <span className="text-soft-sand text-2xl cursor-pointer">&lt;</span>
            <span className="text-soft-sand text-2xl cursor-pointer">&gt;</span>
          </div>
        </div>

        {/* Text Blocks */}
        <div className="flex justify-end pr-8">
          <div className="w-96">
            <p className="text-soft-sand koho-font text-sm leading-relaxed mb-6">
              DESIGNED BY MULLUCK ARCHITECTS, VELA IS AN ARCHITECTURAL
              RESPONSE TO PLACE, SCULPTURAL IN FORM, REFINED IN DETAIL, AND
              DEEPLY ATTUNED TO ITS SURROUNDINGS. A PALETTE OF STONE, TIMBER,
              AND TEXTURE GROUNDS THE FAÇADE, WHILE LUSH LANDSCAPING
              SOFTENS ITS EDGES AND ENHANCES THE CONNECTION TO NATURE.
            </p>
            <p className="text-soft-sand koho-font text-sm leading-relaxed">
              Every residence opens to the outdoors with corner balconies that frame views in more
              than one direction. Light and air flow through generously scaled interiors, while natural
              materials and a soft, grounded palette create calm. These are spaces designed to be
              lived in, open, connected, and always attuned to their outlook.
            </p>
          </div>
        </div>
      </div>

      {/* One Large Image Below Text */}
      <div className="w-full">
        <img 
          src="/images/render/two_bed/bedroom.jpg" 
          alt="Two Bedroom Bedroom" 
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* Bottom Section with Text and Placeholders - Matching Screenshot Layout */}
      <div className="relative py-20 px-8">
        <div className="flex">
          {/* Left Section */}
          <div className="w-1/2 pr-8 relative">
            {/* Vertical divider line */}
            <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-300"></div>
            
            {/* Text Block */}
            <div className="w-96 mb-8">
              <p className="text-soft-sand koho-font text-sm leading-relaxed">
                Open living spaces are grounded in a palette of stone, timber, and soft textures that bring
                warmth and depth. Clean-lined joinery, European appliances, and crafted details balance
                function with longevity. With every residence positioned on a corner, natural light and
                airflow elevate the interiors, offering a rare combination of openness and privacy.
              </p>
            </div>

            {/* Three Bedroom Master */}
            <div className="mb-6">
              <img 
                src="/images/render/three_bed/bedroom.jpg" 
                alt="Three Bedroom Master" 
                className="w-full h-80 object-cover mb-4"
              />
              <p className="text-soft-sand freight-display text-sm">THREE BEDROOM MASTER</p>
            </div>

            {/* ENQUIRE Button */}
            <div className="mt-8">
              <button className="text-soft-sand freight-display text-lg hover:opacity-80 transition-opacity flex items-center">
                ENQUIRE <span className="ml-2">&gt;</span>
              </button>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="w-1/2 pl-8">
            {/* Bathroom Image - Three Bedroom Ensuite */}
            <div className="mb-6">
              <img 
                src="/images/render/three_bed/bathroom_b_2.jpg" 
                alt="Three Bedroom Ensuite" 
                className="w-full h-80 object-cover mb-4"
              />
              <p className="text-soft-sand freight-display text-sm">THREE BEDROOM ENSUITE</p>
            </div>
            
            {/* Two Bedroom Kitchen */}
            <div>
              <img 
                src="/images/render/two_bed/kitchen_a.jpg" 
                alt="Two Bedroom Kitchen" 
                className="w-full h-40 object-cover mb-4"
              />
              <p className="text-soft-sand freight-display text-sm">TWO BEDROOM KITCHEN</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SectionTwo