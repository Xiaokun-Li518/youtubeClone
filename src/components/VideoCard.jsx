import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import {CheckCircle} from '@mui/icons-material';

import { demoThumbnailUrl, demoVideoUrl, demoChannelUrl, demoVideoTitle, demoChannelTitle } from '../utils/constants';


const VideoCard = ({video: {id: {videoId}, snippet}}) => {
	return (
		<Card sx={{width: {xs:'320px', sm:'320px', md: '358px' }, boxShadow: 'none' }}>
			<Link to={videoId? `/video/${videoId}`: demoVideoUrl}>
				<CardMedia image = {snippet.thumbnails?.high?.url} 
					alt={snippet?.title} 
					sx={{width:'358px', height:180}}/>
			</Link>
			<CardContent  sx={{backgroundColor: 'whitesmoke', height: '100px'}}>
				<Link to={videoId? `/video/${videoId}`: demoVideoUrl} >
					<Typography variant="subtitle1" fontWeight="bold" sx={{color:'black'}}>{snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60)}</Typography>
					<Typography variant="subtitle2" fontWeight="bold" sx={{color:'black'}}>
						{snippet?.publishedAt}
					</Typography>
				</Link>
				<Link to={snippet?.channelId? `/channel/${snippet?.channelId}`: demoChannelUrl}  sx={{alignItems:'center', color:'gray'}}>
					<Typography variant="subtitle2" sx={{alignItems:'center', color:'gray'}}> {snippet?.channelTitle || demoChannelTitle}
						<CheckCircle sx={ { fontSize:12, color:'gray', ml: '5px'} } />
					</Typography>
				</Link>
			</CardContent>
		</Card>

	)
}

export default VideoCard;