import { useState } from 'react'
import { TextField, IconButton, Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

function SearchBar({ onSearch }) {
   const [searchTerm, setSearchTerm] = useState('')

   const handleInputChange = (event) => {
      setSearchTerm(event.target.value)
   }

   const handleSearch = (event) => {
      event.preventDefault() // 폼 제출 기본 동작 방지
      if (onSearch && searchTerm.trim() !== '') {
         onSearch(searchTerm.trim())
      }
   }

   return (
      <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center', width: '80%', margin: '0 auto' }}>
         <TextField variant="outlined" fullWidth placeholder="상품을 검색하세요." value={searchTerm} onChange={handleInputChange} sx={{ marginRight: 1 }} />
         <IconButton color="primary" type="submit">
            <SearchIcon />
         </IconButton>
      </Box>
   )
}

export default SearchBar
