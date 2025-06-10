import { createRestaurant } from '../controller/restaurantController';
import { isAuthenticated } from '../middleware/isAuthenticated';

import express from 'express'

const routes = express.Router()


routes.post('/restaurant',isAuthenticated,createRestaurant)


export default routes