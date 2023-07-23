import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { Navbar, Feed, VideoDetail, ChannelDetail, SearchFeed } from './components'
import { Analytics } from '@vercel/analytics/react';

const App = () => {

    return(
    <BrowserRouter>
        <Box sx={{ background: 'white' }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Feed />}/>
                <Route path="/video/:id" element={<VideoDetail />}/>
                <Route path="/channel/:id" element={<ChannelDetail />}/>
                <Route path="/search/:searchTerm" element={<SearchFeed />}/>
            </Routes>
        </Box>
        <Analytics />
    </BrowserRouter>
)};



export default App;