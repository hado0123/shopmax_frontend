import { Container, Typography, Pagination, Stack } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Home() {
   return (
      <Container
         maxWidth="lg"
         sx={{
            marginTop: 10, // 1 = 8px, 혹은 mt: 10
            marginBottom: 13,
         }}
      >
         <p>홈</p>
      </Container>
   )
}

export default Home
