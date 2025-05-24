import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Mail } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"


const ForgetPassword = () => {

  const [email, setEmail] = useState<string>('')
  const loading: boolean = false

  return (
    <div className='flex items-center min-h-screen w-full justify-center'>
      <form action="" className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-lg mx-4 ">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Forget Password</h1>
          <p className="text-sm text-gray-600">Enter your email address to reset your password</p>
        </div>
        <div className="relative">
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter you email"
            className="pl-10 "
          />
          <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>


        {
          loading ? <Button className="bg-orange-700 hover:bg-amber-900"><Loader2 className="mr-2 h-4 w-4 animate-spin" />  Please wait</Button> : <Button
            disabled={loading}
            type="submit"
          >
            Send Reset Link
          </Button>
        }
        <span>
          Back to {" "}
          <Link to='/login' className="text-blue-700 font-bold underline">Login</Link>
        </span>

      </form>

    </div>
  )
}

export default ForgetPassword