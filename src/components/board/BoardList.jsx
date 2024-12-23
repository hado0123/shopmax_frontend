import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Stack, Pagination, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
// npm install @mui/x-date-pickers 설치 후 사용
// yarn add @mui/x-date-pickers 설치 후 사용
// https://mui.com/x/react-date-pickers/date-picker/
//
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs' //날짜 시간 포맷해주는 패키지
import 'dayjs/locale/ko' // 한글 로케일 불러오기

import { useCallback, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const POSTS_PER_PAGE = 5 // 한 페이지에 표시할 게시글 수

function BoardList({ items, handleDeleteThunk }) {
   const [filteredItems, setFilteredItems] = useState(items || [])
   const [searchTerm, setSearchTerm] = useState('')
   const [searchCategory, setSearchCategory] = useState('itemNm') // 검색 기준
   const [startDate, setStartDate] = useState(null)
   const [endDate, setEndDate] = useState(null)
   const [page, setPage] = useState(1)

   // dayjs 로케일 설정
   dayjs.locale('ko')

   /*
   items가 Redux Toolkit을 통해 비동기로 로드되는 데이터라면, 초기 렌더링 시 items가 아직 빈 배열이거나 undefined일 가능성이 높습니다. 이로 인해 useState에서 items의 초기값이 설정되지 않을 수 있습니다.

   useState는 초기 렌더링 시에만 초기값을 설정하며, 이후에는 items의 변경 사항을 자동으로 반영하지 않습니다.

   해결 방법: useEffect를 사용하여 items가 업데이트될 때마다 filteredItems를 갱신하면 해결할 수 있습니다.
   */
   // items가 변경될 때 filteredItems를 업데이트
   useEffect(() => {
      if (items) {
         setFilteredItems(items)
      }
   }, [items])

   // 검색 핸들러
   const handleSearch = (event) => {
      const searchValue = event.target.value.toLowerCase()
      setSearchTerm(searchValue)

      const filtered = items.filter((item) => {
         if (searchCategory === 'itemNm') {
            return item.itemNm.toLowerCase().includes(searchValue)
         }
         if (searchCategory === 'price') {
            return item.price.includes(searchValue)
         }
         return true
      })

      setFilteredItems(filtered)
      setPage(1) // 검색 시 페이지를 첫 번째로 초기화
   }

   // 작성일 기간 필터링
   const handleDateFilter = () => {
      const filtered = items.filter((item) => {
         const itemDate = dayjs(item.createdAt) // dayjs 객체로 변환
         const isAfterStart = startDate ? itemDate.isAfter(dayjs(startDate).subtract(1, 'day')) : true
         const isBeforeEnd = endDate ? itemDate.isBefore(dayjs(endDate).add(1, 'day')) : true
         return isAfterStart && isBeforeEnd
      })

      setFilteredItems(filtered)
      setPage(1) // 필터링 시 페이지를 첫 번째로 초기화
   }

   // 카테고리 변경 핸들러
   const handleCategoryChange = (event) => {
      setSearchCategory(event.target.value)
      setSearchTerm('') // 검색어 초기화
      setFilteredItems(items) // 전체 게시글 표시
      setPage(1) // 첫 페이지로 초기화
   }

   // 페이지 변경 핸들러
   const handlePageChange = (event, value) => {
      setPage(value)
   }

   // 현재 페이지에 표시할 게시글 계산
   const startIndex = (page - 1) * POSTS_PER_PAGE
   const currentItems = filteredItems.slice(startIndex, startIndex + POSTS_PER_PAGE)

   return (
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
         <Box sx={{ p: 4 }}>
            {/* 검색 기준과 검색창 */}
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flexWrap: 'wrap', // 화면 크기에 따라 줄바꿈
                  mb: 2,
               }}
            >
               {/* 검색 기준 */}
               <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel>검색 기준</InputLabel>
                  <Select value={searchCategory} onChange={handleCategoryChange} label="검색 기준">
                     <MenuItem value="itemNm">상품명</MenuItem>
                     <MenuItem value="price">가격</MenuItem>
                  </Select>
               </FormControl>

               {/* 검색 입력 */}
               <TextField
                  label="검색"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder={`${searchCategory}로 검색`}
                  sx={{ flex: 1 }} // 검색창이 넓게 표시되도록 설정
               />
            </Box>

            <hr />

            {/* 날짜 필터 */}
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  flexWrap: 'wrap', // 화면 크기에 따라 줄바꿈
                  mb: 2,
                  mt: 2,
               }}
            >
               <DatePicker label="시작일" value={startDate} onChange={(newValue) => setStartDate(newValue)} />
               <DatePicker label="종료일" value={endDate} onChange={(newValue) => setEndDate(newValue)} />
               <Button variant="contained" onClick={handleDateFilter}>
                  날짜 검색
               </Button>
            </Box>

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
                     {currentItems.length > 0 ? (
                        currentItems.map((item) => (
                           <TableRow key={item.id}>
                              <TableCell align="center">{item.id}</TableCell>
                              <TableCell>
                                 {' '}
                                 <Link to={`/items/edit/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {item.itemNm}
                                 </Link>
                              </TableCell>
                              <TableCell align="center">{item.price}</TableCell>
                              <TableCell align="center">{item.itemSellStatus}</TableCell>
                              <TableCell align="center">{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                              <TableCell align="center">
                                 <IconButton aria-label="delete" onClick={() => handleDeleteThunk(`${item.id}`)}>
                                    <DeleteIcon />
                                 </IconButton>
                              </TableCell>
                           </TableRow>
                        ))
                     ) : (
                        <TableRow>
                           <TableCell colSpan={5} align="center">
                              등록된 상품이 없습니다.
                           </TableCell>
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
            <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
               <Pagination
                  count={Math.ceil(filteredItems.length / POSTS_PER_PAGE)} // 총 페이지 수
                  page={page} // 현재 페이지
                  onChange={handlePageChange} // 페이지 변경 핸들러
               />
            </Stack>
            <Link to="/items/create">
               <Button variant="contained">상품등록</Button>
            </Link>
         </Box>
      </LocalizationProvider>
   )
}

export default BoardList
