import { useState, useEffect } from 'react';
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

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    subscriptionPlan: '',
    amount: ''
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'שם חייב להכיל לפחות 2 תווים' : '';
      case 'phone':
        return !/^05\d{8}$/.test(value) ? 'מספר טלפון לא תקין' : '';
      case 'subscriptionPlan':
        return !value ? 'נא לבחור תכנית מנוי' : '';
      case 'amount':
        return isNaN(value) || value <= 0 ? 'סכום חייב להיות מספר חיובי' : '';
      default:
        return '';
    }
  };

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

  useEffect(() => {
    const savedData = localStorage.getItem('formDraft');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem('formDraft', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [formData]);

  const calculateProgress = () => {
    const requiredFields = ['name', 'phone', 'subscriptionPlan', 'amount'];
    const completedFields = requiredFields.filter(field => formData[field] && !errors[field]);
    return (completedFields.length / requiredFields.length) * 100;
  };

  const handleSubscriptionChange = (e) => {
    const plan = subscriptionPlans.find(p => p.value === e.target.value);
    const defaultAmount = plan ? plan.price : '';
    const defaultDate = new Date().toISOString().split('T')[0];
    
    setFormData({ 
      ...formData, 
      subscriptionPlan: e.target.value,
      amount: defaultAmount,
      date: defaultDate
    });
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
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
              setFormData({ ...formData, phone: value });
              setErrors({ ...errors, phone: validateField('phone', value) });
            }}
            error={!!errors.phone}
            helperText={errors.phone}
            required
            inputProps={{
              maxLength: 10,
              placeholder: '05XXXXXXXX'
            }}
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