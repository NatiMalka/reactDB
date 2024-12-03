import { Box, Typography, Grid, Paper, useTheme as useMuiTheme,  } from '@mui/material';
import { useState, useEffect } from 'react';
import SalesTable from './SalesTable';
import AddClientForm from './AddClientForm';
import SalesSummary from './SalesSummary';
import SalesProgressBar from './SalesProgressBar';
import BonusCelebration from './BonusCelebration';
import MonthlyHistory from './MonthlyHistory';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';
import Toast from './Toast';
// import LoadingSkeleton from './LoadingSkeleton';
import UpcomingWebinar from './UpcomingWebinar';
import PropTypes from 'prop-types';
import Loader from './Loader';
import { fadeIn, scaleIn } from '../utils/animations';

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
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });
  const [actionInProgress, setActionInProgress] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationBonus, setCelebrationBonus] = useState(0);
  const [celebrationTarget, setCelebrationTarget] = useState(0);
  const { darkMode } = useCustomTheme();
  const theme = useMuiTheme();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAddClient = async (clientData) => {
    setActionInProgress(true);
    try {
      await onAddClient(clientData);
      setToast({
        open: true,
        message: 'לקוח נוסף בהצלחה',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error adding client:', error);
      setToast({
        open: true,
        message: 'שגיאה בהוספת לקוח',
        severity: 'error'
      });
    } finally {
      setActionInProgress(false);
    }
  };

  const handleDeleteClient = async (clientId) => {
    setActionInProgress(true);
    try {
      await onDeleteClient(clientId);
      setToast({
        open: true,
        message: 'לקוח נמחק בהצלחה',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting client:', error);
      setToast({
        open: true,
        message: 'שגיאה במחיקת לקוח',
        severity: 'error'
      });
    } finally {
      setActionInProgress(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const handleBonusReached = (bonus, target) => {
    try {
      setCelebrationBonus(bonus);
      setCelebrationTarget(target);
      setShowCelebration(true);
      setToast({
        open: true,
        message: `הגעת ליעד ${target.toLocaleString()}₪!`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error handling bonus:', error);
      setToast({
        open: true,
        message: 'שגיאה בהצגת חגיגת הבונוס',
        severity: 'error'
      });
    }
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

  const animatedPaperStyle = {
    ...paperStyle,
    animation: `${scaleIn} 0.3s ease-out`,
    '&:hover': {
      transform: 'translateY(-2px)',
      transition: 'transform 0.3s ease-in-out',
      boxShadow: darkMode 
        ? '0 8px 16px -1px rgba(0, 0, 0, 0.3)' 
        : '0 8px 16px -1px rgba(0, 0, 0, 0.1)',
    }
  };

  return (
    <>
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
        gap: { xs: 2, sm: 2.5, md: 3 },
        animation: `${fadeIn} 0.5s ease-out`,
      }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            mb: { xs: 2, sm: 4 },
            fontSize: { xs: '1.5rem', sm: '2rem' },
            color: theme.palette.text.primary,
            transition: 'color 0.3s ease',
            animation: `${fadeIn} 0.5s ease-out`,
            animationDelay: '0.1s',
            opacity: 0,
            animationFillMode: 'forwards',
          }}
        >
          לוח בקרת מכירות
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} sx={{ width: '100%', margin: 0 }}>
          <Grid item xs={12}>
            <Paper sx={animatedPaperStyle}>
              <SalesSummary 
                totalSales={totalSales} 
                totalCancellations={totalCancellations} 
                clientCount={clients.filter(client => client.status === 'active').length}
                cancelledClientsCount={cancelledClientsCount}
              />
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={animatedPaperStyle}>
              <SalesProgressBar 
                totalSales={totalSales} 
                onBonusReached={handleBonusReached}
              />
            </Paper>
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <Paper sx={animatedPaperStyle}>
              <AddClientForm onAddClient={handleAddClient} />
            </Paper>
          </Grid>
          
          <Grid item xs={12} lg={8}>
            <Paper sx={animatedPaperStyle}>
              <SalesTable 
                clients={clients} 
                onDeleteClient={handleDeleteClient} 
                onEditClient={onEditClient}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <UpcomingWebinar />
          </Grid>

          <Grid item xs={12}>
            <Paper sx={animatedPaperStyle}>
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

      {actionInProgress && <Loader />}

      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast({ ...toast, open: false })}
      />
    </>
  );
}

Dashboard.propTypes = {
  clients: PropTypes.arrayOf(PropTypes.shape({
    status: PropTypes.string,
  })).isRequired,
  totalSales: PropTypes.number.isRequired,
  totalCancellations: PropTypes.number.isRequired,
  onAddClient: PropTypes.func.isRequired,
  onDeleteClient: PropTypes.func.isRequired,
  onEditClient: PropTypes.func.isRequired,
  cancelledClientsCount: PropTypes.number.isRequired,
  monthlyHistory: PropTypes.array.isRequired
};

export default Dashboard;