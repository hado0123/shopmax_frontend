import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function RedirectLoginRoute({ children }) {
   const { isAuthenticated } = useSelector((state) => state.auth)

   // 로그인 상태일 경우, 홈으로 리다이렉트
   if (isAuthenticated) {
      return <Navigate to="/" />
   }

   // 로그인 상태가 아니면 children 컴포넌트 렌더링
   return children
}

export default RedirectLoginRoute
