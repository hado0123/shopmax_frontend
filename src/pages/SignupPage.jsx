import Signup from '../components/auth/Signup'
import { Container } from '@mui/material'

function SignupPage() {
   return (
      <Container maxWidth="md" sx={{ marginTop: 3 }}>
         <Signup />
      </Container>
   )
}

export default SignupPage
