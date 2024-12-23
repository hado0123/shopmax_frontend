import { Container, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { deleteItemThunk } from '../features/itemSlice'
import ItemList from '../components/item/ItemList'

function ItemListPage() {
   const dispatch = useDispatch()

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

   return (
      <Container maxWidth="lg" sx={{ marginTop: 10, marginBottom: 13 }}>
         <Typography variant="h4" align="center" gutterBottom>
            상품 등록 리스트
         </Typography>

         <ItemList handleDeleteThunk={handleDeleteThunk} />
      </Container>
   )
}

export default ItemListPage
