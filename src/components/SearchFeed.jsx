import { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { Videos } from './'


import { useParams } from 'react-router-dom';

import { fetchFromAPI } from '../utils/fetchFromAPI';

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  console.log(videos);
  const {searchTerm} = useParams();


  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
    }, [searchTerm]);

  return (
    <Box sx={{
      p:2,
      overflowY:'auto',
      height:'90vh',
      flex: 2
    }}>
      <Typography variant='h4'
      fontWeight='bold' mb={2} sx= {{
        color:'black'
      }}>
        <span>{ searchTerm } videos</span>
      </Typography>

      <Videos videos={ videos }/>

    </Box> 
  )
}

export default SearchFeed;