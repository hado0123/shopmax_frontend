import { Container, Typography, Pagination, Stack } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Home() {
   return (
      <Container
         maxWidth="lg"
         sx={{
            marginTop: 3, //24px, 혹은 mt: 3
         }}
      >
         <p>홈</p>
      </Container>
   )
}

export default Home
