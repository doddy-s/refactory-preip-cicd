'use client';

import { Box, Button, Input, InputAdornment, Typography } from '@mui/material';
import { loginAction } from '../actions';
import { Email, Key, Login } from '@mui/icons-material';
import { useTransition } from 'react';
import { PasswordInput } from './LoginInput';

export function LoginForm() {
  const [isPending, startTransition] = useTransition();

  function handleLoginFormSubmit(formData: FormData) {
    startTransition(async () => {
      await loginAction(formData);
    });
  }
  return (
    <Box component="form" onSubmit={(e) => {
      e.preventDefault();
      handleLoginFormSubmit(new FormData(e.currentTarget));
    }} className="flex flex-col gap-8 w-full">
      <div>
        <Typography component="label">Email</Typography>
        <Input
          disableUnderline
          required
          fullWidth
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          className="border-2 border-gray-400 rounded-lg p-2"
          placeholder="Masukkan Email"
          startAdornment={
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          }
        />
      </div>
      <div>
        <Typography component="label">Kata Sandi</Typography>
        <PasswordInput
          disableUnderline
          required
          fullWidth
          id="password"
          name="password"
          autoComplete="password"
          type='password'
          autoFocus
          className="border-2 border-gray-400 rounded-lg p-2"
          placeholder="Masukkan Kata Sandi"
          startAdornment={
            <InputAdornment position="start">
              <Key />
            </InputAdornment>
          }
        />
      </div>
      <Button
        disabled={isPending}
        type="submit"
        variant="contained"
        className="w-full place-self-end lg:w-2/3"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          borderRadius: '9999px',
          backgroundColor: '#5600e9',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#5600e9',
            color: '#fff',
          },
        }}
      >
        Masuk sekarang
        <Login />
      </Button>
    </Box>
  );
}
