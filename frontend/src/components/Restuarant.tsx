import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

const Restaurant = () => {

  const [input, setInput] = useState({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: "",
    cuisines: [],
    imageFile: undefined
  })

  const loading = false;
  const restaurant = false;

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <h1 className="font-extrabold text-2xl mb-5">Add Restaurant</h1>
        <form>
          <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
            <div>
              <Label>Restaurant Name</Label>
              <Input
                type="text"
                name="restaurantName"
                placeholder="Enter your restaurant name"
              />
            </div>
            <div>
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                placeholder="Enter your city name"
              />
            </div>
            <div>
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                placeholder="Enter your country name"
              />
            </div>
            <div>
              <Label>Delivery Time</Label>
              <Input
                type="text"
                name="deliveryTime"
                placeholder="Enter delivery time"
              />
            </div>
            <div>
              <Label>Cuisines</Label>
              <Input
                type="text"
                name="cuisines"
                placeholder="Enter cuisines"
              />
            </div>
            <div>
              <Label>Upload Restaurant Banner</Label>
              <Input
                type="file"
                name="image"
                accept="image/*"
              />
            </div>
          </div>

          <div className="mt-6">
            {loading ? (
              <Button disabled className="bg-orange-500 hover:bg-orange-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="bg-orange-500 hover:bg-orange-700">
                {restaurant ? 'Update Your Restuarant' : " Add New Restaurant"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Restaurant;
