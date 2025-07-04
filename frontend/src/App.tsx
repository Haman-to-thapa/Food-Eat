
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './pages/MainLayout'
import Login from './auth/Login'
import Signup from './auth/Signup'
import ForgetPassword from './auth/ForgetPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'
import HeroSection from './components/HeroSection'
import Profile from './components/Profile'
import SearchPage from './components/SearchPage'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import PageNotFound from './pages/PageNotFound'
import Restuarant from './admin/Restuarant'
import AddMenu from './admin/AddMenu'
import Order from './admin/Order'
import Success from './components/Success'




function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HeroSection />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/search/:text' element={<SearchPage />} />
          <Route path='/restauant/:id' element={<RestaurantDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order/success' element={<Success />} />

          {/* Admin service start form here */}
          <Route path='/admin/restaurant' element={<Restuarant />} />
          <Route path='/admin/menu' element={<AddMenu />} />
          <Route path='/admin/order' element={<Order />} />

        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
