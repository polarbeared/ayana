import { PlusIcon } from "lucide-react"

function Nav() {
  return (
    <nav className="bg-warm-off-white/95 backdrop-blur-sm p-3 md:p-4 flex justify-between items-center text-smoked-black">
      <ul>
        <li className="text-smoked-black font-serif tracking-[0.2em] text-sm md:text-base">
          <a href="/">ENQUIRE</a>
        </li>        
      </ul>
      <p className="text-smoked-black font-serif text-xs md:text-sm lg:text-base tracking-[0.18em] text-center flex-1 mx-4 hidden sm:block">
        <a href="/">WEST END, BRISBANE</a>
      </p>
      <p className="text-smoked-black font-serif text-xs tracking-[0.18em] text-center flex-1 mx-2 block sm:hidden">
        <a href="/">WEST END</a>
      </p>
      <PlusIcon className="text-smoked-black w-5 h-5 md:w-6 md:h-6" />
    </nav>
  )
}

export default Nav
