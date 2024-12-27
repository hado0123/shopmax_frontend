import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import itemReducer from '../features/itemSlice'
import orderReducer from '../features/orderSlice'
import domainReducer from '../features/domainSlice'

const store = configureStore({
   reducer: {
      auth: authReducer,
      items: itemReducer,
      order: orderReducer,
      domain: domainReducer,
   },
})

export default store
