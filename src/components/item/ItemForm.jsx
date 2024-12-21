import React, { useState, useCallback, useMemo } from 'react'
import { TextField, Button, Box } from '@mui/material'

function ItemForm({ onSubmit, initialValues = {} }) {
   const [imgUrls, setImgUrls] = useState([]) // 이미지 경로 배열
   const [imgFiles, setImgFiles] = useState([]) // 이미지 파일 객체 배열
   const [itemNm, setItemNm] = useState(initialValues.itemNm || '') // 상품명
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
         formData.append('itemDetail', itemDetail)

         // 여러 이미지 파일 추가
         imgFiles.forEach((file, index) => {
            const encodedFile = new File([file], encodeURIComponent(file.name), { type: file.type })
            formData.append(`img${index + 1}`, encodedFile)
         })

         onSubmit(formData) // formData 객체 전송
      },
      [itemNm, itemDetail, imgFiles, onSubmit]
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
         <TextField label="해시태그 (# 구분)" variant="outlined" fullWidth value={itemNm} onChange={(e) => setItemNm(e.target.value)} placeholder="상품명" sx={{ mt: 2 }} />

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

// import React, { useState, useCallback, useMemo } from 'react'
// import { TextField, Button, Box } from '@mui/material'

// // 등록, 수정 폼 컴포넌트
// function ItemForm({ onSubmit, initialValues = {} }) {
//    const [imgUrl, setImgUrl] = useState(initialValues.img ? process.env.REACT_APP_API_URL + initialValues.img : '') // 이미지 경로(파일명 포함)
//    const [imgFile, setImgFile] = useState(null) // 이미지 파일 객체
//    const [itemNm, setItemNm] = useState(initialValues.itemNm || '') //상품명
//    const [itemDetail, setItemDetail] = useState(initialValues.setItemDetail || '') //상품 설명

//    //이미지 파일 미리보기
//    const handleImageChange = useCallback((e) => {
//       /*
//        e.target.files는 업로드한 파일 객체를 배열형태로 가져온다
//        File1, File2..파일 객체는 업로드한 파일의 정보들이 들어있다
//        e.target.files = [File1, File2, File3]

//        */

//       const file = e.target.files && e.target.files[0]
//       if (!file) return // 파일이 없을 경우 함수 종료

//       setImgFile(file) //업로드한 파일 객체를 state에 저장

//       //파일을 비동기적으로 읽을 수 있도록 해주는 객체 -> 이미지 미리보기 or 텍스트 파일 읽기 등에 주로 사용
//       const reader = new FileReader()

//       //dog.jpg => data.image/jpg;base64, idfsfdfsfsfsdfsffhjghj..
//       reader.readAsDataURL(file) //업로드한 파일을 Base64 URL로 변환(이미지 미리보기에 주로 사용)

//       //onload(): 파일을 성공적으로 읽은 후에 실행되는 함수
//       reader.onload = (event) => {
//          setImgUrl(event.target.result) // data.image/jpg;base64, idfsfdfsfsfsdfsffhjghj.. (Base64 URL로 변환된 형태의 이미지 URL이 들어있음)
//       }
//    }, [])

//    //작성한 내용 전송
//    const handleSubmit = useCallback(
//       (e) => {
//          e.preventDefault()

//          if (!itemNm.trim()) {
//             alert('상품명을 입력하세요.')
//             return
//          }

//          if (!itemDetail.trim()) {
//             alert('상품설명을 입력하세요.')
//             return
//          }

//          // 수정시 이미지 파일을 바꾸지 않을 경우를 위해 !initialValues.id 조건 추가
//          if (!imgFile && !initialValues.id) {
//             alert('이미지 파일을 추가하세요.')
//             return
//          }

//          const formData = new FormData() //폼 데이터를 쉽게 생성하고 전송할 수 있도록 하는 객체
//          formData.append('itemNm', itemNm)
//          formData.append('itemDetail', itemDetail)

//          // 내용만 수정할때 에러 방지
//          if (imgFile) {
//             // 파일명 인코딩(한글 파일명 깨짐 방지)
//             const encodedFile = new File([imgFile], encodeURIComponent(imgFile.name), { type: imgFile.type })

//             formData.append('img', encodedFile) //이미지 파일 추가
//          }

//          //등록할때는 PostCreatePage.jsx 의 handleSubmit() 함수를 실행시킴
//          //수정할때는 PostEditPage.jsx 의 handleSubmit() 함수를 실행시킴
//          onSubmit(formData) //formData 객체를 전송
//       },
//       [itemNm, itemDetail, imgFile, onSubmit]
//    )

//    // state 변경시 등록/수정 버튼 재연산 방지
//    const submitButtonLabel = useMemo(() => (initialValues.id ? '수정하기' : '등록하기'), [initialValues.id])

//    return (
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} encType="multipart/form-data">
//          {/* 이미지 업로드 필드 */}
//          <Button variant="contained" component="label">
//             이미지 업로드
//             <input type="file" name="img" accept="image/*" hidden onChange={handleImageChange} />
//          </Button>

//          {imgUrl && (
//             <Box mt={2}>
//                <img src={imgUrl} alt="업로드 이미지 미리보기" style={{ width: '400px' }} />
//             </Box>
//          )}

//          {/* 상품명 입력 필드 */}
//          <TextField label="해시태그 (# 구분)" variant="outlined" fullWidth value={itemNm} onChange={(e) => setItemNm(e.target.value)} placeholder="상품명" sx={{ mt: 2 }} />

//          {/* 상품설명 입력 필드 */}
//          <TextField label="상품설명" variant="outlined" fullWidth multiline rows={4} value={itemDetail} onChange={(e) => setItemDetail(e.target.value)} sx={{ mt: 2 }} />

//          {/* 등록 / 수정 버튼 */}
//          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//             {submitButtonLabel}
//          </Button>
//       </Box>
//    )
// }

// export default ItemForm
