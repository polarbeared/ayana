function Section() {
  return (
    <div className="bg-soft-sand">
        <div className="flex flex-row p-10">
            <h1 className="text-sage-green freight-display text-4xl flex-2">AN ADDRESS WITH<br />EVERY ADVANTAGE</h1>
            <div className="flex-col flex-1">
                <p className="text-sage-green koho-font">
                VELA PRESENTS A COLLECTION OF TWO AND THREE-BEDROOM CORNER
                RESIDENCES IN THE HEART OF SOUTHPORT.
                </p>
                <p className="text-sage-green koho-font py-4">
                    Perfectly positioned between city and sea, every apartment is designed to capture
                    natural light, coastal breezes, and sweeping views. Rising above, the tower comprises
                    69 residences, thoughtfully arranged to offer both variety and exclusivity. Alongside
                    a considered mix of two and three-bedroom apartments, the pinnacle level is reserved
                    for just four expansive townhomes, rare sky homes that crown the building with scale,
                    privacy, and prestige. Just moments from the Broadwater, Southport Yacht Club, and
                    the vibrant city centre, Vela offers a lifestyle defined by both connection and calm.
                </p>
                <button className="text-sage-green freight-display py-4">ENQUIRE</button>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center px-10 pb-10">
            <img src="/images/boat.png" alt="Section" />
        </div>
    </div>
  )
}

export default Section