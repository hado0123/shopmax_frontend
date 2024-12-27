import { TextField, Button, Container, Typography } from '@mui/material'

import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDomainThunk, getTokenThunk, testTokenThunk } from '../../features/domainSlice'

function Domain() {
   const [host, setHost] = useState('')
   const [isDomainComplete, setIsDomainComplete] = useState(false) // 회원가입 완료 상태
   const dispatch = useDispatch()
   const { token, error } = useSelector((state) => state.domain)

   const handleDomain = useCallback(() => {
      if (!host.trim()) {
         alert('host를 입력해주세요!')
         return
      }

      dispatch(setDomainThunk({ host }))
         .unwrap()
         .then(() => {
            setIsDomainComplete(true)
         })
         .catch((error) => {
            console.error(`도메인 등록 에러:${error}`)
         })
   }, [dispatch, host])

   const handleToken = useCallback(() => {
      dispatch(getTokenThunk())
   }, [dispatch])

   const handleTestToken = useCallback(() => {
      dispatch(testTokenThunk())
   }, [dispatch])

   //회원가입이 완료 되었을때 보일 컴포넌트
   if (isDomainComplete) {
      return (
         <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom align="center">
               도메인이 등록되었습니다!
            </Typography>
            <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={handleToken}>
               토큰 발급받기
            </Button>
         </Container>
      )
   }

   return (
      <Container maxWidth="sm">
         <Typography variant="h4" gutterBottom>
            도메인 등록
         </Typography>

         {error && (
            <Typography color="error" align="center">
               {error}
            </Typography>
         )}

         <TextField label="호스트주소" variant="outlined" fullWidth margin="normal" value={host} onChange={(e) => setHost(e.target.value)} placeholder="http://localhost:3000" />

         <Button variant="contained" color="primary" onClick={handleDomain} fullWidth style={{ marginTop: '20px' }}>
            도메인 등록
         </Button>
         <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={handleToken}>
            토큰 발급받기
         </Button>
         <Typography variant="body1" gutterBottom sx={{ width: 300 }}>
            {token}
         </Typography>
         <Button variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }} onClick={handleTestToken}>
            토큰 테스트
         </Button>
      </Container>
   )
}

export default Domain
