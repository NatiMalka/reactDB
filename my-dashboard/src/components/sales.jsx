import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Sales({ clients }) {
  const salesData = {
    labels: ['בסיסי', 'פרימיום', 'עסקי'],
    datasets: [{
      label: 'מכירות לפי תכנית',
      data: [
        clients.filter(c => c.subscriptionPlan === 'basic').reduce((sum, c) => sum + Number(c.amount), 0),
        clients.filter(c => c.subscriptionPlan === 'premium').reduce((sum, c) => sum + Number(c.amount), 0),
        clients.filter(c => c.subscriptionPlan === 'enterprise').reduce((sum, c) => sum + Number(c.amount), 0),
      ],
      backgroundColor: ['#3b82f6', '#7c3aed', '#ef4444'],
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        rtl: true,
        labels: {
          font: {
            family: 'Rubik'
          }
        }
      }
    }
  };

  return (
    <Box sx={{ padding: '24px 40px' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        ניתוח מכירות
      </Typography>
      <Box sx={{ mt: 3, height: 400 }}>
        <Bar data={salesData} options={options} />
      </Box>
    </Box>
  );
}

export default Sales;