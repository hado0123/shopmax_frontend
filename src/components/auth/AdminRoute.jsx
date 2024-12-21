import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
   const { isAuthenticated, user } = useSelector((state) => state.auth)

   // 인증되지 않았거나 관리자가 아닐 경우 리다이렉트
   if (!isAuthenticated || !user?.isAdmin) {
      return <Navigate to="/" /> // 홈 페이지로 리다이렉트
   }

   // 인증된 관리자만 접근 가능
   return children
}

export default AdminRoute
