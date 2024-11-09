import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

function Reports({ clients, monthlyHistory }) {
  const { darkMode } = useCustomTheme();
  const theme = useTheme();

  const paperStyle = {
    p: 3,
    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
    transition: 'background-color 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        rtl: true,
        labels: {
          font: { family: 'Rubik' },
          color: theme.palette.text.primary,
          padding: 20
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: theme.palette.text.secondary,
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        ticks: {
          color: theme.palette.text.secondary,
        },
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        }
      }
    }
  };

  // Monthly Revenue Trend
  const revenueData = {
    labels: monthlyHistory.slice(0, 6).reverse().map(m => m.month),
    datasets: [
      {
        label: 'הכנסות',
        data: monthlyHistory.slice(0, 6).reverse().map(m => m.totalSales),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'ביטולים',
        data: monthlyHistory.slice(0, 6).reverse().map(m => m.totalCancellations),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  // Client Status Distribution
  const statusData = {
    labels: ['פעילים', 'מבוטלים'],
    datasets: [{
      data: [
        clients.filter(c => c.status === 'active').length,
        clients.filter(c => c.status === 'cancelled').length,
      ],
      backgroundColor: ['#22c55e', '#ef4444'],
    }],
  };

  // Subscription Plan Distribution
  const planData = {
    labels: ['בסיסי', 'פרימיום', 'עסקי'],
    datasets: [{
      label: 'מכירות לפי תכנית',
      data: [
        clients.filter(c => c.subscriptionPlan === 'basic').length,
        clients.filter(c => c.subscriptionPlan === 'premium').length,
        clients.filter(c => c.subscriptionPlan === 'enterprise').length,
      ],
      backgroundColor: ['#3b82f6', '#7c3aed', '#ef4444'],
    }],
  };

  return (
    <Box sx={{ padding: '24px 40px' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        דוחות וניתוח נתונים
      </Typography>
      
      <Grid container spacing={3} sx={{ height: '100%' }}>
        <Grid item xs={12}>
          <Paper sx={paperStyle}>
            <Typography variant="h6" gutterBottom>
              מגמת הכנסות חודשית
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 300 }}>
              <Line data={revenueData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={paperStyle}>
            <Typography variant="h6" gutterBottom>
              התפלגות סטטוס לקוחות
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 300 }}>
              <Pie data={statusData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={paperStyle}>
            <Typography variant="h6" gutterBottom>
              התפלגות תכניות מנוי
            </Typography>
            <Box sx={{ flexGrow: 1, minHeight: 300 }}>
              <Bar data={planData} options={chartOptions} />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reports; 