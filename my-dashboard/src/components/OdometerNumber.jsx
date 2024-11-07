import { useEffect, useRef } from 'react';
import Odometer from 'odometer';
import 'odometer/themes/odometer-theme-minimal.css';
import { useTheme } from '@mui/material';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

function OdometerNumber({ value, style }) {
  const elementRef = useRef(null);
  const odometerRef = useRef(null);
  const theme = useTheme();
  const { darkMode } = useCustomTheme();

  useEffect(() => {
    if (elementRef.current && !odometerRef.current) {
      odometerRef.current = new Odometer({
        el: elementRef.current,
        value: 0,
        format: ',ddd',
        duration: 1000,
        theme: 'minimal',
        animation: 'count'
      });
    }
  }, []);

  useEffect(() => {
    if (odometerRef.current) {
      const numericValue = typeof value === 'string' ? parseFloat(value) : value;
      odometerRef.current.update(numericValue);
    }
  }, [value]);

  const defaultStyle = {
    fontSize: '2.125rem',
    fontWeight: 600,
    color: darkMode ? '#ffffff' : '#1f2937',
    fontFamily: 'Rubik',
    direction: 'ltr',
    display: 'inline-block',
    transition: 'color 0.3s ease'
  };

  return (
    <div 
      ref={elementRef}
      style={{ 
        ...defaultStyle,
        ...style
      }}
    >
      0
    </div>
  );
}

export default OdometerNumber;