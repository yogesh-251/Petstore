'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    if ((!email && !phone) || !password) {
        alert('Please enter email or phone and a password.');
        return;
    }

    // Try signing in first to check if user exists
    let checkResult;
    if (email) {
        checkResult = await supabase.auth.signInWithPassword({
        email,
        password,
        });
    } else if (phone) {
        checkResult = await supabase.auth.signInWithPassword({
        phone,
        password,
        });
    }

    // If there's NO error, user exists
    if (checkResult?.data?.user) {
        alert('User already exists. Please login.');
        router.push('/login');
        return;
    }

    // Now proceed to sign up
    let signupResult;
    if (email) {
        signupResult = await supabase.auth.signUp({
        email,
        password,
        });
    } else if (phone) {
        signupResult = await supabase.auth.signUp({
        phone,
        password,
        });
    }

    if (!signupResult) {
    alert('Unexpected error: no response from Supabase.');
    return;
    }

    const { error } = signupResult;

    if (error) {
        alert('Signup error: ' + error.message);
    } else {
        alert('Check your email or phone to confirm your account.');
        router.push('/login');
    }
    };



  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <div className="w-full max-w-sm space-y-3">
        <input
          type="email"
          placeholder="Email (required)"
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone (optional)"
          className="w-full border px-4 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-teal-600 text-white py-2 rounded"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
