import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ProgressBar from './ProgressBar';
import BonusCelebration from './BonusCelebration';
import Confetti from 'react-confetti';

const bonusThresholds = [
  { target: 50000, bonus: 1700 },
  { target: 60000, bonus: 2200 },
  { target: 70000, bonus: 2700 },
  { target: 80000, bonus: 3300 },
  { target: 90000, bonus: 4000 },
  { target: 100000, bonus: 5600 }
];

function SalesProgressBar({ totalSales, onBonusReached }) {
  const previousSalesRef = useRef(totalSales);
  const reachedBonusesRef = useRef(new Set());

  useEffect(() => {
    const currentThreshold = bonusThresholds.find(threshold => 
      totalSales >= threshold.target && 
      previousSalesRef.current < threshold.target
    );

    if (currentThreshold && !reachedBonusesRef.current.has(currentThreshold.target)) {
      onBonusReached(currentThreshold.bonus, currentThreshold.target);
      reachedBonusesRef.current.add(currentThreshold.target);
    }

    previousSalesRef.current = totalSales;
  }, [totalSales, onBonusReached]);

  const getCurrentThreshold = () => {
    for (let i = 0; i < bonusThresholds.length; i++) {
      if (totalSales < bonusThresholds[i].target) {
        return {
          current: bonusThresholds[i],
          previous: i > 0 ? bonusThresholds[i - 1] : { target: 0, bonus: 0 }
        };
      }
    }
    return {
      current: bonusThresholds[bonusThresholds.length - 1],
      previous: bonusThresholds[bonusThresholds.length - 2]
    };
  };

  const { current, previous } = getCurrentThreshold();
  const progress = Math.min(
    ((totalSales - previous.target) / (current.target - previous.target)) * 100,
    100
  );
  
  return (
    <>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          התקדמות בונוס מכירות
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            מכירות נוכחיות: ₪{totalSales.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            יעד בונוס הבא: ₪{current.target.toLocaleString()} = ₪{current.bonus.toLocaleString()} בונוס
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ flexGrow: 1 }}>
            <ProgressBar value={Math.max(0, Math.min(progress, 100))} />
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ minWidth: 35 }}>
            {Math.round(progress)}%
          </Typography>
        </Box>
      </Paper>
    </>
  );
}

export default SalesProgressBar;