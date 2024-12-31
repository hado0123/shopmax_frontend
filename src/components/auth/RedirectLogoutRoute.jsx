import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function RedirectLoginRoute({ children }) {
   const { isAuthenticated, loading } = useSelector((state) => state.auth)

   // 로딩 중일 때는 아무것도 렌더링하지 않음
   if (loading) {
      return null // 로딩 화면 표시 (필요에 따라 커스터마이징 가능)
   }

   // 로그인 안했을 경우, 로그인 페이지로 리다이렉트
   if (!isAuthenticated) {
      return <Navigate to="/login" />
   }

   // 로그인 한 경우 children 컴포넌트 렌더링
   return children
}

export default RedirectLoginRoute
