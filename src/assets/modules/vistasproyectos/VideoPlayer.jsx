import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

const VideoPlayer = ({ src, title }) => {
  return (
    <Card sx={{ width: '100%', maxWidth: '900px', p: 1,  backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
     border: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Box sx={{ position: 'relative', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
        <iframe
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '4px' }}
          src={src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Box>
    </Card>
  );
};

export default VideoPlayer;
