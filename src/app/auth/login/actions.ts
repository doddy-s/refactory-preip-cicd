'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { APP_DASHBOARD } from '@/constants';

export async function loginAction(formData: FormData): Promise<{error: string}> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { error: 'Email yang anda masukkan tidak valid!' };
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error?.code === 'invalid_credentials') {
    return { error: 'Akun tidak ditemukan, periksa kembali email dan password anda!' };
  } else if (error) {
    return { error: 'Terjadi kesalahan saat login, silakan coba lagi!' };
  }

  revalidatePath(APP_DASHBOARD, 'layout');
  redirect(APP_DASHBOARD);
}
