import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';

const subscriptionPlans = [
  { value: 'basic', label: 'תכנית בסיסית - ₪10/חודש' },
  { value: 'premium', label: 'תכנית פרימיום - ₪25/חודש' },
  { value: 'enterprise', label: 'תכנית עסקית - ₪50/חודש' },
];

function EditClientModal({ open, onClose, client, onSave }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (client && open) {
      setFormData({
        name: client.name,
        phone: client.phone,
        subscriptionPlan: client.subscriptionPlan,
        amount: client.amount,
        notes: client.notes,
        status: client.status || 'active',
        cancellationReason: client.cancellationReason || '',
        cancellationDate: client.cancellationDate || new Date().toISOString().split('T')[0]
      });
    }
  }, [client, open]);

  const handleSave = () => {
    onSave({
      ...client,
      ...formData,
      cancellationDate: formData.status === 'cancelled' ? formData.cancellationDate : null,
      cancellationReason: formData.status === 'cancelled' ? formData.cancellationReason : ''
    });
    onClose();
  };

  const inputStyles = {
    '& .MuiInputBase-root': {
      cursor: 'default',
    },
    '& .MuiOutlinedInput-input': {
      cursor: 'text !important',
    },
    '& .MuiSelect-select': {
      cursor: 'pointer !important'
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>עריכת פרטי לקוח</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="שם"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ ...inputStyles, mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="טלפון"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            sx={{ ...inputStyles, mb: 2 }}
          />
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>תכנית מנוי</InputLabel>
            <Select
              value={formData.subscriptionPlan}
              label="תכנית מנוי"
              onChange={(e) => {
                const plan = subscriptionPlans.find(p => p.value === e.target.value);
                setFormData({ 
                  ...formData, 
                  subscriptionPlan: e.target.value,
                  amount: plan ? plan.value === 'basic' ? '10' : plan.value === 'premium' ? '25' : '50' : ''
                });
              }}
            >
              {subscriptionPlans.map((plan) => (
                <MenuItem key={plan.value} value={plan.value}>
                  {plan.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="סכום"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            sx={{ ...inputStyles, mb: 2 }}
          />

          <TextField
            fullWidth
            label="הערות"
            multiline
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            sx={{ ...inputStyles, mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>סטטוס מנוי</InputLabel>
            <Select
              value={formData.status}
              label="סטטוס מנוי"
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <MenuItem value="active">פעיל</MenuItem>
              <MenuItem value="cancelled">מבוטל</MenuItem>
            </Select>
          </FormControl>

          {formData.status === 'cancelled' && (
            <>
              <TextField
                fullWidth
                label="סיבת ביטול"
                multiline
                rows={3}
                value={formData.cancellationReason}
                onChange={(e) => setFormData({ ...formData, cancellationReason: e.target.value })}
                sx={{ ...inputStyles, mb: 2 }}
              />
              <TextField
                fullWidth
                label="תאריך ביטול"
                type="date"
                value={formData.cancellationDate}
                onChange={(e) => setFormData({ ...formData, cancellationDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                sx={inputStyles}
              />
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button onClick={handleSave} variant="contained">שמור</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditClientModal;
