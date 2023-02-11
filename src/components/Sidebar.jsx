
import React from 'react'
import { Link } from 'react-router-dom'
import { Stack } from '@mui/material';
import { logo } from '../utils/constants'
import SearchBar from "./SearchBar"
import { categories } from '../utils/constants'


const Sidebar = ({selectedCategory, setSelectedCategory}) => ( 
    <Stack 
        direction="row"
        sx = {{
            overflowY: "auto",
            height: {sx: 'auto', md: '95%'},
            flexDirection: {md: 'column'},
        }}>
        {categories.map((category) => (
            <button 
                className='category-btn'
                onClick={() => setSelectedCategory(category.name)} 
                style={{
                    background: category.name === 
                    selectedCategory && '#D3D3D3',
                    color: 'black'
                }}
                key={category.name}>
                <span style={{color: category.name === selectedCategory ? 'white' : 'black', marginRight: '15px'}}>{category.icon}</span>
                <span style={{ opacity: category.name===selectedCategory ? '1' : '0.8'}}>{category.name}</span>
            </button>
        ))}

    </Stack>
)
  


export default Sidebar