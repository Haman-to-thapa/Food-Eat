import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { menuSchema, type MenuFromSchema } from "@/schema/menuSchema"
import { Loader2 } from "lucide-react"

import React, { useEffect, useState, type Dispatch, type FormEvent, type SetStateAction } from "react"


const EditMenu = ({ seletedMenu, editOpen, setEditOpen }: { seletedMenu: any, editOpen: boolean, setEditOpen: Dispatch<SetStateAction<boolean>> }) => {

  const [input, setInput] = useState<MenuFromSchema>({
    title: "",
    description: "",
    price: 0,
    image: undefined
  })
  const [error, setError] = useState<Partial<MenuFromSchema>>({})

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === 'number' ? Number(value) : value })
  }

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()

    const restult = menuSchema.safeParse(input);
    if (!restult.success) {
      const filedError = restult.error.formErrors.fieldErrors;
      setError(filedError as Partial<MenuFromSchema>)
      return;
    }

    // api start from here

  }

  useEffect(() => {
    console.log(seletedMenu)
    setInput({
      title: seletedMenu?.title || "",
      description: seletedMenu?.description || "",
      price: seletedMenu?.price || "",
      image: undefined,
    })

  }, [seletedMenu])

  const loading = false;

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Edit Menu </DialogTitle>
          <DialogDescription>Update your menu to keep your offering fresh and exciting</DialogDescription>
        </DialogHeader>
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
            {!!error && <span className="text-red-600 text-xs font-medium">{error.title}</span>}
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
            {!!error && <span className="text-red-600 text-xs font-medium">{error.description}</span>}
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
            {!!error && <span className="text-red-600 text-xs font-medium">{error.price}</span>}
          </div>
          <div className="">
            <Label>Upload Menu Image</Label>
            <Input
              type="file"
              name="image"
              onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })}


            />
            {!!error && <span className="text-red-600 text-xs font-medium">{error.image?.name || "image is required"}</span>}
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
      </DialogContent>
    </Dialog>

  )
}

export default EditMenu