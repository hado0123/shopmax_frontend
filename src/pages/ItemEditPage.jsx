import { useParams } from 'react-router-dom'
import ItemForm from '../components/item/ItemForm'
import { Container } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemByIdThunk, updateItemThunk } from '../features/itemSlice'

function ItemEditPage() {
   const { id } = useParams() //item의 id
   const dispatch = useDispatch()
   const { item, loading, error } = useSelector((state) => state.items)

   // 상품 데이터 불러오기
   useEffect(() => {
      dispatch(fetchItemByIdThunk(id))
   }, [dispatch, id])

   // 상품 수정
   const handleSubmit = useCallback(
      (itemData) => {
         dispatch(updateItemThunk({ id, itemData }))
            .unwrap()
            .then(() => {
               window.location.href = '/' //수정 후 메인페이지로 이동
            })
            .catch((error) => {
               console.error('상품 수정 중 오류 발생:', error)
               alert('상품 수정에 실패했습니다.', error)
            })
      },
      [dispatch, id]
   )

   if (loading) return <p>로딩 중...</p>
   if (error) return <p>에러발생: {error}</p>

   return (
      <Container maxWidth="md" sx={{ marginTop: 3 }}>
         <h1>상품 수정</h1>
         {item && <ItemForm onSubmit={handleSubmit} initialValues={item} />}
      </Container>
   )
}

export default ItemEditPage
