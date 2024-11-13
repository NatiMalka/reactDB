import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  TableSortLabel,
  IconButton,
  Paper,
  TableContainer,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import EditClientModal from './EditClientModal';
import SearchBar from './SearchBar';
import ExportButton from './ExportButton';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

function SalesTable({ clients, onDeleteClient, onEditClient }) {
  const { darkMode } = useCustomTheme();
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredClients = clients.filter(client => {
    const searchLower = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.phone.toLowerCase().includes(searchLower) ||
      client.subscriptionPlan.toLowerCase().includes(searchLower) ||
      client.notes.toLowerCase().includes(searchLower) ||
      client.status.toLowerCase().includes(searchLower)
    );
  });

  const sortedClients = [...filteredClients].sort((a, b) => {
    if (order === 'asc') {
      if (orderBy === 'amount') {
        return Number(a[orderBy]) - Number(b[orderBy]);
      }
      return a[orderBy].toString().localeCompare(b[orderBy].toString());
    } else {
      if (orderBy === 'amount') {
        return Number(b[orderBy]) - Number(a[orderBy]);
      }
      return b[orderBy].toString().localeCompare(a[orderBy].toString());
    }
  });

  const headCells = [
    { id: 'name', label: 'שם לקוח' },
    { id: 'date', label: 'תאריך' },
    { id: 'phone', label: 'מספר טלפון' },
    { id: 'subscriptionPlan', label: 'תכנית מנוי' },
    { id: 'amount', label: 'סכום' },
    { id: 'notes', label: 'הערות' },
    { id: 'status', label: 'סטטוס' },
    { id: 'actions', label: 'פעולות', sortable: false },
  ];

  const getHebrewPlan = (plan) => {
    switch(plan) {
      case 'basic':
        return 'בסיסי';
      case 'premium':
        return 'פרימיום';
      case 'enterprise':
        return 'עסקי';
      default:
        return plan;
    }
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (clientToDelete) {
      onDeleteClient(clientToDelete.id);
      setDeleteConfirmOpen(false);
      setClientToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmOpen(false);
    setClientToDelete(null);
  };

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2,
          gap: 2
        }}
      >
        <Box sx={{ flex: '0 0 auto' }}>
          <ExportButton 
            clients={clients}
            totalSales={clients.reduce((sum, client) => 
              client.status === 'active' ? sum + Number(client.amount) : sum, 0
            )}
            cancelledClientsCount={clients.filter(client => client.status === 'cancelled').length}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <SearchBar onSearch={setSearchQuery} />
        </Box>
      </Box>
      <TableContainer 
        component={Paper}
        sx={{
          overflowX: 'auto',
          '& .MuiTable-root': {
            minWidth: {
              xs: 650,
              sm: 750,
              md: 900
            }
          }
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id}>
                  {headCell.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedClients.length > 0 ? (
              sortedClients.map((client) => (
                <TableRow 
                  key={client.id}
                  sx={{
                    backgroundColor: client.status === 'cancelled' 
                      ? darkMode 
                        ? 'rgba(239, 68, 68, 0.1)' // Dark red for dark mode
                        : '#fff5f5' // Light red for light mode
                      : 'inherit',
                    '&:hover': {
                      backgroundColor: client.status === 'cancelled'
                        ? darkMode
                          ? 'rgba(239, 68, 68, 0.15)' // Slightly darker on hover in dark mode
                          : '#fff1f1' // Slightly darker on hover in light mode
                        : darkMode
                          ? 'rgba(255, 255, 255, 0.05)'
                          : 'rgba(0, 0, 0, 0.04)'
                    },
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{new Date(client.date).toLocaleDateString('he-IL')}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{getHebrewPlan(client.subscriptionPlan)}</TableCell>
                  <TableCell>₪{Number(client.amount).toLocaleString()}</TableCell>
                  <TableCell>{client.notes}</TableCell>
                  <TableCell>
                    {client.status === 'active' ? 'פעיל' : 'מבוטל'}
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => {
                        setSelectedClient(client);
                        setEditModalOpen(true);
                      }}
                      color="primary"
                      title="ערוך לקוח"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDeleteClick(client)}
                      color="error"
                      title="מחק לקוח"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  אין לקוחות להצגה
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <EditClientModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          client={selectedClient}
          onSave={onEditClient}
        />
      </TableContainer>

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleCancelDelete}
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: 'auto',
            minWidth: '280px',
            maxWidth: '320px',
            m: 2,
            backgroundColor: darkMode ? '#2d3748' : '#fff',
            height: 'auto',
            maxHeight: '200px'
          }
        }}
        sx={{
          '& .MuiDialog-container': {
            alignItems: 'center'
          }
        }}
      >
        <DialogTitle sx={{ 
          fontSize: '1rem',
          pt: 1,
          pb: 0.5,
          px: 2,
          minHeight: 'auto'
        }}>
          מחיקת לקוח
        </DialogTitle>
        <DialogContent sx={{ 
          py: 0.5,
          px: 2,
          overflow: 'hidden'
        }}>
          <DialogContentText sx={{ 
            fontSize: '0.9rem',
            mb: 0,
            color: darkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'
          }}>
            {clientToDelete ? `האם למחוק את ${clientToDelete.name}?` : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ 
          p: 1,
          px: 2,
          gap: 1,
          minHeight: 'auto'
        }}>
          <Button 
            onClick={handleCancelDelete}
            size="small"
            sx={{
              minWidth: '60px',
              fontSize: '0.85rem',
              py: 0.5
            }}
          >
            ביטול
          </Button>
          <Button 
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            size="small"
            sx={{
              minWidth: '60px',
              fontSize: '0.85rem',
              py: 0.5
            }}
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SalesTable;