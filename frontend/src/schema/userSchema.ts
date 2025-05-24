import {z} from 'zod'


export const userSignupSchema = z.object({
  name:z.string().min(4,"name must be 4 character required"),
  email:z.string().email("invalid email address"),
  password:z.string().min(6, "Password must be 6 character"),
  contact:z.string().min(10,"Contact must be 10 numbers")

})

export type SignupInputState = z.infer<typeof userSignupSchema>



export const userLoginSchema = z.object({
  email:z.string().email("invalid email address"),
  password:z.string().min(6,"password must be at 6 character")
})


export type LoginInputState = z.infer<typeof userLoginSchema>