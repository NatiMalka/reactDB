import { Box } from '@mui/material';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      width: '100%',
      height: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Sidebar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          padding: {
            xs: 2,
            sm: 3,
            md: 4
          },
          maxWidth: 'calc(100vw - 240px)'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout; 