import './styles/common.css'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuthStatusThunk } from './features/authSlice'

import { Toolbar } from '@mui/material'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'
import Home from './pages/Home'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ItemCreatePage from './pages/ItemCreatePage'
import ItemEditPage from './pages/ItemEditPage'
import RedirectLoginRoute from './components/auth/RedirectLoginRoute'
import AdminRoute from './components/auth/AdminRoute'

function App() {
   const dispatch = useDispatch()
   const { isAuthenticated, user } = useSelector((state) => state.auth) //로그인 상태, 로그인 사용자 정보 가져오기

   //새로고침시 redux 데이터가 사라지거나 서버에서 문제 발생 가능성이 있으므로 지속적인 로그인 상태 확인을 위해 사용
   useEffect(() => {
      dispatch(checkAuthStatusThunk())
   }, [dispatch])

   return (
      <>
         <Navbar isAuthenticated={isAuthenticated} user={user} />
         {/* <AppBar position="fixed" .. 하니까 아래오는 Container가 메뉴에 가려져서 보이는 문제 해결 => AppBar 높이만큼 여백을 추가 */}
         <Toolbar />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
               path="/login"
               element={
                  // 로그인 상태일때는 home으로 리다이렉트
                  <RedirectLoginRoute>
                     <LoginPage />
                  </RedirectLoginRoute>
               }
            />
            <Route
               path="/items/create"
               element={
                  // 관리자가 아닐 경우는 home으로 리다이렉트
                  <AdminRoute>
                     <ItemCreatePage />
                  </AdminRoute>
               }
            />
            <Route
               path="/items/edit/:id"
               element={
                  <AdminRoute>
                     <ItemEditPage />
                  </AdminRoute>
               }
            />
         </Routes>
         <Footer />
      </>
   )
}

export default App
