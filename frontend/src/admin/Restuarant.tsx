import { Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import React, { useState, type FormEvent } from "react";
import { restauantFromSchema, type RestaurantFromSchema } from "@/schema/restaurantSchema";

const Restaurant = () => {

  const [input, setInput] = useState<RestaurantFromSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined
  })

  const [error, setError] = useState<Partial<RestaurantFromSchema>>({})

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === 'number' ? Number(value) : value })
  }


  const submitHandlers = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = restauantFromSchema.safeParse(input);
    if (!result.success) {
      const filedError = result.error.formErrors.fieldErrors;
      setError(filedError as Partial<RestaurantFromSchema>)
    }

    // add restaurant api implenemtation start from here
    console.log(input)
  }



  const loading = false;
  const restaurant = false;

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div>
        <h1 className="font-extrabold text-2xl mb-5">Add Restaurant</h1>
        <form onSubmit={submitHandlers}>
          <div className="md:grid grid-cols-2 gap-6 space-y-2 md:space-y-0">
            <div>
              <Label>Restaurant Name</Label>
              <Input
                type="text"
                name="restaurantName"
                value={input.restaurantName}
                onChange={changeEventHandler}
                placeholder="Enter your restaurant name"
              />
              {error && <span className="text-sm text-red-500 font-medium">{error.restaurantName}</span>}
            </div>
            <div>
              <Label>City</Label>
              <Input
                type="text"
                name="city"
                value={input.city}
                onChange={changeEventHandler}
                placeholder="Enter your city name"
              />
              {error && <span className="text-sm text-red-500 font-medium">{error.city}</span>}
            </div>
            <div>
              <Label>Country</Label>
              <Input
                type="text"
                name="country"
                value={input.country}
                onChange={changeEventHandler}
                placeholder="Enter your country name"
              />
              {error && <span className="text-sm text-red-500 font-medium">{error.country}</span>}
            </div>
            <div>
              <Label>Delivery Time</Label>
              <Input
                type="number"
                name="deliveryTime"
                value={input.deliveryTime}
                onChange={changeEventHandler}
                placeholder="Enter delivery time"
              />
              {error && <span className="text-sm text-red-500 font-medium">{error.deliveryTime}</span>}
            </div>
            <div>
              <Label>Cuisines</Label>
              <Input
                type="text"
                name="cuisines"
                value={input.cuisines}
                onChange={(e) => setInput({ ...input, cuisines: e.target.value.split(" , ") })}
                placeholder="e.g Momos , Biryani"
              />
              {error && <span className="text-sm text-red-500 font-medium">{error.cuisines}</span>}
            </div>
            <div>
              <Label>Upload Restaurant Banner</Label>
              <Input
                type="file"
                name="imageFile"
                onChange={(e) => setInput({ ...input, imageFile: e.target.files?.[0] || undefined })}

                accept="image/*"
              />
              {error && <span className="text-sm text-red-500 font-medium">{error.imageFile?.name || 'image file is required'}</span>}
            </div>

          </div>

          <div className="my-5 w-fit">
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
