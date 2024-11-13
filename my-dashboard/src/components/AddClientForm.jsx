import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box,
  Typography,
  Grid 
} from '@mui/material';
import SubscriptionPlanSelect from './shared/SubscriptionPlanSelect';
import subscriptionPlans from './shared/SubscriptionPlans';

function AddClientForm({ onAddClient }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subscriptionPlan: '',
    amount: '',
    status: 'active',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddClient(formData);
    setFormData({
      name: '',
      phone: '',
      subscriptionPlan: '',
      amount: '',
      status: 'active',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const inputStyles = {
    '& .MuiInputBase-root': {
      cursor: 'default',
      '&:hover': {
        cursor: 'default'
      }
    },
    '& .MuiInputLabel-root': {
      cursor: 'default'
    },
    '& .MuiOutlinedInput-input': {
      cursor: 'text !important',
      caretColor: '#2196f3'
    },
    '& .MuiSelect-select': {
      cursor: 'pointer !important'
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        position: 'relative',
        '& .MuiFormControl-root': {
          mb: 2
        }
      }}
    >
      <Typography variant="h6" gutterBottom>
        הוספת לקוח חדש
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="שם"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            sx={inputStyles}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="טלפון"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            sx={inputStyles}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="תאריך"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
            required
            sx={inputStyles}
          />
        </Grid>

        <Grid item xs={12}>
          <SubscriptionPlanSelect
            value={formData.subscriptionPlan}
            onChange={(e) => {
              const plan = subscriptionPlans.find(p => p.value === e.target.value);
              setFormData({ 
                ...formData, 
                subscriptionPlan: e.target.value,
                amount: plan ? plan.price : ''
              });
            }}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="סכום"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            sx={inputStyles}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="הערות"
            multiline
            rows={2}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            sx={inputStyles}
          />
        </Grid>
      </Grid>

      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        sx={{ 
          mt: 2,
          cursor: 'pointer'
        }}
      >
        הוסף לקוח
      </Button>
    </Box>
  );
}

export default AddClientForm;