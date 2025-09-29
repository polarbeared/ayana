function Ticker() {
    const tickerText = "2 & 3 BEDROOM APARTMENTS | AN ADDRESS AT THE SEAM OF CITY & SEA | WELCOME HOME TO VELA"
    
    // Repeat the text multiple times to ensure no gaps
    const repeatedText = Array(6).fill(tickerText).join(" | ")
  
    return (
      <div className="bg-sage-green p-2 md:p-4 overflow-hidden whitespace-nowrap">
        <div className="ticker-scroll">
          <span className="text-soft-sand freight-display text-xs md:text-sm tracking-wider">
            {repeatedText}
          </span>
        </div>
      </div>
    )
  }
  
  export default Ticker