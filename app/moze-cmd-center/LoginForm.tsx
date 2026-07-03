'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authenticate } from './actions';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [error, setError] = useState('');
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setError('');
    const result = await authenticate(data.password);
    
    if (result.success) {
      router.refresh();
    } else {
      setError(result.error || 'Authentication failed');
    }
  };

  return (
    <div className="p-8 border border-white/10 bg-black/40 backdrop-blur-md relative"
         style={{ clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)' }}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-mono text-zinc-400 mb-2 uppercase tracking-wider">
            Authentication Key
          </label>
          <input
            type="password"
            {...register('password')}
            className="w-full bg-black/50 border border-white/10 p-3 font-mono text-white focus:outline-none focus:border-red-500/50 transition-colors"
            placeholder="••••••••••••"
          />
          {errors.password && (
            <p className="text-red-400 text-xs font-mono mt-2">{errors.password.message}</p>
          )}
        </div>
        
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
            [ERROR]: {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black font-bold font-mono uppercase tracking-widest p-4 hover:bg-zinc-200 transition-colors disabled:opacity-50"
          style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
        >
          {isSubmitting ? 'Verifying...' : 'Initialize Session'}
        </button>
      </form>
    </div>
  );
}
