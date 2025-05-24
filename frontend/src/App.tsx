
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




function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HeroSection />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/search' element={<SearchPage />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
