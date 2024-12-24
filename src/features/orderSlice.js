import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createOrder, getOrders, cancelOrder, deleteOrder } from '../api/orderApi'

// 주문하기
export const createOrderThunk = createAsyncThunk('auth/registerUser', async (orderData, { rejectWithValue }) => {
   try {
      const response = await createOrder(orderData)
      return response.data.orderId
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '주문하기 실패')
   }
})

const orderSlice = createSlice({
   name: 'order',
   initialState: {
      orders: [],
      orderComplete: false,
      loading: true,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      //주문하기
      builder
         .addCase(createOrderThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(createOrderThunk.fulfilled, (state, action) => {
            state.loading = false
            state.orderComplete = true
         })
         .addCase(createOrderThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default orderSlice.reducer
