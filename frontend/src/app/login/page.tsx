'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export default function LoginPage() {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setMsg('Login failed: ' + error.message);
    } else {
      setMsg('Check your email for the magic link!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded">
      <h1 className="text-xl font-bold mb-4">Login via Email</h1>
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-teal-600 text-white px-4 py-2 rounded w-full"
      >
        Send Magic Link
      </button>
      {msg && <p className="mt-4 text-sm text-gray-600">{msg}</p>}
    </div>
  );
}
