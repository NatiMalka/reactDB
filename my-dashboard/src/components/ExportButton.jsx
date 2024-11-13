import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from 'xlsx';

function ExportButton({ clients, totalSales, cancelledClientsCount }) {
  const handleExport = () => {
    // Prepare the client data
    const clientData = clients.map(client => ({
      'שם לקוח': client.name,
      'תאריך': new Date(client.date).toLocaleDateString('he-IL'),
      'מספר טלפון': client.phone,
      'תכנית מנוי': getHebrewPlan(client.subscriptionPlan),
      'סכום': `₪${Number(client.amount).toLocaleString()}`,
      'הערות': client.notes,
      'סטטוס': client.status === 'active' ? 'פעיל' : 'מבוטל'
    }));

    // Add summary data
    const summaryData = [
      {
        'סיכום': 'נתונים כלליים',
        'סך המכירות': `₪${totalSales.toLocaleString()}`,
        'לקוחות שביטלו': cancelledClientsCount
      }
    ];

    // Create workbook and worksheets
    const wb = XLSX.utils.book_new();
    
    // Convert data to sheets with RTL formatting
    const ws_clients = XLSX.utils.json_to_sheet(clientData, { origin: 'A1' });
    const ws_summary = XLSX.utils.json_to_sheet(summaryData, { origin: 'A1' });

    // Add RTL direction to worksheets
    ws_clients['!cols'] = [
      { wch: 20 }, { wch: 15 }, { wch: 15 }, 
      { wch: 20 }, { wch: 15 }, { wch: 25 }, { wch: 15 }
    ];
    ws_summary['!cols'] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }];

    // Set RTL property for both worksheets
    ['!cols', '!rows'].forEach(prop => {
      if (ws_clients[prop]) {
        ws_clients[prop].forEach(col => col.rtl = true);
      }
      if (ws_summary[prop]) {
        ws_summary[prop].forEach(col => col.rtl = true);
      }
    });

    // Add worksheets to workbook
    XLSX.utils.book_append_sheet(wb, ws_clients, 'לקוחות');
    XLSX.utils.book_append_sheet(wb, ws_summary, 'סיכום');

    // Set RTL as default for the workbook
    wb.Workbook = {
      Views: [
        {
          RTL: true
        }
      ]
    };

    // Save file
    XLSX.writeFile(wb, 'דוח_מכירות.xlsx');
  };

  const getHebrewPlan = (plan) => {
    switch(plan) {
      case 'basic':
        return 'כוכב';
      case 'gold':
        return 'זהב';
      case 'premium':
        return 'פרימיום';
      default:
        return plan;
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={<FileDownloadIcon />}
      onClick={handleExport}
      sx={{ 
        height: '36.5px',
        minWidth: '120px',
        whiteSpace: 'nowrap'
      }}
    >
      ייצא לאקסל
    </Button>
  );
}

export default ExportButton; 