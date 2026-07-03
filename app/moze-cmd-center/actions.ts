'use server';

import { cookies } from 'next/headers';
import { encrypt } from '@/lib/auth';

export async function authenticate(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'local-dev-password';
  
  if (password === adminPassword) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ role: 'admin', expires });

    const cookieStore = await cookies();
    cookieStore.set('moze_admin_session', session, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    
    return { success: true };
  }
  
  return { success: false, error: 'Invalid password' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('moze_admin_session');
}
