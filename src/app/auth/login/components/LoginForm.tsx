'use client';

import { Box, Button, Input, InputAdornment, Typography } from '@mui/material';
import { loginAction } from '../actions';
import { Email, Key, Login } from '@mui/icons-material';
import { useState, useTransition } from 'react';
import { PasswordInput } from './LoginInput';

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleLoginFormSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      const result = await loginAction(formData);

      if (result.error) {
        setError(result.error);
      }
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
      {
        error &&
        <Typography component="label" className="mb-4 text-red-700">
          { error }
        </Typography>
      }
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
