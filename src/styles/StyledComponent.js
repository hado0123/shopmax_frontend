const StyledContainer = styled(Container)(({ theme, bgColor }) => ({
   backgroundColor: bgColor || '#fff', // 동적 배경색
   padding: theme.spacing(2),
   borderRadius: '8px',
   margin: '0 auto',
   width: '100%',
   [theme.breakpoints.up('sm')]: {
      maxWidth: '600px',
   },
   [theme.breakpoints.up('md')]: {
      maxWidth: '960px',
   },
   [theme.breakpoints.up('lg')]: {
      maxWidth: '1280px',
   },
}))
