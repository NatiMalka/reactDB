import { Skeleton, Box, Grid, Paper } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

function LoadingSkeleton() {
  const { darkMode } = useTheme();
  
  const paperStyle = {
    p: 3,
    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
    backdropFilter: 'blur(10px)',
  };

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Skeleton variant="text" width={300} height={60} />
      
      <Grid container spacing={3}>
        {/* Summary Cards Skeletons */}
        {[1, 2, 3, 4].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item}>
            <Paper sx={paperStyle}>
              <Skeleton variant="rectangular" height={120} />
            </Paper>
          </Grid>
        ))}
        
        {/* Progress Bar Skeleton */}
        <Grid item xs={12}>
          <Paper sx={paperStyle}>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="rectangular" height={24} />
          </Paper>
        </Grid>
        
        {/* Table Skeleton */}
        <Grid item xs={12}>
          <Paper sx={paperStyle}>
            <Skeleton variant="rectangular" height={400} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoadingSkeleton; 