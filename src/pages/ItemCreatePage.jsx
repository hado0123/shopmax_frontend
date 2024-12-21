import { Container } from '@mui/material'
import ItemForm from '../components/item/ItemForm'

import { useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { createItemThunk } from '../features/itemSlice'

function ItemCreatePage() {
   const dispatch = useDispatch()

   const handleSubmit = useCallback(
      (itemData) => {
         dispatch(createItemThunk(itemData))
            .unwrap()
            .then(() => {
               window.location.href = '/' // 페이지 이동 => 전체 페이지 새로고침
            })
            .catch((error) => {
               console.error('상품 등록 에러: ', error)
               alert('상품 등록에 실패했습니다.', error)
            })
      },
      [dispatch]
   )

   return (
      <Container maxWidth="md" sx={{ marginTop: 3 }}>
         <h1>상품 등록</h1>
         <ItemForm onSubmit={handleSubmit} />
      </Container>
   )
}

export default ItemCreatePage
