import { Box, Card, CardMedia, CardContent, Typography, Button, Pagination, CircularProgress } from '@mui/material'
import Grid from '@mui/material/Grid2'
// npm install @mui/x-date-pickers 설치 후 사용
// yarn add @mui/x-date-pickers 설치 후 사용
// https://mui.com/x/react-date-pickers/date-picker/
//
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs' //날짜 시간 포맷해주는 패키지
import 'dayjs/locale/ko' // 한글 로케일 불러오기

import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersThunk, cancelOrderThunk, deleteOrderThunk } from '../../features/orderSlice'

function OrderList() {
   const dispatch = useDispatch()
   const { orders, pagination, loading, error } = useSelector((state) => state.order)
   const [page, setPage] = useState(1)
   const [cancelComplete, setCancelComplete] = useState(false)
   const [deleteComplete, setDeleteComplete] = useState(false)
   const [startDate, setStartDate] = useState(null)
   const [endDate, setEndDate] = useState(null)
   const [formattedStartDate, setFormattedStartDate] = useState('')
   const [formattedEndDate, setFormattedEndDate] = useState('')

   useEffect(() => {
      dispatch(getOrdersThunk({ page, limit: 5, startDate: formattedStartDate, endDate: formattedEndDate }))
   }, [dispatch, page, cancelComplete, deleteComplete, formattedStartDate, formattedEndDate])

   const handleCancelOrder = useCallback(
      (id) => {
         const result = window.confirm('주문을 취소하시겠습니까?')
         if (result) {
            dispatch(cancelOrderThunk(id))
               .unwrap()
               .then(() => {
                  // prev로 해줘야 여러개 한번에 주문 취소시 동작함
                  setCancelComplete((prev) => !prev)
               })
               .catch((error) => console.error('주문취소 실패:', error))
         } else {
            return
         }
      },
      [dispatch]
   )

   const handleDeleteOrder = useCallback(
      (id) => {
         const result = window.confirm('주문 내역을 삭제하시겠습니까?')
         if (result) {
            dispatch(deleteOrderThunk(id))
               .unwrap()
               .then(() => {
                  // prev로 해줘야 여러개 한번에 주문 삭제시 동작함
                  setDeleteComplete((prev) => !prev)
               })
               .catch((error) => console.error('주문삭제 실패:', error))
         } else {
            return
         }
      },
      [dispatch]
   )

   // 작성일 기간 필터링
   const handleDateFilter = useCallback(() => {
      if (!startDate || !endDate) {
         alert('시작일과 종료일을 지정하세요!')
         return
      }
      // YYYY-MM-DD 포맷으로 변환
      setFormattedStartDate(dayjs(startDate).format('YYYY-MM-DD'))
      setFormattedEndDate(dayjs(endDate).format('YYYY-MM-DD'))

      setPage(1) // 필터링 시 페이지를 첫 번째로 초기화
   }, [startDate, endDate])

   if (loading) {
      return (
         <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
         </Box>
      )
   }

   if (error) {
      return (
         <Typography variant="body1" align="center" color="error" mt={2}>
            에러 발생: {error}
         </Typography>
      )
   }

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
         <Box p={2}>
            {/* 날짜 검색 */}
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                  flexWrap: 'wrap', // 화면 크기에 따라 줄바꿈
                  mb: 7,
                  mt: 5,
               }}
            >
               <DatePicker label="시작일" value={startDate} onChange={(newValue) => setStartDate(newValue)} sx={{ width: '35%' }} />
               <DatePicker label="종료일" value={endDate} onChange={(newValue) => setEndDate(newValue)} sx={{ width: '35%' }} />
               <Button variant="contained" onClick={handleDateFilter}>
                  날짜 검색
               </Button>
            </Box>

            {/* 리스트 출력 */}
            {orders.length > 0 ? (
               <Grid container spacing={2}>
                  {orders.map((order) => (
                     <Grid xs={12} key={order.id} sx={{ width: '100%' }}>
                        <Card sx={{ display: 'flex', mb: 2, position: 'relative' }}>
                           <CardMedia component="img" sx={{ height: 150, width: 170 }} image={`${process.env.REACT_APP_API_URL}${order.Items.map((i) => i.Imgs.map((img) => img.imgUrl))}`} alt={order.Items.map((i) => i.itemNm)} />
                           <CardContent sx={{ flex: 1 }}>
                              <Typography variant="h6" gutterBottom>
                                 {order.Items.map((i) => i.itemNm)}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" gutterBottom>
                                 주문 날짜: {dayjs(order.orderDate).format('YYYY-MM-DD HH:mm:ss')}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" gutterBottom>
                                 총 주문 수량: {order.Items.map((i) => i.OrderItem.count)}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" gutterBottom>
                                 총 주문 금액: {order.Items.map((i) => i.OrderItem.orderPrice.toLocaleString('ko-KR'))}원
                              </Typography>
                           </CardContent>
                           {order.orderStatus === 'ORDER' ? (
                              <Button variant="contained" color="info" size="small" sx={{ position: 'absolute', top: 8, right: 8 }} onClick={() => handleCancelOrder(order.id)}>
                                 주문 취소
                              </Button>
                           ) : (
                              <Button variant="contained" color="error" size="small" sx={{ position: 'absolute', top: 8, right: 8 }} onClick={() => handleDeleteOrder(order.id)}>
                                 주문 삭제
                              </Button>
                           )}
                        </Card>
                     </Grid>
                  ))}
               </Grid>
            ) : (
               <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6">주문 내역이 없습니다.</Typography>
               </Box>
            )}

            {pagination && (
               <Box display="flex" justifyContent="center" mt={2}>
                  <Pagination count={pagination.totalPages} page={page} onChange={(event, value) => setPage(value)} color="primary" />
               </Box>
            )}
         </Box>
      </LocalizationProvider>
   )
}

export default OrderList
