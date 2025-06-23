'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, Input, InputProps } from '@mui/material';
import { useState } from 'react';

export function PasswordInput(props: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Input
      {...props}
      type={isVisible ? 'text' : 'password'}
      endAdornment={
        <IconButton
          onClick={() => setIsVisible(!isVisible)}
          edge="end"
        >
          {isVisible ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      }
    />
  );
};
