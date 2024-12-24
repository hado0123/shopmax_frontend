import { Card, CardMedia, CardContent, Typography, Pagination, Box } from '@mui/material'

import { formatWithComma } from '../../utils/priceSet'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsThunk } from '../../features/itemSlice'
import { Link } from 'react-router-dom'

function ItemSellList({ searchTerm }) {
   const dispatch = useDispatch()
   const { items, pagination, loading, error } = useSelector((state) => state.items)
   const [page, setPage] = useState(1)

   // 데이터 가져오기 (페이징)
   useEffect(() => {
      dispatch(fetchItemsThunk({ page, limit: 8, searchTerm }))
   }, [dispatch, page, searchTerm]) //검색어 입력시에도 다시 state변경

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
               // 라우터의 Link사용시 속도는 빠르지만 페이지 새로고침이 아니므로 마운트 하는 부분의 컴포넌트만 툴킷의 thunk를 dispatch한다. 따라서 상품 구매 페이지 이동시 로그인여부를 체크하는 부분은 실행되지 않는다
               <Link key={item.id} to={`/items/detail/${item.id}`} style={{ textDecoration: 'none' }}>
                  <Card sx={{ width: '250px' }}>
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
               </Link>
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
