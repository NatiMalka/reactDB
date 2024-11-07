import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '../contexts/ThemeContext';

function Sidebar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Drawer
      variant="permanent"
  sx={{
    width: 240,
    flexShrink: 0,
    height: '100vh',
    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
      background: darkMode ? 'rgba(37, 99, 235, 0.1)' : 'rgba(25, 118, 210, 0.95)',
      backdropFilter: 'blur(10px)',
      borderLeft: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(21, 101, 192, 0.5)',
      borderRight: 'none',
      height: '100vh',
      position: 'static',
      right: 0,
      transition: 'background-color 0.3s ease, border-color 0.3s ease',
    },
  }}
>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
          לוח בקרת מכירות
        </Typography>
        <IconButton onClick={toggleDarkMode} color="inherit" sx={{ color: 'white' }}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <List>
        <ListItem component={Link} to="/" sx={{
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}>
          <ListItemIcon>
            <DashboardIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="לוח בקרה" />
        </ListItem>
        
        <ListItem component={Link} to="/clients" sx={{
          color: 'white', 
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}>
          <ListItemIcon>
            <PeopleIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="לקוחות" />
        </ListItem>

        <ListItem component={Link} to="/reports" sx={{
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}>
          <ListItemIcon>
            <ReceiptIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="דוחות" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;