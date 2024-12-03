import { Box } from '@mui/material';

function Loader() {
  return (
    <Box sx={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="container">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </Box>
  );
}

export default Loader; 