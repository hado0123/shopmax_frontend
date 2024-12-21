import React, { useState, useCallback, useMemo } from 'react'
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material'

function ItemForm({ onSubmit, initialValues = {} }) {
   const [imgUrls, setImgUrls] = useState([]) // 이미지 경로
   const [imgFiles, setImgFiles] = useState([]) // 이미지 파일 객체
   const [itemNm, setItemNm] = useState(initialValues.itemNm || '') // 상품명
   const [price, setPrice] = useState(initialValues.price || '') // 상품가격
   const [stockNumber, setStockNumber] = useState(initialValues.stockNumber || '') // 상품재고
   const [itemSellStatus, setItemSellStatus] = useState(initialValues.itemSellStatus || 'SELL') // 판매상태 (기본값: SELL)
   const [itemDetail, setItemDetail] = useState(initialValues.itemDetail || '') // 상품 설명

   // 이미지 파일 변경 핸들러
   const handleImageChange = useCallback((e) => {
      const files = e.target.files
      if (!files || files.length === 0) return

      const newFiles = Array.from(files).slice(0, 5) // 최대 5개로 제한

      const newImgUrls = newFiles.map((file) => {
         const reader = new FileReader()
         reader.readAsDataURL(file)
         return new Promise((resolve) => {
            reader.onload = (event) => resolve(event.target.result)
         })
      })

      // 기존 이미지와 파일을 덮어쓰기
      Promise.all(newImgUrls).then((urls) => {
         setImgFiles(newFiles) // 새 파일로 대체
         setImgUrls(urls) // 새 미리보기 URL로 대체
      })
   }, [])

   // 폼 제출 핸들러
   const handleSubmit = useCallback(
      (e) => {
         e.preventDefault()

         if (!itemNm.trim()) {
            alert('상품명을 입력하세요.')
            return
         }

         if (!price.trim()) {
            alert('가격을 입력하세요.')
            return
         }

         if (!stockNumber.trim()) {
            alert('재고를 입력하세요.')
            return
         }

         if (!itemDetail.trim()) {
            alert('상품설명을 입력하세요.')
            return
         }

         if (imgFiles.length === 0) {
            alert('이미지를 최소 1개 업로드하세요.')
            return
         }

         const formData = new FormData()
         formData.append('itemNm', itemNm)
         formData.append('price', price)
         formData.append('stockNumber', stockNumber)
         formData.append('itemSellStatus', itemSellStatus) // 판매 상태 추가
         formData.append('itemDetail', itemDetail)

         // 여러 이미지 파일 추가
         imgFiles.forEach((file) => {
            const encodedFile = new File([file], encodeURIComponent(file.name), { type: file.type })
            formData.append(`img`, encodedFile)
         })

         onSubmit(formData) // formData 객체 전송
      },
      [itemNm, price, stockNumber, itemSellStatus, itemDetail, imgFiles, onSubmit]
   )

   // 등록 / 수정 버튼 라벨
   const submitButtonLabel = useMemo(() => (initialValues.id ? '수정하기' : '등록하기'), [initialValues.id])

   return (
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
         {/* 이미지 업로드 필드 */}
         <Button variant="contained" component="label">
            이미지 업로드 (최대 5개)
            <input type="file" name="img" accept="image/*" hidden multiple onChange={handleImageChange} />
         </Button>

         {/* 업로드된 이미지 미리보기 */}
         <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            mt={2}
            sx={{
               justifyContent: 'flex-start',
            }}
         >
            {imgUrls.map((url, index) => (
               <Box
                  key={index}
                  sx={{
                     width: '120px',
                     height: '120px',
                     border: '1px solid #ccc',
                     borderRadius: '8px',
                     overflow: 'hidden',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                  }}
               >
                  <img src={url} alt={`업로드 이미지 ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               </Box>
            ))}
         </Box>

         {/* 상품명 입력 필드 */}
         <TextField label="상품명" variant="outlined" fullWidth value={itemNm} onChange={(e) => setItemNm(e.target.value)} placeholder="상품명" sx={{ mt: 2 }} />

         {/* 가격 입력 필드 */}
         <TextField label="가격" variant="outlined" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} placeholder="가격" sx={{ mt: 2 }} />

         {/* 재고 입력 필드 */}
         <TextField label="재고수량" variant="outlined" fullWidth value={stockNumber} onChange={(e) => setStockNumber(e.target.value)} placeholder="재고수량" sx={{ mt: 2 }} />

         {/* 판매 상태 선택 필드 */}
         <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="item-sell-status-label">판매 상태</InputLabel>
            <Select labelId="item-sell-status-label" value={itemSellStatus} onChange={(e) => setItemSellStatus(e.target.value)} label="판매 상태">
               <MenuItem value="SELL">판매중</MenuItem>
               <MenuItem value="SOLD_OUT">판매완료</MenuItem>
            </Select>
         </FormControl>

         {/* 상품설명 입력 필드 */}
         <TextField label="상품설명" variant="outlined" fullWidth multiline rows={4} value={itemDetail} onChange={(e) => setItemDetail(e.target.value)} sx={{ mt: 2 }} />

         {/* 등록 / 수정 버튼 */}
         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {submitButtonLabel}
         </Button>
      </Box>
   )
}

export default ItemForm
