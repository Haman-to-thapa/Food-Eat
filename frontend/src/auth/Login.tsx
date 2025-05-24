import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { userLoginSchema, type LoginInputState } from "@/schema/userSchema";

import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";


const Login = () => {

  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  })

  const [error, setError] = useState<Partial<LoginInputState>>({})

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev, [name]: value
    }))
  }

  const loginSubmitHandler = (e: FormEvent) => {
    e.preventDefault()

    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const errorFiled = result.error.formErrors.fieldErrors;
      setError(errorFiled as Partial<LoginInputState>)
      return;

    }

    console.log(input)
  }

  const loading = false;


  return (
    <div className="flex items-center h-screen justify-center min-h-screen ">
      <form
        onSubmit={loginSubmitHandler}
        action=""
        className="md:border border-gray-200 rounded-lg md:p-8 w-full max-w-md mx-4">
        <div className="mb-4">
          <h1 className="font-bold text-2xl"> Eat & Fit</h1>
        </div>
        <div className="mb-4">
          <div className="relative">

            <Input
              type="email"
              placeholder=" Email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1" />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {
              error && <span className="text-sm text-red-500">{error.email}</span>
            }
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">

            <Input
              type="password"
              placeholder=" Password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1" />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {
              error && <span className="text-sm text-red-500
              ">{error.password}</span>
            }
          </div>

        </div>
        <div className="mb-10">
          {
            loading ?
              <Button
                disabled={loading}
                type="submit"
                className="bg-orange-800 hover:bg-orange-950 w-full"><Loader2 className="mr-2 h-4 w-4 animate-spin " />Please wait</Button>
              : <Button className="bg-orange-800 hover:bg-orange-950 w-full">Login</Button>
          }
          <div className="mt-4 ">
            <Link to='/forget-password' className="text-blue-600">Forget Password</Link>
          </div>

        </div>
        <Separator />
        <p className="mt-2">
          Dont have an account ? {" "}
          <Link to='/signup' className="text-blue-600">Sign up</Link>
        </p>

      </form>
    </div>
  );
};

export default Login;
