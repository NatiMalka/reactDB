import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

function ProgressBar({ value }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(value);
    }, 50);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Box
      className="loading-bar"
      sx={{
        width: '100%',
        height: '24px',
        backgroundColor: '#eaeaea',
        border: '3px solid #fff',
        borderRadius: '12px',
        boxShadow: '0 0 15px rgba(33,150,243,.25)',
        overflow: 'hidden',
        position: 'relative',
        '&:hover .progress': {
          filter: 'brightness(1.1)',
          boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3)'
        }
      }}
    >
      <Box
        className="progress"
        sx={{
          width: `${width}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #2196f3, #03a9f4)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '12px',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: 'translateX(-100%)',
            animation: 'shimmer 2s infinite linear'
          }
        }}
      />
    </Box>
  );
}

export default ProgressBar;
