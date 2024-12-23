import { Container, Typography, Pagination, Stack } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsThunk } from '../features/itemSlice'
import BoardList from '../components/board/BoardList'

function ItemListPage() {
   const [page, setPage] = useState(1) // 현재 페이지
   const dispatch = useDispatch()
   const { items, pagination, loading, error } = useSelector((state) => state.items)

   useEffect(() => {
      dispatch(fetchItemsThunk(page))
   }, [dispatch, page])

   // 페이지 변경
   const handlePageChange = useCallback((event, value) => {
      setPage(value)
   }, [])

   return (
      <Container maxWidth="lg" sx={{ marginTop: 10, marginBottom: 13 }}>
         <Typography variant="h4" align="center" gutterBottom>
            상품 등록 리스트
         </Typography>

         {loading && (
            <Typography variant="body1" align="center">
               상품 로딩 중...
            </Typography>
         )}

         {error && (
            <Typography variant="body1" align="center" color="error">
               에러 발생: {error}
            </Typography>
         )}

         <BoardList items={items} />
      </Container>
   )
}

export default ItemListPage
