import { useState } from 'react';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box,
  Typography 
} from '@mui/material';

const subscriptionPlans = [
  { value: 'basic', label: 'תכנית בסיסית - ₪10/חודש' },
  { value: 'premium', label: 'תכנית פרימיום - ₪25/חודש' },
  { value: 'enterprise', label: 'תכנית עסקית - ₪50/חודש' },
];

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
      
      <TextField
        fullWidth
        label="שם"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
        sx={inputStyles}
      />
      
      <TextField
        fullWidth
        label="טלפון"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
        sx={inputStyles}
      />
      
      <FormControl fullWidth required sx={inputStyles}>
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
        required
        sx={inputStyles}
      />
      
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