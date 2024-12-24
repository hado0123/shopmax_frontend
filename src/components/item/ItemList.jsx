import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Stack, Pagination, Select, MenuItem, FormControl, InputLabel, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { formatWithComma } from '../../utils/priceSet'
import dayjs from 'dayjs'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsThunk, deleteItemThunk } from '../../features/itemSlice'

function ItemList() {
   const dispatch = useDispatch()
   const { items, pagination, loading, error } = useSelector((state) => state.items)

   const [searchTerm, setSearchTerm] = useState('')
   const [searchCategory, setSearchCategory] = useState('itemNm')
   const [sellCategory, setSellCategory] = useState('')
   const [searchSubmit, setSearchSubmit] = useState(false) // 버튼 클릭 트리거 상태
   const [page, setPage] = useState(1)

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

   // 데이터 가져오기 (검색 및 페이징)
   useEffect(() => {
      dispatch(fetchItemsThunk({ page, limit: 5, searchTerm, searchCategory, sellCategory }))
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [dispatch, page, sellCategory, searchSubmit]) // searchCategory와 searchTerm 제외

   //검색 버튼 클릭시
   const handleSearchSubmit = (event) => {
      event.preventDefault()
      setSearchSubmit((prev) => !prev) // 상태를 토글하여 useEffect를 실행
      setPage(1) // 검색 시 페이지 초기화
   }

   // 검색어 변경 핸들러
   const handleSearchChange = (event) => {
      setSearchTerm(event.target.value)
   }

   // 검색 기준 변경 핸들러
   const handleSearchCategoryChange = (event) => {
      setSearchCategory(event.target.value)
      setPage(1)
   }

   // 판매 상태 변경 핸들러
   const handleSellCategoryChange = (event) => {
      setSellCategory(event.target.value)
      setPage(1)
   }

   // 페이지 변경 핸들러
   const handlePageChange = (event, value) => {
      setPage(value)
   }

   if (loading) {
      return null //아무것도 보여주지 X
   }

   if (error) {
      return (
         <Typography variant="body1" align="center" color="error">
            에러 발생: {error}
         </Typography>
      )
   }

   return (
      <Box sx={{ p: 4 }}>
         {/* 등록버튼 */}
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Link to="/items/create">
               <Button variant="contained">상품등록</Button>
            </Link>
         </Box>

         {/* 테이블 */}
         <TableContainer component={Paper}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell align="center">번호</TableCell>
                     <TableCell>상품명</TableCell>
                     <TableCell align="center">가격</TableCell>
                     <TableCell align="center">판매상태</TableCell>
                     <TableCell align="center">등록일</TableCell>
                     <TableCell align="center">삭제</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {items.length > 0 ? (
                     items.map((item, index) => (
                        <TableRow key={item.id}>
                           <TableCell align="center">{item.id}</TableCell>
                           <TableCell>
                              <Link to={`/items/edit/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                 {item.itemNm}
                              </Link>
                           </TableCell>
                           <TableCell align="center">{formatWithComma(String(item.price))}</TableCell>
                           <TableCell align="center">{item.itemSellStatus}</TableCell>
                           <TableCell align="center">{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                           <TableCell align="center">
                              <IconButton aria-label="delete" onClick={() => handleDeleteThunk(item.id)}>
                                 <DeleteIcon />
                              </IconButton>
                           </TableCell>
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={6} align="center">
                           등록된 상품이 없습니다.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </TableContainer>

         {/* 페이징 */}
         {pagination && (
            <Stack spacing={2} sx={{ mt: 3, mb: 3, alignItems: 'center' }}>
               <Pagination
                  count={pagination.totalPages} // 총 페이지 수
                  page={page} // 현재 페이지
                  onChange={handlePageChange} // 페이지 변경 핸들러
               />
            </Stack>
         )}

         {/* 검색 및 필터 */}
         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 5 }}>
            <FormControl sx={{ minWidth: 120 }} size="small">
               <InputLabel>판매 상태</InputLabel>
               <Select value={sellCategory} onChange={handleSellCategoryChange} label="판매 상태">
                  <MenuItem value="">전체</MenuItem>
                  <MenuItem value="SELL">판매중</MenuItem>
                  <MenuItem value="SOLD_OUT">품절</MenuItem>
               </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }} size="small">
               <InputLabel>검색 기준</InputLabel>
               <Select value={searchCategory} onChange={handleSearchCategoryChange} label="검색 기준">
                  <MenuItem value="itemNm">상품명</MenuItem>
               </Select>
            </FormControl>

            <form
               onSubmit={handleSearchSubmit}
               style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px',
                  minWidth: '500px',
               }}
            >
               <FormControl sx={{ flex: 1 }}>
                  <TextField label="검색" variant="outlined" size="small" value={searchTerm} onChange={handleSearchChange} placeholder="검색어 입력" fullWidth />
               </FormControl>
               <Button variant="contained" type="submit">
                  검색
               </Button>
            </form>
         </Box>
      </Box>
   )
}

export default ItemList
