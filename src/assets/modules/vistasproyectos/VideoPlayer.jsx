import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const VideoPlayer = ({ src, title }) => {
  return (
    <Card 
      sx={{ 
        width: '100%', 
        maxWidth: '900px', 
        p: 2, 
        backgroundColor: 'rgba(15, 15, 15, 0.7)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          borderColor: 'rgba(234, 179, 8, 0.3)', // Destello amarillo sutil al pasar el cursor
          boxShadow: '0 25px 50px rgba(234, 179, 8, 0.1)',
        }
      }}
    >
      {/* Cabecera estilizada con título y punto luminoso */}
      {title && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, px: 0.5 }}>
          <Box 
            sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              backgroundColor: '#eab308', // Amarillo AMCO
              boxShadow: '0 0 10px #eab308'
            }} 
          />
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontWeight: 600,
              letterSpacing: '0.5px',
              fontSize: '0.9rem'
            }}
          >
            {title}
          </Typography>
        </Box>
      )}

      {/* Contenedor del video con esquinas redondeadas y borde interno */}
      <Box 
        sx={{ 
          position: 'relative', 
          paddingTop: '56.25%', /* Relación de aspecto 16:9 */
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundColor: '#000'
        }}
      >
        <iframe
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            border: 'none' 
          }}
          src={src}
          title={title || "Video del proyecto"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </Box>
    </Card>
  );
};

export default VideoPlayer;