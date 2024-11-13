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
      },
      tooltip: {
        rtl: true,
        titleFont: { family: 'Rubik', size: 14 },
        bodyFont: { family: 'Rubik', size: 13 },
        backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: darkMode ? '#fff' : '#000',
        bodyColor: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
        borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              // Add ₪ symbol for revenue data
              label += '₪' + context.parsed.y.toLocaleString();
            }
            return label;
          },
          // Custom title for pie charts
          title: function(tooltipItems) {
            const datasetIndex = tooltipItems[0].datasetIndex;
            const index = tooltipItems[0].dataIndex;
            if (tooltipItems[0].chart.config.type === 'pie') {
              const total = tooltipItems[0].dataset.data.reduce((a, b) => a + b, 0);
              const value = tooltipItems[0].parsed;
              const percentage = ((value / total) * 100).toFixed(1);
              return `${tooltipItems[0].label} (${percentage}%)`;
            }
            return tooltipItems[0].label;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          color: theme.palette.text.secondary,
          callback: function(value) {
            return '₪' + value.toLocaleString();
          }
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
    },
    interaction: {
      intersect: false,
      mode: 'nearest'
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
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
    labels: ['כוכב', 'זהב', 'פרימיום'],
    datasets: [{
      label: 'מכירות לפי תכנית',
      data: [
        clients.filter(c => c.subscriptionPlan === 'basic').length,
        clients.filter(c => c.subscriptionPlan === 'gold').length,
        clients.filter(c => c.subscriptionPlan === 'premium').length,
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