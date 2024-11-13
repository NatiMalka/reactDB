import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import { useState } from 'react';
import SalesTable from './SalesTable';
import AddClientForm from './AddClientForm';
import SalesSummary from './SalesSummary';
import SalesProgressBar from './SalesProgressBar';
import BonusCelebration from './BonusCelebration';
import MonthlyHistory from './MonthlyHistory';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

function Dashboard({ 
  clients, 
  totalSales, 
  totalCancellations, 
  onAddClient, 
  onDeleteClient, 
  onEditClient, 
  cancelledClientsCount, 
  monthlyHistory 
}) {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationBonus, setCelebrationBonus] = useState(0);
  const [celebrationTarget, setCelebrationTarget] = useState(0);
  const { darkMode } = useCustomTheme();
  const theme = useTheme();

  const handleBonusReached = (bonus, target) => {
    setCelebrationBonus(bonus);
    setCelebrationTarget(target);
    setShowCelebration(true);
  };

  const paperStyle = {
    p: { xs: 2, sm: 3 },
    backgroundColor: darkMode 
      ? 'rgba(255, 255, 255, 0.03)' 
      : '#ffffff',
    backdropFilter: 'blur(10px)',
    transition: 'background-color 0.3s ease',
    borderRadius: 2,
    boxShadow: darkMode 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)' 
      : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  };

  return (
    <Box sx={{ 
      padding: { 
        xs: '16px',
        sm: '20px',
        md: '24px',
        lg: '32px'
      },
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      transition: 'background-color 0.3s ease',
      width: '100%',
      overflowX: 'hidden',
      maxWidth: '100%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: { xs: 2, sm: 2.5, md: 3 }
    }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          mb: { xs: 2, sm: 4 },
          fontSize: { xs: '1.5rem', sm: '2rem' },
          color: theme.palette.text.primary,
          transition: 'color 0.3s ease'
        }}
      >
        לוח בקרת מכירות
      </Typography>
      
      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ width: '100%', margin: 0 }}>
        <Grid item xs={12}>
          <SalesSummary 
            totalSales={totalSales} 
            totalCancellations={totalCancellations} 
            clientCount={clients.filter(client => client.status === 'active').length}
            cancelledClientsCount={cancelledClientsCount}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Paper sx={{ ...paperStyle, width: '100%' }}>
            <SalesProgressBar 
              totalSales={totalSales} 
              onBonusReached={handleBonusReached}
            />
          </Paper>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Paper sx={{ ...paperStyle, height: '100%' }}>
            <AddClientForm onAddClient={onAddClient} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} lg={8}>
          <Paper sx={{ ...paperStyle, height: '100%' }}>
            <SalesTable 
              clients={clients} 
              onDeleteClient={onDeleteClient} 
              onEditClient={onEditClient}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={paperStyle}>
            <MonthlyHistory history={monthlyHistory} />
          </Paper>
        </Grid>
      </Grid>

      <BonusCelebration
        open={showCelebration}
        onClose={() => setShowCelebration(false)}
        bonus={celebrationBonus}
        target={celebrationTarget}
      />
    </Box>
  );
}

export default Dashboard;