import mongoose from "mongoose";

type DeliveryDetails = {
  email:string,
  name:string,
  address:string,
  city :string,
}

type CartItems = {
  menuId: string, 
  name:string,
  image:string,
  price:number,
  quantity:number,
}

export interface IOrder extends Document {
  user:mongoose.Schema.Types.ObjectId,
  restaurant: mongoose.Schema.Types.ObjectId,
  deliveryDetails: DeliveryDetails,
  orderItems: CartItems,
  totalAmount:number,
  status:"pending" | "confirmed" | "preparing" | "outfordelivery" | "delivery"
}

const orderSchema = new mongoose.Schema<IOrder>({
user: {type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
restaurant:{type:mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true},
deliveryDetails: 
{email: {type:String, required:true},
name: {type:String, required:true},
address: {type:String, required:true},
city: {type: String, required:true}
},
orderItems:[
  {
    menuId : {type:String, required:true},
    name: {type:String, requird:true},
    image:{type:String, required:true},
    price:{type:String, requuired:true},
    quantity:{type:String, required:true}
  }
],
totalAmount: Number,
status: {type:String, enum : ["pending" , "confirmed", "outfordelivery", "delivery", "preparing" ], required: true}


},{timestamps:true})


export const Order = mongoose.model("Order", orderSchema)