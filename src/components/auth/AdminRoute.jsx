import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function AdminRoute({ children }) {
   const { isAuthenticated, user, loading } = useSelector((state) => state.auth)

   /*

   AdminRoute 컴포넌트가 세 번 렌더링되면서 처음 렌더링 시 isAuthenticated와 user 값이 초기값으로 나타나는 이유는 주로 Redux 상태가 비동기로 업데이트되기 때문입니다.

   원인
   1. Redux의 isAuthenticated와 user 값은 null 또는 false 같은 초기값으로 설정됩니다.
   checkAuthStatusThunk()가 호출되기 전에는 Redux 스토어가 업데이트되지 않으므로 초기값을 사용하게 됩니다.
   비동기 업데이트

   2. checkAuthStatusThunk()가 서버에서 데이터를 가져와 Redux 상태를 업데이트하는데 시간이 걸립니다.
   이 비동기 작업이 완료되기 전에 컴포넌트가 렌더링되면서 초기값을 사용합니다.
   React 렌더링

   3. React는 상태나 Redux 스토어 값이 변경될 때마다 컴포넌트를 다시 렌더링합니다. 이 과정에서 초기값 → 업데이트된 값으로 상태가 전환되며, 여러 번 렌더링이 발생합니다.
   
   initialState: {
      loading: true,
   } 로 변경 해줌
   */

   // 로딩 중일 때는 아무것도 렌더링하지 않음
   if (loading) {
      return null // 로딩 화면 표시 (필요에 따라 커스터마이징 가능)
   }

   // 인증되지 않았거나 관리자가 아닐 경우 리다이렉트
   if (!isAuthenticated || user?.role !== 'ADMIN') {
      alert('접근 권한이 없습니다!')
      return <Navigate to="/" /> // 홈 페이지로 리다이렉트
   }

   // 인증된 관리자만 접근 가능
   return children
}

export default AdminRoute
