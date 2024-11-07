import { Box } from '@mui/material';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout; 