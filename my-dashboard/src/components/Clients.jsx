import { Box, Typography, Paper } from '@mui/material';
import SalesTable from './SalesTable';

function Clients({ clients, onDeleteClient, onEditClient }) {
  return (
    <Box sx={{ padding: '24px 40px' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        ניהול לקוחות
      </Typography>
      <Box sx={{ mt: 3 }}>
        <Paper sx={{ p: 3 }}>
          <SalesTable 
            clients={clients} 
            onDeleteClient={onDeleteClient} 
            onEditClient={onEditClient}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default Clients;