import { Search } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"
import image from '../assets/hero_pizza.png'

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>('')

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full max-w-6xl">

        {/* Left Text Content */}
        <div className="flex flex-col gap-6 text-center md:text-left md:w-1/2">
          <h1 className="font-extrabold text-4xl md:text-5xl leading-tight">
            Order Food anytime & anywhere
          </h1>
          <p className="text-gray-500 text-lg">
            Hey! Our delicious food is waiting for you. We are always near you.
          </p>

          {/* Search Input */}
          <div className="relative w-full">
            <div className="flex items-center w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search for food..."
                className="pl-10 pr-4 py-2 border shadow w-full rounded-l-full"
              />
              <Button className="bg-orange-600 hover:bg-orange-800 rounded-l-none rounded-r-full px-6">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={image}
            alt="Delicious food"
            className="object-contain max-h-[500px] w-full max-w-md"
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
