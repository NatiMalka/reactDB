import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import subscriptionPlans from './SubscriptionPlans';

function SubscriptionPlanSelect({ value, onChange, required = false, error = false }) {
  const theme = useTheme();
  const { darkMode } = useCustomTheme();

  const menuItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 1.5,
    py: 1.5,
    px: 2,
    '&:hover': {
      backgroundColor: darkMode 
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.04)',
    },
    '&.Mui-selected': {
      backgroundColor: darkMode 
        ? 'rgba(33, 150, 243, 0.15)' 
        : 'rgba(33, 150, 243, 0.08)',
      '&:hover': {
        backgroundColor: darkMode 
          ? 'rgba(33, 150, 243, 0.25)'
          : 'rgba(33, 150, 243, 0.12)',
      }
    }
  };

  return (
    <FormControl fullWidth required={required} error={error}>
      <InputLabel>תכנית מנוי</InputLabel>
      <Select
        value={value}
        label="תכנית מנוי"
        onChange={onChange}
        sx={{
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1.5
          }
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              mt: 1,
              maxHeight: 300,
              width: 'auto',
              minWidth: '100%',
              backgroundColor: theme.palette.background.paper,
              backgroundImage: 'none',
              boxShadow: darkMode 
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }
          },
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right'
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        }}
      >
        {subscriptionPlans.map((plan) => (
          <MenuItem key={plan.value} value={plan.value} sx={menuItemStyles}>
            <Box sx={{ fontSize: '1.5rem' }}>{plan.icon}</Box>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {plan.label}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontSize: '0.875rem'
                }}
              >
                ₪{plan.price} | {plan.description}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SubscriptionPlanSelect;