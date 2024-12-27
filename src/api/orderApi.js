import shopmaxApi from './axiosApi'

//주문하기
export const createOrder = async (orderData) => {
   try {
      const response = await shopmaxApi.post('/order', orderData)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//주문목록(페이징)
export const getOrders = async (data) => {
   try {
      const { page, limit, startDate, endDate } = data
      const response = await shopmaxApi.get(`/order/list?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//주문취소
export const cancelOrder = async (id) => {
   try {
      const response = await shopmaxApi.post(`/order/cancel/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}

//주문삭제
export const deleteOrder = async (id) => {
   try {
      const response = await shopmaxApi.delete(`/order/delete/${id}`)
      return response
   } catch (error) {
      console.error(`API Request 오류: ${error.message}`)
      throw error
   }
}
