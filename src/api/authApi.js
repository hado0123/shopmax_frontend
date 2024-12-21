import shopmaxApi from './axiosApi'

//회원가입
export const registerUser = async (userData) => {
   try {
      // userData: 회원가입 창에서 입력한 데이터
      const response = await shopmaxApi.post('/auth/join', userData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error //request 할때 오류 발생시 에러를 registerUser() 함수를 실행한 곳으로 던짐
   }
}

//로그인
export const loginUser = async (credentials) => {
   try {
      const response = await shopmaxApi.post('/auth/login', credentials)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그아웃
export const logoutUser = async () => {
   try {
      const response = await shopmaxApi.get('/auth/logout')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//로그인 상태 확인
export const checkAuthStatus = async () => {
   try {
      const response = await shopmaxApi.get('/auth/status')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 내 프로필 가져오기
export const getProfile = async () => {
   try {
      const response = await shopmaxApi.get(`/page/profile`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 특정 사용자 프로필 가져오기
export const getProfileId = async (id) => {
   try {
      const response = await shopmaxApi.get(`/page/profile/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
