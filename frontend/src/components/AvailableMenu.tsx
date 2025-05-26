import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"


const AvailableMenu = () => {
  return (
    <div className="md:p-4 ">
      <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menu</h1>
      <div className="grid md:grid-cols-3 space-y-4 md:space-y-0">
        <Card className="md:max-w-xs mx-auto shadow-lg rounded-lg overflow-hidden">
          <img src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?s=612x612&w=0&k=20&c=9awLLRMBLeiYsrXrkgzkoscVU_3RoVwl_HA-OT-srjQ=" alt="restaurant_image" className="object-cover w-full h-full " />
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Briyani Restaurant</h2>
            <p className="text-sm text-gray-600 mt-2">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste, </p>
            <h3 className="text-lg font-semibold mt-4">
              Price: <span className="text-[#D19254]">₹80</span>
            </h3>
          </CardContent>
          <CardFooter className="p-4">
            <Button className="bg-orange-500 hover:bg-orange-700 w-full">Add to Card</Button>
          </CardFooter>
        </Card>
      </div>

    </div>
  )
}

export default AvailableMenu
