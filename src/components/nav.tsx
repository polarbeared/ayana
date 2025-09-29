import { PlusIcon } from "lucide-react"

function Nav() {
  return (
    <nav className="bg-sage-green p-3 md:p-4 flex justify-between items-center">
      <ul>
        <li className="text-soft-sand freight-display text-sm md:text-base">
          <a href="/">ENQUIRE</a>
        </li>        
      </ul>
      <p className="text-soft-sand freight-display text-xs md:text-sm lg:text-base text-center flex-1 mx-4 hidden sm:block">
        <a href="/">14 MERON STREET, SOUTHPORT, GOLD COAST</a>
      </p>
      <p className="text-soft-sand freight-display text-xs text-center flex-1 mx-2 block sm:hidden">
        <a href="/">SOUTHPORT</a>
      </p>
      <PlusIcon className="text-soft-sand w-5 h-5 md:w-6 md:h-6" />
    </nav>
  )
}

export default Nav