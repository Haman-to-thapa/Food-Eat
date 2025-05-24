import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, LockKeyholeIcon } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"


const ResetPassword = () => {

  const [newPassword, setNewPassword] = useState<string>('')
  const loading: boolean = false

  return (
    <div className='flex items-center min-h-screen w-full justify-center'>
      <form action="" className="flex flex-col gap-5 md:border md:p-8 w-full max-w-md rounded-lg mx-4 ">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
          <p className="text-sm text-gray-600">Enter your New Password</p>
        </div>
        <div className="relative">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="pl-10 "
          />
          <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>
        <div className="relative">
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="pl-10 "
          />
          <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-600 pointer-events-none" />
        </div>



        {
          loading ? <Button className="bg-orange-700 hover:bg-amber-900"><Loader2 className="mr-2 h-4 w-4 animate-spin" />  Please wait</Button> : <Button
            disabled={loading}
            type="submit"
          >
            Reset
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

export default ResetPassword