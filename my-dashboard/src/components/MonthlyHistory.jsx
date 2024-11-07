import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function MonthlyHistory({ history }) {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        היסטוריית מכירות חודשית
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>חודש</TableCell>
              <TableCell>סך מכירות</TableCell>
              <TableCell>סך ביטולים</TableCell>
              <TableCell>לקוחות שביטלו</TableCell>
              <TableCell>סך לקוחות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((month, index) => (
              <TableRow key={index}>
                <TableCell>{month.month}</TableCell>
                <TableCell>₪{month.totalSales.toLocaleString()}</TableCell>
                <TableCell>₪{month.totalCancellations.toLocaleString()}</TableCell>
                <TableCell>{month.cancelledClientsCount}</TableCell>
                <TableCell>{month.clientCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default MonthlyHistory; 