import { useState, useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { Sidebar, Videos } from './'


import { fetchFromAPI } from '../utils/fetchFromAPI';

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');

  const [videos, setVideos] = useState([]);
  console.log (videos);

useEffect(() => {
  fetchFromAPI(`search?part=snippet&q=${selectedCategory}&type=video`)
    .then((data) => {
      const videoIds = data.items.map((item) => item.id.videoId).join(',');

      fetchFromAPI(`videos?part=statistics&id=${videoIds}`)
        .then((statisticsData) => {
          const videosWithStats = data.items.map((video, index) => ({
            ...video,
            statistics: statisticsData.items[index].statistics,
          }));

          setVideos(videosWithStats);
        });
    });
}, [selectedCategory]);
  

  return (
    <Stack sx={{ flexDirection: { sx: 'column', md: 'row'}}}>
      <Box sx={{ height: { sx: 'auto', md: '92vh'}, borderRight: '1px solid #D3D3D3', 
          px: {sx: 0, md: 2}}}>
          <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
          <Typography className="copyright" variant="body2" 
              sx={{ mt: 1.5, color: 'black'}}>
              Copyright 2023 Videos
          </Typography>
      </Box>
    
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
            { selectedCategory } <span>videos</span>
          </Typography>

          <Videos videos={ videos }/>
      </Box>
  </Stack>
  )
}

export default Feed;