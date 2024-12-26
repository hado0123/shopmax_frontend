import { Box, Card, CardMedia, CardContent, Typography, Button, Pagination, CircularProgress } from '@mui/material'
import Grid from '@mui/material/Grid2'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersThunk, cancelOrderThunk, deleteOrderThunk } from '../../features/orderSlice'
import dayjs from 'dayjs'

function OrderList() {
   const dispatch = useDispatch()
   const { orders, pagination, loading, error } = useSelector((state) => state.order)
   const [page, setPage] = useState(1)
   const [cancelComplete, setCancelComplete] = useState(false)
   const [deleteComplete, setDeleteComplete] = useState(false)

   useEffect(() => {
      dispatch(getOrdersThunk({ page, limit: 5 }))
   }, [dispatch, page, cancelComplete, deleteComplete])

   const handleCancelOrder = (id) => {
      const result = window.confirm('주문을 취소하시겠습니까?')
      if (result) {
         dispatch(cancelOrderThunk(id))
            .unwrap()
            .then(() => {
               setCancelComplete(true)
            })
            .catch((error) => console.error('주문취소 실패:', error))
      } else {
         return
      }
   }

   const handleDeleteOrder = (id) => {
      const result = window.confirm('주문 내역을 삭제하시겠습니까?')
      if (result) {
         dispatch(deleteOrderThunk(id))
            .unwrap()
            .then(() => {
               setDeleteComplete(true)
            })
            .catch((error) => console.error('주문삭제 실패:', error))
      } else {
         return
      }
   }

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
      <Box p={2}>
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
                           총 주문 수량: {order.OrderItems.map((oi) => oi.count)}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                           총 주문 금액: {order.OrderItems.map((oi) => oi.orderPrice.toLocaleString('ko-KR'))}원
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
         <Box display="flex" justifyContent="center" mt={2}>
            <Pagination count={pagination.totalPages} page={page} onChange={(event, value) => setPage(value)} color="primary" />
         </Box>
      </Box>
   )
}

export default OrderList
