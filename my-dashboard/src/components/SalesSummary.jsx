import { Grid, Paper, Typography, Box, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import OdometerNumber from './OdometerNumber';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

function SalesSummary({ totalSales, totalCancellations, clientCount, cancelledClientsCount }) {
  const { darkMode } = useCustomTheme();
  const theme = useTheme();

  const numberStyle = {
    color: darkMode ? '#ffffff' : '#000000',
    fontSize: '2.125rem',
    marginRight: '2px'
  };

  const iconBoxStyle = (isError = false) => ({
    p: 1.5, 
    borderRadius: 2, 
    backgroundColor: darkMode 
      ? isError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(33, 150, 243, 0.2)'
      : isError ? '#fee2e2' : '#f0f9ff',
    mr: 2,
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'rotate(0deg)',
    '&:hover': {
      filter: 'brightness(1.1)'
    }
  });

  const paperStyle = {
    p: 3, 
    display: 'flex', 
    alignItems: 'center',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(120deg, transparent, rgba(255,255,255,0.1), transparent)',
      transform: 'translateX(-100%)',
      transition: 'transform 0.5s'
    },
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: darkMode 
        ? '0 10px 20px rgba(0, 0, 0, 0.4), 0 6px 6px rgba(0, 0, 0, 0.3)'
        : '0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.05)',
      '& .icon-box': {
        transform: 'scale(1.1) rotate(10deg)',
      },
      '&::after': {
        transform: 'translateX(100%)'
      }
    }
  };

  return (
    <Grid container spacing={2} sx={{ width: '100%', margin: 0 }}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ ...paperStyle, height: '100%' }}>
          <Box sx={iconBoxStyle()} className="icon-box">
            <TrendingUpIcon sx={{ color: '#2196f3', fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
              סך המכירות
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', direction: 'ltr' }}>
              <OdometerNumber value={parseFloat(totalSales.toFixed(2))} style={numberStyle} />
              <span style={numberStyle}>₪</span>
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ ...paperStyle, height: '100%' }}>
          <Box sx={iconBoxStyle()} className="icon-box">
            <PeopleIcon sx={{ color: '#2196f3', fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
              סך הלקוחות
            </Typography>
            <OdometerNumber value={clientCount} style={numberStyle} />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ ...paperStyle, height: '100%' }}>
          <Box sx={iconBoxStyle(true)} className="icon-box">
            <CancelIcon sx={{ color: '#ef4444', fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
              לקוחות שביטלו
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', direction: 'ltr' }}>
              <OdometerNumber value={cancelledClientsCount} style={numberStyle} />
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Paper sx={{ ...paperStyle, height: '100%' }}>
          <Box sx={iconBoxStyle(true)} className="icon-box">
            <CancelIcon sx={{ color: '#ef4444', fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
              סך ביטולים
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', direction: 'ltr' }}>
              <OdometerNumber value={parseFloat(totalCancellations.toFixed(2))} style={numberStyle} />
              <span style={numberStyle}>₪</span>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default SalesSummary;