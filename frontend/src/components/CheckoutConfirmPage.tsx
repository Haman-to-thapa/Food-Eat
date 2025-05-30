import React, { useState, type Dispatch, type SetStateAction } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'

const CheckoutConfirmPage = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {

  const [input, setInput] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    city: "",
    country: ""
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Your form submission logic here
    console.log('Order confirmed!', input)
    setOpen(false)
  }

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Review Your Order</DialogTitle>
        <DialogDescription className='text-xs'>
          Double-check your delivery details and ensure everything is correct. When you’re ready, hit the confirm button to finalize your order.
        </DialogDescription>

        <form onSubmit={handleSubmit} className="md:grid grid-cols-2 gap-2 space-y-1 md:space-y-0">
          <div >
            <Label>Fullname</Label>
            <Input
              type='text'
              name='name'
              value={input.name}
              onChange={changeEventHandler}
            />
          </div>
          <div >
            <Label>Email</Label>
            <Input
              type='email'
              name='email'
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
          <div >
            <Label>Contact</Label>
            <Input
              type='text'
              name='contact'
              value={input.contact}
              onChange={changeEventHandler}
            />
          </div>
          <div >
            <Label>Address</Label>
            <Input
              type='text'
              name='address'
              value={input.address}
              onChange={changeEventHandler}
            />
          </div>
          <div >
            <Label>City</Label>
            <Input
              type='text'
              name='city'
              value={input.city}
              onChange={changeEventHandler}
            />
          </div>
          <div >
            <Label>Country</Label>
            <Input
              type='text'
              name='country'
              value={input.country}
              onChange={changeEventHandler}
            />
          </div>
          <DialogFooter className='col-span-2 pt-4'>
            <Button className='bg-orange-500 hover:bg-orange-700'>Continue To Payment</Button>
          </DialogFooter>
        </form>
      </DialogContent>

    </Dialog>
  )
}

export default CheckoutConfirmPage

