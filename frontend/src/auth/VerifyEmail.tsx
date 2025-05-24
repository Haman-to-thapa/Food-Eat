import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react"


const VerifyEmail = () => {

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  const loading = false;


  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];

      newOtp[index] = value;
      setOtp(newOtp);
    }

    //moving to next step input
    if (value !== "" && index < 5) {
      inputRef.current[index + 1]?.focus()
    }
  }


  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex items-center h-screen w-full justify-center">
      <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify Your Email</h1>
          <p className="text-sm text-gray-600">Enter the 6 digit code here</p>
        </div>
        <form action="">
          <div className="flex justify-between">
            {
              otp.map((letter: string, idx: number) => (
                <Input
                  type="text"
                  key={idx}
                  ref={(el) => { inputRef.current[idx] = el }}
                  value={letter}
                  maxLength={1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(idx, e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(idx, e)}
                  className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ))
            }

          </div>
          <div className="mt-10">
            {
              loading ? (<Button disabled={loading} type="submit" className="bg-orange-600 hover:bg-orange-800 w-full">
                <Loader2 className="w-4 h-4 animate-spin" />Please wait
              </Button>) : (
                <Button type="submit" className="bg-orange-600 hover:bg-orange-800 w-full">
                  verify
                </Button>
              )
            }
          </div>

        </form>
      </div>

    </div>
  )
}

export default VerifyEmail