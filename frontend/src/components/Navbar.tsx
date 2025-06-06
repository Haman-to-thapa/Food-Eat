import { Link } from "react-router-dom";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { HandPlatter, Loader2, Menu, Moon, Package2, ShoppingCart, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,

  SheetDescription,

  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "./ui/separator";


const Navbar = () => {


  const admin = true;
  const loading = false

  return (
    <div className="bg-white shadow ">
      <div className="flex items-center justify-between h-14 px-4 md:px-8">
        <Link to='/'>
          <h1 className="font-bold md:font-extrabold text-2xl text-gray-800">
            FoodEats
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to='/'>Home</Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/order'>Order</Link>
          </div>

          {
            admin && (
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>
                    Dashboard
                  </MenubarTrigger>
                  <MenubarContent>
                    <Link to='/admin/restaurant'>
                      <MenubarItem>
                        Restaurant
                      </MenubarItem>
                    </Link>
                    <Link to='/admin/menu'>
                      <MenubarItem>
                        Menu
                      </MenubarItem>
                    </Link>
                    <Link to='/admin/orders'>
                      <MenubarItem>
                        Order
                      </MenubarItem>
                    </Link>
                  </MenubarContent>
                </MenubarMenu>

              </Menubar>
            )
          }

          <div className="flex items-center gap-4">
            <div className="">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem >
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem >
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to='/cart' className="relative cursor-pointer">
              <ShoppingCart />
              <Button size={'icon'} className="absolute -inset-y-3 text-xs rounded-full h-4 w-4 bg-red-500 hover:bg-red-600">5</Button>
            </Link>
            <div className="">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="">
              {
                loading ? (<Button className="bg-orange-800 hover:bg-orange-900"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait</Button>) : (
                  <Button className="bg-orange-800 hover:bg-orange-900">Logout</Button>
                )
              }

            </div>
          </div>
        </div>
        <div className="md:hidden lg:hidden mt-5">
          {/* Mobile responsive ui */}
          <SheetDemo />
        </div>

      </div>

    </div>
  );
};

export default Navbar;




export function SheetDemo() {



  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={'icon'} className="rounded-full bg-gray-200 text-black hover:bg-gray-800" variant="outline"><Menu size={'18'} /></Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>FoodEats</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </SheetHeader>

        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link to='/profile' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <User />
            <span>Profile</span>
          </Link>
          <Link to='/order' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link to='/cart' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <ShoppingCart />
            <span>Cart (0)</span>
          </Link>
          <Link to='/admin/menu' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <SquareMenu />
            <span>Menu</span>
          </Link>
          <Link to='/admin/restaurant' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <UtensilsCrossed />
            <span>Restaurant</span>
          </Link>
          <Link to='/admin/order' className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium">
            <Package2 />
            <span>Restaurant Orders</span>
          </Link>
        </SheetDescription>


        <SheetFooter className="flex flex-col gap-4">

          <>
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-bold ">Welcome Back</h1>
            </div>
          </>

          <SheetClose asChild>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-800">Logout</Button>
          </SheetClose>


        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
