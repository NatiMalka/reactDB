import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const scaleIn = keyframes`
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const rotateIn = keyframes`
  from {
    transform: rotate(-180deg);
    opacity: 0;
  }
  to {
    transform: rotate(0);
    opacity: 1;
  }
`;

export const pulseAnimation = {
  keyframes: {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' }
  },
  animation: 'pulse 2s infinite'
};

export const shimmerAnimation = {
  keyframes: {
    '0%': { backgroundPosition: '200% 0' },
    '100%': { backgroundPosition: '-200% 0' }
  },
  animation: 'shimmer 3s infinite linear'
}; 