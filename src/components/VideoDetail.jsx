import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { Typography, Box, Stack } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { Videos } from './';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { LoadingPage } from './Loading';

const VideoDetail = () => {

  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]));
  
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`)
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
  }, [id]);
  

  if (!videoDetail?.snippet) return <LoadingPage />

  if (!videos) return <LoadingPage />

  const { snippet: { title, channelId, channelTitle, publishedAt}, statistics: {
    viewCount, likeCount
  } } = videoDetail;


  
  const time = new Date(publishedAt);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month = monthNames[time.getMonth()]; // "October"
  const day = time.getDay();




  return (
    <Box minHeight = "95vh">
      <Stack direction = {{sx:'column', md:'row'}}>

        <Box flex = {1}>
          <Box sx={{ width:'100%', position:'sticky', top:'86px'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className = "react-player" controls/>

            <Stack direction="row" justifyContent="space-between" alignItems = "center">
              <Typography variant="h5" fontWeight = "bold" p={2}>
                {title} 
              </Typography>
              <Typography variant="subtitle1" p={2}>
                {month} {day}, {time.getFullYear()}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" sx={{}} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography color = "black" variant={{sm:'subtitle1', md:'h4'}}>
                  {channelTitle}
                  <CheckCircle sx={{ fontSize:'12px', color:'gray', ml:'5px'}}/>
                </Typography>
              </Link>
              <Stack direction = "row" gap = "20px" alignItems = "center">
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>

                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box px={2} py={{md:1, xs:5}} justifyContent="center" alignItems="center">
          <Videos videos={videos} direction="column"/>
        </Box>

      </Stack>

    </Box>
  )
}

export default VideoDetail