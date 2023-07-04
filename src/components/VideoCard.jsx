import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia } from '@mui/material';
import {CheckCircle} from '@mui/icons-material';

import {demoVideoUrl, demoChannelUrl, demoVideoTitle, demoChannelTitle } from '../utils/constants';

import moment from 'moment';

const formatViewCount = (num) => {
	if (num >= 1000000000) {
	  return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
	}
	if (num >= 1000000) {
	  return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
	}
	if (num >= 1000) {
	  return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
	}
	return num;
  }



const VideoCard = ({video: {id: {videoId}, snippet, statistics}}) => {
	const now = moment(); // Current time
	const publishedAt = moment(snippet?.publishedAt); // Published time
	const diff = now.diff(publishedAt); // Difference in milliseconds
  
	// Convert the difference into human readable form
	const duration = moment.duration(diff);
	const formatted = duration.humanize(); // e.g. "a day", "an hour"

	// const [videoDetail, setVideoDetail] = useState(null);

	// useEffect (() => {
	// 	fetchFromAPI(`videos?part=snippet, statistics&id=${videoId}`).then((data) => setVideoDetail(data.items[0]));
	//   },[videoId]);
	// console.log (videoDetail);
	const {viewCount} = statistics;
	const formattedViewCount = formatViewCount(viewCount);



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
				</Link>
				<Link to={snippet?.channelId? `/channel/${snippet?.channelId}`: demoChannelUrl}  sx={{alignItems:'center', color:'gray'}}>
					<Typography variant="subtitle2" sx={{alignItems:'center', color:'gray'}}> {snippet?.channelTitle || demoChannelTitle}
						<CheckCircle sx={ { fontSize:12, color:'gray', ml: '5px'} } />
					</Typography>
					<Typography variant="subtitle2" sx={{color:'gray'}}>
						{`${formattedViewCount} views \u00B7 ${formatted} ago`}
					</Typography>
				</Link>
			</CardContent>
		</Card>

	)
}

export default VideoCard;