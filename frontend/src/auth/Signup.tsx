import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { userSignupSchema, type SignupInputState } from "@/schema/userSchema";


import { Loader2, LockKeyhole, Mail, Phone, User } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";

const Signup = () => {

  const [input, setInput] = useState<SignupInputState>({
    name: "",
    email: "",
    password: "",
    contact: "",
  })

  const [error, setError] = useState<Partial<SignupInputState>>({})

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev, [name]: value
    }))
  }

  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()

    // form validation checking from zod schema here
    const resultZod = userSignupSchema.safeParse(input);
    if (!resultZod.success) {
      const fieldErrors = resultZod.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<SignupInputState>)
      return;
    }

    // login api implementaion start here

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
              type="text"
              placeholder="Name"
              name="name"
              value={input.name}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1" />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {
              error && <span className="text-sm text-red-500">{error.name}</span>
            }
          </div>

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
              error && <span className="text-sm text-red-600">{error.email}</span>
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
              error && <span className="text-sm text-red-500">{error.password}</span>
            }
          </div>

        </div>
        <div className="mb-4">
          <div className="relative">

            <Input
              type="text"
              placeholder="Contact"
              name="contact"
              value={input.contact}
              onChange={changeEventHandler}
              className="pl-10 focus-visible:ring-1" />
            <Phone className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {
              error && <span className="text-sm text-red-500">{error.contact}</span>
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
              : <Button className="bg-orange-800 hover:bg-orange-950 w-full">Signup</Button>
          }

        </div>
        <Separator />
        <p className="mt-2">
          You have an account ? {" "}
          <Link to='/login' className="text-blue-600">Login here</Link>
        </p>

      </form>
    </div>
  );
};

export default Signup;
