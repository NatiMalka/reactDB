import { Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import { fadeIn } from '../utils/animations';

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(155, 89, 182, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(155, 89, 182, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(155, 89, 182, 0);
  }
`;

function Loader() {
  return (
    <Box sx={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(4px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: `${fadeIn} 0.3s ease-out`
    }}>
      <div className="container" style={{
        animation: `${pulseAnimation} 2s infinite`
      }}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </Box>
  );
}

export default Loader; 