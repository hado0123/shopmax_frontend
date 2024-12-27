import shopmaxApi from './axiosApi'

// 도메인 등록하기
export const setDomain = async (data) => {
   try {
      const response = await shopmaxApi.post('/domain', data)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

// 토큰 발급받기
export const getToken = async () => {
   try {
      const response = await shopmaxApi.get('/token/get')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//토큰 테스트
export const testToken = async () => {
   try {
      const response = await shopmaxApi.get('/token/test')
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
