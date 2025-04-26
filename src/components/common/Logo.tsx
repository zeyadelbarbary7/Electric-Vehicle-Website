import React from 'react';
import logoImage from './MFR8_2.png'; // Adjust path as needed

interface LogoProps {
  variant?: 'full' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  color?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ 
  variant = 'full', 
  size = 'md',
  color = 'dark' 
}) => {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12',
  };

  return (
    <img 
      src={logoImage}
      alt="WattUp" 
      className={`${sizes[size]} w-auto`}
    />
  );
};

export default Logo;