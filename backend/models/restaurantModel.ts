import mongoose from 'mongoose'

import { Schema, Document, Types } from 'mongoose'

export interface IRestaurant {
  user: Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menus: Types.ObjectId[];
}


export interface IRestaurantDocument extends IRestaurant, Document {
  createdAt:Date;
  updatedAt:Date;
}

const restaurantSchema = new mongoose.Schema<IRestaurantDocument>({
  user: {type:mongoose.Schema.ObjectId , ref:"User", required:true},
  restaurantName: {type: String , required:true},
  city: {type:String, required:true},
  country: {type:String, required:true},
  deliveryTime: {type:Number, required:true},
  cuisines: [{type:String, required: true}],
  menus: [{type: mongoose.Schema.Types.ObjectId, ref: 'Menu'}],
  imageUrl: {type:String, required:true}
},{timestamps:true})


export const Restaurant = mongoose.model("Restaurant",restaurantSchema)