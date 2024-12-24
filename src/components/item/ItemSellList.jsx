import { Card, CardMedia, CardContent, Typography, Pagination, Box } from '@mui/material'

import { formatWithComma } from '../../utils/priceSet'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsThunk } from '../../features/itemSlice'

function ItemSellList() {
   const dispatch = useDispatch()
   const { items, pagination, loading, error } = useSelector((state) => state.items)
   const [page, setPage] = useState(1)

   // 데이터 가져오기 (페이징)
   useEffect(() => {
      dispatch(fetchItemsThunk({ page, limit: 8 }))
   }, [dispatch, page])

   if (loading) {
      return null // 아무것도 보여주지 않음
   }

   if (error) {
      return (
         <Typography variant="body1" align="center" color="error">
            에러 발생: {error}
         </Typography>
      )
   }

   return (
      <Box sx={{ padding: '20px' }}>
         <Box
            sx={{
               display: 'grid',
               gridTemplateColumns: 'repeat(4, 1fr)',
               gridAutoRows: 'auto',
               gap: '16px',
               justifyItems: 'center',
            }}
         >
            {items.map((item) => (
               <Card key={item.id} sx={{ width: '250px' }}>
                  {/* 대표이미지만 가져오기 */}
                  <CardMedia component="img" height="140" image={`${process.env.REACT_APP_API_URL}${item.Imgs.filter((img) => img.repImgYn === 'Y')[0].imgUrl}`} alt={item.itemNm} />
                  <CardContent>
                     <Typography variant="h6" component="div">
                        {item.itemNm}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                        {formatWithComma(String(item.price))}원
                     </Typography>
                  </CardContent>
               </Card>
            ))}
         </Box>
         {pagination && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
               <Pagination count={pagination.totalPages} page={page} onChange={(event, value) => setPage(value)} color="primary" />
            </Box>
         )}
      </Box>
   )
}

export default ItemSellList
