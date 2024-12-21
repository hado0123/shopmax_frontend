import Login from '../components/auth/Login'
import { Container } from '@mui/material'

function LoginPage() {
   return (
      <Container maxWidth="md" sx={{ marginTop: 3 }}>
         <Login />
      </Container>
   )
}

export default LoginPage
