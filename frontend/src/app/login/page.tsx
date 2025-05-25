'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import Link from 'next/link';

export default function LoginPage() {
  const [mode, setMode] = useState<'password' | 'otp'>('password');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (identifier.includes('@')) {
      // Email login
      const { error } = await supabase.auth.signInWithPassword({
        email: identifier,
        password,
      });
      if (error) return alert(error.message);
      router.push('/');
    } else {
      // Phone login
      const { error } = await supabase.auth.signInWithPassword({
        phone: identifier,
        password,
      });
      if (error) return alert(error.message);
      router.push('/');
    }
  };

  const handleSendOtp = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      phone: identifier,
    });
    if (error) return alert(error.message);
    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    const { error } = await supabase.auth.verifyOtp({
      phone: identifier,
      token: otp,
      type: 'sms',
    });
    if (error) return alert(error.message);
    router.push('/');
  };

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) alert(error.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <div className="w-full max-w-sm space-y-3">
        <input
          type="text"
          placeholder="Email or Phone"
          className="w-full border px-4 py-2 rounded"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        {mode === 'password' && (
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {mode === 'otp' && otpSent && (
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border px-4 py-2 rounded"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        {mode === 'password' && (
          <button
            onClick={handleLogin}
            className="w-full bg-teal-600 text-white py-2 rounded"
          >
            Login
          </button>
        )}

        {mode === 'otp' && !otpSent && (
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Send OTP
          </button>
        )}

        {mode === 'otp' && otpSent && (
          <button
            onClick={handleVerifyOtp}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            Verify OTP
          </button>
        )}

        <div className="text-sm text-center">
          {mode === 'password' ? (
            <button
              className="text-blue-600 underline"
              onClick={() => setMode('otp')}
            >
              Use OTP instead
            </button>
          ) : (
            <button
              className="text-blue-600 underline"
              onClick={() => setMode('password')}
            >
              Use Password instead
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => handleOAuthLogin('google')}
            className="flex items-center gap-2 border px-4 py-2 rounded"
          >
            <FcGoogle size={20} /> Google
          </button>

          <button
            onClick={() => handleOAuthLogin('facebook')}
            className="flex items-center gap-2 border px-4 py-2 rounded text-blue-700"
          >
            <FaFacebook size={20} /> Facebook
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          Do not have an account?{' '}
          <Link href="/signup" className="text-teal-600 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
