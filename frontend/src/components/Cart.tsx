
import { Minus, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table"
import { useState } from "react"
import CheckoutConfirmPage from "./CheckoutConfirmPage"



const Cart = () => {

  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className="flex flex-col max-w-7xl mx-auto my-10">
      <div className="flex justify-end">
        <Button variant={'link'}>Clear All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Items</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage src="" alt="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </TableCell>
            <TableCell>
              Biryani
            </TableCell>
            <TableCell>
              80
            </TableCell>
            <TableCell>
              <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                <Button className="rounded-full bg-gray-200" size={"icon"} variant={"outline"}>
                  <Minus />
                </Button>
                <Button disabled variant={'outline'} size={'icon'} className="font-bold border-none">1</Button>
                <Button variant={'outline'} size={'icon'} className="rounded-full bg-orange-300 hover:bg-orange-700 "><Plus /></Button>
              </div>
            </TableCell>
            <TableCell>
              80
            </TableCell>
            <TableCell className="text-right">
              <Button size={'sm'} className="bg-orange-500 hover:bg-orange-700">Remove</Button>
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              Total
            </TableCell>
            <TableCell className="text-right text-lg">
              80
            </TableCell>

          </TableRow>
        </TableFooter>
      </Table>
      <div className="flex justify-end my-5">
        <Button onClick={() => setOpen(true)} className="bg-green-500 hover:bg-yellow-950">Process to Checkout</Button>
      </div>
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  )
}

export default Cart
Cart