import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setDomain, getToken, testToken } from '../api/domainApi'

// 도메인 등록
export const setDomainThunk = createAsyncThunk('domain/setDomain', async (data, { rejectWithValue }) => {
   try {
      const response = await setDomain(data)
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '도메인 등록 실패')
   }
})

// 토큰 발급
export const getTokenThunk = createAsyncThunk('domain/getToken', async (_, { rejectWithValue }) => {
   try {
      const response = await getToken()
      return response.data.token
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '토큰 발급 실패')
   }
})

//토큰 테스트
export const testTokenThunk = createAsyncThunk('domain/testToken', async (_, { rejectWithValue }) => {
   try {
      const response = await testToken()
      return response.data
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '토큰 유효성 테스트 실패')
   }
})

const domainSlice = createSlice({
   name: 'domain',
   initialState: {
      token: null,
      loading: true,
      error: null,
   },
   reducers: {},
   extraReducers: (builder) => {
      // 도메인 등록
      builder
         .addCase(setDomainThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(setDomainThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(setDomainThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 토큰 발급
      builder
         .addCase(getTokenThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(getTokenThunk.fulfilled, (state, action) => {
            state.loading = false
            state.token = action.payload
         })
         .addCase(getTokenThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
      // 토큰 테스트
      builder
         .addCase(testTokenThunk.pending, (state) => {
            state.loading = true
            state.error = null
         })
         .addCase(testTokenThunk.fulfilled, (state, action) => {
            state.loading = false
         })
         .addCase(testTokenThunk.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
         })
   },
})

export default domainSlice.reducer
