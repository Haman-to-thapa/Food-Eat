import {z} from 'zod'

export const menuSchema = z.object({
  title: z.string().nonempty({message:"description is required"}),
  description: z.string().nonempty({message: 'description is required'}),
  price: z.number().min(0, {message:"price can not be negative"}),
  image: z.instanceof(File).optional().refine((file) => file?.size !== 0, {message: "Image file is required"} )
})


export type MenuFromSchema = z.infer<typeof menuSchema>;