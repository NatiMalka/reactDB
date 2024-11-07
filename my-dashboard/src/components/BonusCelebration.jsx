import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Dialog, DialogContent, Typography, Box, IconButton } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function BonusCelebration({ open, onClose, bonus, target }) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Box sx={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: 9999,
      pointerEvents: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }}>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={300}
        recycle={false}
        run={open}
        gravity={0.2}
        initialVelocityY={10}
        colors={['#FFD700', '#FFA500', '#FF6347', '#87CEEB', '#98FB98']}
      />
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        sx={{
          pointerEvents: 'auto',
          '& .MuiDialog-paper': {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: '400px',
            margin: '0 16px',
            background: 'linear-gradient(135deg, #4a90e2 0%, #64b5f6 100%)',
          }
        }}
        PaperProps={{
          sx: {
            color: 'white',
            textAlign: 'center',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            padding: '32px 24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            '&:hover': {
              background: 'rgba(255,255,255,0.2)'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        
        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            pt: 2
          }}>
            <Box sx={{ position: 'relative' }}>
              <EmojiEventsIcon sx={{ 
                fontSize: 90, 
                color: '#FFD700',
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
              }} />
              <CelebrationIcon sx={{ 
                fontSize: 40,
                position: 'absolute',
                top: -10,
                left: -20,
                transform: 'rotate(-30deg)',
                color: '#FFD700'
              }} />
              <CelebrationIcon sx={{ 
                fontSize: 40,
                position: 'absolute',
                top: -10,
                right: -20,
                transform: 'rotate(30deg)',
                color: '#FFD700'
              }} />
            </Box>
            
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              fontSize: '2rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              כל הכבוד! 🎉
            </Typography>

            <Box sx={{ 
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '20px 24px',
              width: '100%',
              border: '2px solid rgba(255,255,255,0.6)',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <Typography variant="h6" sx={{ 
                mb: 1, 
                color: 'white',
                fontWeight: 600
              }}>
                הגעת ליעד {target.toLocaleString()}₪
              </Typography>
              <Typography variant="h4" sx={{ 
                color: '#FFD700',
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                fontSize: '2.2rem'
              }}>
                בונוס: ₪{bonus.toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default BonusCelebration;