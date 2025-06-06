import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogTitle, DialogTrigger, DialogContent, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Loader2, Plus } from "lucide-react"
import React, { useState } from "react"
import EditMenu from "./EditMenu"
import { menuSchema, type MenuFromSchema } from "@/schema/menuSchema"


const menus = [
  {
    title: "Briyani",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    price: 80,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQnwCeqPki7o3hOWUPHFW_JQ-QnBZfFNYvVA&s"
  }
]

const AddMenu = () => {

  const [open, setOpen] = useState<boolean>(false)
  const [seletedMenu, setSelectedMenu] = useState<MenuFromSchema>()
  const [input, setInput] = useState<MenuFromSchema>({
    title: "",
    description: "",
    price: 0,
    image: undefined
  })
  const [error, setError] = useState<Partial<MenuFromSchema>>({})


  const [editOpen, setEditOpen] = useState<boolean>(false)


  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setInput({ ...input, [name]: type === "number" ? Number(value) : value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setError(fieldError as Partial<MenuFromSchema>)
      return;
    }
    // api here
    console.log(input)
  }



  const loading = false;

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg  md:text-2xl">Available Menus</h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-orange-500 hover:bg-orange-700">
              <Plus className="mr-2" />
              Add Menu
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restauant stand out.
              </DialogDescription>
              <form onSubmit={handleSubmit} action="" className="space-y-3">
                <div className="">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="title"
                    value={input.title}
                    onChange={changeEventHandler}
                    placeholder="Enter your name"
                  />
                  {!!error && <span className="text-sm font-medium text-red-600">{error.title}</span>}
                </div>
                <div className="">
                  <Label>Description</Label>
                  <Input
                    type="text"
                    value={input.description}
                    onChange={changeEventHandler}
                    name="description"
                    placeholder=" write any description"
                  />
                  {!!error && <span className="text-sm font-medium text-red-600">{error.description}</span>}
                </div>
                <div className="">
                  <Label>Price in (Rupees)</Label>
                  <Input
                    type="number"
                    value={input.price}
                    name="price"
                    onChange={changeEventHandler}
                    placeholder="add prices"
                  />
                  {!!error && <span className="text-sm font-medium text-red-600">{error.price}</span>}
                </div>
                <div className="">
                  <Label>Upload Menu Image</Label>
                  <Input
                    type="file"
                    name="image"
                    onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })}


                  />
                  {!!error && <span className="text-sm font-medium text-red-600">{error.image?.name}</span>}
                </div>
                <DialogFooter className="mt-5">

                  {
                    loading ? (
                      <Button disabled={loading} type="submit" className="bg-orange-500 hover:bg-orange-700 w-full ">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </Button>) : (

                      <Button type="submit" className="bg-orange-500 hover:bg-orange-700 w-full ">Submit</Button>
                    )
                  }

                </DialogFooter>
              </form>
            </DialogHeader>
          </DialogContent>


        </Dialog>

      </div>
      {
        menus.map((item: any, idx: number) => (
          <div className="mt-6 space-y-4" key={idx}>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
              <img src={item.image}
                className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
              />
              <div className="flex-1 ">
                <h1 className="text-lg font-semibold text-gray-800">{item.title}</h1>
                <p className="text-sm text-g mt-1">{item.description}</p>
                <h2 className="text-xl font-semibold mt-2">
                  Price: <span className="text-[#D19254]">{item.price}</span>
                </h2>
              </div>
              <Button type="submit"
                onClick={() => { setSelectedMenu(item), setEditOpen(true) }
                }
                className="bg-orange-500 hover:bg-orange-800 mt-2" size={'sm'}>Edit</Button>
            </div>
          </div>
        ))
      }

      <EditMenu editOpen={editOpen} setEditOpen={setEditOpen} seletedMenu={seletedMenu} />
    </div>
  )
}

export default AddMenu