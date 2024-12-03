import { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Event as EventIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';

function UpcomingWebinar() {
  const { darkMode } = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [webinars, setWebinars] = useState(() => {
    const saved = localStorage.getItem('webinars');
    return saved ? JSON.parse(saved) : [];
  });
  const [newWebinar, setNewWebinar] = useState({
    title: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSave = () => {
    const webinarDateTime = new Date(`${newWebinar.date}T${newWebinar.time}`);
    const updatedWebinars = [...webinars, { ...newWebinar, timestamp: webinarDateTime.getTime() }]
      .sort((a, b) => a.timestamp - b.timestamp);
    
    setWebinars(updatedWebinars);
    localStorage.setItem('webinars', JSON.stringify(updatedWebinars));
    setOpenDialog(false);
    setNewWebinar({ title: '', date: '', time: '', notes: '' });
  };

  const handleDelete = (index) => {
    const updatedWebinars = webinars.filter((_, i) => i !== index);
    setWebinars(updatedWebinars);
    localStorage.setItem('webinars', JSON.stringify(updatedWebinars));
  };

  const getTimeRemaining = (timestamp) => {
    const now = new Date().getTime();
    const distance = timestamp - now;
    
    if (distance < 0) return null;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes };
  };

  const upcomingWebinars = webinars.filter(webinar => {
    const timeLeft = getTimeRemaining(webinar.timestamp);
    return timeLeft !== null;
  }).slice(0, 3); // Show only next 3 upcoming webinars

  return (
    <>
      <Paper sx={{ 
        p: 3,
        background: darkMode ? 'rgba(37, 99, 235, 0.1)' : 'rgba(25, 118, 210, 0.05)',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EventIcon /> וובינרים קרובים
          </Typography>
          <Button
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            variant="contained"
            size="small"
          >
            הוסף וובינר
          </Button>
        </Box>

        {upcomingWebinars.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            אין וובינרים מתוכננים
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {upcomingWebinars.map((webinar, index) => {
              const timeLeft = getTimeRemaining(webinar.timestamp);
              if (!timeLeft) return null;

              return (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid',
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {webinar.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(webinar.timestamp).toLocaleDateString('he-IL')} | {new Date(webinar.timestamp).toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    {webinar.notes && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {webinar.notes}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ textAlign: 'center', minWidth: 100 }}>
                      <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
                        {timeLeft.days > 0 ? `${timeLeft.days} ימים` : timeLeft.hours > 0 ? `${timeLeft.hours} שעות` : `${timeLeft.minutes} דקות`}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      onClick={() => handleDelete(index)}
                      sx={{ color: 'error.main' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>הוסף וובינר חדש</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              fullWidth
              label="כותרת"
              value={newWebinar.title}
              onChange={(e) => setNewWebinar({ ...newWebinar, title: e.target.value })}
            />
            <TextField
              fullWidth
              type="date"
              label="תאריך"
              value={newWebinar.date}
              onChange={(e) => setNewWebinar({ ...newWebinar, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              type="time"
              label="שעה"
              value={newWebinar.time}
              onChange={(e) => setNewWebinar({ ...newWebinar, time: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="הערות"
              multiline
              rows={2}
              value={newWebinar.notes}
              onChange={(e) => setNewWebinar({ ...newWebinar, notes: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>ביטול</Button>
          <Button 
            onClick={handleSave}
            variant="contained"
            disabled={!newWebinar.title || !newWebinar.date || !newWebinar.time}
          >
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UpcomingWebinar; 