import React from 'react'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material';
import { logo } from '../utils/constants'
import SearchBar from "./SearchBar"

const Navbar = () => ( 
    <Stack 
    direction="row" 
    alignItems="center" 
    p={2} 
    sx={{ position: 'sticky', background: 'white', top:0, justifyContent: 'space-between'}}>

    <Link to="/" style={{ display:'flex', alignItems: 'center'}}>
        <img src="/Logo.png" alt="logo" style={{height:75}}/>
    </Link>
    <SearchBar />
    </Stack>
)
  


export default Navbar