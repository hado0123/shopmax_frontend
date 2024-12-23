import { Container, Typography, Pagination, Stack } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsThunk, deleteItemThunk } from '../features/itemSlice'
import BoardList from '../components/board/BoardList'

function ItemListPage() {
   const [page, setPage] = useState(1) // 현재 페이지
   const dispatch = useDispatch()
   const { items, pagination, loading, error } = useSelector((state) => state.items)

   useEffect(() => {
      dispatch(fetchItemsThunk(page))
   }, [dispatch, page])

   const handleDeleteThunk = (id) => {
      const result = window.confirm('삭제하시겠습니까?')

      if (result) {
         dispatch(deleteItemThunk(id))
            .unwrap()
            .then(() => {
               window.location.href = '/items/createlist'
            })
            .catch((error) => {
               console.error('회원가입 에러:', error)
               alert('삭제 실패!', error)
            })
      } else {
         return
      }
   }

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

         <BoardList items={items} handleDeleteThunk={handleDeleteThunk} />
      </Container>
   )
}

export default ItemListPage
