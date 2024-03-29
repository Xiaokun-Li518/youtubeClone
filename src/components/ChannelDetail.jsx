import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { Videos, ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = ({catagory}) => {
    const [channelDetail, setChannelDetail] = useState(null);
    const [videos, setVideos] = useState([])


    const {id} = useParams();

    useEffect(() => {
        fetchFromAPI(`channels?part=snippet,statistics&id=${id}`)
          .then((data) => setChannelDetail(data.items[0]));
      
        fetchFromAPI(`search?channelId=${id}&part=snippet&order=date&type=video`)
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
      

    return (
        <Box minHeight = "95vh">
            <Box>
                <div style={{background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)', 
                            zIndex:10,
                            height: '300px'}}/>
                <ChannelCard channelDetail = {channelDetail} marginTop='-93px'/>
            </Box>

            
            {/* <Box display="flex" p="2"> */}
                <Videos videos={videos}/>
            {/* </Box> */}


        </Box>
    
    )
}

export default ChannelDetail